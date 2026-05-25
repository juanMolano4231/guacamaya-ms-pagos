To run in local
    docker compose up --build > output.txt

For Render deployment:

Set Build Command: npm ci
Set Start Command: npm start
Add environment variables in Render dashboard


Curl scripts for testing

Create payment (user):

curl -X POST http://localhost:8088/api/payments \
  -H "Content-Type: application/json" \
  --cookie cookies.txt \
  -d '{"order_id":1,"amount":99.99,"payment_method":"credit_card"}'



Get payment by ID (user):

curl -X GET http://localhost:8088/api/payments/1 --cookie cookies.txt



Get payments by order (user):

curl -X GET http://localhost:8088/api/orders/1/payments --cookie cookies.txt



Update payment (admin):

curl -X PATCH http://localhost:8088/api/payments/1 \
  -H "Content-Type: application/json" \
  --cookie admin_cookies.txt \
  -d '{"status":"COMPLETADO","transaction_id":"txn_123456"}'

