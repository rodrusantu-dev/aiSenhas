

const generateButton = document.querySelector('#button-generatePass');
const copyButton = document.querySelector('#button-copy');
const passwordRead = document.getElementById('password-read');
const custom = document.getElementById('customizable-container');
const switchOptions = document.getElementsByName('switch-option-pass');
const checks = document.getElementsByName('password-caractere');
const length = document.querySelector('#length-password');
const lengthVisor = document.querySelector('#length-password-visor');


//* =================================================================
//*            BLOCO ARRAY NOMES - SENHA BRASILEIRA
//* =================================================================

const musicas = [
  'Brega', 'Bre', 'BrE', 'BrEg', 'Breg', 
  'Meninas', 'ninas', 'Ninas',
  'Carimbo',  'carim',  
  'Lambada', 'Lam', 'bada', 'Lam','ada',
  'Sirimbo', 
  'Guitarrada', 'Guita', 
  'Siria', 'Siri',
  'Tecnobrega', 'Tecno','brega', 'bregoso', 'cha,a',
  'Siria', 'Sir', 'iri', 'ria',
  'Marujada', 'Mar', 'aru', 'ada',
  'Paraense', 'Par', 'ara', 
  'Carimbo', 'Cari', 'carim', 
  'Lundu', 'Lun', 'undU', 
];

const comidasTipicas = [
  'Pato',
  'Tucupi', 'Tucu', 'cupi',
  'Tacaca', 'Taca', 'caca',
  'Manicoba', 'Mani', 'maniva','coba',
  'Acai', ,
  'dogrosso', 'baguda', 'grosso', 'bagu',
  'Macaxeira', 'Maca', 'axe', 'xeia','tuira',
  'Pirarucu', 'Pira', 'racu', 'aru', 'rucu', 'tucu',
  'Tapioca', 'Tapi', 'pioca', 'toca', 'toba',
  'Tucumã', 'Tucu', 'teocu', 'cuma', 'tuma',
  'Vatapa', 'Vait', 'ata', 'tapod', 'tapa',
  'Pupunha', 'Pupu', 'punha', 'puna', 'unha', 'nhanha',
  'Cuia', 'Cui', 'uia',
  'Caranguejo', 'Caran', 'guejo', 
  'camarao', 'cama', 'maraum', 
  'Piracui', 'Pira', 'cui',
  'Chibe', 'Chi', 
  'Cuxa', 
  'broca', 'bro', 
  'brocado', 
  'pirao', 'pira', 'tira', 'rao'
];

const outrosNomes = [
  'Cirio', 'rio',
  'Nazare', 'Naz', 'are',
  'Parintins', 'Pari', 'ari', 
  'Museu', 'seu',
  'Paraense', 'Para',
  'Marajo', 'Mara', 'rajo', 
  'VeroPeso', 'Ver', 'opeso', 
  'Marajoara', 'Mara', 'joara',
  'Brega', 'Bre', 'reg', 'ega',
  'Cacau', 
  'Miriti', 'miri',
  'Ceramica', 'cera', 'icoara', 'icoaraci',
  'Moqueca', 'eca',
];

const nomesIndigenas = [
  'Arua',
  'Jaci',
  'Caua',
  'Yara',
  'Tainara',
  'Juruna',
  'Itacira',
  'Ubirajara',
  'Tupi',
  'Iara',
  'Anahi',
  'Jurema',
  'Piracema',
  'Aruana',
  'Itapema',
  'Jacira',
  'Araci',
  'Tapuia',
  'Maiara',
  'Yara',
  'Ibera',
  'Xingu',
  'Tupinamba',
  'Iriri',
  'Itamaraca'
];

const dicionary = [...musicas, ...comidasTipicas, ...outrosNomes, ...nomesIndigenas];

const simbolos = [
  '!@#',
  '!-+',
  '@++',
  '*:%',
  '[$$]',
  '(*@]',
  '##',
  '@@',
  '!!',
  '--',
  '++',
  '/=',
  '!#$',
  '@*@',
  '-+-',
  '%*&',
  '[[]',
  '*)(',
  '###',
  '@@@',
  '!!!',
  '---',
  '+++',
  '//=',
  '!?$',
  '@_&',
  ':*-',
  '][$',
  '^**',
  '!&&',
  '(*#',
  '%%%',
  '](+',
  '**-',
  '#@#',
  '??+',
  '!@!',
  '---',
  '===',
  '///',
  '...',
  '(@@',
  '$$$',
  '!@*',
  '[!!',
  '+!!',
  '&&&',
  '!@(',
  '?!+',
  '%$@',
  '@#*',
  '!&%',
  '[*]',
  ']/='
];

//* =================================================================
//*                           FIM DO BLOCO
//* =================================================================

// Event listener para o botão "Gerar Senha"
generateButton.addEventListener('click', function () {
  let optionChecked;

  for (let i = 0; i < switchOptions.length; i++) {
    if (switchOptions[i].checked) {
      optionChecked = switchOptions[i].value;
      break;
    }
  }
  if (optionChecked === 'easy-remember') {
    passwordRead.value = easyRemember();
    document.getElementById('password-strength').textContent = ''; // Limpar a exibição da pontuação
  
  } else if (optionChecked === 'brasilian-mode') {
    passwordRead.value = brasilianMode();
    let strength = checkPasswordStrength(passwordRead.value, 'brasilian-mode');
    document.getElementById('password-strength').textContent = 'Pontuação da senha: ' + strength;
  }

  
});


// Função para gerar uma senha fácil de lembrar
function easyRemember() {
  let separator = Math.floor(Math.random() * 999 + 1);
  let index1 = returnIndex(dicionary.length);
  let index2 = returnIndex(dicionary.length);
  let index3 = returnIndex(simbolos.length);
  password = dicionary[index1] + separator + dicionary[index2] + simbolos[index3];



  return password.trim();
}





// Função para retornar um índice aleatório
function returnIndex(length) {
    return Math.floor(Math.random() * length);
}


