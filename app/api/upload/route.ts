import { put } from '@vercel/blob';
import { NextResponse } from 'next/server';

export async function POST(request: Request): Promise<NextResponse> {
  const { searchParams } = new URL(request.url);
  const filename = searchParams.get('filename');
  const type = searchParams.get('type'); // 'photo' or 'cv'

  if (!request.body) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  if (!filename) {
    return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
  }

  // Generate standardized filename with timestamp based on type
  const timestamp = Date.now();
  const fileExtension = filename.split('.').pop()?.toLowerCase() || '';
  let finalFilename: string;

  if (type === 'photo') {
    finalFilename = `photo-${timestamp}.${fileExtension}`;
  } else if (type === 'cv') {
    finalFilename = `cv-${timestamp}.${fileExtension}`;
  } else {
    finalFilename = `file-${timestamp}.${fileExtension}`;
  }
  
  console.log('Original filename:', filename);
  console.log('Generated filename:', finalFilename);
  console.log('Type:', type);

  // ⚠️ The below code is for App Router Route Handlers only
  const blob = await put(finalFilename, request.body, {
    access: 'public',
    token: process.env.PORTFOLIO_READ_WRITE_TOKEN,
    allowOverwrite: true,
  });

  // Return a custom URL instead of the Vercel blob URL
  const customUrl = `/api/files/${finalFilename}`;
  
  return NextResponse.json({
    url: customUrl,
    filename: finalFilename,
    contentType: blob.contentType,
  });
}
