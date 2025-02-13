# Atividade

## mkdir

```js
const fs = require("fs");

fs.mkdir("fs_diretorio", (err) => {
  if (err) throw err;
  console.log("Diretório criado com sucesso!");
});
```

## rmdir

```js
const fs = require("fs");

fs.rmdir("fs_diretorio", (err) => {
  if (err) throw err;
  console.log("Diretório deletado com sucesso.");
});
```

## unlink

```js
const fs = require("fs");

fs.unlink("unlink.txt", (err) => {
  if (err) throw err;
  console.log("Arquivo excluído com sucesso!");
});
```

## rename

```js
const fs = require("fs");

fs.rename("rename.txt", "renomeadoSucesso.txt", (err) => {
  if (err) throw err;
  console.log("Nome alterado com sucesso!");
});
```
