/* eslint-disable no-console */
import { writeFile } from 'fs/promises';

import axios from 'axios';
import dayjs from 'dayjs';

const DATA_URL = 'https://www8.cao.go.jp/chosei/shukujitsu/syukujitsu.csv';

function generateHolidayStr(date: dayjs.Dayjs, holidayName: string) {
  return `  '${date.format('YYYYMMDD')}': '${holidayName}',`;
}

function generateJPHolidays(holidays: string[]) {
  return `export const JP_HOLIDAYS = {
${holidays.join('\n')}
};
`;
}

async function main() {
  console.log('Fetching data...');
  // read from moj site
  const contents = await axios
    .get(DATA_URL, { responseType: 'arraybuffer' })
    .then(({ data }) => new TextDecoder('shift-jis').decode(data));

  console.log('Parsing data...');
  // remove header & split
  const rows = contents
    .replace(/(\r\n|\r)/g, '\n')
    .split('\n')
    .slice(1);

  console.log('Generating data...');
  // generate object contents
  const holidays = rows
    .flatMap((row) => {
      const [dateStr, holidayName] = row.split(',');
      const date = dayjs(dateStr);
      const originalHolidayStr = generateHolidayStr(date, holidayName);

      if (!date.isValid()) {
        return [];
      }

      // 振替休日は含まれている
      // // 振替休日
      // if (date.day() === 0) {
      //   return [
      //     originalHolidayStr,
      //     generateHolidayStr(date.add(1, 'day'), `${holidayName}の振替休日`),
      //   ];
      // }

      return originalHolidayStr;
    })
    .filter((str) => str);

  const fileContents = generateJPHolidays(holidays);

  console.log('Writing data...');
  // write to file
  await writeFile('src/data/jp-holidays.ts', fileContents);

  console.log('Done!');
}

main().catch(console.error);
