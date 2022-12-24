import {
  createCacheResponse,
  createErrorResponse,
  getFromTo,
  getHolidays,
  getOptions,
} from 'src/utils/edgeHelpers';

import type { NextRequest } from 'next/server';

export default function handler(req: NextRequest) {
  const { error, data } = getFromTo(req.url);
  if (data == null) {
    return createErrorResponse(error);
  }

  const { only_weekday } = getOptions(req.url);

  const holidays = getHolidays(data.from, data.to, only_weekday != null);
  return createCacheResponse(Object.keys(holidays).length);
}

export const config = {
  runtime: 'edge',
  regions: ['hnd1'],
};
