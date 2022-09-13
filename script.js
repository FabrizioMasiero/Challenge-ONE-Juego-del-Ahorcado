document.querySelector(".section2").style.display="none";
document.querySelector(".section3").style.display="none";
var btn_inic = document.getElementById("boton_inic");
var btn_add = document.getElementById("boton_add");
var btn_agregar = document.getElementById("boton_agregar");
var menu = document.getElementById("menu");
const palabras = ["LORO", "PERRO", "BOTELLA", "TRABAJO", "CAMION", "CELULAR","BEBE","CASA","PELADO","CAMA","MUEBLE","LAPICERA","CORDOBA","PAIS","SAPO","CUADRO","BARCO","PAPEL",];
var textInput = document.querySelector(".input");
var pantalla = document.querySelector("#canvas");
var pincel = pantalla.getContext("2d");
const letrasAcertadas = document.querySelector(".letras_acertadas");
const letrasUsadas = document.querySelector(".letras_usadas");
var btn_restar = document.querySelector(".btn-jugarNuevo");
var btn_salir = document.querySelector(".btn-salir");
var btn_salirn = document.querySelector(".btn-salirn");
var footer = document.querySelector("footer");
var cant_palabras = document.querySelector(".cant-palabras"); 

//
var tecladoPantalla = document.querySelector(".teclado-pantalla");
var teclado = document.querySelector(".teclado");
var listaTeclas = document.querySelectorAll(".key");


//
cant_palabras.innerHTML = "Hay una cantidada de " + palabras.length + " palabras";

footer.setAttribute("class","footer1");

adivinadas = [];
erradas = [];
estado = 0;
contadorAciertos = 0;


function cambiarMenu(){
    document.querySelector(".section1").style.display="block";
    document.querySelector(".section2").style.display="none";
    document.querySelector(".section3").style.display="none";
    
    adivinadas = [];
    erradas = [];
    estado = 0;
    contadorAciertos = 0;
    window.removeEventListener(`keyup`, captuarLetras);
    ocultarTeclado()
    footer.setAttribute("class","footer1")
}
function cambiarAgregrar(){
    document.querySelector(".section1").style.display="none";
    document.querySelector(".section2").style.display="block";
    
    adivinadas = [];
    erradas = [];
    estado = 0;
    contadorAciertos = 0;
    window.removeEventListener(`keyup`, captuarLetras);

    footer.setAttribute("class","footer2")
    ocultarTeclado();

}
function cambiarIniciar(){
    document.querySelector(".section1").style.display="none";
    document.querySelector(".section3").style.display="block";
    footer.setAttribute("class","footer3")

    pincel.clearRect(0,0,1200,350);

    pincel.fillStyle = "black";
    pincel.fillRect(500,30,10,300)
    pincel.fillRect(400,330,300,10)
    pincel.fillRect(500,30,180,10)
    pincel.fillRect(670,30,10,50)

    adivinadas = [];
    erradas = [];
    estado = 0;
    contadorAciertos = 0;
    
    aleatorio = palabras[Math.floor(Math.random()* palabras.length)];

    console.log(aleatorio)

    window.addEventListener(`keyup`, captuarLetras);
    window.addEventListener(`keydown`, activarTeclas);

    teclado.onclick = mostrarTeclado;
    habilitarTeclas();
    activarTeclas();
    Graficar();
}
function agregarPalabra(){
    palabra = textInput.value
    palabraM = palabra.toUpperCase();
    if(palabra.length > 2 && palabra.length < 8 ){
        if(palabras.includes(palabraM) !== true){
            palabras.push(palabraM);
            Swal.fire({
                title: "Palabra Agregada",
                text: "la palabra fue agregada con exito",
                icon: "success",
                with: "30%",
                timer: "3000",
                showConfirmButton: false    
            })
        }else{
            Swal.fire({
                title: "Palabra Repetida",
                text: "Esta Palabra ya esta incluida",
                icon: "error",
                with: "30%",
                timer: "3000",
                showConfirmButton: false    
            })
        }
    }else{
        Swal.fire({
            title: "Palabra Incorrecta",
            text: "Verifique si esta bien escrita",
            icon: "error",
            with: "30%",
            timer: "3000",
            showConfirmButton: false    
        })
    }
    cant_palabras.innerHTML = "Hay una cantidada de " + palabras.length + " palabras";
    textInput.value="";
}

function Graficar() {


    if (letrasAcertadas.hasChildNodes()) {
        while (letrasAcertadas.childNodes.length >= 1) {
            letrasAcertadas.removeChild(letrasAcertadas.firstChild);
        }
    }

    if (letrasUsadas.hasChildNodes()) {
        while (letrasUsadas.childNodes.length >= 1) {
            letrasUsadas.removeChild(letrasUsadas.firstChild);
        }
    }
    contadorAciertos = 0;
    switch(estado){
        case 1:
            pincel.fillStyle = "#7ba03a";
            pincel.beginPath();
            pincel.arc(675, 100, 20, 0 , 2 * Math.PI);
            pincel.fill();
            pincel.fillStyle = "#74cab8";
            pincel.beginPath();
            pincel.arc(675, 100, 15, 0 , 2 * Math.PI);    
            pincel.fill();
        break;
        case 2:
            pincel.fillStyle = "#7ba03a";
            pincel.fillRect(672,120,5,90);
        break;
        case 3:
            pincel.strokeStyle = "#7ba03a";
            pincel.beginPath();
            pincel.lineWidth = 5;
            pincel.moveTo(675, 120);
            pincel.lineTo(720, 115);
            pincel.stroke();
            pincel.fill();
        break;
        case 4:
            pincel.beginPath();
            pincel.lineWidth = 4;
            pincel.moveTo(675, 120);
            pincel.lineTo(630, 115);
            pincel.stroke();
            pincel.fill();
        break;
        case 5:
            pincel.beginPath();
            pincel.lineWidth = 4;
            pincel.moveTo(675, 210);
            pincel.lineTo(715, 250);
            pincel.stroke();
            pincel.fill();
        break;
        case 6:
            pincel.beginPath();
            pincel.lineWidth = 4;
            pincel.moveTo(675, 210);
            pincel.lineTo(630, 250);
            pincel.stroke();
            pincel.fill();
        break;
    }
    /*generacion letras adivinadas*/

    for (let letra of aleatorio) {
        let span = document.createElement(`span`);
        let texto = document.createTextNode(``);



        if (adivinadas.indexOf(letra) >= 0) {
            texto.nodeValue = letra;
            contadorAciertos++;

        }
        span.setAttribute(`class`, `acertadas`);
        span.appendChild(texto)
        letrasAcertadas.appendChild(span);
    }

    /*generacion letras erradas*/
    for (let letra of erradas) {
        let span = document.createElement(`span`);
        let texto = document.createTextNode(letra);

        span.appendChild(texto);
        span.setAttribute(`class`, `usadas`)
        letrasUsadas.appendChild(span);
    }
    
    if(estado > 5){
        Swal.fire({
            title: "Juego Terminado",
            text: "Te equivocaste de palabra, la palabra era " + aleatorio,
            icon: "error",
            with: "30%",
            timer: "3000",
            showConfirmButton: false    
        })
    }else if(contadorAciertos >= aleatorio.length){
        Swal.fire({
            title: "Juego Terminado",
            text: "Acertaste la palabra",
            icon: "success",
            with: "30%",
            timer: "3000",
            showConfirmButton: false    
        })
        anularTeclado();
        anularTecladoPantalla();
        window.removeEventListener(`keyup`, captuarLetras);

    }
}
function captuarLetras(teclaPresionada) {

    let tecla = (teclaPresionada.key).toUpperCase();
    let temp = (aleatorio.length);
    if (((teclaPresionada.key).charCodeAt(0) >= 65 && (teclaPresionada.key).charCodeAt(0) <= 90) || ((teclaPresionada.key).charCodeAt(0) >= 97 && (teclaPresionada.key).charCodeAt(0) <= 122) || ((teclaPresionada.key).charCodeAt(0) == 209) || ((teclaPresionada.key).charCodeAt(0) == 241)) {
        if (estado < 7 && contadorAciertos < temp) {

            if (aleatorio.indexOf(tecla) >= 0) {

                if (adivinadas.indexOf(tecla) < 0) {
                    adivinadas.push(tecla);

                }
            } else {
                if (erradas.indexOf(tecla) < 0) {
                        erradas.push(tecla);
                        estado++;

                    }
            }
            Graficar();

        } else {


            window.removeEventListener(`keyup`, captuarLetras);
        }
    }
}

function completarBloque(letra){
    var lista = letrasAcertadas.childNodes;
    var i = 0;
    var letraEncontrada = false;
    repetidas = []
    
    if(!erradas.includes(letra)){
        for(var elemento of lista){
            if(letra == aleatorio[i]){
                elemento.textContent = letra;
                letraEncontrada = true;
                contadorAciertos++;
                adivinadas.push(letra);
            }
            i++;
        }
        if(!erradas.includes(letra) && letraEncontrada == false){
            erradas.push(letra);
            estado++
        }
    }
    Graficar();
}

function validarLetras(letra){
    if(letra.keyCode >=65 && letra.keyCode <= 90){
        return letra.key.toUpperCase();
    }else{
        return "";
    }
}

function activarTecladoPantalla(leetra){
   letraActual = leetra;
    completarBloque(letraActual);
}
function mostrarTeclado(){
    teclado.classList.add("ocultar");
    tecladoPantalla.classList.remove("ocultar");
}

function ocultarTeclado(){
    teclado.classList.remove("ocultar");
    tecladoPantalla.classList.add("ocultar");
    teclado.onclick = null;
}
function anularTecladoPantalla(){
    for(var tecla of listaTeclas){
        tecla.removeEventListener("click",habilitarTeclado)
    }
}

function habilitarTeclas(){
    for(var tecla of listaTeclas){
        tecla.addEventListener("click",habilitarTeclado);
    }
}

function habilitarTeclado(){
    activarTecladoPantalla(this.textContent);
}
function activarTeclas(){
    window.addEventListener("keydown",activarTeclado)
}
function activarTeclado(event){
    letraActual = validarLetras(event);
    completarBloque(letraActual);
}
function anularTeclado(){
    window.removeEventListener("keydown",activarTeclado);
}

 teclado.onclick = null;
 //


btn_add.addEventListener("click", cambiarAgregrar);
btn_inic.addEventListener("click", cambiarIniciar);
menu.addEventListener("click", cambiarMenu); 
btn_agregar.addEventListener("click", agregarPalabra);
btn_restar.addEventListener("click", cambiarIniciar);
btn_salir.addEventListener("click", cambiarMenu);
btn_salirn.addEventListener("click", cambiarMenu);
