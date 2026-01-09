// Stream Deck Web - script.js completo y actualizado con selector de emojis funcional

function defaultDeck() {
  return Array.from({length:12}, (_,i)=>({icon:"🔘",label:"Botón "+(i+1),action:""}));
}

let profiles = JSON.parse(localStorage.getItem("profiles")) || {};
let currentProfile = localStorage.getItem("currentProfile") || "Streaming";
if(!profiles[currentProfile]){profiles[currentProfile]=defaultDeck(); localStorage.setItem("profiles", JSON.stringify(profiles));}
let selected=null;

const emojiList = ["😀","😎","🎮","🎵","💥","🔔","🔥","🎉","💡","📌","🖥️","⚡","🎯","🎁","🌟","🍀","🌈","⚽","🏆","🎲","🛠️","🎹","🎷","📷","📱","✈️","🚀","🚨","❤️","💛","💚","💙","💜"];

// --- funciones de perfiles ---
function renderProfileList(){
  const select=document.getElementById("profileSelect");
  if(!select) return;
  select.innerHTML="";
  for(const name in profiles){
    const opt=document.createElement("option");
    opt.value=name; opt.textContent=name;
    if(name===currentProfile) opt.selected=true;
    select.appendChild(opt);
  }
}

function changeProfile(){
  currentProfile=document.getElementById("profileSelect").value;
  localStorage.setItem("currentProfile",currentProfile);
  selected=null;
  render();
}

function newProfile(){
  const name=prompt("Nombre del nuevo perfil:");
  if(!name) return;
  profiles[name]=defaultDeck();
  currentProfile=name;
  localStorage.setItem("profiles", JSON.stringify(profiles));
  localStorage.setItem("currentProfile", currentProfile);
  selected=null;
  render();
}

function deleteProfile(){
  if(!currentProfile) return;
  const confirmDelete = confirm(`¿Seguro que quieres borrar el perfil "${currentProfile}"?`);
  if(!confirmDelete) return;

  delete profiles[currentProfile];
  const remainingProfiles = Object.keys(profiles);
  currentProfile = remainingProfiles.length > 0 ? remainingProfiles[0] : "Streaming";
  if(!profiles[currentProfile]) profiles[currentProfile] = defaultDeck();

  localStorage.setItem("profiles", JSON.stringify(profiles));
  localStorage.setItem("currentProfile", currentProfile);
  selected = null;
  render();
}

// --- funciones de botones ---
function render(){
  renderProfileList();
  const deck=document.getElementById("deck");
  if(!deck) return;
  deck.innerHTML="";
  profiles[currentProfile].forEach((b,i)=>{
    const el=document.createElement("div");
    el.className="btn";
    el.innerHTML=`${b.icon}<span>${b.label}</span>`;
    el.onclick=()=>selectButton(i);
    el.ondblclick=()=>runAction(i);
    deck.appendChild(el);
  });
}

function selectButton(i){
  selected=i;
  const b=profiles[currentProfile][i];
  document.getElementById("labelInput").value=b.label;
  document.getElementById("iconInput").value=b.icon;
  document.getElementById("actionInput").value=b.action;
}

function saveConfig(){
  if(selected===null) return;
  const b = profiles[currentProfile][selected];
  b.label = document.getElementById("labelInput").value || "Botón";
  b.icon = document.getElementById("iconInput").value || "🔘";
  b.action = document.getElementById("actionInput").value;

  localStorage.setItem("profiles", JSON.stringify(profiles));
  render();

  const btn = document.querySelector(".config button");
  btn.textContent = "✅ Guardado";
  btn.disabled = true;
  setTimeout(()=>{ btn.textContent = "Guardar"; btn.disabled = false; }, 1000);
}

function runAction(i){
  const act=profiles[currentProfile][i].action;
  if(!act) return;
  if(act.startsWith("http://")||act.startsWith("https://")){
    window.open(act,"_blank");
  } else if(act.endsWith(".mp3")){
    const audio=new Audio("sounds/"+act);
    audio.play();
  } else {
    alert("Acción desconocida");
  }
}

// --- selector de emojis ---
function toggleEmojiPicker(){
  const panel = document.getElementById("emojiPanel");
  if(!panel) return;

  if(panel.innerHTML === ""){
    emojiList.forEach((e)=>{
      const btn = document.createElement("button");
      btn.textContent = e;
      btn.addEventListener("click", ()=>{
        if(selected===null) return alert("Selecciona primero un botón.");
        document.getElementById("iconInput").value = e;
        profiles[currentProfile][selected].icon = e;
        render();
        panel.classList.add("hidden"); // cerrar al seleccionar
      });
      panel.appendChild(btn);
    });

    // cerrar al salir del panel
    panel.addEventListener("mouseleave", ()=>{
      panel.classList.add("hidden");
    });
  }

  panel.classList.toggle("hidden");
}

// --- inicialización ---
render();

























