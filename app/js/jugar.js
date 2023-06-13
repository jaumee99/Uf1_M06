document.addEventListener('DOMContentLoaded', function () {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const playerNameInput = document.getElementById('player-name');
    const playButton = document.getElementById('play-button');
    const selectedWordElement = document.getElementById('selected-word');
    const paraula = document.getElementById('paraula');
    const correctLettersElement = document.getElementById('correct-letters');
    const wrongAttemptsElement = document.getElementById('wrong-attempts');
    const timeElement = document.getElementById('time');

    let selectedWord = '';
    let shuffledLetters = [];
    let paraulaSeleccionada = '';
    let correctLetters = '';
    let wrongAttempts = 0;
    let startTime = 0;
    let timerInterval = null;

    function startGame() {
        const playerName = playerNameInput.value;
        const currentUser = JSON.parse(localStorage.getItem('currentUser'));
        const userBirthDate = new Date(currentUser.dataNaixement);
        const today = new Date();
        const userAge = today.getFullYear() - userBirthDate.getFullYear();

        if (playerName.length < 2) {
            alert('El nom del jugador ha de tenir com a mínim 2 lletres.');
            return;
        }

        fetch('../data/diccionari.json')
            .then(response => response.json())
            .then(data => {
                const words = data.paraules;

                let filteredWords = words;

                if (userAge < 8) {
                    filteredWords = words.filter(word => word.traduccio.length <= 6);
                }

                const randomIndex = Math.floor(Math.random() * filteredWords.length);
                const word = filteredWords[randomIndex];
                selectedWord = word.traduccio.toLowerCase();
                selectedWordElement.textContent = selectedWord;

                paraulaSeleccionada = word.paraula.toLowerCase();
                paraula.textContent = paraulaSeleccionada;

                shuffledLetters = shuffleLetters(selectedWord);

                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.font = '30px Arial';
                const letterWidth = 40;
                let x = 20;
                for (let i = 0; i < shuffledLetters.length; i++) {
                    const letter = shuffledLetters[i];
                    ctx.fillText(letter, x, 100);
                    x += letterWidth;
                }

                correctLetters = '';
                wrongAttempts = 0;
                correctLettersElement.textContent = '';
                wrongAttemptsElement.textContent = '0';
                startTime = Date.now();
                timeElement.textContent = '0';

                clearInterval(timerInterval);
                timerInterval = setInterval(updateTimer, 1000);
            })
            .catch(error => {
                console.log('Error en cargar el archivo JSON:', error);
            });
    }

    function updateTimer() {
        const currentTime = Math.floor((Date.now() - startTime) / 1000);
        timeElement.textContent = currentTime;
    }

    function handleLetterClick(event) {
        const rect = canvas.getBoundingClientRect();
        const scaleX = canvas.width / rect.width;
        const scaleY = canvas.height / rect.height;
        const clickedX = (event.clientX - rect.left) * scaleX;
        const clickedY = (event.clientY - rect.top) * scaleY;

        const letterWidth = 40;
        const letterHeight = 40;

        const letterIndex = Math.floor(clickedX / letterWidth);

        if (letterIndex >= 0 && letterIndex < shuffledLetters.length) {
            const clickedLetter = shuffledLetters[letterIndex];
            console.log('S\'ha apretat la lletra:', clickedLetter);

            if (correctLetters.includes(clickedLetter)) {
                wrongAttempts++;
                wrongAttemptsElement.textContent = wrongAttempts;
                console.log('La lletra ja ha estat seleccionada');
                return;
            }

            if (selectedWord.includes(clickedLetter)) {
                correctLetters += clickedLetter;
                correctLettersElement.textContent = correctLetters;

                if (correctLetters.length === selectedWord.length) {
                    clearInterval(timerInterval);
                    alert('Has Guanyat!!!');
                    guardarPartida(playerNameInput.value, selectedWord, correctLetters, wrongAttempts, timeElement.textContent);
                }
            } else {
                wrongAttempts++;
                wrongAttemptsElement.textContent = wrongAttempts;

                const maxAttempts = 5;
                if (wrongAttempts === maxAttempts) {
                    clearInterval(timerInterval);
                    alert('Has superat els intents màxims. Has perdut la partida.');
                    guardarPartida(playerNameInput.value, selectedWord, correctLetters, wrongAttempts, timeElement.textContent);
                }
            }

            ctx.clearRect(letterIndex * letterWidth, 0, letterWidth, letterHeight);
        }
    }

    const shuffleButton = document.getElementById('shuffle-button');
    shuffleButton.addEventListener('click', shuffleLettersCanvas);

    function shuffleLettersCanvas() {
        shuffledLetters = shuffleLetters(selectedWord);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.font = '30px Arial';
        const letterWidth = 40;
        let x = 20;
        for (let i = 0; i < shuffledLetters.length; i++) {
            const letter = shuffledLetters[i];
            ctx.fillText(letter, x, 100);
            x += letterWidth;
        }
    }

    function shuffleLetters(word) {
        const lettersArray = word.split('');
        const shuffledArray = [];
        while (lettersArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * lettersArray.length);
            const randomLetter = lettersArray.splice(randomIndex, 1)[0];
            shuffledArray.push(randomLetter);
        }
        return shuffledArray;
    }

    playButton.addEventListener('click', startGame);
    canvas.addEventListener('click', handleLetterClick);

    function guardarPartida(jugador, paraula, lletresCorrectes, intentsIncorrectes, temps) {
        const partida = {
            jugador: jugador,
            paraula: paraula,
            traduccio: selectedWord,
            lletresCorrectes: lletresCorrectes,
            intentsIncorrectes: intentsIncorrectes,
            temps: temps
        };

        const partidesJugades = JSON.parse(localStorage.getItem('partides')) || [];

        partidesJugades.push(partida);

        localStorage.setItem('partides', JSON.stringify(partidesJugades));
    }
});
