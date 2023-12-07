#!/bin/bash

# 設定要發送 curl 的 URL
URL="http://localhost:52123/json?user_auth_token=NDgyNTo2MWJjMTc3MmMzMDA3ZDhkNjYxZmZmMWZiODczNDhlYWE2MmJkMjMxN2JjYmMzZWU0Y2Vj&start_date=2023-06-30T00:00:00.000Z&end_date=2023-09-29T00:00:00.000Z&sort=-order_requests.pickup_time"

# 設定要發送的次數
COUNT=1000

# 開始循環
for (( i=0; i<COUNT; i++ )); do
  # 發送 curl 請求
  curl -s -o /dev/null $URL
done