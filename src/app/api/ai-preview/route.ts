import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function POST(req: NextRequest) {
  try {
    const { matColor, matType, width, height } = await req.json();

    const setting = matType === 'indoor'
      ? 'modern office entrance or elegant home hallway'
      : 'professional storefront entrance or commercial building exterior';

    const prompt = `A high-quality photorealistic image of a custom logo floor mat with ${matColor} background color, placed at a ${setting}. The mat is ${width}cm wide and ${height}cm tall. The mat looks professional and premium. No text on the mat. Photorealistic, product photography style, warm lighting.`;

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      n: 1,
      size: '1024x1024',
      quality: 'standard',
    });

    
const url = response.data?.[0]?.url;
if (!url) throw new Error("No image generated");
return NextResponse.json({ url });

    if (!url) throw new Error('No image generated');

    return NextResponse.json({ url });
  } catch (err) {
    console.error('DALL-E error:', err);
    return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
  }
}
