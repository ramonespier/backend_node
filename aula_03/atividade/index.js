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
    console.log(dados);

    readline.question("Deseja alterar alguma informação? (s/n): ", (Yn) => {
      if (Yn == "sim" || Yn == "yes" || Yn == "y" || Yn == "s") {
        readline.question("\nQual dado você deseja alterar? \n", (resposta) => {
          readline.question(
            "Qual informação quer colocar neste dado?",
            (valor) => {
              const respostaLower = resposta.toLowerCase();
              dados[respostaLower] = valor;

              const jsonData = JSON.stringify(dados, null, 2);
              fs.writeFile("dados.json", jsonData, "utf8", (err) => {
                if (err) {
                  console.log("Erro ao escrever no arquivo: ", err);
                  return;
                }

                console.log("Dado adicionado:\n", dados, "\n\n");

                readline.question(
                  "Deseja adicionar mais algum dado? (s/n): ",
                  (Yn) => {
                    if (Yn == "sim" || Yn == "yes" || Yn == "y" || Yn == "s") {
                      readline.question("\nInsira o dado novo: ", (chave) => {
                        readline.question("\nAgora escreva sua informação desse dado: ", (valor) => {
                            dados[chave] = valor;

                            const jsonData = JSON.stringify(dados, null, 2);
                            fs.writeFile("dados.json", jsonData, "utf8", (err) => {
                                if (err) {
                                  console.log("Erro ao escrever no arquivo: ", err);
                                  return;
                                }

                                console.log("Dado adicionado:\n", dados, "\n\n");
                                readline.close();
                              }
                            );
                          }
                        );
                      });
                    } else if (Yn == "nao" || Yn == "n" || Yn == "no") {
                      console.log("Beleza! Programa encerrado.");
                      readline.close();
                    } else {
                      console.log("Responda apenas com sim ou não.");
                      readline.close();
                    }
                  }
                );
              });
            }
          );
        });
      } else if (Yn == "nao" || Yn == "n" || Yn == "no") {
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
