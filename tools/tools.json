document.addEventListener("DOMContentLoaded", () => {
  // 🔥 WERSJA OFFLINE — dane wbudowane w kod
  const DATA = {
    ideas: [
      {
        group: "Portrait",
        items: [
          "Studio Portrait",
          "Natural Light Portrait",
          "Reporter Flash Portrait"
        ]
      },
      {
        group: "Architecture",
        items: [
          "Modern Buildings",
          "Historical Sites",
          "Interior Spaces"
        ]
      }
    ],
    guides: [
      "Studio Setup",
      "Darkroom Setup",
      "Camera Quick Guide"
    ]
  };

  // --- RENDER: IDEAS FOR… ---
  renderIdeas(DATA.ideas);
  renderGuides(DATA.guides);

  function renderIdeas(groups) {
    const container = document.getElementById("tools-ideas");
    if (!container || !groups || !Array.isArray(groups)) return;

    const title = document.createElement("h2");
    title.textContent = "IDEAS FOR…";
    container.appendChild(title);

    groups.forEach((group) => {
      const details = document.createElement("details");
      details.className = "tools-group";
      const summary = document.createElement("summary");
      summary.textContent = group.group;
      details.appendChild(summary);

      const list = document.createElement("ul");
      group.items.forEach((item) => {
        const li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
      });

      details.appendChild(list);
      container.appendChild(details);
    });
  }

  function renderGuides(guides) {
    const container = document.getElementById("tools-guides");
    if (!container || !guides || !Array.isArray(guides)) return;

    const title = document.createElement("h2");
    title.textContent = "Instrukcje";
    container.appendChild(title);

    guides.forEach((guide) => {
      const div = document.createElement("div");
      div.className = "tools-guide";
      div.textContent = guide;
      container.appendChild(div);
    });
  }

  // ---------------------------------------------------------
  // ⭐ KALKULATOR 1: Minimalny czas naświetlania z ręki
  // ---------------------------------------------------------
  const focalInput = document.getElementById("handheld-focal");
  const cropInput = document.getElementById("handheld-crop");
  const evInput = document.getElementById("handheld-ev");
  const handheldButton = document.getElementById("handheld-button");
  const handheldResult = document.getElementById("handheld-result");

  if (handheldButton) {
    handheldButton.addEventListener("click", () => {
      const focal = Number(focalInput.value);
      const crop = Number(cropInput.value) || 1;
      const ev = Number(evInput.value) || 0;

      if (!focal || focal <= 0) {
        handheldResult.textContent = "Podaj dodatnią ogniskową (mm).";
        return;
      }

      const effectiveFocal = focal * crop;
      let baseTime = 1 / effectiveFocal;
      const factor = Math.pow(2, ev);
      const finalTime = baseTime * factor;

      handheldResult.textContent =
        "Rekomendowany minimalny czas: " +
        formatShutter(finalTime) +
        " (przy ogniskowej ok. " +
        Math.round(effectiveFocal) +
        " mm)";
    });
  }

  // ---------------------------------------------------------
  // ⭐ KALKULATOR 2: Przelicznik ekspozycji – zmiana czasu
  // ---------------------------------------------------------
  const evTimeBaseInput = document.getElementById("ev-time-base");
  const evDeltaInput = document.getElementById("ev-delta");
  const evTimeButton = document.getElementById("ev-time-button");
  const evTimeResult = document.getElementById("ev-time-result");

  if (evTimeButton) {
    evTimeButton.addEventListener("click", () => {
      const baseStr = evTimeBaseInput.value.trim();
      const deltaEv = Number(evDeltaInput.value);

      const baseTime = parseTime(baseStr);
      if (!baseTime) {
        evTimeResult.textContent = "Nie rozumiem formatu czasu.";
        return;
      }

      const factor = Math.pow(2, deltaEv);
      const newTime = baseTime * factor;

      evTimeResult.textContent =
        "Nowy czas naświetlania: " + formatShutter(newTime);
    });
  }

  // ---------------------------------------------------------
  // ⭐ KALKULATOR 3: Hyperfocal Distance
  // ---------------------------------------------------------
  const hyperFocal = (f, N, c) => (f * f) / (N * c);

  // ---------------------------------------------------------
  // ⭐ KALKULATOR 4: Depth of Field (DoF)
  // ---------------------------------------------------------
  const dof = (f, N, c, s) => {
    const H = hyperFocal(f, N, c);
    const near = (H * s) / (H + (s - f));
    const far = (H * s) / (H - (s - f));
    return { near, far, total: far - near };
  };

  // ---------------------------------------------------------
  // ⭐ KALKULATOR 5: ND Filter Calculator
  // ---------------------------------------------------------
  const ndTime = (baseTime, stops) => baseTime * Math.pow(2, stops);

  // ---------------------------------------------------------
  // ⭐ KALKULATOR 6: EV → ISO
  // ---------------------------------------------------------
  const evToISO = (baseISO, deltaEv) => baseISO * Math.pow(2, deltaEv);

  // ---------------------------------------------------------
  // ⭐ KALKULATOR 7: EV → Aperture
  // ---------------------------------------------------------
  const evToAperture = (baseF, deltaEv) => baseF * Math.sqrt(Math.pow(2, deltaEv));

  // ---------------------------------------------------------
  // ⭐ KALKULATOR 8: EV → Shutter
  // ---------------------------------------------------------
  const evToShutter = (baseTime, deltaEv) => baseTime * Math.pow(2, deltaEv);

  // ---------------------------------------------------------
  // ⭐ KALKULATOR 9: Flash Guide Number
  // ---------------------------------------------------------
  const flashDistance = (GN, aperture, ISO = 100) =>
    (GN * Math.sqrt(ISO / 100)) / aperture;

  // ---------------------------------------------------------
  // ⭐ KALKULATOR 10: Color Temperature Mix
  // ---------------------------------------------------------
  const mixKelvin = (k1, k2, ratio) =>
    1 / ((ratio / k1) + ((1 - ratio) / k2));

  // ---------------------------------------------------------
  // ⭐ FUNKCJE POMOCNICZE
  // ---------------------------------------------------------
  function formatShutter(seconds) {
    if (seconds >= 1) return (Math.round(seconds * 10) / 10) + " s";
    return "1/" + Math.round(1 / seconds) + " s";
  }

  function parseTime(str) {
    if (str.includes("/")) {
      const [n, d] = str.split("/");
      return Number(n) / Number(d);
    }
    return Number(str.replace(",", "."));
  }
});
