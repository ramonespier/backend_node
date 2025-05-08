import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config/jwt.js';

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ message: 'Não autorizado: token não fornecido' });
    }

    const [ , token] = authHeader.split(' ')


    // analisar se token enviado é igual ao token do meu sistema
    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.usuarioId = decoded.indexOf;
        next()
    } catch (err) {
        return res.status(403).json({ message: 'Não autorizado: Token inválido.' })
        // console.error('Erro ao verificar token', err)
    }
}

export default authMiddleware;