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

    readline.question("Deseja alterar ou adicionar alguma informação? (s/n): ", (Yn) => {
      const respostaLower = Yn.toLowerCase();
      if (respostaLower == "sim" || respostaLower == "yes" || respostaLower == "y" || respostaLower == "s") {
        readline.question("\nQual dado você deseja alterar/adicionar? ", (resposta) => {
          readline.question(
            "Insira a informação quer colocar neste dado: ",
            (valor) => {
              const novaLower = resposta.toLowerCase();

              const dadoInt = isNaN(valor) ? valor : parseInt(valor, 10);
              dados[novaLower] = dadoInt;

              const jsonData = JSON.stringify(dados, null, 2);
              fs.writeFile("dados.json", jsonData, "utf8", (err) => {
                if (err) {
                  console.log("Erro ao escrever no arquivo: ", err);
                  return;
                }

                console.log(`Dado ${resposta} alterado:\n`, dados, "\n\n");
                readline.close()
              });
            }
          );
        });

      } else if (respostaLower == "nao" || respostaLower == "n" || respostaLower == "no" || respostaLower == "não") {

        readline.question('Deseja excluír algum dado? (s/n): ', (Yn) => {
          const respostaLower = Yn.toLowerCase();
          if (respostaLower == "sim" || respostaLower == "yes" || respostaLower == "y" || respostaLower == "s") {
            readline.question("\nQual dado você deseja apagar? ", (chave) => {

              if (dados.hasOwnProperty(chave)) {
                delete dados[chave];
              }

              const jsonData = JSON.stringify(dados, null, 2);
              fs.writeFile("dados.json", jsonData, "utf8", (err) => {
                if (err) {
                  console.log("Erro ao escrever no arquivo: ", err);
                  return;
                }

                console.log(`Dado "${chave}" apagado:\n`, dados, "\n\n");
                readline.close()
              });

            });
          } else {
            console.log("\nResponda apenas com sim ou não.");
            readline.close();
          }
        })
      } else {
        console.log("\nResponda apenas com sim ou não.");
        readline.close();
      }
    });


  } catch {
    console.log(err);
  }
});
