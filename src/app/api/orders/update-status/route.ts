import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';
import { sendStatusUpdate, sendReviewRequest } from '@/lib/resend';
import { Order } from '@/types';

export async function POST(req: NextRequest) {
  const { orderId, status } = await req.json();

  const { data: order, error } = await supabaseAdmin
    .from('orders')
    .update({ status })
    .eq('id', orderId)
    .select()
    .single();

  if (error) return NextResponse.json({ error }, { status: 500 });

  await sendStatusUpdate(order as Order);
  if (status === 'delivered') await sendReviewRequest(order as Order);

  return NextResponse.json({ ok: true });
}
