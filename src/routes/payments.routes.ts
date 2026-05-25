import { FastifyInstance } from 'fastify'
import { authMiddleware } from '../middleware/auth.js'
import { authorize } from '../middleware/authorize.js'
import {
    createPaymentController,
    getAllPaymentsController,
    getPaymentController,
    getPaymentsByOrderController,
    updatePaymentController,
} from '../controllers/payments.controller.js'

export default async function paymentsRoutes(fastify: FastifyInstance) {
    // USER routes
    fastify.post('/payments', { preHandler: authMiddleware }, createPaymentController)
    fastify.get('/payments/:id', { preHandler: authMiddleware }, getPaymentController)
    fastify.get('/orders/:order_id/payments', { preHandler: authMiddleware }, getPaymentsByOrderController)

    // ADMIN only
    fastify.patch('/payments/:id', {
        preHandler: [authMiddleware, authorize(['ADMIN'])]
    }, updatePaymentController)
    fastify.get('/payments', { preHandler: authMiddleware }, getAllPaymentsController)
}