const wordInputContainer = document.querySelector('.word-input-container');
const wordContainer = document.querySelector('.word-container');
const randomButton = document.querySelector('.random-button');
const checkButton = document.querySelector('.check-button');
const triesText = document.querySelector('.tries-text');
const mistakesText = document.querySelector('.mistakes-text');
const triesItems = document.querySelectorAll('.tries-counter-item');
import { words } from "./mock.js";

let word = words[Math.floor(Math.random() * words.length)];
let userWord = [];
let tries = 0
wordContainer.textContent = word.split('').sort(() => Math.random() - 0.5).join('');
triesText.textContent = `Tries: ${tries}/5:`
const renderInputs = (word) => {
    wordInputContainer.innerHTML = '';
    word.split('').forEach(letter => {
        const input = document.createElement('input');
        input.setAttribute('maxlength', '1');
        input.setAttribute('type', 'text');
        input.setAttribute('class', 'letter-input');
        wordInputContainer.appendChild(input);
    })
}

mistakesText.textContent = 'Mistakes: ';

renderInputs(word);
randomButton.addEventListener('click', () => {
    word = words[Math.floor(Math.random() * words.length)];
    wordContainer.textContent = word.split('').sort(() => Math.random() - 0.5).join('');
    console.log(word)
    renderInputs(word);
})

checkButton.addEventListener('click', () => {
    userWord = [];
    const mistakeLetter = []
    const inputs = document.querySelectorAll('.letter-input');
    inputs.forEach((item, index) => {
        userWord.push(item.value);
        if(userWord[index] !== word[index]) {
            console.log(word[index])
            mistakeLetter.push(userWord[index])
        }
    })
    mistakesText.textContent = `Mistakes: ${mistakeLetter.join(', ')}`
    if(userWord.join('') === word) {
        alert('You win');
    } else {
        tries++;
        triesText.textContent = `Tries: ${tries}/5:`
        triesItems[tries - 1].classList.add('tries-counter-item--active');
    }
    if(tries === 5) {
        checkButton.setAttribute('disabled', true);
        alert('You lose');
    }
})
