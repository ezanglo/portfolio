import { NextRequest, NextResponse } from 'next/server';
import { head } from '@vercel/blob';

export async function GET(
  request: NextRequest,
  { params }: { params: { path: string[] } }
) {
  try {
    // Reconstruct the filename from the path segments
    const filename = params.path.join('/');
    
    if (!filename) {
      return NextResponse.json({ error: 'Filename is required' }, { status: 400 });
    }

    // Get the blob metadata from Vercel
    const blob = await head(filename, {
      token: process.env.PORTFOLIO_READ_WRITE_TOKEN,
    });

    if (!blob) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    // Fetch the actual file content
    const response = await fetch(blob.url);
    if (!response.ok) {
      return NextResponse.json({ error: 'File not found' }, { status: 404 });
    }

    const fileBuffer = await response.arrayBuffer();

    // Return the file with appropriate headers
    return new NextResponse(fileBuffer, {
      headers: {
        'Content-Type': blob.contentType || 'application/octet-stream',
        'Content-Length': blob.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable', // Cache for 1 year
      },
    });
  } catch (error) {
    console.error('Error serving file:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
