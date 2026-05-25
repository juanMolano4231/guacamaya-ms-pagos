import { FastifyRequest, FastifyReply } from 'fastify'
import { verifyToken } from '../utils/jwt.js'

declare module 'fastify' {
    interface FastifyRequest {
        user?: { id: any; role: string }
    }
}

export async function authMiddleware(request: FastifyRequest, reply: FastifyReply) {
    const cookie = request.headers.cookie || ''
    const token = cookie
        .split(';')
        .map(v => v.trim())
        .find(v => v.startsWith('accessToken='))
        ?.split('=')[1]

    if (!token) {
        return reply.code(401).send({ message: 'Missing access token' })
    }

    try {
        const decoded = verifyToken(token)
        request.user = { id: decoded.sub, role: decoded.role }
    } catch {
        return reply.code(401).send({ message: 'Invalid or expired token' })
    }
}