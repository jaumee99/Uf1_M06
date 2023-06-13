document.addEventListener('DOMContentLoaded', function () {
  const partidesBody = document.getElementById('partides-body');

  // Obtiene las partidas jugadas del localStorage
  const partidesJugades = JSON.parse(localStorage.getItem('partides')) || [];

  // Genera el HTML para mostrar las partidas en una tabla
  let partidesHTML = '';
  partidesJugades.forEach(partida => {
      partidesHTML += `
          <tr>
              <td>${partida.jugador}</td>
              <td>${partida.paraula}</td>
              <td>${partida.traduccio}</td>
              <td>${partida.lletresCorrectes}</td>
              <td>${partida.intentsIncorrectes}</td>
              <td>${partida.temps}</td>
          </tr>
      `;
  });

  // Inserta el HTML en el cuerpo de la tabla
  partidesBody.innerHTML = partidesHTML;
});
