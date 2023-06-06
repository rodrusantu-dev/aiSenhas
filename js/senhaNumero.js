  // Função para gerar um número aleatório
  function randomNumber() {
    const random = Math.random() * Math.random();
    const number = random.toString().slice(2);
    return parseInt(number);
  }