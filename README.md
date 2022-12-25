# jp-holidays

## How to make Edge Functions in Vercel

[Vercel の Edge Functions で日本の祝日を検索するサービスを作ってみた](https://thundermiracle.com/blog/2022-08-28-vercel-edge-function/)

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
| to           | string  |          |         | end date <br /> \* will be from+13 days if not set (2 weeks)          |
| offset       | string  |    △     |         | offset from today (exp: 4 days) <br /> \* required if from is not set |
| only_weekday | boolean |          |  false  | only return holidays in weekdays                                      |

## Examples

1. holidays from 20220101 to 20221231  
   [https://jp-holidays.vercel.app/api/v1/holidays?from=20220101&to=20221231](https://jp-holidays.vercel.app/api/v1/holidays?from=20220101&to=20221231)

2. holidays from 1 week later to 3 weeks later  
   [https://jp-holidays.vercel.app/api/v1/holidays?offset=7%20days](https://jp-holidays.vercel.app/api/v1/holidays?offset=7%20days)

## LICENSE

This project is licensed under the terms of the [MIT license](/LICENSE).
