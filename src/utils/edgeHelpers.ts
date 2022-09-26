import dayjs from 'dayjs';
import { NextResponse } from 'next/server';

import { JP_HOLIDAYS } from 'src/data/jp-holidays';

export function createCacheResponse(
  data: Record<string, any> | string | number,
) {
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

export function getOptions(url: string): Record<string, string | null> {
  const query = new URL(url).searchParams;

  return {
    only_weekday: query.get('only_weekday'),
  };
}

export function getFromTo(url: string): {
  error?: string;
  data?: { from: dayjs.Dayjs; to: dayjs.Dayjs };
} {
  const [from, to, offset] = getQueryParams(url, ['from', 'to', 'offset']);
  if (from == null && offset == null) {
    return {
      error: '"from" or "offset" query parameter is required',
    };
  }

  // format
  const data = {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    from: dayjs(from ?? dayjs().add(...offset!.split(' '))),
    to: dayjs(to),
  };

  // validate
  if (!data.from.isValid() || (to != null && !data.to.isValid())) {
    return { error: 'query parameter "from" or "to" is not a valid date' };
  }

  // validate range
  if (to == null || dayjs(to).isBefore(data.from)) {
    // 2 weeks
    data.to = data.from.add(13, 'day');
  }

  return { data };
}

export function isWeekend(dateStr: string): boolean {
  const date = dayjs(dateStr);
  return date.day() === 0 || date.day() === 6;
}

// @TODO: improve algorithm
export function getHolidays(
  from: dayjs.Dayjs,
  to: dayjs.Dayjs,
  only_weekday?: boolean,
): Record<string, any> {
  const holidays: Record<string, string> = {};

  const fromStr = from.format('YYYYMMDD');
  const toStr = to.format('YYYYMMDD');

  for (const [holidayDateStr, holidayName] of Object.entries(JP_HOLIDAYS)) {
    if (holidayDateStr >= fromStr && holidayDateStr <= toStr) {
      // remove holidays in weekends
      if (!only_weekday || (only_weekday && !isWeekend(holidayDateStr))) {
        holidays[holidayDateStr] = holidayName;
      }
      continue;
    }

    // As JP_HOLIDAYS is sorted by date, we can stop iterating when we reach the last date
    if (holidayDateStr > toStr) {
      break;
    }
  }

  return holidays;
}
