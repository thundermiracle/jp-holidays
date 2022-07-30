import { NextResponse } from 'next/server';

export function createCacheResponse(data: { [key: string | number]: any }) {
  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=0, s-maxage=86400',
    },
  });
}
