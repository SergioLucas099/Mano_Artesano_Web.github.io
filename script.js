// Importar librerías necesarias
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
import { getDatabase, ref, get, child } 
  from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDJ-K-AI2q-mPsDGaCMFrMLTn-lFSBd9LQ",
  authDomain: "gestion-turnos-mano-artesano.firebaseapp.com",
  databaseURL: "https://gestion-turnos-mano-artesano-default-rtdb.firebaseio.com",
  projectId: "gestion-turnos-mano-artesano",
  storageBucket: "gestion-turnos-mano-artesano.firebasestorage.app",
  messagingSenderId: "141305011827",
  appId: "1:141305011827:web:97530af4a95d105e535406",
  measurementId: "G-X68TDB39SV"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);

// Elementos del DOM
const inputNumero = document.getElementById("numero");
const btnConsultar = document.getElementById("consultar");
const resultado = document.getElementById("resultado");

// Función de consulta
btnConsultar.addEventListener("click", async () => {
  const numero = inputNumero.value.trim();

  // Validar número
  if (!/^[0-9]{10}$/.test(numero)) {
    resultado.innerHTML = "⚠️ Ingresa un número válido de 10 dígitos";
    return;
  }

  try {
    const dbRef = ref(db);
    const snapshot = await get(child(dbRef, "TurnosEnEspera"));

    if (snapshot.exists()) {
      let encontrado = false;

      snapshot.forEach(childSnap => {
        const datos = childSnap.val();

        if (datos.NumeroTelefonico === numero) {
          encontrado = true;
          resultado.style.display = "block";
          resultado.innerHTML = `
            🏞️ Atracción: <span>${datos.Atraccion}</span><br>
            🎟️ Tu turno es: <span>${datos.TurnoAsignado}</span><br>
            👥 Personas: <span>${datos.NumeroPersonas}</span><br>
            ⏳ Tiempo de espera: <span>${datos.TiempoEspera}</span><br>
            👀 Estado: <span>${datos.Estado}</span><br>
          `;
        }
      });

      if (!encontrado) {
        resultado.innerHTML = "❌ No se encontró tu número en la base de datos";
      }
    } else {
      resultado.innerHTML = "❌ No hay turnos registrados";
    }
  } catch (error) {
    console.error(error);
    resultado.innerHTML = "⚠️ Error al consultar la base de datos";
  }
});