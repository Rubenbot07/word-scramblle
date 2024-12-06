const wordInputContainer = document.querySelector('.word-input-container');
const word = ['r', 'e', 'l', 'o', 'w', 'f'];

word.forEach(letter => {
    const input = document.createElement('input');
    input.setAttribute('maxlength', '1');
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'letter-input');
    wordInputContainer.appendChild(input);
})