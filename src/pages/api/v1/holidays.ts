import {
  createCacheResponse,
  createErrorResponse,
  getFromTo,
} from 'src/utils/edgeHelpers';

import type { NextRequest } from 'next/server';

export default function handler(req: NextRequest) {
  const { error, data } = getFromTo(req.url);
  if (data == null) {
    return createErrorResponse(error);
  }

  return createCacheResponse({
    from: data.from.format('YYYY-MM-DD'),
    to: data.to.format('YYYY-MM-DD'),
  });
}

export const config = {
  runtime: 'experimental-edge',
};
