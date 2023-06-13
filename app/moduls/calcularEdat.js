/*
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
  
    export default calcularEdatJugador;