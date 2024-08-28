// guarda la cantidad de veces que se jugaran
let totalJugadas = 0;
let jugadaActual = 1;

let resultados = [];

//guarda el nombre del usuario
let nombre = '';

document
  .getElementById('cachipunForm')
  .addEventListener('submit', function (e) {
    e.preventDefault();
    totalJugadas = parseInt(document.getElementById('rondas').value);
    nombre = document.getElementById('nombre').value;
    //carga la cantidad de jugadas que el usuario selecciono
    actualizarContadorJugadas();

    document.getElementById('ingreso-datos').classList.add('d-none');
    document.getElementById('juego-screen').classList.remove('d-none');
    document.getElementById('nombre-usuario').textContent = nombre;
  });

/***************** CODIGO PARA CAMBIAR IMAGENES DE LAS OPCIONES DE LA CPU ******/
const imagenes = [
  './assets/img/piedra.png',
  './assets/img/papel.png',
  './assets/img/tijeras.png',
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

      jugadaActual++;
      if (jugadaActual <= totalJugadas) {
        //muestra el boton para reiniciar el juego
        document.getElementById(
          'boton-resultado'
        ).innerHTML = `<button id="reiniciar" class="btn btn-primary">Siguiente jugada</button>`;
        // Agrega listener al boton para reiniciar el juego
        document
          .getElementById('reiniciar')
          .addEventListener('click', reiniciarJuego);
      } else {
        // Mostrar mensaje de fin de juego si se alcanzan las jugadas
        document.getElementById('mensajeUsuario').innerHTML =
          '<h3>¡Juego terminado!</h3>';
        //muestra el boton para reiniciar el juego
        document.getElementById(
          'boton-resultado'
        ).innerHTML = `<button id="resultados" class="btn btn-primary">Ver resultados</button>`;
        // Agrega listener al boton para reiniciar el juego
        document
          .getElementById('resultados')
          .addEventListener('click', verResultados);
      }
      let mensaje = determinarGanador(
        eleccionUsuario,
        eleccionCPU
      );
      document.getElementById('mensajeUsuario').textContent = mensaje;
      
      resultados.push({
        jugada: jugadaActual-1,
        usuario: eleccionUsuario,
        cpu: eleccionCPU,
        resultado: mensaje,
      });
    } else {
      alert('Solo puede seleccionar una opcion');
    }
  });
});

function actualizarContadorJugadas() {
  document.getElementById('jugadaActual').textContent = jugadaActual.toString();
  document.getElementById('totalJugadas').textContent = totalJugadas.toString();
}

/***************** FIN CODIGO PARA QUE SE DESTAQUE LA OPCION QUE SELECCIONE EL USUARIO ******/

/***************** INICIO CODIGO PARA SELECCIONAR OPCION DE MAQUINA ******/

function obtenerJugadaMaquina() {
  let jugadas = ['piedra', 'papel', 'tijeras'];
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
    (eleccionUsuario === 'piedra' && eleccionCPU === 'tijeras') ||
    (eleccionUsuario === 'papel' && eleccionCPU === 'piedra') ||
    (eleccionUsuario === 'tijeras' && eleccionCPU === 'papel')
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
  document.getElementById('mensajeUsuario').textContent =
    '¿Cuál será tu próximo movimiento?';
  document.getElementById('boton-resultado').innerHTML = '';

  // Remover la clase activa de todas las opciones
  document.querySelectorAll('.opciones__cuadro').forEach((cuadro) => {
    cuadro.classList.remove('opciones__cuadro--activo');
  });

  // Reiniciar la rotación de imágenes
  intervalId = setInterval(cambiarImagen, 200);
  actualizarContadorJugadas();
};


// Función para agregar una fila a la tabla con los resultados
const verResultados = () => {
    document.getElementById('juego-screen').classList.add('d-none');
    document.getElementById('tablaResultados').classList.remove('d-none');
    const tablaBody = document.getElementById('resultadosBody');
    tablaBody.innerHTML = ''; // Limpia la tabla antes de actualizarla

    resultados.forEach((resultado, index) => {
        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${resultado.jugada}</td>
            <td>${resultado.usuario}</td>
            <td>${resultado.cpu}</td>
            <td>${resultado.resultado}</td>
        `;

        tablaBody.appendChild(fila);
    });
};

document.getElementById('reiniciarJuego').addEventListener('click', function() {
    location.reload(); // Recarga la página para reiniciar el juego
});
