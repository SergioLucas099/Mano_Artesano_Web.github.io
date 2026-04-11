import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, get, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { getMessaging, getToken } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";
import { set } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
import { onMessage } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-messaging.js";

const firebaseConfig = {
  apiKey: "AIzaSyDJ-K-AI2q-mPsDGaCMFrMLTn-lFSBd9LQ",
  authDomain: "gestion-turnos-mano-artesano.firebaseapp.com",
  databaseURL: "https://gestion-turnos-mano-artesano-default-rtdb.firebaseio.com",
  projectId: "gestion-turnos-mano-artesano",
  storageBucket: "gestion-turnos-mano-artesano.firebasestorage.app",
  messagingSenderId: "141305011827",
  appId: "1:141305011827:web:97530af4a95d105e535406"
};

function guardarTokenEnFirebase(token) {
  const numero = document.getElementById("numero").value.trim();

  if (!numero) return;

  const numeroNormalizado = numero.replace(/\s+/g, "");

  set(ref(db, "tokens/" + numeroNormalizado), {
    token: token,
    fecha: new Date().toISOString()
  });
}

function hablarTurno(numeroTurno) {
  const t = textos[idiomaActual];

  let mensaje = "";

if (idiomaActual === "es") {
  mensaje = `Turno ${numeroTurno}, por favor dirigirse a la atracción indicada`;
} else if (idiomaActual === "en") {
  mensaje = `Turn ${numeroTurno}, please proceed to the indicated attraction`;
} else if (idiomaActual === "pt") {
  mensaje = `Turno ${numeroTurno}, por favor dirija-se à atração indicada`;
} else if (idiomaActual === "fr") {
  mensaje = `Tour ${numeroTurno}, veuillez vous diriger vers l'attraction indiquée`;
} else if (idiomaActual === "it") {
  mensaje = `Turno ${numeroTurno}, si prega di dirigersi all'attrazione indicata`;
} else if (idiomaActual === "de") {
  mensaje = `Turn ${numeroTurno}, bitte begeben Sie sich zur angegebenen Attraktion`;
} else if (idiomaActual === "ko") {
  mensaje = `순서 ${numeroTurno}, 지정된 어트랙션으로 이동해 주세요`;
} else if (idiomaActual === "ja") {
  mensaje = `順番 ${numeroTurno}、指定されたアトラクションへお進みください`;
} else if (idiomaActual === "zh") {
  mensaje = `排队号 ${numeroTurno}，请前往指定的景点`;
} else if (idiomaActual === "ru") {
  mensaje = `Очередь ${numeroTurno}, пожалуйста, пройдите к указанному аттракциону`;
} else {
  mensaje = `Turno ${numeroTurno}`;
}

  const speech = new SpeechSynthesisUtterance(mensaje);

  // Opcional: idioma de voz
  speech.lang = idiomaActual === "en" ? "en-US" : "es-ES";

  speech.volume = 1;
  speech.rate = 0.9;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

function vibrarDispositivo() {
  if ("vibrate" in navigator) {
    navigator.vibrate([300, 150, 300]); // patrón vibración
  }
}

const textos = {
  es: {
    bienvenida: "Bienvenidos al <strong>Pueblito de Barro</strong><br>Aquí podrá consultar sus turnos",
    consulta: "Consulta tu Turno",
    placeholder: "Ingrese su número de turno o celular:",
    boton: "Consultar",
    turnoActual: "Turnos Actuales",
    buscando: "Buscando... ⏳",
    noEncontrado: "❌ No se encontraron turnos",
    error: "❌ Error al consultar",
    turno: "🎟️ Turno",
    atraccion: "🎡 Atracción",
    telefono: "📱 Teléfono",
    espera: "⏳ Espera",
    yaToca: "✅ YA TE TOCA",
    finalizado: "🔚 FINALIZADO",
    esperando: "⏳ Esperando turno"
  },

  en: {
    bienvenida: "Welcome to <strong>Pueblito de Barro</strong><br>Check your turns here",
    consulta: "Check your Turn",
    placeholder: "Enter your ticket number or mobile phone number:",
    boton: "Search",
    turnoActual: "Current Turns",
    buscando: "Searching... ⏳",
    noEncontrado: "❌ No turns found",
    error: "❌ Error",
    turno: "🎟️ Turn",
    atraccion: "🎡 Attraction",
    telefono: "📱 Phone",
    espera: "⏳ Wait",
    yaToca: "✅ IT'S YOUR TURN",
    finalizado: "🔚 FINALIZED",
    esperando: "⏳ Waiting"
  },

  pt: {
    bienvenida: "Bem-vindos ao <strong>Pueblito de Barro</strong><br>Aqui você pode consultar seus turnos",
    consulta: "Consultar seu turno",
    placeholder: "Insira seu número de senha ou celular:",
    boton: "Consultar",
    turnoActual: "Turnos Atuais",
    buscando: "Buscando... ⏳",
    noEncontrado: "❌ Nenhum turno encontrado",
    error: "❌ Erro ao consultar",
    turno: "🎟️ Turno",
    atraccion: "🎡 Atração",
    telefono: "📱 Telefone",
    espera: "⏳ Espera",
    yaToca: "✅ É SUA VEZ",
    finalizado: "🔚 FINALIZADO",
    esperando: "⏳ Aguardando"
  },

  fr: {
    bienvenida: "Bienvenue au <strong>Pueblito de Barro</strong><br>Ici vous pouvez consulter vos tours",
    consulta: "Consultez votre tour",
    placeholder: "Entrez votre numéro de ticket ou de téléphone portable:",
    boton: "Consulter",
    turnoActual: "Tours actuels",
    buscando: "Recherche... ⏳",
    noEncontrado: "❌ Aucun tour trouvé",
    error: "❌ Erreur",
    turno: "🎟️ Tour",
    atraccion: "🎡 Attraction",
    telefono: "📱 Téléphone",
    espera: "⏳ Attente",
    yaToca: "✅ C'EST VOTRE TOUR",
    finalizado: "🔚 FINALISÉ",
    esperando: "⏳ En attente"
  },

  it: {
    bienvenida: "Benvenuti al <strong>Pueblito de Barro</strong><br>Qui puoi controllare i tuoi turni",
    consulta: "Controlla il tuo turno",
    placeholder: "Inserisci il numero del tuo turno o del cellulare:",
    boton: "Cerca",
    turnoActual: "Turni attuali",
    buscando: "Ricerca... ⏳",
    noEncontrado: "❌ Nessun turno trovato",
    error: "❌ Errore",
    turno: "🎟️ Turno",
    atraccion: "🎡 Attrazione",
    telefono: "📱 Telefono",
    espera: "⏳ Attesa",
    yaToca: "✅ È IL TUO TURNO",
    finalizado: "🔚 FINALIZZATO",
    esperando: "⏳ In attesa"
  },

  de: {
    bienvenida: "Willkommen im <strong>Pueblito de Barro</strong><br>Hier können Sie Ihre Warteschlange überprüfen",
    consulta: "Überprüfen Sie Ihren Turn",
    placeholder: "Geben Sie Ihre Ticketnummer oder Handynummer ein:",
    boton: "Suchen",
    turnoActual: "Aktuelle Turns",
    buscando: "Suche... ⏳",
    noEncontrado: "❌ Keine Turns gefunden",
    error: "❌ Fehler",
    turno: "🎟️ Turn",
    atraccion: "🎡 Attraktion",
    telefono: "📱 Telefon",
    espera: "⏳ Wartezeit",
    yaToca: "✅ SIE SIND DRAN",
    finalizado: "🔚 FERTIGGESTELLT",
    esperando: "⏳ Wartet"
  },

  ko: {
    bienvenida: "<strong>Pueblito de Barro</strong>에 오신 것을 환영합니다<br>여기에서 순서를 확인하세요",
    consulta: "내 순서 확인",
    placeholder: "대기 번호 또는 휴대폰 번호를 입력하세요:",
    boton: "조회",
    turnoActual: "현재 순서",
    buscando: "검색 중... ⏳",
    noEncontrado: "❌ 결과 없음",
    error: "❌ 오류",
    turno: "🎟️ 순서",
    atraccion: "🎡 어트랙션",
    telefono: "📱 전화번호",
    espera: "⏳ 대기 시간",
    yaToca: "✅ 지금 당신 차례입니다",
    finalizado: "🔚 종료됨",
    esperando: "⏳ 대기 중"
  },

  ja: {
    bienvenida: "<strong>Pueblito de Barro</strong>へようこそ<br>ここで順番を確認できます",
    consulta: "順番を確認",
    placeholder: "順番番号または携帯電話番号を入力してください:",
    boton: "検索",
    turnoActual: "現在の順番",
    buscando: "検索中... ⏳",
    noEncontrado: "❌ 見つかりません",
    error: "❌ エラー",
    turno: "🎟️ 順番",
    atraccion: "🎡 アトラクション",
    telefono: "📱 電話番号",
    espera: "⏳ 待ち時間",
    yaToca: "✅ あなたの番です",
    finalizado: "🔚 終了",
    esperando: "⏳ 待機中"
  },

  zh: {
    bienvenida: "欢迎来到<strong>Pueblito de Barro</strong><br>在这里查询您的排队信息",
    consulta: "查询您的排队",
    placeholder: "请输入您的排队号码或手机号码:",
    boton: "查询",
    turnoActual: "当前排队",
    buscando: "查询中... ⏳",
    noEncontrado: "❌ 未找到",
    error: "❌ 错误",
    turno: "🎟️ 排队号",
    atraccion: "🎡 景点",
    telefono: "📱 电话",
    espera: "⏳ 等待时间",
    yaToca: "✅ 轮到你了",
    finalizado: "🔚 已完成",
    esperando: "⏳ 等待中"
  },

  ru: {
    bienvenida: "Добро пожаловать в <strong>Pueblito de Barro</strong><br>Здесь вы можете проверить свою очередь",
    consulta: "Проверить очередь",
    placeholder: "Введите номер вашей очереди или номер мобильного телефона:",
    boton: "Поиск",
    turnoActual: "Текущие очереди",
    buscando: "Поиск... ⏳",
    noEncontrado: "❌ Не найдено",
    error: "❌ Ошибка",
    turno: "🎟️ Очередь",
    atraccion: "🎡 Аттракцион",
    telefono: "📱 Телефон",
    espera: "⏳ Ожидание",
    yaToca: "✅ ВАША ОЧЕРЕДЬ",
    finalizado: "🔚 ЗАВЕРШЕНО",
    esperando: "⏳ В ожидании"
  }
};

const app = initializeApp(firebaseConfig);

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/firebase-messaging-sw.js')
    .then((registration) => {
      console.log('✅ Service Worker registrado:', registration);
    })
    .catch((error) => {
      console.error('❌ Error registrando SW:', error);
    });
}

const messaging = getMessaging(app);
const db = getDatabase(app);

// ✅ AHORA SÍ AQUÍ
onMessage(messaging, (payload) => {
  console.log("📩 Notificación en primer plano:", payload);

  alert(payload.notification.title + "\n" + payload.notification.body);
});


let ultimoBusqueda = null;
let unsubscribeBusqueda = null;
let turnosProximosNotificados = new Set();
let turnosLlamadosNotificados = new Set();

const langDropdown = document.getElementById("langDropdown");
const audioTurno = new Audio("audio/turno.mp3");
let turnosNotificados = new Set();

// === Mostrar/Ocultar lista ===
currentLang.addEventListener("click", () => {
  langDropdown.style.display = langDropdown.style.display === "block" ? "none" : "block";
});

let idiomaActual = "es";

// ================== IDIOMA ==================
document.querySelectorAll("#langDropdown li").forEach(item => {
  item.addEventListener("click", () => {
    idiomaActual = item.dataset.lang;
    aplicarIdioma();
  });
});

function aplicarIdioma() {
  const t = textos[idiomaActual];

  document.getElementById("bienvenida").innerHTML = t.bienvenida;
  document.getElementById("txtConsultaTurno").textContent = t.consulta;
  document.getElementById("numero").placeholder = t.placeholder;
  document.getElementById("consultar").textContent = t.boton;
  document.getElementById("txtTurnoActual").textContent = t.turnoActual;
}

// ================== UTILIDADES ==================
function normalizarTelefono(num) {
  return num.replace(/\s+/g, "");
}

function normalizarTurno(num) {
  return num.replace(/^0+/, "");
}

function formatearTiempo(segundos) {
  if (segundos <= 0) return "0 seg";

  if (segundos < 60) return `${segundos} seg`;

  const min = Math.floor(segundos / 60);
  const sec = segundos % 60;

  if (min < 60) {
    return `${String(min).padStart(2, "0")}:${String(sec).padStart(2, "0")} min`;
  }

  const hr = Math.floor(min / 60);
  return `${String(hr).padStart(2, "0")}:00 hr`;
}

function estadoTurno(turno) {
  const t = textos[idiomaActual];

  if (turno.estado === "FINALIZADO") {
    return t.finalizado;
  }

  if (turno.tiempoEspera <= 0) {
    return t.yaToca;
  }

  return t.esperando;
}

// ================== CONSULTA ==================
document.getElementById("consultar").addEventListener("click", () => {
  const numero = document.getElementById("numero").value.trim();

  if (!numero) {
    alert("Ingrese un número");
    return;
  }

  ultimoBusqueda = numero;

  turnosNotificados.clear();
  turnosProximosNotificados.clear();
  turnosLlamadosNotificados.clear();

  escucharBusquedaTiempoReal();
  activarNotificaciones().catch(() => {});
});

function escucharBusquedaTiempoReal() {

  if (unsubscribeBusqueda) {
    unsubscribeBusqueda();
  }

  const resultado = document.getElementById("resultado");
  const t = textos[idiomaActual];

  resultado.style.display = "block";
  resultado.innerHTML = t.buscando;

  onValue(ref(db, "turnos"), (snapshot) => {

    if (!ultimoBusqueda) return;

    let encontrados = [];

    snapshot.forEach(atraccion => {
      atraccion.forEach(turno => {
        const data = turno.val();

        const inputTel = normalizarTelefono(ultimoBusqueda);
        const inputTurno = normalizarTurno(ultimoBusqueda);

        const telDB = normalizarTelefono(data.telefono);
        const turnoDB = normalizarTurno(data.numeroTurno);

        if (telDB === inputTel || turnoDB === inputTurno) {

          encontrados.push(data);

          // ================== 🔊 PRIORIDAD 1: LLAMADO ==================
          if (
            data.llamandoTurno === true &&
            !turnosLlamadosNotificados.has(data.numeroTurno)
          ) {
            audioTurno.play().catch(() => {});
            hablarLlamado(data.numeroTurno);
            vibrarDispositivo();

            turnosLlamadosNotificados.add(data.numeroTurno);
            return;
          }
          if (data.llamandoTurno !== true) {
            turnosLlamadosNotificados.delete(data.numeroTurno);
          }

          // ================== 🔊 PRIORIDAD 2: YA TE TOCA ==================
          if (
            data.estado !== "FINALIZADO" &&
            data.tiempoEspera <= 0 &&
            !turnosNotificados.has(data.numeroTurno)
          ) {
            audioTurno.play().catch(() => {});
            hablarTurno(data.numeroTurno);
            vibrarDispositivo();

            turnosNotificados.add(data.numeroTurno);
            return;
          }

          // ================== 🔊 PRIORIDAD 3: PRÓXIMO ==================
          if (
            data.estado === "ESPERA" &&
            data.tiempoEspera > 0 &&
            data.tiempoEspera <= 300 &&
            !turnosProximosNotificados.has(data.numeroTurno)
          ) {
            audioTurno.play().catch(() => {});
            hablarProximo(data.numeroTurno);

            turnosProximosNotificados.add(data.numeroTurno);
          }
        }
      });
    });

    const resultado = document.getElementById("resultado");
    const t = textos[idiomaActual];

    if (encontrados.length > 0) {
      resultado.innerHTML = encontrados.map(data => `
        <p>
          ${t.turno}: <span>${data.numeroTurno}</span><br>
          ${t.atraccion}: <span>${data.nombreAtraccion}</span><br>
          ${t.telefono}: <span>${data.telefono}</span><br>
          ${t.espera}: <span>${formatearTiempo(data.tiempoEspera)}</span><br>
          <strong>${estadoTurno(data)}</strong>
        </p>
      `).join("");
    } else {
      resultado.innerHTML = t.noEncontrado;
    }

  });
}

// ================== TURNOS APROBADOS (TIEMPO REAL) ==================
function escucharTurnosAprobados() {
  const contenedor = document.getElementById("turno");

  onValue(ref(db, "turnos"), (snapshot) => {
    let lista = [];

    snapshot.forEach(atraccion => {
      atraccion.forEach(turno => {
        const data = turno.val();

        if (data.estado === "APROBADO") {
          lista.push(`🎟️ ${data.numeroTurno} - ${data.nombreAtraccion}`);
        }
      });
    });

    contenedor.innerHTML = lista.join("<br>");
  });
}

function hablarProximo(numeroTurno) {
  let mensaje = "";

  if (idiomaActual === "es") {
    mensaje = `Turno ${numeroTurno}, estás próximo a ser llamado, por favor acércate a tu atracción`;
  } else if (idiomaActual === "en") {
    mensaje = `Turn ${numeroTurno}, you are about to be called, please get closer to your attraction`;
  } else {
    mensaje = `Turno ${numeroTurno}`;
  }

  const speech = new SpeechSynthesisUtterance(mensaje);
  speech.lang = idiomaActual === "en" ? "en-US" : "es-ES";

  window.speechSynthesis.speak(speech);
}

function hablarLlamado(numeroTurno) {
  let mensaje = "";

  if (idiomaActual === "es") {
    mensaje = `Turno ${numeroTurno}, estás siendo llamado a la atracción, por favor acércate`;
  } else if (idiomaActual === "en") {
    mensaje = `Turn ${numeroTurno}, you are being called, please proceed to the attraction`;
  } else {
    mensaje = `Turno ${numeroTurno}`;
  }

  const speech = new SpeechSynthesisUtterance(mensaje);
  speech.lang = idiomaActual === "en" ? "en-US" : "es-ES";

  window.speechSynthesis.speak(speech);
}

// ================== INICIO ==================
aplicarIdioma();
escucharTurnosAprobados();

async function activarNotificaciones() {
  try {
    const permiso = await Notification.requestPermission();

    if (permiso === "granted") {
      console.log("Permiso concedido 🔔");

      const token = await getToken(messaging, {
        vapidKey: "BLjiniq62W-3prbmM476IFdq96S46QGWDiLoU9Y4fMtFb7cV7dUVqVkXPhmKI70gY7SXS1tIw0l3PCEHrCry2NQ"
      });

      console.log("TOKEN:", token);

      // 🔥 AQUÍ está la clave
      guardarTokenEnFirebase(token);

    } else {
      console.log("Permiso denegado ❌");
    }

  } catch (error) {
    console.error("Error obteniendo token:", error);
  }
}

function hablar(texto) {
  const speech = new SpeechSynthesisUtterance(texto);
  speech.lang = "es-ES";
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;

  speechSynthesis.speak(speech);
}

window.addEventListener("load", () => {

  const params = new URLSearchParams(window.location.search);

  const turno = params.get("turno");
  const atraccion = params.get("atraccion");

  if (turno && atraccion) {

    const mensaje = `Turno ${turno}, estás siendo llamado a la atracción ${atraccion}, por favor acércate`;

    hablar(mensaje);
  }

  if (turno && atraccion && !sessionStorage.getItem("yaHablo")) {

    const mensaje = `Turno ${turno}, estás siendo llamado a la atracción ${atraccion}, por favor acércate`;

    hablar(mensaje);

    sessionStorage.setItem("yaHablo", "true");
  }
});