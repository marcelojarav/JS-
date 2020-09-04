// Variables
const formulario = document.querySelector('#formulario');
const misTweets = document.querySelector('#lista-tweets');

let tweets = [];


// Event Listeners

eventListeners();
function eventListeners(){

    document.addEventListener('submit', agregarTweet);


    document.addEventListener('DOMContentLoaded', ()=> {
        tweets = JSON.parse(localStorage.getItem('tweets')) || [];

        crearHTML();
    });
}
 


//Funciones 

function agregarTweet (e){
    e.preventDefault();
    const tweet = document.querySelector('#tweet').value;

    if (tweet){
        
        const tweetObj = {
            id: Date.now(),
            text: tweet
        }
        tweets = [...tweets, tweetObj];
        crearHTML();

        formulario.reset();

    }else{
        mensajeError('Este campo no puede ir vacío');
    }
}

function mensajeError(error){
    const mensajeDeError = document.createElement('p');
    mensajeDeError.textContent = error;
    mensajeDeError.classList.add('error');


    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeDeError);
    setTimeout(() =>{
        contenido.removeChild(mensajeDeError);
    },3000)
    
}

function crearHTML(){
    
    
    
    
    limpiarHTML();
    if(tweets.length){
         
        
        tweets.forEach(tweet =>{
            
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X';

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);

            }
            const li = document.createElement('li');
            li.innerText = tweet.text;

            li.appendChild(btnEliminar);

            misTweets.appendChild(li);

        })
    }
    
    sincronizarStorage();
}


function limpiarHTML (){
    while(misTweets.firstChild){
        misTweets.removeChild(misTweets.firstChild);
    }
}

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

function borrarTweet(id){
    tweets = tweets.filter(tweet => tweet.id !== id);
    
    crearHTML();
}