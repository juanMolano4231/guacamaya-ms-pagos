import {pool} from "../db/index.js";

export async function createPayment(order_id: number, amount: number, method: string) {
    const result = await pool.query(
        `INSERT INTO payments (order_id, amount, status, payment_method)
     VALUES ($1, $2, 'PENDIENTE', $3)
     RETURNING *`,
        [order_id, amount, method]
    );

    return result.rows[0];
}

export async function getPayment(id: number) {
    const result = await pool.query(
        `SELECT * FROM payments WHERE id=$1`,
        [id]
    );

    return result.rows[0];
}

export async function getPaymentsByOrder(order_id: number) {
    const result = await pool.query(
        `SELECT * FROM payments WHERE order_id=$1 ORDER BY created_at DESC`,
        [order_id]
    );

    return result.rows;
}

export async function updatePaymentStatus(
    id: number,
    status: string,
    transaction_id?: string
) {
    const result = await pool.query(
        `UPDATE payments
     SET status=$1, transaction_id=$2
     WHERE id=$3
     RETURNING *`,
        [status, transaction_id || null, id]
    );

    return result.rows[0];
}