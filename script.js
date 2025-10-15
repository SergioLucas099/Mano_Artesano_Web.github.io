// Importar librerías necesarias
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-analytics.js";
import { getDatabase, ref, get, child, onValue } from "https://www.gstatic.com/firebasejs/12.3.0/firebase-database.js";

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

// === Traducciones ===
const translations = {
  es: {
    bienvenida: "Bienvenidos al <strong>Pueblito de Barro</strong><br>Aquí podrá consultar sus turnos",
    titulo: "Consulta tu Turno",
    tituloTurno: "Turnos Actuales",
    placeholder: "Ingrese su número de celular:",
    boton: "Consultar",
    mensajes: {
      invalido: "⚠️ Ingresa un número válido de 10 dígitos",
      noEncontrado: "❌ No se encontró tu número en la base de datos",
      noTurnos: "❌ No hay turnos registrados",
      error: "⚠️ Error al consultar la base de datos"
    },
    labels: {
      atraccion: "🏞️ Atracción",
      turno: "🎟️ Tu turno es",
      personas: "👥 Personas",
      espera: "⏳ Tiempo de espera",
      estado: "👀 Estado",
      estadoEnEspera: "En Espera",
      estadoCancelado: "Cancelado",
      estadoFinalizado: "Finalizado"
    }
  },
  en: {
    bienvenida: "Welcome to <strong>Pueblito de Barro</strong><br>Here you can check your turns",
    titulo: "Check your Turn",
    tituloTurno: "Current Number",
    placeholder: "Enter your phone number:",
    boton: "Check",
    mensajes: {
      invalido: "⚠️ Enter a valid 10-digit phone number",
      noEncontrado: "❌ Your number was not found in the database",
      noTurnos: "❌ No turns registered",
      error: "⚠️ Error retrieving data from the database"
    },
    labels: {
      atraccion: "🏞️ Attraction",
      turno: "🎟️ Your turn is",
      personas: "👥 People",
      espera: "⏳ Waiting time",
      estado: "👀 Status",
      estadoEnEspera: "Waiting",
      estadoCancelado: "Cancelled",
      estadoFinalizado: "Finished"
    }
  },
  pt: {
    bienvenida: "Bem-vindos ao <strong>Pueblito de Barro</strong><br>Aqui você pode consultar seus turnos",
    titulo: "Consulte seu Turno",
    tituloTurno: "Senhas Atuais",
    placeholder: "Digite seu número de celular:",
    boton: "Consultar",
    mensajes: {
      invalido: "⚠️ Insira um número de telefone válido com 10 dígitos",
      noEncontrado: "❌ Seu número não foi encontrado no banco de dados",
      noTurnos: "❌ Nenhum turno registrado",
      error: "⚠️ Erro ao consultar o banco de dados"
    },
    labels: {
      atraccion: "🏞️ Atração",
      turno: "🎟️ Seu turno é",
      personas: "👥 Pessoas",
      espera: "⏳ Tempo de espera",
      estado: "👀 Estado",
      estadoEnEspera: "Em espera",
      estadoCancelado: "Cancelado",
      estadoFinalizado: "Finalizado"
    }
  },
  fr: {
    bienvenida: "Bienvenue au <strong>Pueblito de Barro</strong><br>Ici, vous pouvez consulter vos tours",
    titulo: "Consultez votre Tour",
    tituloTurno: "Numéros Actuels",
    placeholder: "Entrez votre numéro de téléphone:",
    boton: "Consulter",
    mensajes: {
      invalido: "⚠️ Entrez un numéro de téléphone valide à 10 chiffres",
      noEncontrado: "❌ Votre numéro n'a pas été trouvé dans la base de données",
      noTurnos: "❌ Aucun tour enregistré",
      error: "⚠️ Erreur lors de la consultation de la base de données"
    },
    labels: {
      atraccion: "🏞️ Attraction",
      turno: "🎟️ Votre tour est",
      personas: "👥 Personnes",
      espera: "⏳ Temps d'attente",
      estado: "👀 État",
      estadoEnEspera: "En attente",
      estadoCancelado: "Annulé",
      estadoFinalizado: "Terminé"
    }
  },
  it: {
    bienvenida: "Benvenuti a <strong>Pueblito de Barro</strong><br>Qui puoi controllare i tuoi turni",
    titulo: "Controlla il tuo Turno",
    tituloTurno: "Numeri Attuali",
    placeholder: "Inserisci il tuo numero di telefono:",
    boton: "Controlla",
    mensajes: {
      invalido: "⚠️ Inserisci un numero di telefono valido di 10 cifre",
      noEncontrado: "❌ Il tuo numero non è stato trovato nel database",
      noTurnos: "❌ Nessun turno registrato",
      error: "⚠️ Errore durante la consultazione del database"
    },
    labels: {
      atraccion: "🏞️ Attrazione",
      turno: "🎟️ Il tuo turno è",
      personas: "👥 Persone",
      espera: "⏳ Tempo di attesa",
      estado: "👀 Stato",
      estadoEnEspera: "In attesa",
      estadoCancelado: "Annullato",
      estadoFinalizado: "Completato"
    }
  },
  de: {
    bienvenida: "Willkommen im <strong>Pueblito de Barro</strong><br>Hier können Sie Ihre Termine überprüfen",
    titulo: "Überprüfen Sie Ihren Termin",
    tituloTurno: "Aktuelle Nummern",
    placeholder: "Geben Sie Ihre Telefonnummer ein:",
    boton: "Überprüfen",
    mensajes: {
      invalido: "⚠️ Geben Sie eine gültige 10-stellige Telefonnummer ein",
      noEncontrado: "❌ Ihre Nummer wurde nicht in der Datenbank gefunden",
      noTurnos: "❌ Keine Termine registriert",
      error: "⚠️ Fehler beim Abrufen der Datenbank"
    },
    labels: {
      atraccion: "🏞️ Attraktion",
      turno: "🎟️ Ihre Nummer ist",
      personas: "👥 Personen",
      espera: "⏳ Wartezeit",
      estado: "👀 Status",
      estadoEnEspera: "Wartend",
      estadoCancelado: "Abgebrochen",
      estadoFinalizado: "Beendet"
    }
  },
  ko: {
    bienvenida: "<strong>Pueblito de Barro</strong>에 오신 것을 환영합니다<br>여기서 차례를 확인할 수 있습니다",
    titulo: "차례 확인",
    tituloTurno: "현재 순번",
    placeholder: "전화번호를 입력하세요:",
    boton: "확인",
    mensajes: {
      invalido: "⚠️ 유효한 10자리 전화번호를 입력하세요",
      noEncontrado: "❌ 데이터베이스에서 번호를 찾을 수 없습니다",
      noTurnos: "❌ 등록된 차례가 없습니다",
      error: "⚠️ 데이터베이스 조회 오류"
    },
    labels: {
      atraccion: "🏞️ 명소",
      turno: "🎟️ 당신의 차례",
      personas: "👥 인원수",
      espera: "⏳ 대기 시간",
      estado: "👀 상태",
      estadoEnEspera: "대기 중",
      estadoCancelado: "취소됨",
      estadoFinalizado: "완료됨"
    }
  },
  ja: {
    bienvenida: "<strong>Pueblito de Barro</strong>へようこそ<br>ここで順番を確認できます",
    titulo: "順番を確認する",
    tituloTurno: "現在の番号",
    placeholder: "電話番号を入力してください:",
    boton: "確認",
    mensajes: {
      invalido: "⚠️ 有効な10桁の電話番号を入力してください",
      noEncontrado: "❌ データベースに番号が見つかりません",
      noTurnos: "❌ 登録された順番はありません",
      error: "⚠️ データベースの取得エラー"
    },
    labels: {
      atraccion: "🏞️ アトラクション",
      turno: "🎟️ あなたの順番",
      personas: "👥 人数",
      espera: "⏳ 待ち時間",
      estado: "👀 状態",
      estadoEnEspera: "待機中",
      estadoCancelado: "キャンセル済み",
      estadoFinalizado: "終了"
    }
  },
  zh: {
    bienvenida: "欢迎来到 <strong>Pueblito de Barro</strong><br>在这里您可以查询您的顺序",
    titulo: "查询您的顺序",
    tituloTurno: "当前号码",
    placeholder: "请输入您的电话号码：",
    boton: "查询",
    mensajes: {
      invalido: "⚠️ 请输入有效的10位电话号码",
      noEncontrado: "❌ 数据库中未找到您的号码",
      noTurnos: "❌ 没有已注册的顺序",
      error: "⚠️ 查询数据库时出错"
    },
    labels: {
      atraccion: "🏞️ 景点",
      turno: "🎟️ 您的顺序是",
      personas: "👥 人数",
      espera: "⏳ 等待时间",
      estado: "👀 状态",
      estadoEnEspera: "等待中",
      estadoCancelado: "已取消",
      estadoFinalizado: "已完成"
    }
  },
  ru: {
    bienvenida: "Добро пожаловать в <strong>Pueblito de Barro</strong><br>Здесь вы можете проверить свою очередь",
    titulo: "Проверьте свою очередь",
    tituloTurno: "Текущие номера",
    placeholder: "Введите свой номер телефона:",
    boton: "Проверить",
    mensajes: {
      invalido: "⚠️ Введите действительный 10-значный номер телефона",
      noEncontrado: "❌ Ваш номер не найден в базе данных",
      noTurnos: "❌ Нет зарегистрированных очередей",
      error: "⚠️ Ошибка при обращении к базе данных"
    },
    labels: {
      atraccion: "🏞️ Аттракцион",
      turno: "🎟️ Ваш номер",
      personas: "👥 Людей",
      espera: "⏳ Время ожидания",
      estado: "👀 Статус",
      estadoEnEspera: "В ожидании",
      estadoCancelado: "Отменено",
      estadoFinalizado: "Завершено"
    }
  }
};


// === Elementos del DOM ===
const currentLang = document.getElementById("currentLang");
const langDropdown = document.getElementById("langDropdown");
const bienvenida = document.getElementById("bienvenida");
const titulo = document.getElementById("txtConsultaTurno");
const turnosActuales = document.getElementById("txtTurnoActual");
const inputNumero = document.getElementById("numero");
const btnConsultar = document.getElementById("consultar");
const resultado = document.getElementById("resultado");

let currentLanguage = "es"; // idioma por defecto

// === Mostrar/Ocultar lista ===
currentLang.addEventListener("click", () => {
  langDropdown.style.display = langDropdown.style.display === "block" ? "none" : "block";
});

// === Cambiar idioma ===
langDropdown.querySelectorAll("li").forEach(item => {
  item.addEventListener("click", () => {
    const lang = item.getAttribute("data-lang");
    currentLanguage = lang;
    const t = translations[lang];

    bienvenida.innerHTML = t.bienvenida;
    titulo.textContent = t.titulo;
    turnosActuales.textContent = t.tituloTurno;
    inputNumero.placeholder = t.placeholder;
    btnConsultar.textContent = t.boton;
    currentLang.src = item.querySelector("img").src;

    langDropdown.style.display = "none";
  });
});

// === Función para formatear el tiempo ===
function formatearTiempo(tiempo) {
  if (!tiempo) return "—"; // Si está vacío o undefined
  const [min, seg] = tiempo.split(":").map(Number);
  if (min === 0) {
    return `${seg} seg`;
  } else {
    return `${min} min`;
  }
}

// === Consulta de turnos en tiempo real ===
btnConsultar.addEventListener("click", () => {
  const numero = inputNumero.value.trim();
  const t = translations[currentLanguage];
  const turnosRef = ref(db, "TurnosAcumulados");

  // Escuchar cambios en tiempo real
  onValue(turnosRef, (snapshot) => {
    if (snapshot.exists()) {
      let encontrado = false;

      snapshot.forEach((childSnap) => {
        const datos = childSnap.val();
        if (datos.NumeroTelefonico === numero || datos.TurnoAsignado.includes(numero)) {
          encontrado = true;

          // Diccionario de traducciones para Estado
          const estadosTraducidos = {
            "En Espera": t.labels.estadoEnEspera,
            "Cancelado": t.labels.estadoCancelado,
            "Finalizado": t.labels.estadoFinalizado
          };

          const estadoTraducido = estadosTraducidos[datos.Estado] || datos.Estado;

          resultado.style.display = "block";
          resultado.innerHTML = `
            ${t.labels.atraccion}: <span>${datos.Atraccion}</span><br>
            ${t.labels.turno}: <span>${datos.TurnoAsignado}</span><br>
            ${t.labels.personas}: <span>${datos.NumeroPersonas}</span><br>
            ${t.labels.espera}: <span>${formatearTiempo(datos.TiempoEspera)}</span><br>
            ${t.labels.estado}: <span>${estadoTraducido}</span><br>
          `;
        }
      });

      if (!encontrado) {
        resultado.style.display = "block";
        resultado.innerHTML = t.mensajes.noEncontrado;
      }
    } else {
      resultado.style.display = "block";
      resultado.innerHTML = t.mensajes.noTurnos;
    }
  }, {
    onlyOnce: false // Importante: mantiene la escucha activa
  });
});

const turnoRef = ref(db, "TurnosActualesAtracciones/Mano Del Artesano");

// Escuchar cambios
onValue(turnoRef, (snapshot) => {
  const turno = snapshot.val();
  document.getElementById("turno").innerText = `Mano Del Artesano: ${turno}`;
});