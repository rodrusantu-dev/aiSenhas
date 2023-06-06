const generateButton = document.querySelector('#button-generatePass');
const copyButton = document.querySelector('#button-copy');
const passwordRead = document.getElementById('password-read');
const custom = document.getElementById('customizable-container');
const switchOptions = document.getElementsByName('switch-option-pass');
const checks = document.getElementsByName('password-caractere');
const length = document.querySelector('#length-password');
const lengthVisor = document.querySelector('#length-password-visor');

// Constantes contendo caracteres para diferentes categorias
const alphaNumbers = '5983016742';
const alphaUpper = 'ZHAQWBNMCVKJERTYUIOÇLXGFDSP';
const alphaLower = 'qçlkjpoiuytrewhgfdsamnbvcxz';
const alphaSymbols = '&()_+#$-={}[];\~!@%^|/';

// Arrays contendo os caracteres correspondentes a cada categoria
const arrayNumbers = alphaNumbers.split('');
const arrayLower = alphaLower.split('');
const arraySymbols = alphaSymbols.split('');
const arrayUpper = alphaUpper.split('');
const arrayAmbiguous = ['I', 'l', 'O', '0'];

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
  } else if (optionChecked === 'only-number') {
    passwordRead.value = randomNumber();
    let strength = checkPasswordStrength(passwordRead.value, 'only-number');
    document.getElementById('password-strength').textContent = 'Pontuação da senha: ' + strength;
  } else if (optionChecked === 'pass-hash') {
    let _symbols = false;
    let _upper = false;
    let _lower = false;
    let _number = false;

    for (let i = 0; i < checks.length; i++) {
      if (checks[i].checked) {
        switch (checks[i].value) {
          case 'uppercase':
            _upper = true;
            break;
          case 'lowercase':
            _lower = true;
            break;
          case 'numbers':
            _number = true;
            break;
          case 'symbols':
            _symbols = true;
            break;
        }
      }
    }

    passwordRead.value = randomHash(_number, _upper, _lower, _symbols, length.value);
    let strength = checkPasswordStrength(passwordRead.value, 'pass-hash');
    document.getElementById('password-strength').textContent = 'Pontuação da senha: ' + strength;
  } else if (optionChecked === 'brasilian-mode') {
    passwordRead.value = brasilianMode();
    let strength = checkPasswordStrength(passwordRead.value, 'brasilian-mode');
    document.getElementById('password-strength').textContent = 'Pontuação da senha: ' + strength;
  }

  
});

// Função para gerar uma senha aleatória
function randomHash(numbers, uppercase, lowercase, symbols, length) {
    let alphabet = [];

    if (numbers) {
      alphabet = alphabet.concat(arrayNumbers.filter((num) => !arrayAmbiguous.includes(num)));
    }
    if (uppercase) {
      alphabet = alphabet.concat(arrayUpper);
    }
    if (lowercase) {
      alphabet = alphabet.concat(arrayLower);
    }
    if (symbols) {
      alphabet = alphabet.concat(arraySymbols);
    }

    let password = '';
    for (let i = 0; i < length; i++) {
      let index = returnIndex(alphabet.length);
      password += alphabet[index];
    }
    return password;
}

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

// Função auxiliar para verificar os critérios de força da senha e incrementar a pontuação
function checkCriteria(password, criteria, strength) {
  for (const criterion of criteria) {
    if (criterion.regex.test(password)) {
      strength += criterion.score;
    }
  }
  return strength;
}

// Função para verificar a força da senha
function checkPasswordStrength(password, category) {
  let strength = 0;

// Critérios de força da senha e suas pontuações
const criteria = [
    { name: 'length', regex: /.{8,}/, score: 1 },
    { name: 'uppercase', regex: /[A-Z]/, score: 1 },
    { name: 'lowercase', regex: /[a-z]/, score: 1 },
    { name: 'numbers', regex: /\d/, score: 1 },
    { name: 'symbols', regex: /[!@#$%^&*()\-_=+{};:,<.>]/, score: 1 },
    { name: 'brazilian', regex: /[áàâãéèêíïóôõöúçñ]/i, score: 1 }
];

  if (category === 'only-number') {
    strength = checkCriteria(password, [criteria[0], criteria[3]], strength);
  } else if (category === 'pass-hash') {
    strength = checkCriteria(password, [criteria[0], criteria[1], criteria[2], criteria[3], criteria[4]], strength);
  } else if (category === 'brasilian-mode') {
    strength = checkCriteria(password, [criteria[0], criteria[1], criteria[2], criteria[3], criteria[4]], strength);
  }

// Retornar a pontuação final da senha
return strength;
}

