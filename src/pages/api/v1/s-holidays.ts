import { getHolidays } from 'src/utils/edgeHelpers';

import { NextApiRequest, NextApiResponse } from 'next';
import dayjs from 'dayjs';

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

  return res.status(200).json({
    holidays,
  });
}
