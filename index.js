let naohConcentration = 0; // Variable to store the NaOH concentration
let aliquotVolume = 20; // Default aliquot volume is 20 ml
let darkMode = false;

function setAliquotVolume(volume) {
  aliquotVolume = volume;

  const button20 = document.getElementById("button20");
  const button25 = document.getElementById("button25");

  if (volume === 20) {
    button20.classList.add("active");
    button25.classList.remove("active");
  } else {
    button20.classList.remove("active");
    button25.classList.add("active");
  }
}

function calculateConcentration() {
  const khpGrams = parseFloat(document.getElementById("khpGrams").value);
  const naohVolume = parseFloat(document.getElementById("naohVolume").value);
  const naohVolumeInLitres = (naohVolume / 1000)
  const aliquotVolumeVolumeInLitres = (aliquotVolume / 1000)

  const molarMassKHP = 204.2218; // g/mol (more precise value)



  const molesKHP = khpGrams / molarMassKHP; // n = m / M
  const aliquotConcentration = molesKHP / 0.1 // c = n / v
  const molesKHPinFlask = aliquotConcentration * aliquotVolumeVolumeInLitres; // n = cv
  const molesNaOHinFlask = molesKHPinFlask; // n1 = n2
  const naohConcentration = molesNaOHinFlask / naohVolumeInLitres; // c = n / v

  document.getElementById("result").innerHTML = `
  v(Aliquot) = ${aliquotVolume.toFixed(3)} mL <br> 
  n(KHP) = ${molesKHP.toFixed(10)} mol <br> 
  n(NaOH) = ${molesNaOHinFlask.toFixed(10)} mol <br> 
  c(NaOH) = ${naohConcentration.toFixed(10)} M
  `;
}

function calculateUnknownMoles() {
  const naohConcentrationPart2 = parseFloat(document.getElementById("naohConcentrationPart2").value);
  const unknownNaohVolume = parseFloat(document.getElementById("unknownNaohVolume").value);

  const NaohMolesPart2 = (naohConcentrationPart2 * (unknownNaohVolume / 1000)); // n = cv
  const unknownMolesKHP = NaohMolesPart2; // n = n
  const unknownMolesKHPTotal = unknownMolesKHP * (100 / aliquotVolume); // 100mL flask
  document.getElementById("unknownResult").innerHTML = `
  v(Aliquot) = ${aliquotVolume.toFixed(3)} mL <br> 
  n(KHP) = ${unknownMolesKHPTotal.toFixed(10)} mol.
  `;
}

function calculateAverageVolume() {
  const numTitration = parseFloat(document.getElementById("numTitration").value);
  const volumeInputs = document.querySelectorAll(".naohVolumeInput");

  let totalNaohUsed = 0;
  volumeInputs.forEach(input => {
    const volume = parseFloat(input.value);
    totalNaohUsed += volume;
  });

  const avgVolume = totalNaohUsed / numTitration;

  document.getElementById("avgVolumeResult").innerHTML = `The average volume of NaOH used is ${avgVolume.toFixed(10)} ml.`;
}

document.getElementById("numTitration").addEventListener("change", function () {
  const numTitration = parseInt(this.value);
  const volumeInputs = document.getElementById("volumeInputs");
  volumeInputs.innerHTML = ""; // Clear previous inputs

  for (let i = 0; i < numTitration; i++) {
    const input = document.createElement("input");
    input.type = "number";
    input.step = "0.1";
    input.placeholder = `Volume for Titration ${i + 1}`;
    input.className = "naohVolumeInput";
    volumeInputs.appendChild(input);
  }
});
