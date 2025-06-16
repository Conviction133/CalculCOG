let index = 0;

function ajouterEssieu() {
  const container = document.getElementById("essieux-container");
  const div = document.createElement("div");
  div.className = "essieu";
  div.innerHTML = `
    <label>Essieu ${index + 1} - Distance depuis l'avant (po)</label>
    <input type="number" id="distance-${index}" placeholder="ex: 120" />
    <label>Poids sur l'essieu (lb)</label>
    <input type="number" id="poids-${index}" placeholder="ex: 2800" />
  `;
  container.appendChild(div);
  index++;
}

function calculerCG() {
  const longueur = parseFloat(document.getElementById("longueur-totale").value);
  const empattement = parseFloat(document.getElementById("empattement").value);

  if (isNaN(longueur) || longueur <= 0) {
    document.getElementById("resultat").innerText = "⚠️ Longueur totale invalide.";
    return;
  }

  if (isNaN(empattement) || empattement <= 0) {
    document.getElementById("resultat").innerText = "⚠️ Empattement invalide.";
    return;
  }

  let totalPoids = 0;
  let momentTotal = 0;

  for (let i = 0; i < index; i++) {
    const dist = parseFloat(document.getElementById(`distance-${i}`).value);
    const poids = parseFloat(document.getElementById(`poids-${i}`).value);

    if (isNaN(dist) || isNaN(poids)) {
      document.getElementById("resultat").innerText = "⚠️ Tous les champs doivent être remplis.";
      return;
    }

    totalPoids += poids;
    momentTotal += dist * poids;
  }

  if (totalPoids === 0) {
    document.getElementById("resultat").innerText = "⚠️ Le poids total est nul.";
    return;
  }

  const cg = momentTotal / totalPoids;

  document.getElementById("resultat").innerHTML = `
    📍 Centre de gravité : <strong>${cg.toFixed(2)} pouces</strong> depuis l'essieu avant<br>
    📏 Longueur totale : ${longueur} pouces<br>
    🔧 Empattement : ${empattement} pouces<br>
    🔢 Nombre d'essieux : ${index}
  `;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("ajouter-btn").addEventListener("click", ajouterEssieu);
  document.getElementById("calculer-btn").addEventListener("click", calculerCG);
  ajouterEssieu();
  ajouterEssieu();
});
