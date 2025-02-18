const fs = require("fs");

const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

fs.readFile("dados.json", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }


  try {
    const dados = JSON.parse(data);
    console.log(
      `Nome: ${dados.nome}\nIdade: ${dados.idade}\nCidade: ${dados.cidade}`
    );
    readline.question("\nO que você deseja alterar?", (dados) => {
      if (dados == "nome") {
        readline.question("Digite o novo nome: ", (nome) => {
          dados.nome = nome;
          console.log(`Nome alterado para: ${nome}`);
          readline.close();
        })

    } else if (dados == "idade") {
        readline.question("Digite a nova idade: ", (idade) => {
            dados.idade = idade;
            console.log(`Idade alterada para: ${idade}`);
            readline.close();
            });
        })
    )
    } catch (err) {
    console.error(err);
    readline.close();
    }
    