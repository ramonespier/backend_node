import bcrypt from "bcryptjs";

async function generateHashedPassword() {
    const password = 'teste'; // substituir pela senha desejada // formulario

    try {
        const salt = await bcrypt.genSalt(10);

        const hashedPassword = await bcrypt.hash(password, salt)

        console.log('Senha hasheada: ', hashedPassword)
        process.exit(0)

    } catch (err) {
        console.error('Erro ao hashear a senha: ', err);
        process.exit(1)
    }
}

generateHashedPassword();