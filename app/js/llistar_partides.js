const mostrarLlistatPartides = () => {
    const partidesBody = document.getElementById('partides-body');
  
    const partidesJugades = JSON.parse(localStorage.getItem('partides')) || [];
  
    let partidesHTML = '';
    partidesJugades.forEach(partida => {
      const dataPartida = new Date();
      const edatJugador = calcularEdatJugador(partida.jugador);

      const tempsMinuts = Math.floor(partida.temps / 60);
      const tempsSegons = partida.temps % 60;
      
      partidesHTML += `
        <tr>
          <td>${partida.jugador}</td>
          <td>${partida.paraula}</td>
          <td>${partida.traduccio}</td>
          <td>${partida.lletresCorrectes}</td>
          <td>${partida.intentsIncorrectes}</td>
          <td>${tempsMinuts} min ${tempsSegons} seg</td>
          <td>${dataPartida.toLocaleDateString()}</td>
          <td>${edatJugador.anys} anys ${edatJugador.dies} dies</td>
        </tr>
      `;
    });
  
    partidesBody.innerHTML = partidesHTML;
  };
  
  const calcularEdatJugador = (nomJugador) => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    const dataNaixement = new Date(currentUser.dataNaixement);
    const avui = new Date();
  
    let anys = avui.getFullYear() - dataNaixement.getFullYear();
    let mesos = avui.getMonth() - dataNaixement.getMonth();
    let dies = avui.getDate() - dataNaixement.getDate();
  
    if (mesos < 0 || (mesos === 0 && dies < 0)) {
      anys--;
      mesos += 12;
      if (dies < 0) {
        const ultimDiaMesAnterior = new Date(
          avui.getFullYear(),
          avui.getMonth(),
          0
        ).getDate();
        dies += ultimDiaMesAnterior;
      }
    }
  
    return { anys, dies };
  };
  
  document.addEventListener('DOMContentLoaded', mostrarLlistatPartides);
  