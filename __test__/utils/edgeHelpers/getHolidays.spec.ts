import dayjs from 'dayjs';

import { getHolidays } from 'src/utils/edgeHelpers';

vitest.mock('src/data/jp-holidays', () => {
  return {
    JP_HOLIDAYS: {
      '20190105': '土曜日',
      '20190106': '日曜日',
      '20220101': '元日',
      '20220110': '成人の日',
      '20220211': '建国記念の日',
    },
  };
});

describe('getHolidays', () => {
  it.each([
    {
      from: '20211231',
      to: '20221231',
      expected: {
        '20220101': '元日',
        '20220110': '成人の日',
        '20220211': '建国記念の日',
      },
    },
    {
      from: '20220101',
      to: '20220211',
      expected: {
        '20220101': '元日',
        '20220110': '成人の日',
        '20220211': '建国記念の日',
      },
    },
    {
      from: '20220102',
      to: '20220210',
      expected: {
        '20220110': '成人の日',
      },
    },
    {
      from: '20220102',
      to: '20220210',
      expected: {
        '20220110': '成人の日',
      },
    },
    {
      from: '20230102',
      to: '20230210',
      expected: {},
    },
  ])(
    'find holidays correctly when from to is valid: $from ~ $to',
    ({ from, to, expected }) => {
      expect(getHolidays(dayjs(from), dayjs(to))).toStrictEqual(expected);
    },
  );

  it("remove weekends from result when 'only_weekday' is true", () => {
    const resultWithoutFlag = getHolidays(dayjs('20190101'), dayjs('20191231'));
    const resultWithFlag = getHolidays(
      dayjs('20190101'),
      dayjs('20191231'),
      true,
    );

    expect(resultWithoutFlag).toStrictEqual({
      '20190105': '土曜日',
      '20190106': '日曜日',
    });
    expect(resultWithFlag).toStrictEqual({});
  });
});
