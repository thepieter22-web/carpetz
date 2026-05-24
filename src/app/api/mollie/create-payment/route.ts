import { NextRequest, NextResponse } from 'next/server';
import { createMollieClient } from '@mollie/api-client';
import { supabaseAdmin } from '@/lib/supabase';
import { v4 as uuidv4 } from 'uuid';

const mollie = createMollieClient({ apiKey: process.env.MOLLIE_API_KEY! });

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { customer, mat, quantity, pricing, locale } = body;

    const orderId = uuidv4();

    // Save order to Supabase
    const { error } = await supabaseAdmin.from('orders').insert({
      id: orderId,
      status: 'pending',
      customer_first_name: customer.firstName,
      customer_last_name: customer.lastName,
      customer_email: customer.email,
      customer_phone: customer.phone,
      customer_address: customer.address,
      customer_city: customer.city,
      customer_postal_code: customer.postalCode,
      customer_country: customer.country,
      is_company: customer.isCompany,
      company_name: customer.companyName || null,
      vat_number: customer.vatNumber || null,
      mat_type: mat.type,
      mat_placement: mat.placement,
      mat_orientation: mat.orientation,
      mat_border: mat.border,
      mat_width: mat.width,
      mat_height: mat.height,
      mat_color: mat.matColor,
      logo_color: mat.logoColor,
      logo_url: mat.logoUrl,
      quantity,
      price_excl_vat: pricing.priceExclVat,
      vat_amount: pricing.vatAmount,
      price_incl_vat: pricing.priceInclVat,
      locale,
    });

    if (error) throw error;

    // Create Mollie payment
    const payment = await mollie.payments.create({
      amount: { currency: 'EUR', value: pricing.priceInclVat.toFixed(2) },
      description: `Carpetz logomat ${mat.width}x${mat.height}cm #${orderId.slice(0, 8)}`,
      redirectUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/${locale}/bevestiging/${orderId}`,
      webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/mollie/webhook`,
      locale: locale === 'nl' ? 'nl_BE' : 'fr_BE',
      metadata: { orderId },
    });

    // Save Mollie payment ID
    await supabaseAdmin
      .from('orders')
      .update({ mollie_payment_id: payment.id })
      .eq('id', orderId);

    return NextResponse.json({ checkoutUrl: payment.getCheckoutUrl() });
  } catch (err) {
    console.error('Mollie error:', err);
    return NextResponse.json({ error: 'Payment creation failed' }, { status: 500 });
  }
}
