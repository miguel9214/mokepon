//Creacion variable globales.
const seccionAtaque = document.getElementById("SelAtaque");
const seccionReiniciar = document.getElementById("reiniciar");
const btnSeleccionar = document.getElementById("btn-seleccionar");
const btnRecargar = document.getElementById("btn-reiniciar");

const seccionMascota = document.getElementById("mascota");
//de esta forma puedo traer si un radio button esta selecionado. debo localizarlo con el id que le asigno
const spanMascotaJugador = document.getElementById("mascotaJugador");

const spanMascotaEnemigo = document.getElementById("mascotaEnemigo");

const spanvidaJugador = document.getElementById("vidaJugador");
const spanvidaEnemigo = document.getElementById("vidaEnemigo");

const seccionResultado = document.getElementById("resultados");
const seccionJugador = document.getElementById("ataqueJugador");
const seccionEnemigo = document.getElementById("ataqueEnemigo");
const contendorMokepones = document.getElementById("opcionMokepones");
const contenedorAtaques = document.getElementById("contenedorAtaques");
const seccionMapa = document.getElementById("verMapa");
const mapa = document.getElementById("mapa");

//creacion de arreglo
let mokepones = [];
let ataqueEnemigo = [];
let mokeponesEnemigos = [];
let ataqueJugador = [];
let jugadorId = null;
let enemigoId = null;
let inputHipodoge;
let inputCapipeo;
let inputRatigueya;
let mascotaJugador;
let ataquesMokeponEnemigo;
let lienzo = mapa.getContext("2d");
let intervalo;
let mapaFondo = new Image();
mapaFondo.src = "./assets/mokemap.png";
let objetoMokepon;
// inyeccion de html desde javaScript por medio de variable la cual contendra la tarjeta
// completa donde trae el objeto mokepon
let btnAtaqueFuego;
let btnAtaqueTierra;
let btnAtaqueAgua;
let botones = [];
let indexAtaqueJugador;
let indexAtaqueEnemigo;
let victoriasJugador = 0;
let victoriasEnemigo = 0;
let opcionAtaques;
let aleatoriosX;
let aleatoriosY;
let alturaBuscada;
let anchoMapa = window.innerWidth - 20;
const anchoMaxMapa = 600;

if (anchoMapa > anchoMaxMapa) {
  anchoMapa = anchoMaxMapa - 20;
}

alturaBuscada = (anchoMapa * 600) / 800;
mapa.width = anchoMapa;
mapa.height = alturaBuscada;

class Mokepon {
  constructor(nombre, foto, vida, fotoMapa, id = null) {
    this.id = id;
    this.nombre = nombre;
    this.foto = foto;
    this.vida = vida;
    this.ataques = [];
    this.ancho = 40;
    this.alto = 40;
    this.x = aleatorio(0, mapa.width - this.ancho);
    this.y = aleatorio(0, mapa.height - this.alto);
    this.mapaFoto = new Image();
    this.mapaFoto.src = fotoMapa;
    this.velocidadX = 0;
    this.velocidadY = 0;
  }

  pintarMokepon() {
    lienzo.drawImage(this.mapaFoto, this.x, this.y, this.ancho, this.alto);
  }
}

let hipodoge = new Mokepon(
  "Hipodoge",
  "./assets/mokepons_mokepon_hipodoge_attack.png",
  5,
  "./assets/hipodoge.png"
);

let capipepo = new Mokepon(
  "Capipepo",
  "./assets/mokepons_mokepon_capipepo_attack.png",
  5,
  "./assets/capipepo.png"
);
let ratigueya = new Mokepon(
  "Ratigueya",
  "./assets/mokepons_mokepon_ratigueya_attack.png",
  5,
  "./assets/ratigueya.png"
);

const hipodogeAtaques = [
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🪨", id: "btn-tierra" },
];

const capipepoAtaques = [
  { nombre: "🪨", id: "btn-tierra" },
  { nombre: "🪨", id: "btn-tierra" },
  { nombre: "🪨", id: "btn-tierra" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💧", id: "btn-agua" },
];

const ratigueyaAtaques = [
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "🔥", id: "btn-fuego" },
  { nombre: "💧", id: "btn-agua" },
  { nombre: "🪨", id: "btn-tierra" },
];

//Hay 2 tipos de objetos, objetos instancias que vienen de una clase con propiedades y obj litalares que son valores dados.

hipodoge.ataques.push(...hipodogeAtaques);

capipepo.ataques.push(...capipepoAtaques);

ratigueya.ataques.push(...ratigueyaAtaques);

// capipepoEnemigo.ataques.push(...capipepoAtaques);

// hipodogeEnemigo.ataques.push(...hipodogeAtaques);

// ratigueyaEnemigo.ataques.push(...ratigueyaAtaques);

mokepones.push(hipodoge, capipepo, ratigueya);

function iniciarJuego() {
  seccionAtaque.style.display = "none";
  seccionMapa.style.display = "none";
  mokepones.forEach((mokepon) => {
    //Traigo el bloque completo el cual se insertara desde el js guardandolo en una variable.
    //los cuales se llaman tamplate literarios
    opcionMokepones = `<input type="radio" name="mascota" id=${mokepon.nombre} />
<label for=${mokepon.nombre} class="tarjetaMokepon">
  <p>${mokepon.nombre}</p>
  <img src=${mokepon.foto} alt=${mokepon.nombre} />
</label>`;

    contendorMokepones.innerHTML += opcionMokepones;

    inputHipodoge = document.getElementById("Hipodoge");
    inputCapipeo = document.getElementById("Capipepo");
    inputRatigueya = document.getElementById("Ratigueya");
  });

  // seccionReiniciar.style.display = "none";
  btnSeleccionar.addEventListener("click", seleccionarMascota);
  //Esta funcion es donde llamo los componentes que tienen accion por medio de eventos. como botones etc

  btnRecargar.addEventListener("click", reiniciarJuego);

  unirseJuego();
}

function seleccionarMascota() {


  //Con innerHTML puedo asignarle el contenido que estara dentro de una etiqueta html.
  if (inputHipodoge.checked) {
    spanMascotaJugador.innerHTML = inputHipodoge.id;
    mascotaJugador = inputHipodoge.id;
  } else if (inputCapipeo.checked) {
    spanMascotaJugador.innerHTML = inputCapipeo.id;
    mascotaJugador = inputCapipeo.id;
  } else if (inputRatigueya.checked) {
    spanMascotaJugador.innerHTML = inputRatigueya.id;
    mascotaJugador = inputRatigueya.id;
  } else {
    alert("Debes seleccionar una de las mascotas");
    //el return detiene la ejecucion del la funcion
    return
  }  
  
  seccionMascota.style.display = "none";

  seleccionarMokepon(mascotaJugador);

  seccionMapa.style.display = "flex";
  iniciarMapa();

  //primero: Debo capturar que personaje fue selecionado
  extraerAtaque(mascotaJugador);
  //segundo: Creo una funcion en donde reciba como parametro el personaje seleccionado
}

//tercero: en la funcion donde recibo el personaje debo recorrer el arreglo y comparo
//el parametro con los elementos del arrlego y cuando encuentre una coincidencia creo una variable en
//y le asigno los ataques que contiene el personaje.
function extraerAtaque(mascotaJugador) {
  let ataques;
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador == mokepones[i].nombre) {
      ataques = mokepones[i].ataques;
    }
  }
  mostrarAtaques(ataques);
}

function mostrarAtaques(ataques) {
  ataques.forEach((ataque) => {
    opcionAtaques = `<button id=${ataque.id} class="botonAtaque BotAtaque">${ataque.nombre}</button>`;
    contenedorAtaques.innerHTML += opcionAtaques;
  });
  btnAtaqueFuego = document.getElementById("btn-fuego");
  btnAtaqueTierra = document.getElementById("btn-tierra");
  btnAtaqueAgua = document.getElementById("btn-agua");

  botones = document.querySelectorAll(".BotAtaque");
}

//Agregar eventos de click a varios botones
function secuenciaAtaque() {
  botones.forEach((boton) => {
    boton.addEventListener("click", (e) => {
      if (e.target.textContent === "🔥") {
        ataqueJugador.push("FUEGO");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else if (e.target.textContent == "💧") {
        ataqueJugador.push("AGUA");
        boton.style.background = "#112f58";
        boton.disabled = true;
      } else {
        ataqueJugador.push("TIERRA");
        boton.style.background = "#112f58";
        boton.disabled = true;
      }
      if (ataqueJugador.length == 5) {
        enviarAtaques();
      }
    });
  });
}

function selecionarEnemigo(enemigo) {
  let selEnemigo = aleatorio(0, mokepones.length - 1);
  //Puedo acceder a un array con su posicion y luego insertar en un html una de las propiedades que viene
  //dentro del array
  spanMascotaEnemigo.innerHTML = enemigo.nombre;
  ataquesMokeponEnemigo = enemigo.ataques;
  secuenciaAtaque();
}

function selAtaqueEnemigo() {
  let aleatAtaqueEnemigo = aleatorio(0, ataquesMokeponEnemigo.length - 1);
  if (aleatAtaqueEnemigo == 0 || aleatAtaqueEnemigo == 1) {
    ataqueEnemigo.push("FUEGO");
  } else if (aleatAtaqueEnemigo == 3 || aleatAtaqueEnemigo == 4) {
    ataqueEnemigo.push("AGUA");
  } else {
    ataqueEnemigo.push("TIERRA");
  }
  iniciarPelea();
}

function iniciarPelea() {
  if (ataqueJugador.length === 5) {
    eleccionGanador();
  }
}

function indexAmbosOponentes(jugador, enemigo) {
  indexAtaqueJugador = ataqueJugador[jugador];
  indexAtaqueEnemigo = ataqueEnemigo[enemigo];
}

function eleccionGanador() {
  clearInterval(intervalo)
  for (let index = 0; index < ataqueJugador.length; index++) {
    if (ataqueJugador[index] === ataqueEnemigo[index]) {
      indexAmbosOponentes(index, index);
      crearMensaje("Empate");
    } else if (
      ataqueJugador[index] === "FUEGO" &&
      ataqueEnemigo[index] === "TIERRA"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanvidaJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "AGUA" &&
      ataqueEnemigo[index] === "FUEGO"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanvidaJugador.innerHTML = victoriasJugador;
    } else if (
      ataqueJugador[index] === "TIERRA" &&
      ataqueEnemigo[index] === "AGUA"
    ) {
      indexAmbosOponentes(index, index);
      crearMensaje("GANASTE");
      victoriasJugador++;
      spanvidaJugador.innerHTML = victoriasJugador;
    } else {
      indexAmbosOponentes(index, index);
      crearMensaje("PERDISTE");
      victoriasEnemigo++;
      spanvidaEnemigo.innerHTML = victoriasEnemigo;
    }
  }

  ganador();
}

function ganador() {
  if (victoriasJugador === victoriasEnemigo) {
    crearMensajeFinal("ESTO FUE UN EMPATE");
  } else if (victoriasJugador > victoriasEnemigo) {
    crearMensajeFinal("GANASTE LA PARTIDA");
  } else {
    crearMensajeFinal("PERDISTE LA PARTIDA");
  }
}

function crearMensaje(resultado) {
  //creacion de elementos html desde javascripts;
  let nuevoJugador = document.createElement("p");
  let nuevoEnemigo = document.createElement("p");

  seccionResultado.innerHTML = resultado;
  nuevoJugador.innerHTML = indexAtaqueJugador;
  nuevoEnemigo.innerHTML = indexAtaqueEnemigo;
  seccionJugador.appendChild(nuevoJugador);
  seccionEnemigo.appendChild(nuevoEnemigo);
  console.log(resultado);
}

function crearMensajeFinal(resultadoFinal) {
  seccionResultado.innerHTML = resultadoFinal;
  seccionReiniciar.style.display = "block";
}
//Funcion para crear numeros aleatorios son un rango minimo y maximo
function aleatorio(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function reiniciarJuego() {
  location.reload();
}

function pintarCanvas() {
  objetoMokepon.x = objetoMokepon.x + objetoMokepon.velocidadX;
  objetoMokepon.y = objetoMokepon.y + objetoMokepon.velocidadY;
  lienzo.clearRect(0, 0, mapa.width, mapa.height);
  lienzo.drawImage(mapaFondo, 0, 0, mapa.width, mapa.height);

  objetoMokepon.pintarMokepon();
  enviarPosicion(objetoMokepon.x, objetoMokepon.y);

  mokeponesEnemigos.forEach(function (mokepon) {
    mokepon.pintarMokepon();
    revisarColision(mokepon);
  });
}

function moverDerecha() {
  objetoMokepon.velocidadX = 5;
}
function moverIzquierda() {
  objetoMokepon.velocidadX = -5;
}

function moverAbajo() {
  objetoMokepon.velocidadY = 5;
}
function moverArriba() {
  objetoMokepon.velocidadY = -5;
}

function detenerMovimiento() {
  objetoMokepon.velocidadX = 0;
  objetoMokepon.velocidadY = 0;
}

function presionarTecla(event) {
  switch (event.key) {
    case "ArrowUp":
      moverArriba();
      break;
    case "ArrowDown":
      moverAbajo();
      break;
    case "ArrowLeft":
      moverIzquierda();
      break;
    case "ArrowRight":
      moverDerecha();
      break;
    default:
      break;
  }
}

function iniciarMapa() {
  objetoMokepon = obtenerMokepon(mascotaJugador);
  console.log(objetoMokepon, mascotaJugador);
  intervalo = setInterval(pintarCanvas, 50);
  window.addEventListener("keydown", presionarTecla);
  window.addEventListener("keyup", detenerMovimiento);
}

function obtenerMokepon() {
  for (let i = 0; i < mokepones.length; i++) {
    if (mascotaJugador == mokepones[i].nombre) {
      return mokepones[i];
    }
  }
}

function revisarColision(enemigo) {
  const arribaEnemigo = enemigo.y;
  const abajoEnemigo = enemigo.y + enemigo.alto;
  const derechaEnemigo = enemigo.x + enemigo.ancho;
  const izquierdaEnemigo = enemigo.x;
  const arribaMascota = objetoMokepon.y;
  const abajoMascota = objetoMokepon.y + objetoMokepon.alto;
  const derechaMascota = objetoMokepon.x + objetoMokepon.ancho;
  const izquierdaMascota = objetoMokepon.x;
  if (
    abajoMascota < arribaEnemigo ||
    arribaMascota > abajoEnemigo ||
    derechaMascota < izquierdaEnemigo ||
    izquierdaMascota > derechaEnemigo
  ) {
    return;
  }
  // alert("hay colision con "+ enemigo.nombre);
  detenerMovimiento();

  clearInterval(intervalo);
  enemigoId = enemigo.id;
  seccionAtaque.style.display = "flex";
  seccionMapa.style.display = "none";
  selecionarEnemigo(enemigo);
}

// Servicios desde el backend

function enviarAtaques() {
  fetch(`http://192.168.90.222:8080/mokepon/${jugadorId}/ataques`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    // aca le enviamos los datos al backend
    body: JSON.stringify({
      ataques: ataqueJugador,
    }),
  });

  intervalo = setInterval(obtenerAtaques, 50);
}

function obtenerAtaques() {
  fetch(`http://192.168.90.222:8080/mokepon/${enemigoId}/ataques`).then(function (
    res
  ) {
    if (res.ok) {
      res.json().
      then(function ({ ataques }) {
        if(ataques.length===5){
          ataqueEnemigo=ataques;
          eleccionGanador();
        }

      });
    }
  });
}

function unirseJuego() {
  fetch("http://192.168.90.222:8080/unirse").then(function (res) {
    if (res.ok) {
      res.text().then(function (respuesta) {
        console.log(respuesta);
        jugadorId = respuesta;
      });
    }
  });
}

function seleccionarMokepon(mascotaJugador) {
  fetch(`http://192.168.90.222:8080/mokepon/${jugadorId}`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    // aca le enviamos los datos al backend
    body: JSON.stringify({
      mokepon: mascotaJugador,
    }),
  });
}

function enviarPosicion(x, y) {
  fetch(`http://192.168.90.222:8080/mokepon/${jugadorId}/posicion`, {
    method: "post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      x,
      y,
    }),
  }).then(function (res) {
    if (res.ok) {
      res.json().then(function ({ enemigos }) {
        console.log(enemigos);
        mokeponesEnemigos = enemigos.map(function (enemigo) {
          const mokeponNombre = enemigo.mokepon.nombre || "";
          let mokeponEnemigo = null;
          if (mokeponNombre === "Hipodoge") {
            mokeponEnemigo = new Mokepon(
              "Hipodoge",
              "./assets/mokepons_mokepon_hipodoge_attack.png",
              5,
              "./assets/hipodoge.png",
              enemigo.id
            );
          } else if (mokeponNombre === "Capipepo") {
            mokeponEnemigo = new Mokepon(
              "Capipepo",
              "./assets/mokepons_mokepon_capipepo_attack.png",
              5,
              "./assets/capipepo.png",
              enemigo.id
            );
          } else if (mokeponNombre === "Ratigueya") {
            mokeponEnemigo = new Mokepon(
              "Ratigueya",
              "./assets/mokepons_mokepon_ratigueya_attack.png",
              5,
              "./assets/ratigueya.png",
              enemigo.id
            );
          }
          mokeponEnemigo.x = enemigo.x;
          mokeponEnemigo.y = enemigo.y;

          return mokeponEnemigo;
        });
      });
    }
  });
}

window.addEventListener("load", iniciarJuego);
