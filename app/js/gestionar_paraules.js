document.addEventListener('DOMContentLoaded', function() {
    const addWordForm = document.getElementById('add-word-form');
    const newWordInput = document.getElementById('new-word');
    const newTranslationInput = document.getElementById('new-translation');
    const wordTableBody = document.getElementById('word-table-body');
  
    addWordForm.addEventListener('submit', function(event) {
      event.preventDefault();
  
      const newWord = newWordInput.value.trim().toLowerCase();
      const newTranslation = newTranslationInput.value.trim().toLowerCase();
      
      if (!isValidWord(newWord) || !isValidWord(newTranslation)) {
        alert('La paraula o la traducció no són vàlides.');
        return;
      }
  
      const existingWords = JSON.parse(localStorage.getItem('words')) || [];
      existingWords.push({ paraula: newWord, traduccio: newTranslation });
      localStorage.setItem('words', JSON.stringify(existingWords));
  
      alert('La paraula i la traducció s\'han afegit amb èxit.');
      addWordForm.reset();
  
      displayWords();
    });
  
    function isValidWord(word) {
      const validCharacters = /^[a-zA-Z]+$/;
      return !/\s/.test(word) && validCharacters.test(word);
    }
  
    function displayWords() {
      const existingWords = JSON.parse(localStorage.getItem('words')) || [];
      
      // Limpiar el cuerpo de la tabla
      wordTableBody.innerHTML = '';
  
      // Agregar las palabras guardadas en el localStorage
      existingWords.forEach(word => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${word.paraula}</td>
          <td>${word.traduccio}</td>
        `;
        wordTableBody.appendChild(row);
      });
  
      fetch('../data/diccionari.json')
        .then(response => response.json())
        .then(data => {
          const words = data.paraules;
          words.forEach(word => {
            const row = document.createElement('tr');
            row.innerHTML = `
              <td>${word.paraula}</td>
              <td>${word.traduccio}</td>
            `;
            wordTableBody.appendChild(row);
          });
        })
        .catch(error => {
          console.log('Error en cargar el archivo JSON:', error);
        });
    }
  
    displayWords();
  });
  