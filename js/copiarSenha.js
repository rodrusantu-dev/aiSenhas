// Event listener para o botão de cópia
copyButton.addEventListener('click', function () {
  // Obtém o valor do campo de senha
  const password = passwordRead.value;

  
  // Utiliza a API Clipboard para escrever o texto na área de transferência
  navigator.clipboard.writeText(password)
    .then(function () {
      // Exibe a mensagem de "SENHA COPIADA"
      document.getElementById('copiedMessage');

      // Remove a mensagem após 2 segundos
      setTimeout(function () {
        document.getElementById('copiedMessage');
      }, 2000);
    })
    .catch(function (error) {
      // Em caso de erro ao copiar a senha, exibe uma mensagem de erro no console
      console.error('Falha ao copiar a senha:', error);
    });
});
