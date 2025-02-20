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
      `\nNome: ${dados.nome}\nSobrenome: ${dados.sobrenome}\nIdade: ${dados.idade}\nCidade: ${dados.cidade}\n`
    );

    readline.question("Deseja alterar alguma informação? (s/n).\n", (Yn) => {
      if (Yn == "sim" || Yn == "yes" || Yn == "y" || Yn == "s") {
        readline.question("\nO que você deseja alterar? \n", (resposta) => {
          if (resposta == "nome") {
            readline.question("Digite o novo nome: \n", (nome) => {
              // Tratamento de erro para colocar apenas o primeiro nome
              let nomeNovo = nome;
              let primeiroNome = nomeNovo.split(" ");

              if (primeiroNome.length > 1) {
                console.log("\nEscreva apenas o seu primeiro nome.");
                readline.close();
                return;
              }
              ////////////////////////////////////////////////////////////

              dados.nome = nome;

              const jsonData = JSON.stringify(dados, null, 2);
              fs.writeFile("dados.json", jsonData, "utf8", (err) => {
                if (err) {
                  console.log("Erro ao escrever no arquivo: ", err);
                  return;
                }

                console.log(
                  `Nome alterado para ${nome}\n\nNome: ${dados.nome}\nSobrenome: ${dados.sobrenome}\nIdade: ${dados.idade}\nCidade: ${dados.cidade}\n`
                );
                readline.close();
              });
            });
          }

          if (resposta == "sobrenome") {
            readline.question("Digite o novo sobrenome: \n", (sobrenome) => {
              dados.sobrenome = sobrenome;
              const jsonData = JSON.stringify(dados, null, 2);
              fs.writeFile("dados.json", jsonData, "utf8", (err) => {
                if (err) {
                  console.log("Erro ao escrever no arquivo: ", err);
                  return;
                }

                console.log(
                  `Sobrenome alterado para ${sobrenome}\n\nNome: ${dados.nome}\nSobrenome: ${dados.sobrenome}\nIdade: ${dados.idade}\nCidade: ${dados.cidade}\n`
                );
                readline.close();
              });
            });
          }

          if (resposta == "idade") {
            readline.question("Digite o novo idade: \n", (idade) => {
              dados.idade = idade;
              const jsonData = JSON.stringify(dados, null, 2);
              fs.writeFile("dados.json", jsonData, "utf8", (err) => {
                if (err) {
                  console.log("Erro ao escrever no arquivo: ", err);
                  return;
                }

                console.log(
                  `Nome alterado para ${idade}\n\nNome: ${dados.nome}\nSobrenome: ${dados.sobrenome}\nIdade: ${dados.idade}\nCidade: ${dados.cidade}\n`
                );
                readline.close();
              });
            });
          }

          if (resposta == "cidade") {
            readline.question("Digite o novo cidade: \n", (cidade) => {
              dados.cidade = cidade;

              const jsonData = JSON.stringify(dados, null, 2);
              fs.writeFile("dados.json", jsonData, "utf8", (err) => {
                if (err) {
                  console.log("Erro ao escrever no arquivo: ", err);
                  return;
                }

                console.log(
                  `Nome alterado para ${cidade}\n\nNome: ${dados.nome}\nSobrenome: ${dados.sobrenome}\nIdade: ${dados.idade}\nCidade: ${dados.cidade}\n`
                );
                readline.close();
              });
            });
          }
          
        });
      } else if (Yn == "nao" || Yn == "não" || Yn == "n" || Yn == "no") {
        console.log("Beleza! Programa encerrado.");
        readline.close();
      } else {
        console.log("Responda apenas com sim ou não.");
        readline.close();
      }

    });
  } catch {
    console.log(err);
  }
});
