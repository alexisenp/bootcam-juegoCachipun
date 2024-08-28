/***************** CODIGO PARA CAMBIAR IMAGENES DE LAS OPCIONES DE LA CPU ******/
const imagenes = [
  './assets/img/paper.png',
  './assets/img/rock.png',
  './assets/img/scisors.png',
];

let indiceImagen = 0; // Índice inicial de la imagen

// Función para cambiar la imagen
function cambiarImagen() {
  const imgElement = document.getElementById('imagen-rotativa');
  indiceImagen = (indiceImagen + 1) % imagenes.length; // Avanza al siguiente índice, y reinicia a 0 si llega al final
  imgElement.src = imagenes[indiceImagen]; // Cambia la fuente de la imagen
}

// Establecer un intervalo para cambiar la imagen cada 2 segundos (2000 ms)
setInterval(cambiarImagen, 300);

/***************** CODIGO PARA CAMBIAR IMAGENES DE LAS OPCIONES DE LA CPU ******/

/***************** CODIGO PARA QUE SE DESTAQUE LA OPCION QUE SELECCIONE EL USUARIO ******/
// esta variable indicara si el usuario ya selecciono su opcion para que solo se pueda destacar una
var seleccionado = false;

// Seleccionar todos los elementos con la clase opciones__cuadro
const cuadros = document.querySelectorAll('.opciones__cuadro');

cuadros.forEach((cuadro) => {
  cuadro.addEventListener('click', function () {
    if (!seleccionado) {
      this.classList.add('opciones__cuadro--activo');
      seleccionado = true;
    } else {
        alert("Solo puede seleccionar una opcion");
    }
  });
});
