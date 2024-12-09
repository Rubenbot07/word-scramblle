const gameContainer = document.querySelector('.game-container')
const wordInputContainer = document.querySelector('.word-input-container');
const wordContainer = document.querySelector('.word-container');
const randomButton = document.querySelector('.random-button');
const checkButton = document.querySelector('.check-button');
const triesText = document.querySelector('.tries-text');
const mistakesText = document.querySelector('.mistakes-text');
const triesItems = document.querySelectorAll('.tries-counter-item');
const modal = document.querySelector('.modal')
const modalMessage = document.querySelector('.modal-message')
const restartGameButton = document.querySelector('.restart-button')
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
renderInputs(word);
const randomWord = () => {
    word = words[Math.floor(Math.random() * words.length)];
    wordContainer.textContent = word.split('').sort(() => Math.random() - 0.5).join('');
    renderInputs(word);
}

const checkAnswer = () => {
    userWord = [];
    const mistakeLetter = []
    const inputs = document.querySelectorAll('.letter-input');
    inputs.forEach((item, index) => {
        userWord.push(item.value);
        if(userWord[index] !== word[index] && !userWord.includes('')) {
            mistakeLetter.push(userWord[index])
        }
    })
    mistakesText.textContent = `Mistakes: ${mistakeLetter.join(',')}`
    if(userWord.join('') === word) {
        modal.classList.remove('inactive')
        gameContainer.classList.add('inactive')
        modalMessage.innerHTML = 'Congratulations 🎉🎉🎉<br>You Win!!!'
    } 
    if(userWord.join('') !== word) {
        tries++;
        triesText.textContent = `Tries: ${tries}/5:`
        triesItems[tries - 1].classList.add('tries-counter-item--active');
    }
    if(tries === 5) {
        checkButton.setAttribute('disabled', true);
        gameContainer.classList.add('inactive')
        modal.classList.remove('inactive')
        modalMessage.innerHTML = 'You lose 😞😞😞<br>Try again'
    }
}

const restartGame = () => {
    gameContainer.classList.remove('inactive')
    modal.classList.add('inactive')
    triesItems.forEach(item => item.classList.remove('tries-counter-item--active'))
    tries = 0
    triesText.textContent = 'Tries: 0/5'
    checkButton.removeAttribute('disabled');
    randomWord()
}
randomButton.addEventListener('click', randomWord)
checkButton.addEventListener('click', checkAnswer)
restartGameButton.addEventListener('click', restartGame)