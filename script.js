// =====================================
// 🦉 BUOLING V2.0
// SCRIPT.JS PARTE 1
// =====================================


// DATOS DEL JUGADOR

let xp = Number(localStorage.getItem("xp")) || 0;

let coins = Number(localStorage.getItem("coins")) || 0;

let playerLevel = Number(localStorage.getItem("player")) || 1;


// DATOS DEL JUEGO

let nivel = localStorage.getItem("nivel") || "🟢 Principiante";


let score = 0;

let lives = 3;

let streak = 0;

let actual = 0;


// ELEMENTOS

const word = document.getElementById("word");

const category = document.getElementById("category");

const answers = document.getElementById("answers");

const message = document.getElementById("message");

const avatar = document.getElementById("avatar");

const next = document.getElementById("next");


// =====================================
// BANCO DE PREGUNTAS
// =====================================


const preguntas = {


"🟢 Principiante":[


{

categoria:"Frutas",

ingles:"Apple",

español:"Manzana",

opciones:[

"Manzana",

"Casa",

"Perro",

"Libro"

],

ejemplo:

"I eat an apple."

},



{

categoria:"Animales",

ingles:"Dog",

español:"Perro",

opciones:[

"Gato",

"Perro",

"Pájaro",

"Caballo"

],

ejemplo:

"The dog is happy."

},



{

categoria:"Colores",

ingles:"Blue",

español:"Azul",

opciones:[

"Rojo",

"Verde",

"Azul",

"Negro"

],

ejemplo:

"The sky is blue."

},



{

categoria:"Saludos",

ingles:"Hello",

español:"Hola",

opciones:[

"Adiós",

"Hola",

"Gracias",

"Perdón"

],

ejemplo:

"Hello my friend."

},



{

categoria:"Números",

ingles:"Five",

español:"Cinco",

opciones:[

"Dos",

"Tres",

"Cinco",

"Diez"

],

ejemplo:

"I have five apples."

}

],




"🟡 Básico":[


{

categoria:"Familia",

ingles:"Mother",

español:"Madre",

opciones:[

"Padre",

"Madre",

"Hermano",

"Abuelo"

],

ejemplo:

"My mother is nice."

},


{

categoria:"Casa",

ingles:"Window",

español:"Ventana",

opciones:[

"Puerta",

"Mesa",

"Ventana",

"Silla"

],

ejemplo:

"Open the window."

},


{

categoria:"Comida",

ingles:"Bread",

español:"Pan",

opciones:[

"Pan",

"Agua",

"Arroz",

"Leche"

],

ejemplo:

"I like bread."

},


{

categoria:"Verbos",

ingles:"Run",

español:"Correr",

opciones:[

"Leer",

"Correr",

"Comer",

"Dormir"

],

ejemplo:

"I run every day."

},


{

categoria:"Escuela",

ingles:"Teacher",

español:"Profesor",

opciones:[

"Alumno",

"Profesor",

"Doctor",

"Amigo"

],

ejemplo:

"My teacher is good."

}

],



"🟠 Intermedio":[


{

categoria:"Profesión",

ingles:"Doctor",

español:"Doctor",

opciones:[

"Doctor",

"Chef",

"Profesor",

"Policía"

],

ejemplo:

"The doctor helps people."

},


{

categoria:"Tiempo",

ingles:"Yesterday",

español:"Ayer",

opciones:[

"Mañana",

"Ayer",

"Hoy",

"Ahora"

],

ejemplo:

"I played yesterday."

},


{

categoria:"Lugar",

ingles:"Hospital",

español:"Hospital",

opciones:[

"Escuela",

"Casa",

"Hospital",

"Banco"

],

ejemplo:

"He is at the hospital."

},


{

categoria:"Pregunta",

ingles:"Where",

español:"Dónde",

opciones:[

"Qué",

"Quién",

"Dónde",

"Cuándo"

],

ejemplo:

"Where are you?"

},


{

categoria:"Adjetivo",

ingles:"Beautiful",

español:"Hermoso",

opciones:[

"Grande",

"Feo",

"Hermoso",

"Rápido"

],

ejemplo:

"The flower is beautiful."

}

],



"🔴 Avanzado":[


{

categoria:"Phrasal Verb",

ingles:"Wake up",

español:"Despertarse",

opciones:[

"Dormir",

"Despertarse",

"Caminar",

"Comer"

],

ejemplo:

"I wake up early."

},


{

categoria:"Idioms",

ingles:"Break a leg",

español:"Buena suerte",

opciones:[

"Buena suerte",

"Correr rápido",

"Romper algo",

"Trabajar"

],

ejemplo:

"Break a leg in your show."

},


{

categoria:"Grammar",

ingles:"Although",

español:"Aunque",

opciones:[

"Aunque",

"Porque",

"Después",

"Antes"

],

ejemplo:

"Although it rains, I go."

},


{

categoria:"Vocabulary",

ingles:"Adventure",

español:"Aventura",

opciones:[

"Juego",

"Aventura",

"Casa",

"Historia"

],

ejemplo:

"This is an adventure."

},


{

categoria:"Listening",

ingles:"Knowledge",

español:"Conocimiento",

opciones:[

"Conocimiento",

"Trabajo",

"Amor",

"Tiempo"

],

ejemplo:

"Knowledge is power."

}

]


};


// =====================================
// VOZ DE BUOLING
// =====================================


function hablar(texto){


let voz = new SpeechSynthesisUtterance(texto);


voz.lang="en-US";


voz.rate=0.8;


speechSynthesis.cancel();


speechSynthesis.speak(voz);


}
// =====================================
// 🦉 BUOLING V2.0
// SCRIPT.JS PARTE 2
// =====================================


// SELECCIONAR PREGUNTAS DEL NIVEL

let lista = preguntas[nivel] || preguntas["🟢 Principiante"];


// =====================================
// INICIAR JUEGO
// =====================================


function iniciar(){

actual=0;

score=0;

lives=3;

streak=0;


document.getElementById("lives").innerHTML=lives;

document.getElementById("streak").innerHTML=streak;


mostrarPregunta();


actualizarDatos();


}



// =====================================
// MOSTRAR PREGUNTA
// =====================================


function mostrarPregunta(){


let pregunta = lista[actual];



if(!pregunta){

finalizar();

return;

}



category.innerHTML=pregunta.categoria;


word.innerHTML=pregunta.ingles;



answers.innerHTML="";


document.getElementById("explanation").style.display="none";


next.style.display="none";



document.getElementById("counter").innerHTML=

"Pregunta "+(actual+1)+" / "+lista.length;



let porcentaje=

(actual/lista.length)*100;


document.getElementById("progress").style.width=

porcentaje+"%";



hablar(pregunta.ingles);



pregunta.opciones.forEach(op=>{


let boton=document.createElement("button");


boton.innerHTML=op;



boton.onclick=function(){

comprobar(boton,op,pregunta);

};



answers.appendChild(boton);


});



}


// =====================================
// COMPROBAR RESPUESTA
// =====================================


function comprobar(boton,respuesta,pregunta){



let botones=document.querySelectorAll("#answers button");


botones.forEach(b=>{

b.disabled=true;

});



if(respuesta===pregunta.español){


boton.classList.add("correct");



score++;

streak++;



xp+=10;

coins+=5;



message.innerHTML=

"🎉 ¡Excelente! Sigue así";



avatar.innerHTML="😄";



hablar("Excellent job");



if(streak>=3){

xp+=10;

coins+=10;

message.innerHTML=

"🔥 Amazing streak!";

}



}else{



boton.classList.add("wrong");


lives--;


streak=0;



message.innerHTML=

"😢 Intenta otra vez";


avatar.innerHTML="😟";



hablar("Try again");



botones.forEach(b=>{


if(b.innerHTML===pregunta.español){

b.classList.add("correct");

}


});



}



guardarDatos();


actualizarDatos();



mostrarExplicacion(pregunta);



document.getElementById("lives").innerHTML=lives;


next.style.display="inline-block";



if(lives<=0){


finalizar();


}



}



// =====================================
// EXPLICACIÓN
// =====================================


function mostrarExplicacion(pregunta){



let caja=document.getElementById("explanation");



caja.style.display="block";



caja.innerHTML=

"<b>"+pregunta.ingles+

"</b> significa <b>"+

pregunta.español+

"</b><br><br>"+

"📖 Ejemplo:<br>"+

pregunta.ejemplo;



}



// =====================================
// SIGUIENTE PREGUNTA
// =====================================


next.onclick=function(){


actual++;


mostrarPregunta();



};



// =====================================
// ACTUALIZAR DATOS
// =====================================


function actualizarDatos(){


document.getElementById("xp").innerHTML=xp;


document.getElementById("coins").innerHTML=coins;


document.getElementById("streak").innerHTML=streak;


}



function guardarDatos(){


localStorage.setItem("xp",xp);


localStorage.setItem("coins",coins);


localStorage.setItem("player",playerLevel);



}


// Arrancar juego

iniciar();
// =====================================
// 🦉 BUOLING V2.0
// SCRIPT.JS PARTE 3
// =====================================



// =====================================
// FINAL DEL NIVEL
// =====================================


function finalizar(){


document.querySelector(".game-container").style.display="none";


document.getElementById("finish").style.display="flex";



let mensaje="";

let medalla="";



// CALCULAR RESULTADO


if(score===lista.length){


mensaje="🏆 ¡PERFECTO! Buoling está muy orgulloso.";


medalla="👑 Maestro del Inglés";


coins+=50;

xp+=100;



confeti();



}else if(score>=3){



mensaje="🥇 ¡Muy buen trabajo! Sigue practicando.";


medalla="🥇 Estrella del Inglés";


coins+=25;

xp+=50;



}else{


mensaje="📚 Buen intento. Cada día aprenderás más.";


medalla="🥉 Aprendiz";


coins+=10;

xp+=20;



}



// SUBIR NIVEL


if(xp>=100){


playerLevel++;


xp=0;


}



guardarDatos();



document.getElementById("finalAvatar").innerHTML="🦉";


document.getElementById("finalMessage").innerHTML=

mensaje;



document.getElementById("result").innerHTML=

medalla+

"<br><br>"+

"⭐ XP ganado: "+xp+

"<br>🪙 Monedas: "+coins+

"<br>🏅 Nivel jugador: "+playerLevel;



hablar("Congratulations! You finished the level");



}






// =====================================
// CONFETI
// =====================================


function confeti(){



for(let i=0;i<40;i++){


let estrella=document.createElement("div");


estrella.innerHTML="⭐";


estrella.style.position="fixed";


estrella.style.left=

Math.random()*100+"%";


estrella.style.top="-20px";


estrella.style.fontSize=

20+Math.random()*30+"px";


estrella.style.zIndex="999";


estrella.style.transition="4s";



document.body.appendChild(estrella);



setTimeout(()=>{


estrella.style.top="100%";


},100);



setTimeout(()=>{


estrella.remove();


},4500);



}



}




// =====================================
// SONIDOS SIN ARCHIVOS
// =====================================


function sonido(tipo){



let audio=

new AudioContext();



let oscilador=

audio.createOscillator();



oscilador.connect(audio.destination);



if(tipo==="correcto"){


oscilador.frequency.value=600;


}else{


oscilador.frequency.value=150;


}



oscilador.start();


oscilador.stop(

audio.currentTime+0.15

);



}



// =====================================
// MODO OSCURO
// =====================================


function modoOscuro(){



document.body.classList.toggle("dark");



localStorage.setItem(

"dark",

document.body.classList.contains("dark")

);



}



// Cargar modo oscuro


if(localStorage.getItem("dark")==="true"){


document.body.classList.add("dark");


}




// =====================================
// SISTEMA DE EXPERIENCIA
// =====================================


function calcularRango(){



if(playerLevel>=10){


return "🏆 Maestro";


}


if(playerLevel>=5){


return "🥇 Experto";


}


if(playerLevel>=3){


return "🥈 Avanzado";


}



return "🥉 Aprendiz";



}




// Mostrar rango en consola


console.log(

"Rango actual:",

calcularRango()

);



// =====================================
// MENSAJE INICIAL DE BUOLING
// =====================================


setTimeout(()=>{


hablar(

"Welcome back student. Let's learn English"

);



},1500);
// =====================================
// 🦉 BUOLING V2.0
// SCRIPT.JS PARTE 4
// =====================================


// =====================================
// MEZCLAR PREGUNTAS
// =====================================


function mezclar(array){


return array.sort(()=>Math.random()-0.5);


}



// Mezclar al iniciar

lista = mezclar(lista);




// =====================================
// SISTEMA DE RACHA AVANZADO
// =====================================


let maxStreak =

Number(localStorage.getItem("maxStreak")) || 0;



function actualizarRacha(){



if(streak>maxStreak){


maxStreak=streak;


localStorage.setItem(

"maxStreak",

maxStreak

);


}



if(streak>=5){


message.innerHTML=

"🔥🔥 ¡Racha increíble!";



xp+=20;

coins+=15;



}



}



// =====================================
// RECUPERAR VIDA
// =====================================


function recuperarVida(){



if(coins>=30 && lives<3){



coins-=30;


lives++;



actualizarDatos();



message.innerHTML=

"❤️ Vida recuperada";



}else{


message.innerHTML=

"Necesitas más monedas";



}



guardarDatos();


}




// =====================================
// INVENTARIO
// =====================================



let inventario=

JSON.parse(

localStorage.getItem("inventario")

)

||[];



function agregarPremio(objeto){



inventario.push(objeto);



localStorage.setItem(

"inventario",

JSON.stringify(inventario)

);



}



function mostrarInventario(){



console.log(

"🎒 Inventario:",

inventario

);



}




// =====================================
// MEDALLAS
// =====================================


let medallas=

JSON.parse(

localStorage.getItem("medallas")

)

||[];



function ganarMedalla(nombre){



if(!medallas.includes(nombre)){



medallas.push(nombre);



localStorage.setItem(

"medallas",

JSON.stringify(medallas)

);



}



}



function mostrarMedallas(){


console.log(

"🏅 Medallas:",

medallas

);


}




// =====================================
// ESTADISTICAS
// =====================================


let partidas=

Number(

localStorage.getItem("partidas")

)||0;



let preguntasCorrectas=

Number(

localStorage.getItem("correctas")

)||0;



function guardarEstadisticas(){


localStorage.setItem(

"partidas",

partidas

);



localStorage.setItem(

"correctas",

preguntasCorrectas

);



}



function porcentaje(){

let total=

partidas*lista.length;



if(total===0){

return 0;

}



return Math.round(

(preguntasCorrectas/total)*100

);



}




// =====================================
// REGISTRAR PARTIDA
// =====================================


function registrarPartida(){



partidas++;



preguntasCorrectas+=score;



guardarEstadisticas();



}



// =====================================
// BOTÓN DE AYUDA
// =====================================


function ayudaBuoling(){



hablar(

"Choose the correct answer. You can do it!"

);



message.innerHTML=

"🦉 Buoling dice: ¡Tú puedes!";



}




// =====================================
// BONUS DIARIO
// =====================================


function regaloDiario(){



let fecha=

new Date().toDateString();



let ultimo=

localStorage.getItem(

"regalo"

);



if(fecha!==ultimo){



coins+=20;


xp+=20;



localStorage.setItem(

"regalo",

fecha

);



message.innerHTML=

"🎁 Premio diario recibido";



guardarDatos();



}



}



// Ejecutar regalo diario

regaloDiario();



// =====================================
// DATOS DEL JUGADOR
// =====================================


function mostrarPerfil(){



return {

nivel:playerLevel,

xp:xp,

monedas:coins,

racha:maxStreak,

medallas:medallas.length,

precision:porcentaje()+"%"

};



}



console.log(

"📊 Perfil Buoling:",

mostrarPerfil()

);
// =====================================
// 🦉 BUOLING V2.0
// SCRIPT.JS PARTE 5 FINAL
// =====================================



// =====================================
// MEJORAR MENSAJES DE BUOLING
// =====================================


const mensajesBuenos=[

"Excellent job!",

"Great work!",

"You are amazing!",

"Keep learning!",

"Perfect answer!"

];


const mensajesMalos=[

"Try again!",

"Don't give up!",

"You can do it!",

"Keep practicing!"

];



function mensajeAleatorio(tipo){


let listaMensaje;


if(tipo==="bien"){

listaMensaje=mensajesBuenos;

}else{

listaMensaje=mensajesMalos;

}



return listaMensaje[

Math.floor(

Math.random()*listaMensaje.length

)

];


}




// =====================================
// REEMPLAZAR COMPROBACIÓN CON MEJORAS
// =====================================



const comprobarOriginal = comprobar;



comprobar=function(boton,respuesta,pregunta){



let botones=

document.querySelectorAll("#answers button");



botones.forEach(b=>{

b.disabled=true;

});



if(respuesta===pregunta.español){



boton.classList.add("correct");


score++;


streak++;


preguntasCorrectas++;



xp+=10;


coins+=5;



actualizarRacha();


sonido("correcto");



avatar.innerHTML="😄";


message.innerHTML=

"🦉 "+mensajeAleatorio("bien");



hablar(

"Correct! "+pregunta.ingles

);



}else{


boton.classList.add("wrong");



lives--;


streak=0;



sonido("error");



avatar.innerHTML="😢";


message.innerHTML=

"🦉 "+mensajeAleatorio("mal");



hablar(

"Wrong answer"

);



botones.forEach(b=>{


if(b.innerHTML===pregunta.español){


b.classList.add("correct");


}


});



}



document.getElementById("lives").innerHTML=lives;



actualizarDatos();


guardarDatos();


mostrarExplicacion(pregunta);



next.style.display="inline-block";



if(lives<=0){


registrarPartida();


finalizar();


}



};




// =====================================
// BOTÓN REINICIAR
// =====================================


function reiniciarJuego(){


score=0;


lives=3;


streak=0;


actual=0;



lista=mezclar(lista);



document.querySelector(".game-container").style.display="block";


document.getElementById("finish").style.display="none";



mostrarPregunta();


}




// =====================================
// BORRAR PROGRESO
// =====================================


function borrarProgreso(){


localStorage.clear();


alert(

"🦉 Progreso eliminado"

);


location.reload();


}




// =====================================
// MOSTRAR INFORMACIÓN DEL JUGADOR
// =====================================


function tarjetaJugador(){



let perfil=mostrarPerfil();



alert(

"🦉 PERFIL BUOLING\n\n"+

"🏆 Nivel: "+perfil.nivel+

"\n⭐ XP: "+perfil.xp+

"\n🪙 Monedas: "+perfil.monedas+

"\n🔥 Mejor racha: "+perfil.racha+

"\n🏅 Medallas: "+perfil.medallas+

"\n🎯 Precisión: "+perfil.precision

);



}




// =====================================
// ATAJOS DE TECLADO
// =====================================


document.addEventListener(

"keydown",

function(e){



if(e.key===" "){


hablar(

document.getElementById("word").innerHTML

);


}



if(e.key==="Enter"){


if(next.style.display==="inline-block"){


actual++;


mostrarPregunta();


}


}



}

);




// =====================================
// INICIO FINAL
// =====================================


window.addEventListener(

"load",

()=>{


actualizarDatos();



console.log(

"🦉 Buoling cargado correctamente"

);



}

);