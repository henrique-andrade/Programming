function testeFinal(texto, numero) {
  let resultado = "";
  switch (texto) {
    case "mundojs":
      console.log("MundoJS");
      resultado = numero;
      break;
    case "soma":
      resultado = numero/2 + numero*numero;
      break;
    case "vetor":
      let vetor = [];
      for (let i = 0; i< 5; i++) {
        vetor[i] = numero + (i * 2);
      }
      resultado = vetor;
      break;
    case "booleano":
      let array = [];
      let total = 0;
      for (let i = 0; i < 5; i++) {
        array[i] = numero + (i * 2);             
        total = total + array[i];
      }
      resultado = total > 35;
      break;
    default:
      resultado = -1;
  }
  return resultado;
}

testeFinal("soma", 2);
