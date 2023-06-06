
// Event listener para os botões de opção
switchOptions.forEach(switchOption => {
  switchOption.addEventListener('click', () => {
    custom.classList.toggle('show', switchOption.value === 'pass-hash');
  });
});

// Event listener para a carga da janela
window.addEventListener('load', function () {
  lengthVisor.textContent = length.value;
});

// Event listener para alterações no elemento length
length.addEventListener('input', function () {
  lengthVisor.textContent = length.value;
});
