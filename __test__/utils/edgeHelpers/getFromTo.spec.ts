import { getFromTo } from 'src/utils/edgeHelpers';

describe('getFromTo', () => {
  it('return error when from is not defined', () => {
    const url = 'https://example.com/holidays?to=2020-01-02';
    const { error, data } = getFromTo(url);

    expect(error).toBe('Missing "from" query parameter');
    expect(data).toBe(undefined);
  });

  it('return error when from is not validate', () => {
    const url = 'https://example.com/holidays?from=aaa&to=2020-01-02';
    const { error, data } = getFromTo(url);

    expect(error).toBe('query parameter "from" or "to" is not a valid date');
    expect(data).toBe(undefined);
  });

  it('return error when to is not validate', () => {
    const url = 'https://example.com/holidays?from=20100101&to=aaa';
    const { error, data } = getFromTo(url);

    expect(error).toBe('query parameter "from" or "to" is not a valid date');
    expect(data).toBe(undefined);
  });

  it('plus 2 weeks from from if to is not passed', () => {
    const url = 'https://example.com/holidays?from=20100101';
    const { data } = getFromTo(url);

    expect(data?.from.format('YYYYMMDD')).toBe('20100101');
    expect(data?.to.format('YYYYMMDD')).toBe('20100115');
  });

  it('plus 2 weeks from from if to is before from', () => {
    const url = 'https://example.com/holidays?from=20100101&to=20000101';
    const { data } = getFromTo(url);

    expect(data?.from.format('YYYYMMDD')).toBe('20100101');
    expect(data?.to.format('YYYYMMDD')).toBe('20100115');
  });

  it('parse from to correctly if ', () => {
    const url = 'https://example.com/holidays?from=20100101&to=20200101';
    const { data } = getFromTo(url);

    expect(data?.from.format('YYYYMMDD')).toBe('20100101');
    expect(data?.to.format('YYYYMMDD')).toBe('20200101');
  });
});
