/**
 * SalBovino Pro - Lógica Interactiva
 * Plataforma Zootécnica de Suplementación Mineral en Bovinos
 */

// ==========================================================================
// 1. Base de Datos de Elementos Minerales (Macro y Micro)
// ==========================================================================
const MINERALS_DATA = [
  {
    id: "nacl",
    name: "Cloruro de Sodio (NaCl)",
    symbol: "NaCl",
    type: "macro",
    range: "55.0 - 65.0 %",
    role: "Regula el equilibrio osmótico y ácido-base, volumen plasmático y transporte de nutrientes. Actúa como el principal regulador y modulador del consumo voluntario en potrero.",
    deficiency: "Signos: Pica voraz, lamido de tierra o sudor de otros bovinos, deshidratación rápida y caída abrupta en la producción láctea.",
    badgeClass: "badge-macro"
  },
  {
    id: "ca",
    name: "Calcio (Ca)",
    symbol: "Ca",
    type: "macro",
    range: "10.0 - 15.0 %",
    role: "Componente estructural principal de huesos y dientes. Esencial en la cascada de coagulación sanguínea, contracción miocárdica y transmisión del impulso nervioso.",
    deficiency: "Signos: Raquitismo en terneros, osteomalacia en adultos y fiebre de leche (hipocalcemia aguda peripartal) en vacas lecheras.",
    badgeClass: "badge-macro"
  },
  {
    id: "p",
    name: "Fósforo (P)",
    symbol: "P",
    type: "macro",
    range: "5.0 - 10.0 %",
    role: "Clave en la transferencia de energía celular (ATP/ADP), metabolismo de carbohidratos, fosfolípidos de membranas y síntesis de proteína microbiana ruminal.",
    deficiency: "Signos: Alotrifagia (pica de huesos y madera), anestro prolongado, baja tasa de preñez, fragilidad ósea y caquexia.",
    badgeClass: "badge-macro"
  },
  {
    id: "mg",
    name: "Magnesio (Mg)",
    symbol: "Mg",
    type: "macro",
    range: "3.0 - 5.0 %",
    role: "Activador de más de 300 sistemas enzimáticos, estabilidad neuromuscular y utilización ruminal del nitrógeno no proteico (NNP).",
    deficiency: "Signos: Tetania de los pastos (hipomagnesemia), hiperexcitabilidad, espasmos musculares involuntarios, ataxia y muerte súbita.",
    badgeClass: "badge-macro"
  },
  {
    id: "k",
    name: "Potasio (K)",
    symbol: "K",
    type: "macro",
    range: "2.0 - 4.0 %",
    role: "Principal catión intracelular. Mantiene la presión osmótica, excitabilidad cardíaca y termorregulación en condiciones de estrés térmico.",
    deficiency: "Signos: Raro en pastoreo verde. En ensilajes lavados produce debilidad muscular, pica, rigidez articular y menor consumo de materia seca.",
    badgeClass: "badge-macro"
  },
  {
    id: "s",
    name: "Azufre (S)",
    symbol: "S",
    type: "macro",
    range: "1.0 - 2.0 %",
    role: "Imprescindible para la síntesis de aminoácidos azufrados (metionina y cisteína) por las bacterias del rumen, biotina y tiamina.",
    deficiency: "Signos: Pérdida del apetito, reducción del crecimiento del vellón y pelaje, baja digestibilidad ruminal de la fibra detergente neutra (FDN).",
    badgeClass: "badge-macro"
  },
  {
    id: "zn",
    name: "Zinc (Zn)",
    symbol: "Zn",
    type: "micro",
    range: "0.10 - 0.30 % (1,000 - 3,000 ppm)",
    role: "Componente de la anhidrasa carbónica y alcohol deshidrogenasa. Fundamental para la queratinización podal, integridad de ubre e inmunidad de mucosas.",
    deficiency: "Signos: Paraqueratosis cutánea, cojeras crónicas, pezuñas quebradizas, espermatogénesis deficiente en toros y retraso en cicatrización.",
    badgeClass: "badge-micro"
  },
  {
    id: "cu",
    name: "Cobre (Cu)",
    symbol: "Cu",
    type: "micro",
    range: "0.05 - 0.20 % (500 - 2,000 ppm)",
    role: "Cofactor de la ceruloplasmina, citocromo C oxidasa y superóxido dismutasa. Clave en síntesis de hemoglobina y melanina del pelaje.",
    deficiency: "Signos: Acromotriquia (pelaje despigmentado en anteojera), diarreas intermitentes, ataxia enneonatal (swayback) y susceptibilidad a parásitos.",
    badgeClass: "badge-micro"
  },
  {
    id: "mn",
    name: "Manganeso (Mn)",
    symbol: "Mn",
    type: "micro",
    range: "0.05 - 0.20 % (500 - 2,000 ppm)",
    role: "Síntesis de mucopolisacáridos del cartílago óseo, colesterol ovárico y activación enzimática del ciclo de Krebs.",
    deficiency: "Signos: Deformidades óseas congénitas en crías (patas torcidas), celos silentes en novillas y baja fertilidad al primer servicio.",
    badgeClass: "badge-micro"
  },
  {
    id: "se",
    name: "Selenio (Se)",
    symbol: "Se",
    type: "micro",
    range: "0.01 - 0.03 % (100 - 300 ppm)",
    role: "Potente antioxidante como componente de la Glutation Peroxidasa (GSH-Px). Trabaja sinérgicamente con la Vitamina E en la protección de membranas lipídicas.",
    deficiency: "Signos: Enfermedad del músculo blanco (distrofia muscular nutricional) en terneros, retención de placenta y alta tasa de mastitis clínica.",
    badgeClass: "badge-micro"
  },
  {
    id: "co",
    name: "Cobalto (Co)",
    symbol: "Co",
    type: "micro",
    range: "0.001 - 0.005 % (10 - 50 ppm)",
    role: "Precursor esencial para la síntesis ruminal de Vitamina B12 (cobalamina). Vital para la vía del propionato y gluconeogénesis hepática.",
    deficiency: "Signos: Síndrome de emaciación progresiva (enanismo nutricional), anemia normocítica y lagrimeo crónico con pérdida de condición corporal.",
    badgeClass: "badge-micro"
  }
];

// ==========================================================================
// 2. Renderizado de Elementos Minerales con Filtro
// ==========================================================================
function renderMinerals(filterType = "all") {
  const container = document.getElementById("mineralGrid");
  if (!container) return;

  container.innerHTML = "";

  const filtered = MINERALS_DATA.filter(mineral => {
    if (filterType === "all") return true;
    return mineral.type === filterType;
  });

  filtered.forEach(item => {
    const card = document.createElement("div");
    card.className = "mineral-card";
    card.setAttribute("data-type", item.type);

    card.innerHTML = `
      <div class="mineral-card-top">
        <div class="mineral-symbol ${item.type === 'micro' ? 'micro' : ''}">${item.symbol}</div>
        <span class="mineral-category-badge ${item.badgeClass}">${item.type === 'macro' ? 'Macroelemento' : 'Microelemento'}</span>
      </div>
      <h3 class="mineral-name">${item.name}</h3>
      <span class="mineral-range">Inclusión en Sal: <strong>${item.range}</strong></span>
      <p class="mineral-role">${item.role}</p>
      <div class="mineral-deficiency">
        <i class="fas fa-triangle-exclamation"></i> ${item.deficiency}
      </div>
    `;

    container.appendChild(card);
  });
}

function initMineralFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const filter = btn.getAttribute("data-filter");
      renderMinerals(filter);
    });
  });
}

// ==========================================================================
// 3. Calculadora de Suplementación y Presupuesto
// ==========================================================================
const CATEGORY_PRESETS = {
  cria: { defaultGramos: 80, defaultP: 8, title: "Vacas de Cría / Nodrizas", note: "El requerimiento de fósforo ($P$) es crítico durante la lactancia temprana para reiniciar el ciclo ovárico antes de los 80 días posparto. Se aconseja sal mineralizada al 8% a 10% de Fósforo con buen aporte de Cobre y Selenio." },
  levante: { defaultGramos: 60, defaultP: 6, title: "Levante / Novillas de Reemplazo", note: "Fomenta el crecimiento óseo armónico sin engrasamiento prematuro de la ubre. Relación $Ca:P$ cercana a 1.5:1 con mínimo 6% de Fósforo y buen contenido de Zinc para el desarrollo podal." },
  ceba: { defaultGramos: 50, defaultP: 4, title: "Ceba / Engorde en Pastoreo", note: "En novillos de ceba, la prioridad es la ganancia diaria de peso ($GDP$) y síntesis de proteína microbiana. Sal al 4% a 6% de Fósforo enriquecida con Azufre ($S$) para maximizar la degradación de fibra en rumen." },
  leche: { defaultGramos: 100, defaultP: 8, title: "Vaca Leche Especializada", note: "Alto drenaje de calcio y fósforo por glándula mamaria (cada litro contiene aprox. 1.2 g de $Ca$ y 0.9 g de $P$). Indispensable reforzar con Magnesio ($4-5\% \text{ Mg}$) para evitar tetania de los pastos." },
  doble: { defaultGramos: 75, defaultP: 6, title: "Doble Propósito Tropical", note: "Formulación equilibrada al 6% - 8% de Fósforo con microelementos traza para superar el estrés calórico y pastos con alta lignificación en trópico bajo." },
  toro: { defaultGramos: 90, defaultP: 8, title: "Toros Reproductores", note: "Altos niveles de Zinc ($Zn$) y Selenio ($Se$) requeridos para la espermatogénesis, integridad de la membrana acrosomal y libido durante la temporada de monta." }
};

function initCalculator() {
  const catSelect = document.getElementById("calcCategoria");
  const animalesInput = document.getElementById("calcAnimales");
  const diasInput = document.getElementById("calcDias");
  const gramosSlider = document.getElementById("calcGramos");
  const gramosDisplay = document.getElementById("valGramos");
  const pSelect = document.getElementById("calcPorcPhosphorus");
  const bultoKgSelect = document.getElementById("calcBultoKg");
  const precioBultoInput = document.getElementById("calcPrecioBulto");
  const btnRecalcular = document.getElementById("btnRecalcular");

  if (!catSelect || !gramosSlider) return;

  // Cambiar categoría actualiza defaults recomendados
  catSelect.addEventListener("change", () => {
    const preset = CATEGORY_PRESETS[catSelect.value];
    if (preset) {
      gramosSlider.value = preset.defaultGramos;
      gramosDisplay.textContent = `${preset.defaultGramos} g/día`;
      pSelect.value = preset.defaultP;
      calculateSalBovino();
    }
  });

  gramosSlider.addEventListener("input", () => {
    gramosDisplay.textContent = `${gramosSlider.value} g/día`;
    calculateSalBovino();
  });

  [animalesInput, diasInput, pSelect, bultoKgSelect, precioBultoInput].forEach(elem => {
    elem.addEventListener("input", calculateSalBovino);
  });

  if (btnRecalcular) {
    btnRecalcular.addEventListener("click", (e) => {
      e.preventDefault();
      calculateSalBovino();
      showToast("Estimación de sal mineralizada recalculada con éxito");
    });
  }

  calculateSalBovino();
}

function calculateSalBovino() {
  const animales = parseFloat(document.getElementById("calcAnimales")?.value) || 0;
  const dias = parseFloat(document.getElementById("calcDias")?.value) || 0;
  const gramosDia = parseFloat(document.getElementById("calcGramos")?.value) || 0;
  const porcPhosphorus = parseFloat(document.getElementById("calcPorcPhosphorus")?.value) || 8;
  const bultoKg = parseFloat(document.getElementById("calcBultoKg")?.value) || 40;
  const precioBulto = parseFloat(document.getElementById("calcPrecioBulto")?.value) || 0;
  const categoria = document.getElementById("calcCategoria")?.value || "leche";

  // Cálculos matemáticos
  const kgDiaTotal = (animales * gramosDia) / 1000;
  const kgTotalPeriodo = kgDiaTotal * dias;
  const bultosExacto = kgTotalPeriodo / bultoKg;
  const bultosComprar = Math.ceil(bultosExacto);
  const inversionTotal = bultosComprar * precioBulto;
  const costoAnimalDia = animales > 0 && dias > 0 ? (inversionTotal / (animales * dias)) : 0;
  const gramosPingeridos = (gramosDia * porcPhosphorus) / 100;

  // Renderizar KPIs
  const elKgDia = document.getElementById("resKgDia");
  const elKgTotal = document.getElementById("resKgTotal");
  const elBultos = document.getElementById("resBultos");
  const elBultosExacto = document.getElementById("resBultosExacto");
  const elInversion = document.getElementById("resInversionTotal");
  const elCostoAnimalDia = document.getElementById("resCostoAnimalDia");

  if (elKgDia) elKgDia.textContent = `${kgDiaTotal.toFixed(2)} kg/día`;
  if (elKgTotal) elKgTotal.textContent = `${Math.round(kgTotalPeriodo).toLocaleString()} kg`;
  if (elBultos) elBultos.textContent = `${bultosComprar} Bultos (${bultoKg} kg)`;
  if (elBultosExacto) elBultosExacto.textContent = `(${bultosExacto.toFixed(1)} bultos netos sin desperdicio)`;
  if (elInversion) elInversion.textContent = `$ ${Math.round(inversionTotal).toLocaleString()}`;
  if (elCostoAnimalDia) elCostoAnimalDia.textContent = `$ ${Math.round(costoAnimalDia).toLocaleString()} / cabeza / día`;

  // Actualizar dictamen técnico
  const alertTitle = document.getElementById("calcAlertTitle");
  const alertText = document.getElementById("calcAlertText");
  const preset = CATEGORY_PRESETS[categoria] || CATEGORY_PRESETS.leche;

  if (alertTitle && alertText) {
    alertTitle.textContent = `Dictamen Zootécnico: ${preset.title}`;
    alertText.innerHTML = `
      Con un consumo individual de <strong>${gramosDia} g/día</strong> de sal al <strong>${porcPhosphorus}% de Fósforo</strong>, cada bovino recibe directamente <strong>${gramosPingeridos.toFixed(1)} gramos de P puro/día</strong> vía suplemento. 
      ${preset.note}
    `;
  }
}

// ==========================================================================
// 4. Simulador Interactivo de la Skill SalBovino Pro
// ==========================================================================
const SIMULATED_RESPONSES = {
  "ca-p": {
    question: "¿Cómo afecta una relación desbalanceada de $Ca:P$ en la dieta de vacas lecheras en el tercio medio de lactancia?",
    answer: `<strong>Diagnóstico SalBovino Pro:</strong>
      <br><br>
      1. <strong>Fisiología Ruminal y Absorción:</strong> En vacas en lactancia, la relación dietética ideal de $Ca:P$ debe mantenerse entre <strong>$1.5:1$ y $2.0:1$</strong>. Una relación invertida ($Ca:P < 1:1$, frecuente cuando se ofrecen excesos de granos o subproductos como afrecho de trigo sin corregir) disminuye la absorción activa de calcio a nivel duodenal y satura los receptores de vitamina D3 activa ($1,25-(OH)_2-D_3$).
      <br><br>
      2. <strong>Consecuencias Clínicas:</strong>
      <ul>
        <li>Hiperparatiroidismo nutricional secundario con reabsorción osteolítica ósea.</li>
        <li>Caída en la síntesis de caseína y sólidos totales de la leche.</li>
        <li>Celos silentes por déficit de fosfatos energéticos en la cascada ovárica.</li>
      </ul>
      3. <strong>Estrategia Correctiva en Saladero:</strong> Ofrecer sal mineralizada con mínimo $12\\% \\text{ Ca}$ y $8\\% \\text{ P}$, garantizando una relación en la mezcla de $1.5:1$ y monitoreando el consumo en $90-110 \\text{ g/vaca/día}$.`
  },
  "suelos-acidos": {
    question: "Tengo un hato de cría en suelos ácidos de sabana tropical con bajo fósforo en pasto. ¿Qué sal recomiendo?",
    answer: `<strong>Diagnóstico SalBovino Pro:</strong>
      <br><br>
      1. <strong>Condición de Sabana Tropical (Oxisoles/Ultisoles):</strong> Los pastos como <em>Brachiaria decumbens</em> o sabanas nativas en suelos con pH menor a 5.0 fijan el fósforo en forma de fosfatos de hierro y aluminio insolubles, arrojando niveles foliares de fósforo menores a $0.12\\% \\text{ P}$ (cuando el requerimiento del NRC es $\\ge 0.22\\%$).
      <br><br>
      2. <strong>Formulación Recomendada:</strong>
      <ul>
        <li><strong>Fósforo Total:</strong> Mínimo <strong>$8.0\\% \\text{ a } 10.0\\% \\text{ P}$</strong> proveniente de fosfato bicálcico desfluorinado ($F < 0.1\\%$) o fosfato monocálcico de alta solubilidad.</li>
        <li><strong>Cloruro de Sodio ($NaCl$):</strong> $55\\%$ para forzar un consumo de $70-90 \\text{ g/animal/día}$.</li>
        <li><strong>Microminerales Clave:</strong> Incluir $0.15\\% \\text{ Cu}$, $0.25\\% \\text{ Zn}$ y $0.02\\% \\text{ Se}$ para revertir el desgaste reproductivo.</li>
      </ul>
      3. <strong>Impacto Esperado:</strong> Elevación de la tasa de preñez del $48\\%$ tradicional a más del $75\\%$ en 2 ciclos continuos.`
  },
  "tiomolibdato": {
    question: "¿Por qué el exceso de azufre ($S$) y molibdeno ($Mo$) en forraje induce deficiencia secundaria de cobre ($Cu$)?",
    answer: `<strong>Diagnóstico SalBovino Pro:</strong>
      <br><br>
      1. <strong>Mecanismo Bioquímico del Tiomolibdato:</strong> Bajo las condiciones anaeróbicas y reductoras del rumen, los sulfatos ($SO_4^{2-}$) aportados por pastos tiernos o aguas duras son reducidos por las bacterias ruminales a sulfuros ($S^{2-}$). 
      <br><br>
      2. Cuando el Molibdeno ($Mo$) está presente en concentraciones $> 2-3 \\text{ ppm}$, reacciona con los sulfuros formando <strong>tetratiomolibdatos</strong> ($[MoS_4]^{2-}$):
      <br>
      <div style="background:rgba(255,255,255,0.06); padding:0.5rem; border-radius:6px; font-family:monospace; margin:0.5rem 0;">
      MoO4^(2-) + 4 H2S ----> [MoS4]^(2-) + 4 H2O
      </div>
      3. <strong>Bloqueo del Cobre:</strong> El tiomolibdato se enlaza fuertemente al Cobre ($Cu^{2+}$), creando un quelato insoluble que es incapaz de ser absorbido en el intestino delgado y se excreta directamente en heces. Además, los tiomolibdatos que llegan a sangre inactivan la enzima citocromo oxidasa y la lisil oxidasa tisular.
      <br><br>
      4. <strong>Solución Técnica:</strong> Sustituir el sulfato de cobre por <strong>cobre orgánico quelatado</strong> (proteinato o glicinato de cobre) en dosis mínima de $0.12\\% \\text{ Cu}$ en la sal.`
  },
  "consumo-saladero": {
    question: "¿Qué factores provocan que el ganado consuma menos sal mineralizada de la dosis teórica en los potreros?",
    answer: `<strong>Diagnóstico SalBovino Pro:</strong>
      <br><br>
      1. <strong>Salinidad del Agua de Bebida:</strong> Si el ganado bebe de pozos profundos o abrevaderos ricos en sales solubles (conductividad $> 3000 \\,\\mu\\text{S/cm}$ o $> 1500 \\text{ ppm}$ de $Na$), se sacia su impulso osmótico y rechazan la sal del comedero.
      <br><br>
      2. <strong>Humedad y Lixiviación:</strong> La lluvia en saladeros sin techo disuelve el $NaCl$ y forma una costra apelmazada (cristalización amarga). El ganado evita el alimento húmedo o contaminado con heces.
      <br><br>
      3. <strong>Ubicación de Comederos:</strong> Saladeros ubicados a más de 500 metros de las fuentes de agua o zonas de sombra son visitados con menor frecuencia.
      <br><br>
      4. <strong>Acción Recomendada:</strong> Instalar saladeros techados tipo tolva, limpiar semanalmente y ajustar la proporción de cloruro de sodio si el agua es salobre.`
  }
};

function initSkillSimulator() {
  const chips = document.querySelectorAll(".chip-prompt");
  const chatArea = document.getElementById("simChatArea");
  const customInput = document.getElementById("simCustomInput");
  const btnSend = document.getElementById("btnSimSend");
  const btnCopyPrompt = document.getElementById("btnCopyPrompt");
  const promptText = document.getElementById("systemPromptText");

  // Botón Copiar System Prompt
  if (btnCopyPrompt && promptText) {
    btnCopyPrompt.addEventListener("click", () => {
      navigator.clipboard.writeText(promptText.innerText).then(() => {
        showToast("System Prompt de SalBovino Pro copiado al portapapeles");
      }).catch(() => {
        showToast("Error al copiar texto");
      });
    });
  }

  // Chips de preguntas rápidas
  chips.forEach(chip => {
    chip.addEventListener("click", () => {
      const qKey = chip.getAttribute("data-query");
      const data = SIMULATED_RESPONSES[qKey];
      if (data && chatArea) {
        addChatMessage(data.question, true);
        setTimeout(() => {
          addChatMessage(data.answer, false);
        }, 350);
      }
    });
  });

  // Enviar pregunta personalizada
  function handleCustomSend() {
    if (!customInput || !chatArea) return;
    const query = customInput.value.trim();
    if (!query) return;

    addChatMessage(query, true);
    customInput.value = "";

    // Simular respuesta experta basada en palabras clave
    setTimeout(() => {
      let response = `<strong>Diagnóstico SalBovino Pro:</strong><br><br>
      Analizando tu consulta sobre <em>"${query}"</em>:<br>
      Bajo las pautas del <strong>NRC (2016/2021)</strong> y tablas <strong>FEDNA</strong>, para optimizar este parámetro se requiere:
      <ul>
        <li>Verificar el balance de macroelementos ($Ca, P, Mg$) en la oferta de forraje verde.</li>
        <li>Monitorear que el consumo voluntario diario de sal mineralizada se mantenga entre $60$ y $100 \\text{ g/animal/día}$.</li>
        <li>Asegurar que la fuente de fósforo posea una biodisponibilidad superior al $85\\%$ (fosfato bicálcico o monocálcico).</li>
      </ul>
      Recuerda proteger los saladeros con techo amplio para evitar pérdidas por escorrentía pluvial.`;

      addChatMessage(response, false);
    }, 450);
  }

  if (btnSend) btnSend.addEventListener("click", handleCustomSend);
  if (customInput) {
    customInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") handleCustomSend();
    });
  }
}

function addChatMessage(content, isUser = false) {
  const chatArea = document.getElementById("simChatArea");
  if (!chatArea) return;

  const msgDiv = document.createElement("div");
  msgDiv.className = `chat-msg ${isUser ? 'user-msg' : 'ai-msg'}`;

  msgDiv.innerHTML = `
    <div class="msg-avatar"><i class="fas ${isUser ? 'fa-user' : 'fa-cow'}"></i></div>
    <div class="msg-bubble"><p>${content}</p></div>
  `;

  chatArea.appendChild(msgDiv);
  chatArea.scrollTop = chatArea.scrollHeight;
}

// ==========================================================================
// 5. Modal Lightbox de la Infografía
// ==========================================================================
function initLightbox() {
  const modal = document.getElementById("modalLightbox");
  const btnOpenHero = document.getElementById("btnOpenLightHero");
  const btnZoomModal = document.getElementById("btnZoomModal");
  const btnClose = document.getElementById("lightboxCloseBtn");
  const overlay = document.getElementById("lightboxOverlay");
  const heroThumb = document.getElementById("heroThumbImg");

  function openModal() {
    if (modal) {
      modal.classList.add("active");
      modal.setAttribute("aria-hidden", "false");
      document.body.style.overflow = "hidden";
    }
  }

  function closeModal() {
    if (modal) {
      modal.classList.remove("active");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    }
  }

  if (btnOpenHero) btnOpenHero.addEventListener("click", openModal);
  if (btnZoomModal) btnZoomModal.addEventListener("click", openModal);
  if (heroThumb) heroThumb.addEventListener("click", openModal);
  if (btnClose) btnClose.addEventListener("click", closeModal);
  if (overlay) overlay.addEventListener("click", closeModal);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal && modal.classList.contains("active")) {
      closeModal();
    }
  });
}

// ==========================================================================
// 6. Bibliografía: Filtro, Búsqueda y Copiado de Citas APA
// ==========================================================================
function initBibliography() {
  const searchInput = document.getElementById("biblioSearch");
  const catBtns = document.querySelectorAll(".bib-cat");
  const cards = document.querySelectorAll(".biblio-card");
  const copyButtons = document.querySelectorAll(".btn-copy-cite");

  // Filtro por categorías
  catBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      catBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      filterBiblio();
    });
  });

  // Búsqueda en vivo
  if (searchInput) {
    searchInput.addEventListener("input", filterBiblio);
  }

  function filterBiblio() {
    const activeCategory = document.querySelector(".bib-cat.active")?.getAttribute("data-cat") || "all";
    const query = (searchInput?.value || "").toLowerCase().trim();

    cards.forEach(card => {
      const cardCat = card.getAttribute("data-cat");
      const cardText = card.innerText.toLowerCase();

      const matchCat = activeCategory === "all" || cardCat === activeCategory;
      const matchQuery = query === "" || cardText.includes(query);

      if (matchCat && matchQuery) {
        card.style.display = "grid";
      } else {
        card.style.display = "none";
      }
    });
  }

  // Copiado de Cita APA
  copyButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const cite = btn.getAttribute("data-cite");
      if (cite) {
        navigator.clipboard.writeText(cite).then(() => {
          showToast("Cita bibliográfica en formato APA copiada");
        }).catch(() => {
          showToast("Error al copiar cita");
        });
      }
    });
  });
}

// ==========================================================================
// 7. Toast Notification y UI Helpers
// ==========================================================================
function showToast(message) {
  const toast = document.getElementById("toastNotification");
  const toastText = document.getElementById("toastText");
  if (!toast || !toastText) return;

  toastText.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function initNavigation() {
  const header = document.getElementById("header");
  const mobileToggle = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");

  // Scroll Header Shadow
  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header?.classList.add("scrolled");
    } else {
      header?.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener("click", () => {
      navLinks.classList.toggle("mobile-active");
    });

    document.querySelectorAll(".nav-link").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("mobile-active");
      });
    });
  }
}

// ==========================================================================
// Inicialización General al Cargar el DOM
// ==========================================================================
document.addEventListener("DOMContentLoaded", () => {
  renderMinerals("all");
  initMineralFilters();
  initCalculator();
  initSkillSimulator();
  initLightbox();
  initBibliography();
  initNavigation();
});
