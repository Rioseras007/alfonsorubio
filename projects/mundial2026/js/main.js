// simulador mundial


// fecha de actual, fecha de incio mundial,fecha final del mundial
var fechaActual = new Date();
const inicioMundial2026 = new Date(2026, 5, 11); // 11 de junio de 2026
const finMundial2026 = new Date(2026, 6, 19); // 19 de julio de 2026

function updateCountdown() {
  const now = new Date();
  let diff = finMundial2026 - now;
  if (diff < 0) diff = 0;
  const seconds = Math.floor(diff / 1000) % 60;
  const minutes = Math.floor(diff / (1000 * 60)) % 60;
  const hours = Math.floor(diff / (1000 * 60 * 60)) % 24;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const el = id => document.getElementById(id);
  if (el('cd-days')) el('cd-days').textContent = days;
  if (el('cd-hours')) el('cd-hours').textContent = String(hours).padStart(2, '0');
  if (el('cd-minutes')) el('cd-minutes').textContent = String(minutes).padStart(2, '0');
  if (el('cd-seconds')) el('cd-seconds').textContent = String(seconds).padStart(2, '0');
  if (diff === 0 && window._mundialCountdownInterval) {
    clearInterval(window._mundialCountdownInterval);
  }
}

updateCountdown();
window._mundialCountdownInterval = setInterval(updateCountdown, 1000);

document.getElementById("incio").innerHTML = inicioMundial2026;
document.getElementById("fecha_actual").innerHTML = fechaActual;
document.getElementById("fecha_final").innerHTML = finMundial2026;

var hora = fechaActual.getHours();
var minutos = fechaActual.getMinutes();
var segundos = fechaActual.getSeconds();

document.getElementById("hora").innerHTML = hora;
document.getElementById("minutos").innerHTML = minutos;
document.getElementById("segundos").innerHTML = segundos;





const grupo_A = ["Mexico", "Corea del Sur", "Republica Checa", "Sudáfrica"];

const grupo_B = ["Canada", "Suiza", "Bosnia Harzegobina", "Qatar"];

const grupo_C = ["Brasil", "Marruecos", "Escocia", "Haití"];

const grupo_D = ["Estados Unidos", "Australia", "Paraguay", "Turquia"];

const grupo_E = ["Alemania", "Costa Marfil", "Ecuador", "Curazao"];

const grupo_F = ["Paises Bajos", "Japón", "Suecia", "Túnez"];

const grupo_G = ["Egipto", "Iran", "Belgica", "Nueva Zelanda"];

const grupo_H = ["Esapaña", "Uruguay", "Cabo Verde", "Arabia Saudita"];

const grupo_I = ["Francia", "Noruega", "Senegal", "Irak"];

const grupo_J = ["Argentina", "Jordania", "Argelia", "Austria"];

const grupo_K = ["Colombia", "Republica Democratica del Congo", "Portugal", "Uzbekistán"];

const grupo_L = ["Inlgaterra", "Ghana", "Panamá", "Croacia"];

const posiciones_A = ["", "", "", ""];
const posiciones_B = ["", "", "", ""];
const posiciones_C = ["", "", "", ""];
const posiciones_D = ["", "", "", ""];
const posiciones_E = ["", "", "", ""];
const posiciones_F = ["", "", "", ""];
const posiciones_G = ["", "", "", ""];
const posiciones_H = ["", "", "", ""];
const posiciones_I = ["", "", "", ""];
const posiciones_J = ["", "", "", ""];
const posiciones_K = ["", "", "", ""];
const posiciones_L = ["", "", "", ""];

const PUNTOS_GANADOR = 3;
const PUNTOS_EMPATE = 1;
const PUNTOS_PERDEDOR = 0;

const puntos_A = [0, 0, 0, 0];
const puntos_B = [0, 0, 0, 0];
const puntos_C = [0, 0, 0, 0];
const puntos_D = [0, 0, 0, 0];
const puntos_E = [0, 0, 0, 0];
const puntos_F = [0, 0, 0, 0];
const puntos_G = [0, 0, 0, 0];
const puntos_H = [0, 0, 0, 0];
const puntos_I = [0, 0, 0, 0];
const puntos_J = [0, 0, 0, 0];
const puntos_K = [0, 0, 0, 0];
const puntos_L = [0, 0, 0, 0];



const golesFavorPorGrupo = {
  A: [0, 0, 0, 0],
  B: [0, 0, 0, 0],
  C: [0, 0, 0, 0],
  D: [0, 0, 0, 0],
  E: [0, 0, 0, 0],
  F: [0, 0, 0, 0],
  G: [0, 0, 0, 0],
  H: [0, 0, 0, 0],
  I: [0, 0, 0, 0],
  J: [0, 0, 0, 0],
  K: [0, 0, 0, 0],
  L: [0, 0, 0, 0]
};

const golesContraPorGrupo = {
  A: [0, 0, 0, 0],
  B: [0, 0, 0, 0],
  C: [0, 0, 0, 0],
  D: [0, 0, 0, 0],
  E: [0, 0, 0, 0],
  F: [0, 0, 0, 0],
  G: [0, 0, 0, 0],
  H: [0, 0, 0, 0],
  I: [0, 0, 0, 0],
  J: [0, 0, 0, 0],
  K: [0, 0, 0, 0],
  L: [0, 0, 0, 0]
};


// goles a favor y goles en contra 

const golesFavor_A = [0, 0, 0, 0];
const golesContra_A = [0, 0, 0, 0];



const golesFavor_B = [0, 0, 0, 0];
const golesContra_B = [0, 0, 0, 0];


const golesFavor_C = [0, 0, 0, 0];
const golesContra_C = [0, 0, 0, 0];


const golesFavor_D = [0, 0, 0, 0];
const golesContra_D = [0, 0, 0, 0];


const golesFavor_E = [0, 0, 0, 0];
const golesContra_E = [0, 0, 0, 0];


const golesFavor_F = [0, 0, 0, 0];
const golesContra_F = [0, 0, 0, 0];


const golesFavor_G = [0, 0, 0, 0];
const golesContra_G = [0, 0, 0, 0];


const golesFavor_H = [0, 0, 0, 0];
const golesContra_H = [0, 0, 0, 0];

const golesFavor_I = [0, 0, 0, 0];
const golesContra_I = [0, 0, 0, 0];

const golesFavor_J = [0, 0, 0, 0];
const golesContra_J = [0, 0, 0, 0];

const golesFavor_K = [0, 0, 0, 0];
const golesContra_K = [0, 0, 0, 0];


const golesFavor_L = [0, 0, 0, 0];
const golesContra_L = [0, 0, 0, 0];




// ... hasta el grupo L










const matchDefinitions = {
  A: [
    { local: "A_J1_1_local", away: "A_J1_1_away", localIdx: 0, awayIdx: 2 },
    { local: "A_J1_2_local", away: "A_J1_2_away", localIdx: 1, awayIdx: 3 },
    { local: "A_J2_1_local", away: "A_J2_1_away", localIdx: 0, awayIdx: 3 },
    { local: "A_J2_2_local", away: "A_J2_2_away", localIdx: 1, awayIdx: 2 },
    { local: "A_J3_1_local", away: "A_J3_1_away", localIdx: 0, awayIdx: 1 },
    { local: "A_J3_2_local", away: "A_J3_2_away", localIdx: 2, awayIdx: 3 }
  ],
  B: [
    { local: "B_J1_1_local", away: "B_J1_1_away", localIdx: 0, awayIdx: 2 },
    { local: "B_J1_2_local", away: "B_J1_2_away", localIdx: 1, awayIdx: 3 },
    { local: "B_J2_1_local", away: "B_J2_1_away", localIdx: 0, awayIdx: 3 },
    { local: "B_J2_2_local", away: "B_J2_2_away", localIdx: 1, awayIdx: 2 },
    { local: "B_J3_1_local", away: "B_J3_1_away", localIdx: 0, awayIdx: 1 },
    { local: "B_J3_2_local", away: "B_J3_2_away", localIdx: 2, awayIdx: 3 }
  ],
  C: [
    { local: "C_J1_1_local", away: "C_J1_1_away", localIdx: 0, awayIdx: 2 },
    { local: "C_J1_2_local", away: "C_J1_2_away", localIdx: 1, awayIdx: 3 },
    { local: "C_J2_1_local", away: "C_J2_1_away", localIdx: 0, awayIdx: 3 },
    { local: "C_J2_2_local", away: "C_J2_2_away", localIdx: 1, awayIdx: 2 },
    { local: "C_J3_1_local", away: "C_J3_1_away", localIdx: 0, awayIdx: 1 },
    { local: "C_J3_2_local", away: "C_J3_2_away", localIdx: 2, awayIdx: 3 }
  ],
  D: [
    { local: "D_J1_1_local", away: "D_J1_1_away", localIdx: 0, awayIdx: 2 },
    { local: "D_J1_2_local", away: "D_J1_2_away", localIdx: 1, awayIdx: 3 },
    { local: "D_J2_1_local", away: "D_J2_1_away", localIdx: 0, awayIdx: 3 },
    { local: "D_J2_2_local", away: "D_J2_2_away", localIdx: 1, awayIdx: 2 },
    { local: "D_J3_1_local", away: "D_J3_1_away", localIdx: 0, awayIdx: 1 },
    { local: "D_J3_2_local", away: "D_J3_2_away", localIdx: 2, awayIdx: 3 }
  ],
  E: [
    { local: "E_J1_1_local", away: "E_J1_1_away", localIdx: 0, awayIdx: 2 },
    { local: "E_J1_2_local", away: "E_J1_2_away", localIdx: 1, awayIdx: 3 },
    { local: "E_J2_1_local", away: "E_J2_1_away", localIdx: 0, awayIdx: 3 },
    { local: "E_J2_2_local", away: "E_J2_2_away", localIdx: 1, awayIdx: 2 },
    { local: "E_J3_1_local", away: "E_J3_1_away", localIdx: 0, awayIdx: 1 },
    { local: "E_J3_2_local", away: "E_J3_2_away", localIdx: 2, awayIdx: 3 }
  ],
  F: [
    { local: "F_J1_1_local", away: "F_J1_1_away", localIdx: 0, awayIdx: 2 },
    { local: "F_J1_2_local", away: "F_J1_2_away", localIdx: 1, awayIdx: 3 },
    { local: "F_J2_1_local", away: "F_J2_1_away", localIdx: 0, awayIdx: 3 },
    { local: "F_J2_2_local", away: "F_J2_2_away", localIdx: 1, awayIdx: 2 },
    { local: "F_J3_1_local", away: "F_J3_1_away", localIdx: 0, awayIdx: 1 },
    { local: "F_J3_2_local", away: "F_J3_2_away", localIdx: 2, awayIdx: 3 }
  ],
  G: [
    { local: "G_J1_1_local", away: "G_J1_1_away", localIdx: 0, awayIdx: 2 },
    { local: "G_J1_2_local", away: "G_J1_2_away", localIdx: 1, awayIdx: 3 },
    { local: "G_J2_1_local", away: "G_J2_1_away", localIdx: 0, awayIdx: 3 },
    { local: "G_J2_2_local", away: "G_J2_2_away", localIdx: 1, awayIdx: 2 },
    { local: "G_J3_1_local", away: "G_J3_1_away", localIdx: 0, awayIdx: 1 },
    { local: "G_J3_2_local", away: "G_J3_2_away", localIdx: 2, awayIdx: 3 }
  ],
  H: [
    { local: "H_J1_1_local", away: "H_J1_1_away", localIdx: 0, awayIdx: 2 },
    { local: "H_J1_2_local", away: "H_J1_2_away", localIdx: 1, awayIdx: 3 },
    { local: "H_J2_1_local", away: "H_J2_1_away", localIdx: 0, awayIdx: 3 },
    { local: "H_J2_2_local", away: "H_J2_2_away", localIdx: 1, awayIdx: 2 },
    { local: "H_J3_1_local", away: "H_J3_1_away", localIdx: 0, awayIdx: 1 },
    { local: "H_J3_2_local", away: "H_J3_2_away", localIdx: 2, awayIdx: 3 }
  ],
  I: [
    { local: "I_J1_1_local", away: "I_J1_1_away", localIdx: 0, awayIdx: 2 },
    { local: "I_J1_2_local", away: "I_J1_2_away", localIdx: 1, awayIdx: 3 },
    { local: "I_J2_1_local", away: "I_J2_1_away", localIdx: 0, awayIdx: 3 },
    { local: "I_J2_2_local", away: "I_J2_2_away", localIdx: 1, awayIdx: 2 },
    { local: "I_J3_1_local", away: "I_J3_1_away", localIdx: 0, awayIdx: 1 },
    { local: "I_J3_2_local", away: "I_J3_2_away", localIdx: 2, awayIdx: 3 }
  ],
  J: [
    { local: "J_J1_1_local", away: "J_J1_1_away", localIdx: 0, awayIdx: 2 },
    { local: "J_J1_2_local", away: "J_J1_2_away", localIdx: 1, awayIdx: 3 },
    { local: "J_J2_1_local", away: "J_J2_1_away", localIdx: 0, awayIdx: 3 },
    { local: "J_J2_2_local", away: "J_J2_2_away", localIdx: 1, awayIdx: 2 },
    { local: "J_J3_1_local", away: "J_J3_1_away", localIdx: 0, awayIdx: 1 },
    { local: "J_J3_2_local", away: "J_J3_2_away", localIdx: 2, awayIdx: 3 }
  ],
  K: [
    { local: "K_J1_1_local", away: "K_J1_1_away", localIdx: 0, awayIdx: 2 },
    { local: "K_J1_2_local", away: "K_J1_2_away", localIdx: 1, awayIdx: 3 },
    { local: "K_J2_1_local", away: "K_J2_1_away", localIdx: 0, awayIdx: 3 },
    { local: "K_J2_2_local", away: "K_J2_2_away", localIdx: 1, awayIdx: 2 },
    { local: "K_J3_1_local", away: "K_J3_1_away", localIdx: 0, awayIdx: 1 },
    { local: "K_J3_2_local", away: "K_J3_2_away", localIdx: 2, awayIdx: 3 }
  ],
  L: [
    { local: "L_J1_1_local", away: "L_J1_1_away", localIdx: 0, awayIdx: 2 },
    { local: "L_J1_2_local", away: "L_J1_2_away", localIdx: 1, awayIdx: 3 },
    { local: "L_J2_1_local", away: "L_J2_1_away", localIdx: 0, awayIdx: 3 },
    { local: "L_J2_2_local", away: "L_J2_2_away", localIdx: 1, awayIdx: 2 },
    { local: "L_J3_1_local", away: "L_J3_1_away", localIdx: 0, awayIdx: 1 },
    { local: "L_J3_2_local", away: "L_J3_2_away", localIdx: 2, awayIdx: 3 }
  ]
};

const puntosPorGrupo = {
  A: puntos_A,
  B: puntos_B,
  C: puntos_C,
  D: puntos_D,
  E: puntos_E,
  F: puntos_F,
  G: puntos_G,
  H: puntos_H,
  I: puntos_I,
  J: puntos_J,
  K: puntos_K,
  L: puntos_L
};

const grupos = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];

const equiposPorGrupo = {
  A: grupo_A, B: grupo_B, C: grupo_C, D: grupo_D,
  E: grupo_E, F: grupo_F, G: grupo_G, H: grupo_H,
  I: grupo_I, J: grupo_J, K: grupo_K, L: grupo_L
};

function buildGroupRows(group) {
  const equipos = equiposPorGrupo[group];
  const puntos = puntosPorGrupo[group];
  const golesFavor = golesFavorPorGrupo[group];
  const golesContra = golesContraPorGrupo[group];

  return puntos.map((puntosEquipo, idx) => ({
    equipo: equipos[idx],
    group,
    puntos: puntosEquipo,
    golesFavor: golesFavor[idx],
    golesContra: golesContra[idx],
    diferencia: golesFavor[idx] - golesContra[idx]
  })).sort((a, b) =>
    b.puntos - a.puntos ||
    b.diferencia - a.diferencia ||
    b.golesFavor - a.golesFavor ||
    a.equipo.localeCompare(b.equipo)
  );
}

function buildSummaryData() {
  const groups = grupos.map(group => {
    const rows = buildGroupRows(group).map((row, index) => ({ ...row, position: index + 1 }));
    const totalGoals = rows.reduce((sum, row) => sum + row.golesFavor, 0);
    return {
      group,
      rows,
      totalGoals,
      matchesPlayed: matchDefinitions[group].length,
      topTeam: rows[0] ? rows[0].equipo : '',
      topPoints: rows[0] ? rows[0].puntos : 0
    };
  });

  const allTeams = groups.flatMap(group => group.rows);
  const totalGoals = allTeams.reduce((sum, row) => sum + row.golesFavor, 0);
  const totalMatches = Object.values(matchDefinitions).reduce((sum, matches) => sum + matches.length, 0);
  const averageGoalsPerMatch = totalMatches ? Number((totalGoals / totalMatches).toFixed(2)) : 0;

  const bestAttack = allTeams.reduce((best, row) => (!best || row.golesFavor > best.golesFavor ? row : best), null);
  const bestDefense = allTeams.reduce((best, row) => (!best || row.golesContra < best.golesContra ? row : best), null);
  const bestPoints = allTeams.reduce((best, row) => (!best || row.puntos > best.puntos ? row : best), null);

  return {
    generatedAt: new Date().toISOString(),
    totalMatches,
    totalGoals,
    averageGoalsPerMatch,
    groups,
    bestAttack,
    bestDefense,
    bestPoints
  };
}

function initEvaluateButtonValidation() {
  const evaluateButton = document.getElementById('evaluate-button');
  const numberInputs = Array.from(document.querySelectorAll('input[type="number"]'));

  if (!evaluateButton || numberInputs.length === 0) return;

  const getScoreValue = input => {
    const value = input.value.trim();
    const score = Number(value);
    return value !== '' && Number.isFinite(score) ? score : null;
  };

  const evaluateGroupHasResult = group => {
    return matchDefinitions[group].some(match => {
      const localInput = document.getElementsByName(match.local)[0];
      const awayInput = document.getElementsByName(match.away)[0];
      if (!localInput || !awayInput) return false;
      const localScore = getScoreValue(localInput);
      const awayScore = getScoreValue(awayInput);
      return localScore !== null && awayScore !== null && (localScore !== 0 || awayScore !== 0);
    });
  };

  const validateButton = () => {
    const allGroupsHaveResult = Object.keys(matchDefinitions).every(evaluateGroupHasResult);
    evaluateButton.disabled = !allGroupsHaveResult;
  };

  evaluateButton.disabled = true;
  numberInputs.forEach(input => input.addEventListener('input', validateButton));
}

function handleFormSubmit(event) {
  evaluarResultado();
  const resumen = buildSummaryData();
  localStorage.setItem('mundial2026_summary', JSON.stringify(resumen));
}

function getScore(inputName) {
  const input = document.getElementsByName(inputName)[0];
  if (!input) return NaN;
  const value = parseInt(input.value, 10);
  return Number.isFinite(value) ? value : NaN;
}

function resetPoints() {
  Object.values(puntosPorGrupo).forEach(groupPoints => groupPoints.fill(0));
}

function resetGoles() {
  Object.values(golesFavorPorGrupo).forEach(g => g.fill(0));
  Object.values(golesContraPorGrupo).forEach(g => g.fill(0));
}




function evaluarResultado() {
  resetPoints();
  resetGoles();

  Object.entries(matchDefinitions).forEach(([group, matches]) => {
    const puntos = puntosPorGrupo[group];
    const golesFavor = golesFavorPorGrupo[group];
    const golesContra = golesContraPorGrupo[group];

    matches.forEach(match => {
      const localScore = getScore(match.local);
      const awayScore = getScore(match.away);

      if (Number.isNaN(localScore) || Number.isNaN(awayScore)) {
        return;
      }

      golesFavor[match.localIdx] += localScore;
      golesContra[match.localIdx] += awayScore;
      golesFavor[match.awayIdx] += awayScore;
      golesContra[match.awayIdx] += localScore;

      if (localScore > awayScore) {
        puntos[match.localIdx] += PUNTOS_GANADOR;
        puntos[match.awayIdx] += PUNTOS_PERDEDOR;
      } else if (localScore < awayScore) {
        puntos[match.localIdx] += PUNTOS_PERDEDOR;
        puntos[match.awayIdx] += PUNTOS_GANADOR;
      } else {
        puntos[match.localIdx] += PUNTOS_EMPATE;
        puntos[match.awayIdx] += PUNTOS_EMPATE;
      }
    });
  });

  renderClasificacion();
}




function renderGroupTable(group, tableBodyId) {
  const equipos = {
    A: grupo_A, B: grupo_B, C: grupo_C, D: grupo_D,
    E: grupo_E, F: grupo_F, G: grupo_G, H: grupo_H,
    I: grupo_I, J: grupo_J, K: grupo_K, L: grupo_L
  }[group];

  const puntos = puntosPorGrupo[group];
  const golesFavor = golesFavorPorGrupo[group];
  const golesContra = golesContraPorGrupo[group];

  const filas = puntos
    .map((puntosEquipo, idx) => ({
      equipo: equipos[idx],
      puntos: puntosEquipo,
      golesFavor: golesFavor[idx],
      golesContra: golesContra[idx],
      diferencia: golesFavor[idx] - golesContra[idx],
      idx
    }))
    .sort((a, b) =>
      b.puntos - a.puntos ||
      b.diferencia - a.diferencia ||
      b.golesFavor - a.golesFavor
    );

  const tbody = document.getElementById(tableBodyId);
  if (!tbody) return;

  tbody.innerHTML = filas
    .map((fila, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${fila.equipo}</td>
        <td>${fila.puntos}</td>
        <td>${fila.golesFavor}</td>
        <td>${fila.golesContra}</td>
        <td>${fila.diferencia}</td>
      </tr>
    `)
    .join('');
}




function renderClasificacion() {
  renderGroupTable('A', 'tablaA_body');
  renderGroupTable('B', 'tablaB_body');
  renderGroupTable('C', 'tablaC_body');
  renderGroupTable('D', 'tablaD_body');
  renderGroupTable('E', 'tablaE_body');
  renderGroupTable('F', 'tablaF_body');
  renderGroupTable('G', 'tablaG_body');
  renderGroupTable('H', 'tablaH_body');
  renderGroupTable('I', 'tablaI_body');
  renderGroupTable('J', 'tablaJ_body');
  renderGroupTable('K', 'tablaK_body');
  renderGroupTable('L', 'tablaL_body');
}

const tablaGrupoBodyIds = {
  A: 'tablaA_body', B: 'tablaB_body', C: 'tablaC_body', D: 'tablaD_body',
  E: 'tablaE_body', F: 'tablaF_body', G: 'tablaG_body', H: 'tablaH_body',
  I: 'tablaI_body', J: 'tablaJ_body', K: 'tablaK_body', L: 'tablaL_body'
};

function resetGrupo(group) {
  puntosPorGrupo[group].fill(0);
  golesFavorPorGrupo[group].fill(0);
  golesContraPorGrupo[group].fill(0);
}

function evaluarResultadoGrupo(group) {
  resetGrupo(group);

  const puntos = puntosPorGrupo[group];
  const golesFavor = golesFavorPorGrupo[group];
  const golesContra = golesContraPorGrupo[group];

  matchDefinitions[group].forEach(match => {
    const localScore = getScore(match.local);
    const awayScore = getScore(match.away);

    if (Number.isNaN(localScore) || Number.isNaN(awayScore)) {
      return;
    }

    golesFavor[match.localIdx] += localScore;
    golesContra[match.localIdx] += awayScore;
    golesFavor[match.awayIdx] += awayScore;
    golesContra[match.awayIdx] += localScore;

    if (localScore > awayScore) {
      puntos[match.localIdx] += PUNTOS_GANADOR;
      puntos[match.awayIdx] += PUNTOS_PERDEDOR;
    } else if (localScore < awayScore) {
      puntos[match.localIdx] += PUNTOS_PERDEDOR;
      puntos[match.awayIdx] += PUNTOS_GANADOR;
    } else {
      puntos[match.localIdx] += PUNTOS_EMPATE;
      puntos[match.awayIdx] += PUNTOS_EMPATE;
    }
  });
}

function setupScoreListeners() {
  // Las tablas se renderizan al pasar el cursor por cada grupo.
}

function rellenarTodosLosGrupos() {
  rellenarGrupo_A();
  rellenarGrupo_B();
  rellenarGrupo_C();
  rellenarGrupo_D();
  rellenarGrupo_E();
  rellenarGrupo_F();
  rellenarGrupo_G();
  rellenarGrupo_H();
  rellenarGrupo_I();
  rellenarGrupo_J();
  rellenarGrupo_K();
  rellenarGrupo_L();
}

function handleGrupoHover(group) {
  const fillFunction = window['rellenarGrupo_' + group];
  if (typeof fillFunction === 'function') {
    fillFunction();
  }
  evaluarResultadoGrupo(group);
  renderGroupTable(group, tablaGrupoBodyIds[group]);
}

// Inicializar nombres al cargar
document.addEventListener('DOMContentLoaded', () => {
  rellenarTodosLosGrupos();
  initEvaluateButtonValidation();
  const form = document.querySelector('form');
  if (form) {
    form.addEventListener('submit', handleFormSubmit);
  }
});

function rellenarGrupo_A() {
  document.getElementById("grupoA_J1_a").innerHTML = grupo_A[0];
  document.getElementById("grupoA_J1_b").innerHTML = grupo_A[2];
  document.getElementById("grupoA_J1_c").innerHTML = grupo_A[1];
  document.getElementById("grupoA_J1_d").innerHTML = grupo_A[3];

  document.getElementById("grupoA_J1_e").innerHTML = grupo_A[0];
  document.getElementById("grupoA_J1_f").innerHTML = grupo_A[3];
  document.getElementById("grupoA_J1_g").innerHTML = grupo_A[1];
  document.getElementById("grupoA_J1_h").innerHTML = grupo_A[2];

  document.getElementById("grupoA_J1_i").innerHTML = grupo_A[0];
  document.getElementById("grupoA_J1_j").innerHTML = grupo_A[1];
  document.getElementById("grupoA_J1_k").innerHTML = grupo_A[2];
  document.getElementById("grupoA_J1_l").innerHTML = grupo_A[3];
}

function rellenarGrupo_B() {
  document.getElementById("grupoB_J1_a").innerHTML = grupo_B[0];
  document.getElementById("grupoB_J1_b").innerHTML = grupo_B[2];
  document.getElementById("grupoB_J1_c").innerHTML = grupo_B[1];
  document.getElementById("grupoB_J1_d").innerHTML = grupo_B[3];

  document.getElementById("grupoB_J1_e").innerHTML = grupo_B[0];
  document.getElementById("grupoB_J1_f").innerHTML = grupo_B[3];
  document.getElementById("grupoB_J1_g").innerHTML = grupo_B[1];
  document.getElementById("grupoB_J1_h").innerHTML = grupo_B[2];

  document.getElementById("grupoB_J1_i").innerHTML = grupo_B[0];
  document.getElementById("grupoB_J1_j").innerHTML = grupo_B[1];
  document.getElementById("grupoB_J1_k").innerHTML = grupo_B[2];
  document.getElementById("grupoB_J1_l").innerHTML = grupo_B[3];
}

function rellenarGrupo_C() {
  document.getElementById("grupoC_J1_a").innerHTML = grupo_C[0];
  document.getElementById("grupoC_J1_b").innerHTML = grupo_C[2];
  document.getElementById("grupoC_J1_c").innerHTML = grupo_C[1];
  document.getElementById("grupoC_J1_d").innerHTML = grupo_C[3];

  document.getElementById("grupoC_J1_e").innerHTML = grupo_C[0];
  document.getElementById("grupoC_J1_f").innerHTML = grupo_C[3];
  document.getElementById("grupoC_J1_g").innerHTML = grupo_C[1];
  document.getElementById("grupoC_J1_h").innerHTML = grupo_C[2];

  document.getElementById("grupoC_J1_i").innerHTML = grupo_C[0];
  document.getElementById("grupoC_J1_j").innerHTML = grupo_C[1];
  document.getElementById("grupoC_J1_k").innerHTML = grupo_C[2];
  document.getElementById("grupoC_J1_l").innerHTML = grupo_C[3];
}

function rellenarGrupo_D() {
  document.getElementById("grupoD_J1_a").innerHTML = grupo_D[0];
  document.getElementById("grupoD_J1_b").innerHTML = grupo_D[2];
  document.getElementById("grupoD_J1_c").innerHTML = grupo_D[1];
  document.getElementById("grupoD_J1_d").innerHTML = grupo_D[3];

  document.getElementById("grupoD_J1_e").innerHTML = grupo_D[0];
  document.getElementById("grupoD_J1_f").innerHTML = grupo_D[3];
  document.getElementById("grupoD_J1_g").innerHTML = grupo_D[1];
  document.getElementById("grupoD_J1_h").innerHTML = grupo_D[2];

  document.getElementById("grupoD_J1_i").innerHTML = grupo_D[0];
  document.getElementById("grupoD_J1_j").innerHTML = grupo_D[1];
  document.getElementById("grupoD_J1_k").innerHTML = grupo_D[2];
  document.getElementById("grupoD_J1_l").innerHTML = grupo_D[3];
}

function rellenarGrupo_E() {
  document.getElementById("grupoE_J1_a").innerHTML = grupo_E[0];
  document.getElementById("grupoE_J1_b").innerHTML = grupo_E[2];
  document.getElementById("grupoE_J1_c").innerHTML = grupo_E[1];
  document.getElementById("grupoE_J1_d").innerHTML = grupo_E[3];

  document.getElementById("grupoE_J1_e").innerHTML = grupo_E[0];
  document.getElementById("grupoE_J1_f").innerHTML = grupo_E[3];
  document.getElementById("grupoE_J1_g").innerHTML = grupo_E[1];
  document.getElementById("grupoE_J1_h").innerHTML = grupo_E[2];

  document.getElementById("grupoE_J1_i").innerHTML = grupo_E[0];
  document.getElementById("grupoE_J1_j").innerHTML = grupo_E[1];
  document.getElementById("grupoE_J1_k").innerHTML = grupo_E[2];
  document.getElementById("grupoE_J1_l").innerHTML = grupo_E[3];
}

function rellenarGrupo_F() {
  document.getElementById("grupoF_J1_a").innerHTML = grupo_F[0];
  document.getElementById("grupoF_J1_b").innerHTML = grupo_F[2];
  document.getElementById("grupoF_J1_c").innerHTML = grupo_F[1];
  document.getElementById("grupoF_J1_d").innerHTML = grupo_F[3];

  document.getElementById("grupoF_J1_e").innerHTML = grupo_F[0];
  document.getElementById("grupoF_J1_f").innerHTML = grupo_F[3];
  document.getElementById("grupoF_J1_g").innerHTML = grupo_F[1];
  document.getElementById("grupoF_J1_h").innerHTML = grupo_F[2];

  document.getElementById("grupoF_J1_i").innerHTML = grupo_F[0];
  document.getElementById("grupoF_J1_j").innerHTML = grupo_F[1];
  document.getElementById("grupoF_J1_k").innerHTML = grupo_F[2];
  document.getElementById("grupoF_J1_l").innerHTML = grupo_F[3];
}

function rellenarGrupo_G() {
  document.getElementById("grupoG_J1_a").innerHTML = grupo_G[0];
  document.getElementById("grupoG_J1_b").innerHTML = grupo_G[2];
  document.getElementById("grupoG_J1_c").innerHTML = grupo_G[1];
  document.getElementById("grupoG_J1_d").innerHTML = grupo_G[3];

  document.getElementById("grupoG_J1_e").innerHTML = grupo_G[0];
  document.getElementById("grupoG_J1_f").innerHTML = grupo_G[3];
  document.getElementById("grupoG_J1_g").innerHTML = grupo_G[1];
  document.getElementById("grupoG_J1_h").innerHTML = grupo_G[2];

  document.getElementById("grupoG_J1_i").innerHTML = grupo_G[0];
  document.getElementById("grupoG_J1_j").innerHTML = grupo_G[1];
  document.getElementById("grupoG_J1_k").innerHTML = grupo_G[2];
  document.getElementById("grupoG_J1_l").innerHTML = grupo_G[3];
}

function rellenarGrupo_H() {
  document.getElementById("grupoH_J1_a").innerHTML = grupo_H[0];
  document.getElementById("grupoH_J1_b").innerHTML = grupo_H[2];
  document.getElementById("grupoH_J1_c").innerHTML = grupo_H[1];
  document.getElementById("grupoH_J1_d").innerHTML = grupo_H[3];

  document.getElementById("grupoH_J1_e").innerHTML = grupo_H[0];
  document.getElementById("grupoH_J1_f").innerHTML = grupo_H[3];
  document.getElementById("grupoH_J1_g").innerHTML = grupo_H[1];
  document.getElementById("grupoH_J1_h").innerHTML = grupo_H[2];

  document.getElementById("grupoH_J1_i").innerHTML = grupo_H[0];
  document.getElementById("grupoH_J1_j").innerHTML = grupo_H[1];
  document.getElementById("grupoH_J1_k").innerHTML = grupo_H[2];
  document.getElementById("grupoH_J1_l").innerHTML = grupo_H[3];
}

function rellenarGrupo_I() {
  document.getElementById("grupoI_J1_a").innerHTML = grupo_I[0];
  document.getElementById("grupoI_J1_b").innerHTML = grupo_I[2];
  document.getElementById("grupoI_J1_c").innerHTML = grupo_I[1];
  document.getElementById("grupoI_J1_d").innerHTML = grupo_I[3];

  document.getElementById("grupoI_J1_e").innerHTML = grupo_I[0];
  document.getElementById("grupoI_J1_f").innerHTML = grupo_I[3];
  document.getElementById("grupoI_J1_g").innerHTML = grupo_I[1];
  document.getElementById("grupoI_J1_h").innerHTML = grupo_I[2];

  document.getElementById("grupoI_J1_i").innerHTML = grupo_I[0];
  document.getElementById("grupoI_J1_j").innerHTML = grupo_I[1];
  document.getElementById("grupoI_J1_k").innerHTML = grupo_I[2];
  document.getElementById("grupoI_J1_l").innerHTML = grupo_I[3];
}

function rellenarGrupo_J() {
  document.getElementById("grupoJ_J1_a").innerHTML = grupo_J[0];
  document.getElementById("grupoJ_J1_b").innerHTML = grupo_J[2];
  document.getElementById("grupoJ_J1_c").innerHTML = grupo_J[1];
  document.getElementById("grupoJ_J1_d").innerHTML = grupo_J[3];

  document.getElementById("grupoJ_J1_e").innerHTML = grupo_J[0];
  document.getElementById("grupoJ_J1_f").innerHTML = grupo_J[3];
  document.getElementById("grupoJ_J1_g").innerHTML = grupo_J[1];
  document.getElementById("grupoJ_J1_h").innerHTML = grupo_J[2];

  document.getElementById("grupoJ_J1_i").innerHTML = grupo_J[0];
  document.getElementById("grupoJ_J1_j").innerHTML = grupo_J[1];
  document.getElementById("grupoJ_J1_k").innerHTML = grupo_J[2];
  document.getElementById("grupoJ_J1_l").innerHTML = grupo_J[3];
}

function rellenarGrupo_K() {
  document.getElementById("grupoK_J1_a").innerHTML = grupo_K[0];
  document.getElementById("grupoK_J1_b").innerHTML = grupo_K[2];
  document.getElementById("grupoK_J1_c").innerHTML = grupo_K[1];
  document.getElementById("grupoK_J1_d").innerHTML = grupo_K[3];

  document.getElementById("grupoK_J1_e").innerHTML = grupo_K[0];
  document.getElementById("grupoK_J1_f").innerHTML = grupo_K[3];
  document.getElementById("grupoK_J1_g").innerHTML = grupo_K[1];
  document.getElementById("grupoK_J1_h").innerHTML = grupo_K[2];

  document.getElementById("grupoK_J1_i").innerHTML = grupo_K[0];
  document.getElementById("grupoK_J1_j").innerHTML = grupo_K[1];
  document.getElementById("grupoK_J1_k").innerHTML = grupo_K[2];
  document.getElementById("grupoK_J1_l").innerHTML = grupo_K[3];
}

function rellenarGrupo_L() {
  document.getElementById("grupoL_J1_a").innerHTML = grupo_L[0];
  document.getElementById("grupoL_J1_b").innerHTML = grupo_L[2];
  document.getElementById("grupoL_J1_c").innerHTML = grupo_L[1];
  document.getElementById("grupoL_J1_d").innerHTML = grupo_L[3];

  document.getElementById("grupoL_J1_e").innerHTML = grupo_L[0];
  document.getElementById("grupoL_J1_f").innerHTML = grupo_L[3];
  document.getElementById("grupoL_J1_g").innerHTML = grupo_L[1];
  document.getElementById("grupoL_J1_h").innerHTML = grupo_L[2];

  document.getElementById("grupoL_J1_i").innerHTML = grupo_L[0];
  document.getElementById("grupoL_J1_j").innerHTML = grupo_L[1];
  document.getElementById("grupoL_J1_k").innerHTML = grupo_L[2];
  document.getElementById("grupoL_J1_l").innerHTML = grupo_L[3];
}
