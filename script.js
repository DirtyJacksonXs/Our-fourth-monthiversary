const tapHeart=document.getElementById("tapHeart");
const giftContent=document.getElementById("giftContent");
const tapHint=document.getElementById("tapHint");
const tapProgress=document.getElementById("tapProgress");
const tapsNeeded=12;
let heartTaps=0;

tapHeart.addEventListener("click",()=>{
  if(heartTaps>=tapsNeeded) return;
  heartTaps++;
  tapHeart.classList.remove("heart-pop");
  void tapHeart.offsetWidth;
  tapHeart.classList.add("heart-pop");
  tapProgress.style.width=(heartTaps/tapsNeeded*100)+"%";

  if(heartTaps<tapsNeeded){
    const remaining=tapsNeeded-heartTaps;
    tapHint.textContent=remaining===1
      ? "¡Un tap más, preciosa! ♡"
      : "¡Esooo! Sigue tocando... "+heartTaps+"/"+tapsNeeded+" ♡";
    tapHeart.setAttribute("aria-label","Llevas "+heartTaps+" de "+tapsNeeded+" toques");
    return;
  }

  tapHeart.classList.add("heart-unlocked");
  tapHint.textContent="¡Lo abriste, mi preciosa! ♡";
  tapHeart.disabled=true;
  window.setTimeout(()=>{
    giftContent.classList.remove("hidden");
    document.getElementById("recuerdos").scrollIntoView({behavior:"smooth"});
  },650);
});

// Carga las fotografías de recuerdos.
document.querySelectorAll(".photo-placeholder").forEach(slot=>{
  const filename=slot.dataset.photo;
  if(!filename) return;
  const img=new Image();
  img.onload=()=>{
    slot.style.backgroundImage="url('"+filename+"')";
    slot.classList.add("has-photo");
    slot.querySelectorAll(".photo-symbol,.photo-label").forEach(el=>el.remove());
  };
  img.src=filename;
});
