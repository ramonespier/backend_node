import crypto from 'crypto';

function generateSecretKey() {
    return crypto.randomBytes(64).toString('hex');
}

const secretKey = generateSecretKey();

console.log('Chave Secreta Gerada: ', secretKey);