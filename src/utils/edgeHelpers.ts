import dayjs from 'dayjs';
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

export function createErrorResponse(errorMsg = '') {
  return NextResponse.json(
    { error: errorMsg },
    {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
}

export function getQueryParams(
  url: string,
  queryParams: string[],
): (string | null)[] {
  const query = new URL(url).searchParams;

  return queryParams.map((key) => query.get(key));
}

export function getFromTo(url: string): {
  error?: string;
  data?: { from: dayjs.Dayjs; to: dayjs.Dayjs };
} {
  const [from, to] = getQueryParams(url, ['from', 'to']);
  if (from == null) {
    return {
      error: 'Missing "from" query parameter',
    };
  }

  // format
  const data = { from: dayjs(from), to: dayjs(to) };

  // validate
  if (!data.from.isValid() || (to != null && !data.to.isValid())) {
    return { error: 'query parameter "from" or "to" is not a valid date' };
  }

  // validate range
  if (to == null || dayjs(to).isBefore(dayjs(from))) {
    data.to = dayjs(from).add(14, 'day');
  }

  return { data };
}
