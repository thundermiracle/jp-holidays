import { getQueryParams } from 'src/utils/edgeHelpers';

describe('getQueryParams', () => {
  it('should return an array of query params', () => {
    const url = 'https://example.com/holidays?from=2020-01-01&to=2020-01-02';
    const queryParams = ['from', 'to'];
    const result = getQueryParams(url, queryParams);
    expect(result).toEqual(['2020-01-01', '2020-01-02']);
  });

  it('should return first one when params are duplicated', () => {
    const url =
      'https://example.com/holidays?from=2020-01-10&to=2020-01-02&from=2021-01-10&from=2022-01-10';
    const queryParams = ['from', 'to'];
    const result = getQueryParams(url, queryParams);
    expect(result).toStrictEqual(['2020-01-10', '2020-01-02']);
  });
});
