import dayjs from 'dayjs';

import { getHolidays } from 'src/utils/edgeHelpers';

import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { from, to, only_weekday } = req.query;
  if (from == null || to == null) {
    return res.status(500).json({
      error: 'from, to are required.',
    });
  }

  const holidays = getHolidays(
    dayjs(from as string),
    dayjs(to as string),
    only_weekday != null,
  );

  return res
    .status(200)
    .setHeader('Cache-Control', 'max-age=0, s-maxage=86400')
    .json({
      holidays,
    });
}
