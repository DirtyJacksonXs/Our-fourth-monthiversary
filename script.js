const openGift=document.getElementById("openGift");
const giftContent=document.getElementById("giftContent");
openGift.addEventListener("click",()=>{
  giftContent.classList.remove("hidden");
  document.getElementById("recuerdos").scrollIntoView({behavior:"smooth"});
});

document.getElementById("surpriseButton").addEventListener("click",()=>{
  const box=document.getElementById("surpriseBox");
  box.classList.remove("hidden");
  box.scrollIntoView({behavior:"smooth",block:"center"});
});

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
      alert("Este mensajito todavía no está añadido. Luego pondremos aquí tu grabación. ♡");
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
document.getElementById("dayCounter").textContent="1341";
