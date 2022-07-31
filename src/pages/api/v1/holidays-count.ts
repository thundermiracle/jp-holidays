import {
  createCacheResponse,
  createErrorResponse,
  getFromTo,
  getHolidays,
} from 'src/utils/edgeHelpers';

import type { NextRequest } from 'next/server';

export default function handler(req: NextRequest) {
  const { error, data } = getFromTo(req.url);
  if (data == null) {
    return createErrorResponse(error);
  }

  const holidays = getHolidays(data.from, data.to);
  return createCacheResponse(Object.keys(holidays).length);
}

export const config = {
  runtime: 'experimental-edge',
};
