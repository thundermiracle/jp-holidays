# jp-holidays

## Endpoints

Base URL: `https://jp-holidays.vercel.app`

| Endpoint               | Return                              |
| ---------------------- | ----------------------------------- |
| /api/v1/holidays       | { date(yyyymmdd): name_of_holiday } |
| /api/v1/holidays-count | number of holidays                  |

## Available Parameters

| Parameter    |  Type   | Required | Default | Description                                                           |
| ------------ | :-----: | :------: | :-----: | --------------------------------------------------------------------- |
| from         | string  |    △     |         | start date <br /> \* required if offset is not set                    |
| to           | string  |          |         | end date <br /> \* will be from+14 days if not set                    |
| offset       | string  |    △     |         | offset from today (exp: 4 days) <br /> \* required if from is not set |
| only_weekday | boolean |          |  false  | only return holidays in weekdays                                      |

## Examples

1. holidays from 20220101 to 20221231  
   [https://jp-holidays.vercel.app/api/v1/holidays?from=20220101&to=20221231](https://jp-holidays.vercel.app/api/v1/holidays?from=20220101&to=20221231)

2. holidays from 1 week later to 3 weeks later  
   [https://jp-holidays.vercel.app/api/v1/holidays?offset=7%20days](https://jp-holidays.vercel.app/api/v1/holidays?offset=7%20days)

## LICENSE

This project is licensed under the terms of the [MIT license](/LICENSE).
