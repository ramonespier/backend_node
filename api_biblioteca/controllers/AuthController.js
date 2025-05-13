import jwt from 'jsonwebtoken'
import { read, compare } from '../config/database.js';
import { JWT_SECRET } from '../config/jwt.js';

const loginController = async (req, res) => {
    const { email, senha } = req.body;

    try {
        const usuario = await read('usuarios', `email = '${email}'`);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado.'});
        }

        const senhaCorreta = await compare(senha, usuario.senha);

        if (!senhaCorreta) {
            return res.status(401).json({ message: 'Senha incorreta' });
        }

        const token = jwt.sign({ id: usuario.id, tipo: usuario.tipo }, JWT_SECRET, { expiresIn: '1h' });

        res.status(200).json({ message: 'Login realizado com sucesso.', token});

    } catch (err) {
        console.error('Erro ao fazer login: ', err);
        res.status(500).json({ message: 'Erro ao fazer login' });
    }
};

export { loginController }