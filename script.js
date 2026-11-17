document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize AOS (Animate On Scroll)
  if (typeof AOS !== 'undefined') {
    AOS.init({
      once: true,
      offset: 60,
      duration: 750,
      easing: 'ease-out-cubic'
    });
  }

  // 2. Navbar scroll effect & mobile menu auto-close
  const mainNav = document.getElementById('mainNav');
  const navContent = document.getElementById('navContent');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      mainNav.classList.add('scrolled');
    } else {
      mainNav.classList.remove('scrolled');
    }
  });

  if (navContent && typeof bootstrap !== 'undefined') {
    navContent.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        if (navContent.classList.contains('show')) {
          const bsCollapse = bootstrap.Collapse.getInstance(navContent) || new bootstrap.Collapse(navContent, { toggle: false });
          bsCollapse.hide();
        }
      });
    });
  }

  // 3. Interactive Background Particles (Network Nodes representing forwarded chats)
  const canvas = document.getElementById('particles-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const nodeCount = Math.min(42, Math.floor(width / 35));
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * 0.55,
      vy: (Math.random() - 0.5) * 0.55,
      r: Math.random() * 2 + 1
    }));

    function drawParticles() {
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 229, 255, 0.35)';
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const m = nodes[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < 135) {
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.11 * (1 - dist / 135)})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawParticles);
    }
    drawParticles();
  }

  // 4. Motto Switcher (Antonino / Inoltrino rhymes)
  const mottos = [
    '«Di nome Antonino, di fatto Inoltrino: il tuo segreto è già nel gruppo del cugino!»',
    '«Se lo dici ad Antonino, parte subito l’Inoltrino (anche al tuo imbianchino)!»',
    '«Non c’è chat privata che tenga: dove passa Antonino, arriva Inoltrino!»',
    '«Antonino ascolta in silenzio, ma Inoltrino inoltra al condominio!»',
    '«Confidati pure con Antonino: in tre secondi lo sa pure il postino grazie a Inoltrino!»'
  ];
  let mottoIndex = 0;
  const mottoTextEl = document.getElementById('officialMottoText');
  const mottoBtn = document.getElementById('mottoSwitcherBtn');

  if (mottoBtn && mottoTextEl) {
    mottoBtn.addEventListener('click', () => {
      mottoIndex = (mottoIndex + 1) % mottos.length;
      mottoTextEl.style.opacity = '0';
      setTimeout(() => {
        mottoTextEl.textContent = mottos[mottoIndex];
        mottoTextEl.style.transition = 'opacity 0.3s ease';
        mottoTextEl.style.opacity = '1';
      }, 180);
    });
  }

  // 5. Live Counter of Forwarded Messages
  let currentCount = 1482910;
  const countEl = document.getElementById('liveForwardedCount');
  setInterval(() => {
    currentCount += Math.floor(Math.random() * 5) + 1;
    if (countEl) {
      countEl.textContent = currentCount.toLocaleString('it-IT');
    }
  }, 2200);

  // 6. Hero Phone Live Stream Generator
  const heroChatStream = document.getElementById('heroChatStream');
  const triggerHeroBtn = document.getElementById('triggerHeroForwardBtn');

  const heroScenarios = [
    {
      sender: 'Luca (Collega Ufficio)',
      msg: '«Anto ma hai visto come si è vestito oggi il Direttore? Sembra un evidenziatore giallo!»',
      direct: 'Direttore Generale',
      random1: 'Signora Pina (Portineria)',
      random2: 'Gruppo "Pellegrinaggio Medjugorje 2022"',
      replySender: 'Direttore Generale',
      replyText: '«Luca, ti aspetto nel mio ufficio con Antonino tra 5 minuti.»'
    },
    {
      sender: 'Martina',
      msg: '«Ti mando lo screenshot di quello che mi ha scritto Andrea, ma ti giuro su tutto NON INOLTRARLO!»',
      direct: 'Andrea (L’ex in questione)',
      random1: 'Elettrauto Mimmo',
      random2: 'Chat "Genitori 3°B Primaria"',
      replySender: 'Elettrauto Mimmo',
      replyText: '«Signorina Martina io le dovevo solo cambiare la batteria della Panda, ma secondo me Andrea ha torto.»'
    },
    {
      sender: 'Davide',
      msg: '«Stasera dico a mia moglie che faccio straordinario e invece vado a vedere la partita al pub.»',
      direct: 'Moglie di Davide',
      random1: 'Don Matteo (Parroco)',
      random2: 'Fornitore Surgelati S.r.l.',
      replySender: 'Moglie di Davide',
      replyText: '«Grazie Antonino per l’inoltro! Davide trova le valigie direttamente al pub.»'
    }
  ];
  let heroScenarioIdx = 0;

  if (triggerHeroBtn && heroChatStream) {
    triggerHeroBtn.addEventListener('click', () => {
      const item = heroScenarios[heroScenarioIdx % heroScenarios.length];
      heroScenarioIdx++;

      const incomingBubble = document.createElement('div');
      incomingBubble.className = 'chat-bubble incoming';
      incomingBubble.innerHTML = `
        <div class="small text-secondary fw-semibold mb-1">${item.sender}</div>
        ${item.msg}
      `;
      heroChatStream.appendChild(incomingBubble);
      heroChatStream.scrollTop = heroChatStream.scrollHeight;

      setTimeout(() => {
        const forwardedBubble = document.createElement('div');
        forwardedBubble.className = 'chat-bubble forwarded';
        forwardedBubble.innerHTML = `
          <div class="forwarded-tag">
            <i class="bi bi-forward-fill"></i> Inoltrato da Antonino (Inoltrino)
          </div>
          ${item.msg}
          <div class="mt-2">
            <span class="recipient-pill recipient-direct"><i class="bi bi-person-check"></i> ${item.direct}</span>
            <span class="recipient-pill recipient-random"><i class="bi bi-person-exclamation"></i> ${item.random1}</span>
            <span class="recipient-pill recipient-chaos"><i class="bi bi-people"></i> ${item.random2}</span>
          </div>
        `;
        heroChatStream.appendChild(forwardedBubble);
        heroChatStream.scrollTop = heroChatStream.scrollHeight;
      }, 650);

      setTimeout(() => {
        const reactionBubble = document.createElement('div');
        reactionBubble.className = 'chat-bubble incoming';
        reactionBubble.innerHTML = `
          <div class="small text-warning fw-semibold mb-1">${item.replySender}</div>
          ${item.replyText}
        `;
        heroChatStream.appendChild(reactionBubble);
        heroChatStream.scrollTop = heroChatStream.scrollHeight;
      }, 1500);
    });
  }

  // 7. Interactive Simulator Section
  const simInput = document.getElementById('simInputMessage');
  const presetBtns = document.querySelectorAll('.preset-msg-btn');
  const runSimBtn = document.getElementById('runSimulationBtn');
  const simStatusBadge = document.getElementById('simStatusBadge');
  const simLogOutput = document.getElementById('simLogOutput');

  presetBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      if (simInput) {
        simInput.value = btn.getAttribute('data-msg');
      }
    });
  });

  const directPool = [
    { name: 'Il Diretto Interessato Citato', reaction: '«Ah sì?! Ora ti chiamo subito, grazie Antonino per lo screen!»' },
    { name: 'Il Tuo Capo Ufficio', reaction: '«Interessante questo messaggio che mi ha appena girato Antonino...»' },
    { name: 'La Tua Fidanzata / Il Tuo Fidanzato', reaction: '«Antonino mi ha inoltrato TUTTO. Spiegami immediatamente!»' },
    { name: 'Il Vicino del 3° Piano', reaction: '«Quindi eri tu?! Meno male che c’è Inoltrino che mi avvisa!»' }
  ];

  const randomPool = [
    { name: 'Gennaro (Pescheria "Il Totano d’Oro")', reaction: '«Non so chi siete ma ho messo da parte 1kg di cozze per sicurezza.»' },
    { name: 'Dott.ssa Fumagalli (Catasto Comunale)', reaction: '«Signor Antonino, perché mi inoltra queste crisi coniugali?»' },
    { name: 'Gruppo "Amici del Burraco 2017" (64 membri)', reaction: '«Signora Maria guardi cosa ha appena inoltrato il nipote Antonino!»' },
    { name: 'Tecnico Caldaie Vaillant', reaction: '«Io veramente aspettavo il codice errore F28, non i vostri segreti.»' },
    { name: 'Zio Peppe (che vive in Belgio dal 1984)', reaction: '«Salutami tutti! Ma chi è questo Lorenzo dei tre kebab?»' },
    { name: 'Corriere Amazon (Furgone #412)', reaction: '«Lascio il pacco in portineria, comunque hai sbagliato a dirlo ad Antonino.»' }
  ];

  if (runSimBtn) {
    runSimBtn.addEventListener('click', () => {
      const msgText = (simInput && simInput.value.trim()) || 'Messaggio segretissimo che nessuno doveva leggere';

      // Reset nodes
      const nodes = ['node-direct-1', 'node-direct-2', 'node-random-1', 'node-random-2'];
      nodes.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.classList.remove('hit');
      });

      if (simStatusBadge) {
        simStatusBadge.className = 'badge bg-warning text-dark';
        simStatusBadge.textContent = 'Antonino sta selezionando i contatti...';
      }

      // Pick random targets
      const d1 = directPool[Math.floor(Math.random() * directPool.length)];
      const d2 = directPool[(Math.floor(Math.random() * directPool.length) + 1) % directPool.length];
      const r1 = randomPool[Math.floor(Math.random() * randomPool.length)];
      const r2 = randomPool[(Math.floor(Math.random() * randomPool.length) + 2) % randomPool.length];

      const targets = [
        { nodeId: 'node-direct-1', nameId: 'targetName1', reactId: 'targetReaction1', data: d1 },
        { nodeId: 'node-direct-2', nameId: 'targetName2', reactId: 'targetReaction2', data: d2 },
        { nodeId: 'node-random-1', nameId: 'targetName3', reactId: 'targetReaction3', data: r1 },
        { nodeId: 'node-random-2', nameId: 'targetName4', reactId: 'targetReaction4', data: r2 }
      ];

      targets.forEach((t, idx) => {
        setTimeout(() => {
          const nodeEl = document.getElementById(t.nodeId);
          const nameEl = document.getElementById(t.nameId);
          const reactEl = document.getElementById(t.reactId);

          if (nodeEl) nodeEl.classList.add('hit');
          if (nameEl) nameEl.textContent = t.data.name;
          if (reactEl) {
            reactEl.className = 'text-info fw-medium small';
            reactEl.textContent = t.data.reaction;
          }

          if (idx === targets.length - 1) {
            if (simStatusBadge) {
              simStatusBadge.className = 'badge bg-success';
              simStatusBadge.textContent = 'INOLTRO COMPLETATO AL 100%';
            }
            if (simLogOutput) {
              simLogOutput.innerHTML = `
                <small class="text-success font-monospace d-block">
                  ✔ [SUCCESSO] Antonino ("Inoltrino") ha inoltrato: "${msgText.slice(0, 75)}${msgText.length > 75 ? '...' : ''}" a 2 diretti interessati e a 2 estranei totali!
                </small>
              `;
            }
            if (typeof confetti === 'function') {
              confetti({
                particleCount: 55,
                spread: 65,
                origin: { y: 0.7 }
              });
            }
          }
        }, (idx + 1) * 320);
      });
    });
  }

  // 8. Dynamic Telegram Share URL updater
  const tgQuickMsg = document.getElementById('tgQuickMsg');
  const openTelegramAppLink = document.getElementById('openTelegramAppLink');
  if (tgQuickMsg && openTelegramAppLink) {
    tgQuickMsg.addEventListener('input', () => {
      const encoded = encodeURIComponent(tgQuickMsg.value);
      openTelegramAppLink.href = `https://t.me/share/url?url=https://inoltrino.farted.net&text=${encoded}`;
    });
  }

  // 9. Social Links Toast
  const toastEl = document.getElementById('liveToast');
  const toastBody = document.getElementById('toastMessageBody');
  let bsToast = null;
  if (toastEl && typeof bootstrap !== 'undefined') {
    bsToast = new bootstrap.Toast(toastEl);
  }

  function showNotification(msg) {
    if (toastBody && bsToast) {
      toastBody.innerHTML = msg;
      bsToast.show();
    }
  }

  document.querySelectorAll('.social-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const socialName = btn.getAttribute('data-social');
      showNotification(`Hai cliccato su <strong>${socialName}</strong>: Antonino ha appena inoltrato il tuo profilo social a 7 persone che non conosci!`);
    });
  });

  // 10. Cookie Banner Logic
  const cookieBanner = document.getElementById('cookieBanner');
  const acceptCookiesBtn = document.getElementById('acceptCookiesBtn');
  const rejectCookiesBtn = document.getElementById('rejectCookiesBtn');
  const reopenCookieBannerBtn = document.getElementById('reopenCookieBannerBtn');

  if (localStorage.getItem('inoltrino_cookies_handled') === 'true' && cookieBanner) {
    cookieBanner.classList.add('hidden');
  }

  if (acceptCookiesBtn && cookieBanner) {
    acceptCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('inoltrino_cookies_handled', 'true');
      cookieBanner.classList.add('hidden');
      showNotification('Cookie accettati! Antonino ha già inoltrato la tua preferenza all’amministratore di condominio.');
    });
  }

  if (rejectCookiesBtn && cookieBanner) {
    rejectCookiesBtn.addEventListener('click', () => {
      localStorage.setItem('inoltrino_cookies_handled', 'true');
      cookieBanner.classList.add('hidden');
      showNotification('Hai rifiutato i cookie facoltativi, ma Antonino inoltrerà comunque i tuoi messaggi per principio.');
    });
  }

  if (reopenCookieBannerBtn && cookieBanner) {
    reopenCookieBannerBtn.addEventListener('click', (e) => {
      e.preventDefault();
      cookieBanner.classList.remove('hidden');
    });
  }
});
