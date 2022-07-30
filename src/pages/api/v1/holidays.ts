import dayjs from 'dayjs';

import { createCacheResponse } from '../_utils';

import type { NextRequest } from 'next/server';

export default function handler(_req: NextRequest) {
  // const url = req.url;

  return createCacheResponse({
    today: dayjs().format('YYYY-MM-DD'),
  });
}
