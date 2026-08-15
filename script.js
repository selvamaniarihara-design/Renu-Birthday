const SECRET_CODE = "1908"; // Change this here if you want a different birthday code.

const $ = (s) => document.querySelector(s);
const lockScreen = $("#lockScreen");
const mainSite = $("#mainSite");
const codeInput = $("#secretCode");
const errorText = $("#errorText");

function makeSparkles(){
  const holder = $("#sparkles");
  for(let i=0;i<45;i++){
    const s=document.createElement("span");
    s.className="spark";
    s.style.left=Math.random()*100+"%";
    s.style.top=Math.random()*100+"%";
    s.style.animationDelay=(Math.random()*5)+"s";
    s.style.animationDuration=(3+Math.random()*5)+"s";
    holder.appendChild(s);
  }
}
makeSparkles();

function unlock(){
  if(codeInput.value.trim() === SECRET_CODE){
    errorText.textContent="";
    lockScreen.style.transition="opacity .8s, transform .8s";
    lockScreen.style.opacity="0";
    lockScreen.style.transform="scale(1.03)";
    setTimeout(()=>{
      lockScreen.classList.remove("active");
      lockScreen.classList.add("hidden");
      mainSite.classList.remove("hidden");
      window.scrollTo({top:0,behavior:"instant"});
    },800);
  }else{
    errorText.textContent="That code isn't quite right. Try again ✦";
    codeInput.animate([{transform:"translateX(-6px)"},{transform:"translateX(6px)"},{transform:"translateX(0)"}],{duration:300});
  }
}
$("#unlockBtn").addEventListener("click", unlock);
codeInput.addEventListener("keydown", e=>{if(e.key==="Enter") unlock()});
$("#beginBtn").addEventListener("click", ()=>$("#journey").scrollIntoView({behavior:"smooth"}));

function updateCountdown(){
  const target = new Date("2026-08-19T00:00:00+05:30").getTime();
  const now = Date.now();
  let diff = Math.max(0,target-now);
  const d=Math.floor(diff/86400000); diff%=86400000;
  const h=Math.floor(diff/3600000); diff%=3600000;
  const m=Math.floor(diff/60000); diff%=60000;
  const s=Math.floor(diff/1000);
  $("#days").textContent=String(d).padStart(2,"0");
  $("#hours").textContent=String(h).padStart(2,"0");
  $("#minutes").textContent=String(m).padStart(2,"0");
  $("#seconds").textContent=String(s).padStart(2,"0");
}
updateCountdown(); setInterval(updateCountdown,1000);

const modal=$("#modal"), modalMessage=$("#modalMessage");
document.querySelectorAll(".gift").forEach(g=>{
  g.addEventListener("click",()=>{
    modalMessage.textContent=g.dataset.message;
    modal.classList.remove("hidden");
  });
});
$("#closeModal").addEventListener("click",()=>modal.classList.add("hidden"));
modal.addEventListener("click",e=>{if(e.target===modal) modal.classList.add("hidden")});

$("#wishBtn").addEventListener("click",()=>{
  $("#cake").classList.add("blown");
  $("#wishText").textContent="Wish made. ✦ May it find its way to you.";
  confetti();
});

function confetti(){
  for(let i=0;i<80;i++){
    const c=document.createElement("span");
    c.style.position="fixed";
    c.style.left="50%"; c.style.top="48%";
    c.style.width="6px"; c.style.height="10px";
    c.style.background=["#e8c98a","#f7dce7","#c46a91","#fff7f9"][i%4];
    c.style.zIndex="30"; c.style.pointerEvents="none";
    document.body.appendChild(c);
    const x=(Math.random()-.5)*window.innerWidth;
    const y=(Math.random()-.8)*window.innerHeight;
    c.animate([{transform:"translate(0,0) rotate(0)",opacity:1},{transform:`translate(${x}px,${y}px) rotate(${Math.random()*720}deg)`,opacity:0}],{duration:1400+Math.random()*1000,easing:"cubic-bezier(.2,.8,.3,1)"})
      .onfinish=()=>c.remove();
  }
}
