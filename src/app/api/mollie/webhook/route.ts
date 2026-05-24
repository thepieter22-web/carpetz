import { NextRequest, NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';
import { supabaseAdmin } from '@/lib/supabase';
import { sendOrderConfirmation, sendOrderToSupplier } from '@/lib/resend';
import { generateOrderPdf } from '@/lib/pdf';
import { Order } from '@/types';

const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const body = await req.formData();
    const paymentId = body.get('id') as string;

    const payment = await mollie.payments.get(paymentId);
    if (payment.status !== 'paid') return NextResponse.json({ ok: true });

    const orderId = (payment.metadata as any).orderId;

    // Update order status to paid
    const { data: orders, error } = await supabaseAdmin
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', orderId)
      .select()
      .single();

    if (error || !orders) return NextResponse.json({ error: 'Order not found' }, { status: 404 });

    const order = orders as Order;

    // Send confirmation email to customer
    await sendOrderConfirmation(order);

    // Generate PDF and send to supplier
    try {
      const pdfBase64 = await generateOrderPdf(order);
      await sendOrderToSupplier(order, pdfBase64);

      await supabaseAdmin
        .from('orders')
        .update({ supplier_pdf_sent: true })
        .eq('id', orderId);
    } catch (supplierError) {
      console.error('Supplier email failed:', supplierError);
      await supabaseAdmin
        .from('orders')
        .update({ supplier_pdf_sent: false, supplier_error: String(supplierError) })
        .eq('id', orderId);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Webhook error:', err);
    return NextResponse.json({ error: 'Webhook failed' }, { status: 500 });
  }
}
