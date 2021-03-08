import 'bootstrap';
import Swal from 'sweetalert2/dist/sweetalert2';

var resultField = document.getElementById('pass-result');
var copyBtn = document.getElementById('copy-button');
var passLength = document.getElementById('pass-length');
var inclUppercase = document.getElementById('include-uppercase');
var inclLowercase = document.getElementById('include-lowercase');
var inclNumber = document.getElementById('include-number');
var inclSymbol = document.getElementById('include-symbol');
var generateBtn = document.getElementById('generate-btn');

// * functions
function getRandomLowercase() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUppercase() {
	return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
	return +String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
	var symbols = '!@#$%^&*(){}[]=<>/,.-_';
	return symbols[Math.floor(Math.random() * symbols.length)];
}
// * end functions

var randomFunc = {
	lower  : getRandomLowercase,
	upper  : getRandomUppercase,
	number : getRandomNumber,
	symbol : getRandomSymbol
};

copyBtn.addEventListener('click', function() {
	var password = resultField.value;

	if (!password) {
		return;
	}

	resultField.value = password;
	resultField.select();
	document.execCommand('copy');
	resultField.value = '';

	Swal.fire('OK!', 'Password copied', 'success');
});

// * generating password
generateBtn.addEventListener('click', function() {
	var length = +passLength.value;
	var hasLower = inclLowercase.checked;
	var hasUpper = inclUppercase.checked;
	var hasNumber = inclNumber.checked;
	var hasSymbol = inclSymbol.checked;
	resultField.value = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});
// ? end generate password

// * generate password function
function generatePassword(lower, upper, number, symbol, length) {
	var generatedPassword = '';
	var typesCount = lower + upper + number + symbol;
	var typesArr = [
		{
			lower : lower
		},
		{
			upper : upper
		},
		{
			number : number
		},
		{
			symbol : symbol
		}
	].filter(function(item) {
		return Object.values(item)[0];
	}); // Doesn't have a selected type

	if (typesCount === 0) {
		return '';
	} // create a loop for password generating

	for (var i = 0; i < length; i += typesCount) {
		typesArr.forEach(function(type) {
			var funcName = Object.keys(type)[0];
			generatedPassword += randomFunc[funcName]();
		});
	}

	var finalPassword = generatedPassword.slice(0, length);
	return finalPassword;
}
// ? end password generate function
