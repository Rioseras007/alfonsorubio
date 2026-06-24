document.addEventListener('DOMContentLoaded', () => {
    const summary = JSON.parse(localStorage.getItem('mundial2026_summary') || 'null');
    const container = document.getElementById('summary-container');
    const backButton = document.getElementById('back-button');

    if (!container) return;

    if (!summary) {
        container.innerHTML = '<p>No hay datos de resumen disponibles. Vuelve a completar los resultados en la página principal.</p>';
        return;
    }

    const bestAttack = summary.bestAttack ? `${summary.bestAttack.equipo} (${summary.bestAttack.golesFavor} goles)` : 'N/A';
    const bestDefense = summary.bestDefense ? `${summary.bestDefense.equipo} (${summary.bestDefense.golesContra} goles en contra)` : 'N/A';
    const bestPoints = summary.bestPoints ? `${summary.bestPoints.equipo} (${summary.bestPoints.puntos} puntos)` : 'N/A';

    container.innerHTML = `
    <div class="mb-4">
      <h2>Resumen General</h2>
      <p><strong>Fecha:</strong> ${new Date(summary.generatedAt).toLocaleString()}</p>
      <p><strong>Partidos totales:</strong> ${summary.totalMatches}</p>
      <p><strong>Goles totales:</strong> ${summary.totalGoals}</p>
      <p><strong>Goles promedio por partido:</strong> ${summary.averageGoalsPerMatch}</p>
      <p><strong>Mejor ataque:</strong> ${bestAttack}</p>
      <p><strong>Mejor defensa:</strong> ${bestDefense}</p>
      <p><strong>Más puntos:</strong> ${bestPoints}</p>
    </div>
    <div class="mb-4">
      <h2>Resumen por Grupo</h2>
      ${summary.groups.map(group => `
        <div class="mb-3">
          <h3>Grupo ${group.group}</h3>
          <p><strong>Equipo líder:</strong> ${group.topTeam} (${group.topPoints} puntos)</p>
          <p><strong>Goles del grupo:</strong> ${group.totalGoals}</p>
          <table class="table table-sm table-striped">
            <thead>
              <tr>
                <th>Pos</th>
                <th>Equipo</th>
                <th>Puntos</th>
                <th>GF</th>
                <th>GC</th>
                <th>Dif</th>
              </tr>
            </thead>
            <tbody>
              ${group.rows.map(row => `
                <tr>
                  <td>${row.position}</td>
                  <td>${row.equipo}</td>
                  <td>${row.puntos}</td>
                  <td>${row.golesFavor}</td>
                  <td>${row.golesContra}</td>
                  <td>${row.diferencia}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      `).join('')}
    </div>
  `;

    if (backButton) {
        backButton.addEventListener('click', () => window.location.href = 'index.html');
    }
});
