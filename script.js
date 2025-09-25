// script.js
// Odliczanie do 3 maja 2026 (początek dnia local time).
// Dodatki: co miesiac zmiana kolorow, specjalny wyglad w dniu 3 maja 2026.

(() => {
  const targetLocal = new Date(2026, 4, 3, 0, 0, 0); // months: 0=styczen, więc 4 = maj
  const daysEl = document.getElementById('days');
  const hoursEl = document.getElementById('hours');
  const minutesEl = document.getElementById('minutes');
  const secondsEl = document.getElementById('seconds');
  const tzEl = document.getElementById('tz');
  const metaTheme = document.getElementById('meta-theme-color');

  // Pokaż bieżącą strefę/przeglądarkową reprezentację
  try {
    tzEl.textContent = Intl.DateTimeFormat().resolvedOptions().timeZone || 'lokalna';
  } catch (e) {
    tzEl.textContent = 'lokalna';
  }

  // Paleta miesięczna: jeśli chcesz własne kolory, zmień tu.
  // Format: {bgGradient, accent, themeColor}
  const monthPalettes = [
    { bg: 'linear-gradient(135deg,#0f1724,#152a44)', accent:'#FF6B6B', theme:'#14324a' }, // stycz
    { bg: 'linear-gradient(135deg,#0b2a2e,#144d4b)', accent:'#37D67A', theme:'#073c36' }, // lut
    { bg: 'linear-gradient(135deg,#17203b,#2b2a63)', accent:'#6B8CFF', theme:'#1a2745' }, // mar
    { bg: 'linear-gradient(135deg,#263238,#4a3f6b)', accent:'#FF9F43', theme:'#382b4f' }, // kwi
    { bg: 'linear-gradient(135deg,#34202b,#6a2e3a)', accent:'#FFD24C', theme:'#4d2430' }, // maj
    { bg: 'linear-gradient(135deg,#0b2438,#0e3b3f)', accent:'#00B1FF', theme:'#0c2f3d' }, // cze
    { bg: 'linear-gradient(135deg,#112a0b,#2b4a1d)', accent:'#7AE582', theme:'#153218' }, // lip
    { bg: 'linear-gradient(135deg,#2b1322,#5d1f3f)', accent:'#ff7ab6', theme:'#3a1128' }, // sie
    { bg: 'linear-gradient(135deg,#2a2b2f,#4f4b65)', accent:'#9D7CFF', theme:'#2b2638' }, // wrz
    { bg: 'linear-gradient(135deg,#071426,#0b2540)', accent:'#3BE7FF', theme:'#052133' }, // paz
    { bg: 'linear-gradient(135deg,#23111a,#43223a)', accent:'#FFB870', theme:'#311728' }, // lis
    { bg: 'linear-gradient(135deg,#06121b,#16213c)', accent:'#9FF3BD', theme:'#071827' }  // gru
  ];

  function applyMonthlyPalette(date = new Date()) {
    const m = date.getMonth(); // 0..11
    const pal = monthPalettes[m] || monthPalettes[0];
    document.documentElement.style.setProperty('--bg-gradient', pal.bg);
    document.documentElement.style.setProperty('--accent', pal.accent);
    metaTheme.setAttribute('content', pal.theme);
    // dodatkowe drobne zmiany: kolor kropek czy numerów można też ustawić
  }

  // Format liczby z zerami
  function z(n){ return String(n).padStart(2,'0'); }

  // Aktualizacja odliczania:
  function updateTimer(){
    const now = new Date();
    // różnica w ms
    const diff = targetLocal.getTime() - now.getTime();
    if (diff <= 0) {
      // jeśli już minęło — pokaż zero i specjalny komunikat (możesz rozwinąć)
      daysEl.textContent = '00';
      hoursEl.textContent = '00';
      minutesEl.textContent = '00';
      secondsEl.textContent = '00';
      // możemy ustawić klasę last-day też tutaj (gdy dokładnie na 3 maja)
      handleLastDay(now);
      return;
    }
    const s = Math.floor(diff/1000);
    const days = Math.floor(s / 86400);
    const hours = Math.floor((s % 86400) / 3600);
    const minutes = Math.floor((s % 3600) / 60);
    const seconds = s % 60;

    daysEl.textContent = z(days);
    hoursEl.textContent = z(hours);
    minutesEl.textContent = z(minutes);
    secondsEl.textContent = z(seconds);

    applyMonthlyPalette(now);
    handleLastDay(now);
  }

  // Gdy jest 3 maja 2026 (każdy moment tamtego dnia lokalnie) — aktywuj "last-day" wygląd:
  function handleLastDay(now) {
    const isLastDay = now.getFullYear() === 2026 && now.getMonth() === 4 && now.getDate() === 3;
    if (isLastDay) {
      document.body.classList.add('last-day');
      // dodatkowa celebracja: szybko pulsujący accent
      document.documentElement.style.setProperty('--accent', '#ffb84d');
      // możemy też wyświetlić konfetti lub animację SVG (tu uproszczone: puls)
      const hero = document.querySelector('.hero-svg');
      if (hero) hero.style.transform = 'scale(1.06) rotate(-1deg)';
    } else {
      document.body.classList.remove('last-day');
    }
  }

  // Start
  updateTimer();
  // Aktualizuj co sekundę
  setInterval(updateTimer, 1000);

  // Wersja offline-friendly: dodaj start_url do manifest; (service worker nie jest wymagany)
})();
