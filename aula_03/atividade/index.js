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
    readline.question("Deseja alterar alguma informação?", (Yn) => {
      if (Yn == "sim" || "yes" || "y") {
        
      }
    });
    readline.question("\nO que você deseja alterar? \n", (resposta) => {
      if (resposta == "nome") {
        readline.question("Digite o novo nome: \n", (nome) => {
          dados.nome = nome;
          const jsonData = JSON.stringify(dados, null, 2);
          fs.writeFile("dados.json", jsonData, "utf8", (err) => {
            if (err) {
              console.log("Erro ao escrever no arquivo: ", err);
              return;
            }
            console.log(
              `Nome alterado para ${nome}\n\nNome: ${dados.nome}\nIdade: ${dados.idade}\nCidade: ${dados.cidade}`
            );
            readline.close();
          });
        });
      }

      if (resposta == "idade") {
        readline.question("Digite a nova idade: ", (idade) => {
          resposta.idade = idade;
          console.log(`Idade alterada para: ${idade}`);
          readline.close();
        });
      }

      if (resposta == "cidade") {
        readline.question("Digite a nova cidade: ", (cidade) => {
          resposta.cidade = cidade;
          console.log(`Cidade alterada para: ${cidade}`);
          readline.close();
        });
      }
    });
  } catch {
    console.log(err);
  }
});
