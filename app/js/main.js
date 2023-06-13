document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('login-form');
  loginForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    fetch('data/users.json')
      .then(response => response.json())
      .then(data => {
        const users = data.users;

        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
          if (user.username === 'admin') {
            window.location.href = "./pagines/menuAdmin.html";
          } else {
            window.location.href = "./pagines/menu.html";
          }
          console.log('Sessió iniciada:', user);

          localStorage.setItem('currentUser', JSON.stringify(user));
        } else {
          console.log('Credencials incorrectes');
        }
      })
      .catch(error => {
        console.log('Error en carregar el fitxer JSON:', error);
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  // Esborrar 'currentUser' del LocalStorage
  localStorage.removeItem('currentUser');
});
