const openGift=document.getElementById("openGift");
const giftContent=document.getElementById("giftContent");
openGift.addEventListener("click",()=>{
  giftContent.classList.remove("hidden");
  document.getElementById("recuerdos").scrollIntoView({behavior:"smooth"});
});

const quizQuestions=[
  {question:"¿Cuál es uno de nuestros recuerdos favoritos?",options:["Una llamada que se alargó muchísimo","Una tarde cualquiera","Un día de muchas risas"],correct:0},
  {question:"¿Qué es lo que más quiero hacer contigo?",options:["Ver una película","Poder abrazarte en persona","Preparar una playlist"],correct:1},
  {question:"¿Qué deseo para nuestra historia?",options:["Que siga creciendo con nosotros","Que nunca cambiemos de canción","Que termine este pequeño juego"],correct:0}
];
let quizIndex=0;
const quizOverlay=document.getElementById("quizOverlay");
const quizOptions=document.getElementById("quizOptions");
const quizFeedback=document.getElementById("quizFeedback");
function renderQuestion(){
  const q=quizQuestions[quizIndex];
  document.getElementById("quizCount").textContent="PREGUNTA "+(quizIndex+1)+" DE "+quizQuestions.length;
  document.getElementById("quizTitle").textContent=q.question;
  document.getElementById("quizProgress").style.width=((quizIndex+1)/quizQuestions.length*100)+"%";
  quizFeedback.textContent="";
  quizOptions.innerHTML="";
  q.options.forEach((option,index)=>{
    const button=document.createElement("button");
    button.className="quiz-option";button.type="button";button.textContent=option;
    button.addEventListener("click",()=>{
      if(index!==q.correct){quizFeedback.textContent="Casi, mi amor. ¡Inténtalo otra vez! ♡";return;}
      button.classList.add("correct");
      quizFeedback.textContent="¡Esa es! ♡";
      window.setTimeout(()=>{
        if(quizIndex<quizQuestions.length-1){quizIndex++;renderQuestion();}
        else{
          quizOverlay.classList.add("hidden");
          const box=document.getElementById("surpriseBox");box.classList.remove("hidden");
          box.scrollIntoView({behavior:"smooth",block:"center"});
        }
      },650);
    });
    quizOptions.appendChild(button);
  });
}
document.getElementById("surpriseButton").addEventListener("click",()=>{
  quizIndex=0;renderQuestion();quizOverlay.classList.remove("hidden");
});
document.getElementById("closeQuiz").addEventListener("click",()=>quizOverlay.classList.add("hidden"));
quizOverlay.addEventListener("click",event=>{if(event.target===quizOverlay)quizOverlay.classList.add("hidden");});

const player=document.getElementById("audioPlayer");
let activeButton=null;
document.querySelectorAll(".audio-play").forEach(button=>{
  button.addEventListener("click",()=>{
    const source=button.dataset.audio;
    if(activeButton===button&&!player.paused){player.pause();button.textContent="▶";return;}
    player.src=source;
    player.play().then(()=>{
      if(activeButton)activeButton.textContent="▶";
      activeButton=button;button.textContent="Ⅱ";
    }).catch(()=>{
      alert("Todavía falta subir la canción. Luego pondremos aquí tu dedicatoria musical. ♡");
    });
  });
});
player.addEventListener("ended",()=>{if(activeButton)activeButton.textContent="▶";activeButton=null;});

document.querySelectorAll(".photo-placeholder").forEach(slot=>{
  const filename=slot.dataset.photo;
  const img=new Image();
  img.onload=()=>{slot.style.backgroundImage="url('"+filename+"')";slot.classList.add("has-photo");slot.querySelectorAll(".photo-symbol,.photo-label").forEach(el=>el.remove());};
  img.src=filename;
});

// Valor provisional: lo cambiaremos por el contador real cuando confirmemos la fecha.
document.getElementById("dayCounter").textContent="—";
