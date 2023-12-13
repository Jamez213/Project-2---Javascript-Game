const inputs = document.querySelector(".inputs"),
resetBtn= document.querySelector(".reset-btn"),
hint= document.querySelector(".hint span"),
guessLeft= document.querySelector(".guest-left span"),
wrongLetter= document.querySelector(".wrong-letter span"),
typingInput= document.querySelector(".typing-input");

let word, maxGuesses, corrects = [], incorrects = [];

function randomWord() {
    //getting random object from [wordList.js]
    let ranObj = wordList[Math.floor(Math.random() * wordList.length)];
    word = ranObj.word; //getting word of random object
    maxGuesses = 8; corrects = []; incorrects = [];
    console.log(word);

    hint.innerText = ranObj.hint
    guessLeft.innerText = maxGuesses
    wrongLetter.innerText = incorrects;

    let html = "";
    for (let i = 0; i < word.length; i++) {
        html += `<input type="text" disabled>`;
    }
    inputs.innerHTML = html;
}
randomWord();


function initGame(e) {
    let key = e.target.value;
    if(key.match(/^[A-Za-z]+$/) && !incorrects.includes(`${key}`)
        && !corrects.includes(key) ) {
        console.log(key);
        if(word.includes(key)) { // if user letter found in the word
            for (let i = 0; i < word.length; i++) {
                //showing matched letter in the input value
                if (word[i] === key) {
                    corrects.push(key);
                    inputs.querySelectorAll("input")[i].value = key;  
                }  
            }
        } else {
            maxGuesses--; // decrement maxGueses by 1
            incorrects.push(` ${key}`);
        }
        guessLeft.innerText = maxGuesses;
        wrongLetter.innerText = incorrects;
    }
    typingInput.value = "";

    if(maxGuesses < 1) { // if user couldn't found all letters
        alert ("Game over! You don't have remaining guesses");
        for (let i = 0; i < word.length; i++) {
            //showing matched letter in the input value
            inputs.querySelectorAll("input")[i].value = word[i];  
        }
    }
}

resetBtn.addEventListener("click",randomWord);
typingInput.addEventListener("input", initGame);
document.addEventListener("keydown", () => typingInput.focus());