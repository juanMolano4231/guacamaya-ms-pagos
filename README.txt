To run in local
    docker compose up --build > output.txt

For Render deployment:

Set Build Command: npm ci
Set Start Command: npm start
Add environment variables in Render dashboard


Curl scripts for testing


Create payment (USER)

curl -X POST http://localhost:8088/payments \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "order_id": 1,
    "amount": 150.50,
    "payment_method": "CARD"
  }'



Get payment by ID (USER)

curl -X GET http://localhost:8088/payments/1 \
  -b cookies.txt



Get payments by order (USER)

curl -X GET http://localhost:8088/orders/1/payments \
  -b cookies.txt



Update payment status (ADMIN only)

curl -X PATCH http://localhost:8088/payments/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "status": "COMPLETADO",
    "transaction_id": "TXN-ABC-123"
  }'



Simulate failure (ADMIN)

curl -X PATCH http://localhost:8088/payments/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "status": "FALLIDO",
    "transaction_id": "TXN-FAILED-999"
  }'



Invalid access test (no cookie)

curl -X GET http://localhost:8088/payments/1



Role enforcement test

curl -X PATCH http://localhost:8088/payments/1 \
  -H "Content-Type: application/json" \
  -b cookies.txt \
  -d '{
    "status": "COMPLETADO"
  }'



