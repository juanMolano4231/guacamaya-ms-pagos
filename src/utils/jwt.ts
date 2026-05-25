import jwt from "jsonwebtoken";

export function verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET as string, {
        algorithms: ["HS256", "HS512"],
    }) as any;
}