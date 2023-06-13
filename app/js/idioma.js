function guardarIdioma() {
    var idioma = document.getElementById('idiomaInput').value;
    localStorage.setItem('idiomas', idioma);
}

window.onload = function() {
    cargarIdiomaLocalStorage();

    var idiomaGuardado = localStorage.getItem('idiomas');
    if (idiomaGuardado) {
        document.getElementById('idiomaInput').value = idiomaGuardado;
    }
}

function cargarIdiomaLocalStorage() {
    var idiomaSelect = document.getElementById('idiomaSelect');
    idiomaSelect.innerHTML = '';

    var idiomas = localStorage.getItem('idiomas');
    if (idiomas) {
        idiomas = idiomas.split(','); 

        for (var i = 0; i < idiomas.length; i++) {
            var option = document.createElement('option');
            option.text = idiomas[i];
            option.value = idiomas[i];
            idiomaSelect.appendChild(option);
        }
    }
}
