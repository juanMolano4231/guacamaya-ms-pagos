import { FastifyRequest, FastifyReply } from 'fastify'

export function authorize(roles: string[]) {
    return async (request: FastifyRequest, reply: FastifyReply) => {
        const user = (request as any).user
        if (!user) {
            return reply.code(401).send({ message: 'Unauthenticated' })
        }
        if (!roles.includes(user.role)) {
            return reply.code(403).send({ message: 'Forbidden' })
        }
    }
}