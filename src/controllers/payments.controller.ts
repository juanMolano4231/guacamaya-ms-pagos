import { FastifyRequest, FastifyReply } from 'fastify'
import {
    createPayment,
    getPayment,
    getPaymentsByOrder,
    updatePaymentStatus,
} from '../services/payments.service.js'

export async function createPaymentController(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as any
    const payment = await createPayment(body.order_id, body.amount, body.payment_method)
    return reply.code(201).send(payment)
}

export async function getPaymentController(request: FastifyRequest, reply: FastifyReply) {
    const id = Number((request.params as any).id)
    const payment = await getPayment(id)
    if (!payment) return reply.code(404).send({ message: 'Not found' })
    return reply.send(payment)
}

export async function getPaymentsByOrderController(request: FastifyRequest, reply: FastifyReply) {
    const order_id = Number((request.params as any).order_id)
    const payments = await getPaymentsByOrder(order_id)
    return reply.send(payments)
}

export async function updatePaymentController(request: FastifyRequest, reply: FastifyReply) {
    const id = Number((request.params as any).id)
    const body = request.body as any
    const payment = await updatePaymentStatus(id, body.status, body.transaction_id)
    if (!payment) return reply.code(404).send({ message: 'Not found' })
    return reply.send(payment)
}