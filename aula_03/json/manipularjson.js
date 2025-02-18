const fs = require("fs");

fs.readFile("dados.json", "utf8", (err, data) => {
  if (err) {
    console.log("Erro ao ler arquivo: ", err);
    return;
  }

  try {
    const dados = JSON.parse(data);

    console.log(dados.nome)
    console.log(dados.endereço.rua);
    console.log(dados.telefones[1]);

    dados.telefones.forEach(telefone => {
        console.log(`\nTelefone: ${telefone}`);
    })
    
  } catch (error) {
    console.log("Erro ao analisar o JSON: ", error);
  }
});
