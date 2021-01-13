//DOM elements
var resultEl = document.querySelector('#result');
var lengthEl = document.querySelector('#length');
var uppercaseEl = document.querySelector('#uppercase');
var lowercaseEl = document.querySelector('#lowercase');
var numbersEl = document.querySelector('#numbers');
var symbolsEl = document.querySelector('#symbols');
var generateEl = document.querySelector('#generate');
var clipboardEl = document.querySelector('#clipboard');


var randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

//Copy password to clipboard option
clipboardEl.addEventListener('click', () => {
  var textarea = document.createElement('textarea');
  var password = resultEl.innerText;

  if(!password) {
      return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  alert('Your new password has been copied to clipboard!');
});

//Generate event listener
generateEl.addEventListener("click", () => {
  var length = +lengthEl.value;
  var hasLower = lowercaseEl.checked;
  var hasUpper = uppercaseEl.checked;
  var hasNumber = numbersEl.checked;
  var hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//Generate PW function
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    var typesCount = lower + upper + number + symbol;
    var typesArr = [{lower},{upper}, {number}, {symbol}].filter(
        item => Object.values(item)[0]
    );

//No selection made so returns blank
    if(typesCount === 0) {
        return '';
    }

    for (let i = 0; i < length; i += typesCount) {
        typesArr.forEach(type => {
          var funcName = Object.keys(type)[0];
          generatedPassword += randomFunc[funcName]();
        });
    }

    var finalPassword = generatePassword.slice(0, length); 

    return finalPassword;
}

// Generator functions -

function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomNumber() {
  return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
  var symbols = ' !#$%&()*+,-./:;<=>?@[]^_`{}~ ';
  return symbols[Math.floor(Math.random() * symbols.length)];
}
