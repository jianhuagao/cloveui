import { NextResponse } from 'next/server';

export async function GET(_request: Request, { params }: { params: { param: string } }) {
  const { param } = params;

  if (!param) {
    return NextResponse.json({ error: '参数缺失' }, { status: 400 });
  }

  const imageUrl = `https://images.unsplash.com/${param}`;

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return NextResponse.json({ error: '获取图片失败' }, { status: response.status });
    }

    const imageBlob = await response.blob();
    const arrayBuffer = await imageBlob.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    return new Response(buffer, {
      status: 200,
      headers: {
        'Content-Type': imageBlob.type
      }
    });
  } catch (error) {
    return NextResponse.json({ error: '获取图片失败' }, { status: 500 });
  }
}
