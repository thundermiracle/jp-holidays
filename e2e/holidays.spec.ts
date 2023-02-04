import { request } from 'e2e/utils';

describe('[e2e]holidays', () => {
  it('parameter error.', async () => {
    await request
      .get('/api/v1/holidays')
      .query({})
      .expect(500, { error: '"from" or "offset" query parameter is required' });
  });

  it.each([
    {
      description: '[2023/2/11 Sat]contains holidays',
      from: '20230206',
      to: '20230212',
      expectedResult: { 20230211: '建国記念の日' },
    },
    {
      description: '[2023/2/11 Sat]from is holiday',
      from: '20230211',
      to: '20230217',
      expectedResult: { 20230211: '建国記念の日' },
    },
    {
      description: '[2023/2/11 Sat]to is holiday',
      from: '20230205',
      to: '20230211',
      expectedResult: { 20230211: '建国記念の日' },
    },
    {
      description:
        '[2023/2/11 Sat][2023/2/23 Thur]exclude holidays in Saturday when only_weekday is true',
      from: '20230206',
      to: '20230225',
      only_weekday: true,
      expectedResult: { 20230223: '天皇誕生日' },
    },
    {
      description:
        '[2023/2/11 Sat][2023/2/23 Thur]automatically add 2 weeks if to is invalid or before from',
      from: '20230210',
      to: '20230201',
      expectedResult: { 20230211: '建国記念の日', 20230223: '天皇誕生日' },
    },
  ])('$description', async ({ from, to, only_weekday, expectedResult }) => {
    await request
      .get('/api/v1/holidays')
      .query({ from, to, only_weekday })
      .expect(200, expectedResult);
  });
});
