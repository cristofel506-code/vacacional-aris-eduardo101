import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import flatpickr from "https://cdn.jsdelivr.net/npm/flatpickr/+esm";

/* FIREBASE */
const firebaseConfig = {
  apiKey: "AIzaSyDyIdyX_sH9FGB6VPL4Mz9dPlKmyMDYlFc",
  authDomain: "vacacional-aris-543d8.firebaseapp.com",
  projectId: "vacacional-aris-543d8",
  storageBucket: "vacacional-aris-543d8.firebasestorage.app",
  messagingSenderId: "745069402487",
  appId: "1:745069402487:web:83dc369ee1ad1edde2e972"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let noches = 0;
let reserva = null;

/* CALENDARIO */
flatpickr("#fecha", {
  mode: "range",
  minDate: "today",
  onChange: (d) => {
    if (d.length === 2) {
      noches = Math.round((d[1] - d[0]) / 86400000);
    }
  }
});

/* CALCULAR */
window.calcular = function () {

let s = +document.getElementById("s").value || 0;
let a = +document.getElementById("a").value || 0;
let d = +document.getElementById("d").value || 0;
let t = +document.getElementById("t").value || 0;
let p = +document.getElementById("personas").value || 0;

if (!noches) return alert("Selecciona fechas");
if (!p) return alert("Personas faltan");

let total = (s*1500 + a*2500 + d*3000 + t*4000) * noches;
let adelanto = total * 0.5;

reserva = { noches, total, adelanto, personas:p };

document.getElementById("resultado").innerHTML =
`Total: RD$ ${total}<br>Adelanto: RD$ ${adelanto}`;

document.getElementById("btnConfirmar").style.display = "block";
};

/* CONFIRMAR */
window.confirmar = async function () {

await addDoc(collection(db,"reservas"), {
  ...reserva,
  fecha: new Date().toLocaleString()
});

/* 🔥 WHATSAPP 100% COMPATIBLE */
let numero = "18092823624";

let mensaje = `🏝 RESERVA
Noches: ${reserva.noches}
Personas: ${reserva.personas}
Total: RD$ ${reserva.total}
Adelanto: RD$ ${reserva.adelanto}`;

/* FIX REAL PARA CELULAR */
let url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensaje);

/* BOTÓN FLOTANTE */
let wa = document.getElementById("wa");
wa.href = url;
wa.style.display = "block";

/* ABRIR EN TODAS LAS PLATAFORMAS */
window.open(url, "_blank");

/* reset */
document.getElementById("btnConfirmar").style.display = "none";
};