/***************** CODIGO PARA CAMBIAR IMAGENES DE LAS OPCIONES DE LA CPU ******/
const imagenes = [
  './assets/img/rock.png',
  './assets/img/paper.png',
  './assets/img/scissors.png',
];

let indiceImagen = 0; // Índice inicial de la imagen

// Función para cambiar la imagen
function cambiarImagen() {
  const imgElement = document.getElementById('imagen-rotativa');
  indiceImagen = (indiceImagen + 1) % imagenes.length; // Avanza al siguiente índice, y reinicia a 0 si llega al final
  imgElement.src = imagenes[indiceImagen]; // Cambia la fuente de la imagen
}

// Establecer un intervalo para cambiar la imagen cada 2 segundos (2000 ms)
var intervalId = setInterval(cambiarImagen, 200);

/***************** CODIGO PARA CAMBIAR IMAGENES DE LAS OPCIONES DE LA CPU ******/

/***************** INICIO CODIGO PARA QUE SE DESTAQUE LA OPCION QUE SELECCIONE EL USUARIO ******/
// esta variable indicara si el usuario ya selecciono su opcion para que solo se pueda destacar una
var seleccionado = false;

// Esta variable almacenará la elección del usuario
var eleccionUsuario = null;

// Esta variable almacenará la elección de la CPU
var eleccionCPU = null;

// Seleccionar todos los elementos con la clase opciones__cuadro
const cuadros = document.querySelectorAll('.opciones__cuadro');

cuadros.forEach((cuadro) => {
  cuadro.addEventListener('click', function () {
    if (!seleccionado) {
      this.classList.add('opciones__cuadro--activo');
      eleccionUsuario = this.getAttribute('data-option');
      seleccionado = true;
      eleccionCPU = obtenerJugadaMaquina();
      // detiene el cambio de imagen en la opcion de la maquina
      clearInterval(intervalId);
    //muestra el boton para reiniciar el juego
      document.getElementById('boton-resultado').innerHTML = `<button id="reiniciar" class="btn btn-primary">Reiniciar Juego</button>`;
    
    // Agrega listener al boton para reiniciar el juego
    document.getElementById('reiniciar').addEventListener('click', reiniciarJuego);

      const resultadoTexto = document.getElementById('resultado');
      resultadoTexto.textContent = determinarGanador(
        eleccionUsuario,
        eleccionCPU
      );
    } else {
      alert('Solo puede seleccionar una opcion');
    }
  });
});

/***************** FIN CODIGO PARA QUE SE DESTAQUE LA OPCION QUE SELECCIONE EL USUARIO ******/

/***************** INICIO CODIGO PARA SELECCIONAR OPCION DE MAQUINA ******/

function obtenerJugadaMaquina() {
  let jugadas = ['rock', 'paper', 'scissors'];
  let indice = Math.floor(Math.random() * 3);

  //setea la imagen elegida al azar en el cuadro de la imagen rotativa
  const imgElement = document.getElementById('imagen-rotativa');
  console.log(indice);
  imgElement.src = imagenes[indice];

  return jugadas[indice];
}

/***************** FIN CODIGO PARA SELECCIONAR OPCION DE MAQUINA ******/

function determinarGanador(eleccionUsuario, eleccionCPU) {
  console.log(eleccionUsuario);
  console.log(eleccionCPU);

  if (eleccionUsuario === eleccionCPU) {
    return 'Es un empate!';
  } else if (
    (eleccionUsuario === 'rock' && eleccionCPU === 'scissors') ||
    (eleccionUsuario === 'paper' && eleccionCPU === 'rock') ||
    (eleccionUsuario === 'scissors' && eleccionCPU === 'paper')
  ) {
    return '¡Felicidades, ganaste!';
  } else {
    return 'Lo siento, perdiste.';
  }
}

const reiniciarJuego = () => {
    seleccionado = false;
    eleccionUsuario = null;
    eleccionCPU = null;
    indiceImagen = 0;
  
    // Reiniciar el contenido del cuadro de resultado
    document.getElementById('resultado').textContent = 'Elije tu jugada';
    document.getElementById('boton-resultado').innerHTML = '';
  
    // Remover la clase activa de todas las opciones
    document.querySelectorAll('.opciones__cuadro').forEach(cuadro => {
      cuadro.classList.remove('opciones__cuadro--activo');
    });
  
    // Reiniciar la rotación de imágenes
    intervalId = setInterval(cambiarImagen, 200);
  };