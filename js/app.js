"use strict";
/* ==========================================================================
   THE EXTREMELY IMPORTANT BUTTON™ — Application Logic
   No backend. No login. No external APIs. LocalStorage only.
   ========================================================================== */

(function () {
  const STORAGE_KEY = "eib:v2";
  const $ = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  /* ------------------------------------------------------------------ */
  /* Flavor data                                                         */
  /* ------------------------------------------------------------------ */

  const DEPARTMENTS = [
    "Dept. of Button Affairs",
    "Strategic Clicking Office",
    "Bureau of Meaningless Metrics",
    "Continuous Improvement Cmte.",
    "Executive Approval Board",
    "Synergy & Alignment Taskforce",
  ];

  const EXEC_FIRST = ["Linda", "Marcus", "Priya", "Dennis", "Ingrid", "Torsten", "Fenella", "Bartholomew", "Yuki", "Odalys"];
  const EXEC_LAST = ["Ferngrove", "Wexley", "Castellan", "Okonkwo", "Vandermeer", "Blackwood", "Sørensen", "Pemberton", "Achterberg", "Quill"];
  const EXEC_TITLES = [
    "SVP of Strategic Clicking",
    "Chief Button Officer",
    "VP of Escalation Logistics",
    "Head of Synergy",
    "Director of Continuous Pressing",
    "Chief Importance Officer",
    "Global Head of Momentum",
    "VP, Office of Button Affairs",
  ];

  const EMPLOYEES = [
    "Kevin from Accounting",
    "Priya from Legal",
    "Doug from Facilities",
    "Marcus from the Cloud Team",
    "Linda from Executive Optics",
    "Sana from Vibes & Culture",
    "Gary from an Undisclosed Department",
    "Yara from Stakeholder Relations",
    "Theo from Rapid Response",
    "an unnamed intern",
  ];

  const CONGRATS = [
    "Congratulations. That press has been duly noted.",
    "Well done. The Board has been informed of your initiative.",
    "Exceptional technique. HR has been alerted, just in case.",
    "Your dedication sets a new organizational benchmark.",
    "Bravo. This moment joins the company highlight reel.",
    "Outstanding. This press has been added to your permanent record.",
    "Impressive. Nobody asked for this, yet here we are.",
    "Noted with enthusiasm rarely seen at this company.",
  ];

  const NOTHING = [
    "…",
    "Nothing happened. This has still been logged.",
    "The button acknowledges your press internally.",
    "Processed. No visible output was required.",
    "Silence. Profound, deliberate, extremely important silence.",
    "The button appreciates the gesture. That's all for now.",
  ];

  const DONT_PRESS_AGAIN = [
    "Please don't press that again.",
    "We noticed. Please refrain from repeating this action.",
    "That's several times now. Someone is watching.",
    "Further presses may require additional approval.",
    "This has been escalated. Please remain calm.",
  ];

  const PROCESSING_LINES = [
    "Authenticating credentials",
    "Escalating to Department of Button Affairs",
    "Cross-referencing the Synergy Ledger",
    "Awaiting executive sign-off",
    "Reticulating splines",
    "Consulting the Bureau of Meaningless Metrics",
    "Notifying relevant stakeholders",
    "Aligning cross-functional priorities",
    "Compiling non-actionable insights",
    "Finalizing importance",
  ];

  const REPORT_RESULTS = [
    "Q3 Button Utilization Report: 118% of target (target was undefined).",
    "Performance exceeds all unset expectations.",
    "Report generated: metrics trending in a positive-adjacent direction.",
    "Analysis complete. Findings are inconclusive but encouraging.",
    "Summary: everything is fine. Please disregard footnote 12.",
    "Forecast updated. Confidence interval: extremely wide.",
  ];

  const BREAKTHROUGH_LINES = [
    "Every metric the company tracks has simultaneously improved for no discernible reason.",
    "The Board has convened an emergency meeting to congratulate itself.",
    "Stakeholder happiness has exceeded the scale designed to measure it.",
    "This event will be referenced in next year's keynote, unexplained.",
    "Synergy has achieved a state previously thought theoretical.",
  ];

  const TICKER_HEADLINES = [
    "BREAKING: Board unanimously approves your last press",
    "Global Synergy Index reaches historic irrelevance",
    "Stakeholders report feeling “engaged, somehow”",
    "Bureau of Meaningless Metrics adds 3 new metrics nobody asked for",
    "Executive quarterly retreat rescheduled to discuss button strategy",
    "Analysts remain unable to explain what this button does",
    "Committee for Continuous Improvement improves nothing, continuously",
    "Internal memo: please stop asking what the button does",
    "Synergy & Alignment Taskforce achieves full alignment on lunch",
    "Quarterly forecast revised upward for reasons that remain unclear",
  ];

  const CITIES = ["Reykjavík", "Singapore", "Toronto", "Nairobi", "Lisbon", "Seoul", "Wellington", "Dubai", "Helsinki", "Austin", "Kyoto", "Cape Town", "Zürich", "Montréal", "Bengaluru", "Oslo", "Santiago", "Warsaw"];
  const LIVE_ACTIONS = [
    "pressed The Button",
    "was gently reminded not to press again",
    "increased Global Synergy by mistake",
    "received executive approval instantly",
    "triggered a completely unnecessary chart update",
    "was logged under a new ticket number",
    "achieved nothing, as intended",
  ];

  const QUOTES = [
    { text: "We don't know what the button does either. That's what makes it exciting.", author: "Linda Ferngrove, Chief Button Officer" },
    { text: "Synergy isn't a metric. It's a feeling. The button gives us both.", author: "Marcus Wexley, VP of Escalation Logistics" },
    { text: "If it isn't broken, press it anyway. That's leadership.", author: "Priya Castellan, Head of Synergy" },
    { text: "I've pressed it forty times this morning. I have no regrets.", author: "Dennis Okonkwo, Chief Importance Officer" },
    { text: "The button doesn't need to do anything. It needs to matter. And it does.", author: "Ingrid Vandermeer, Global Head of Momentum" },
    { text: "We commissioned a study. The study recommended more buttons.", author: "Torsten Blackwood, VP, Office of Button Affairs" },
  ];

  const SUBTITLES = [
    "Its function is classified. Its importance is not in question. Press with confidence.",
    "Approved by a committee that no longer exists.",
    "97% of stakeholders agree this button is doing something.",
    "Pressing does not require authorization. Understanding does.",
    "Engineered to extremely important tolerances.",
    "This button has cleared legal review. Legal remains concerned.",
  ];

  const EMPTY_LOG_MESSAGES = [
    "No activity yet. Press the button to generate history.",
    "The audit trail is pristine. Ruin it.",
    "Nothing logged. The Bureau is disappointed.",
    "This space intentionally left blank, unlike the button.",
  ];

  const BUZZWORD_REACTIONS = {
    synergy: "The word has been logged in the Synergy Ledger.",
    leverage: "Leverage detected. The fulcrum has been notified.",
    disrupt: "Disruption acknowledged. Nothing was disrupted.",
    pivot: "Pivoting… still facing the same direction.",
    bandwidth: "Bandwidth allocated. To what remains unclear.",
    stakeholder: "A stakeholder has been theoretically notified.",
    paradigm: "Paradigm shifted approximately three degrees.",
    holistic: "Holistic review complete. Nothing was reviewed.",
    ideate: "Ideation session logged. Zero ideas produced.",
    actionable: "Insight marked actionable. No action will follow.",
  };
  const BUZZWORDS = Object.keys(BUZZWORD_REACTIONS);

  /* ------------------------------------------------------------------ */
  /* Achievements                                                        */
  /* ------------------------------------------------------------------ */

  const RARITY_POINTS = { common: 10, rare: 25, epic: 60, legendary: 150 };

  const ACHIEVEMENTS = [
    { id: "first-contact", name: "First Contact", desc: "Press the button once.", icon: "👆", rarity: "common", progress: { target: 1, get: (s) => s.lifetimeClicks }, check: (s) => s.lifetimeClicks >= 1 },
    { id: "getting-comfortable", name: "Getting Comfortable", desc: "10 lifetime presses.", icon: "🙂", rarity: "common", progress: { target: 10, get: (s) => s.lifetimeClicks }, check: (s) => s.lifetimeClicks >= 10 },
    { id: "dedicated-clicker", name: "Dedicated Clicker", desc: "50 lifetime presses.", icon: "💪", rarity: "common", progress: { target: 50, get: (s) => s.lifetimeClicks }, check: (s) => s.lifetimeClicks >= 50 },
    { id: "power-user", name: "Power User", desc: "100 lifetime presses.", icon: "⚡", rarity: "rare", progress: { target: 100, get: (s) => s.lifetimeClicks }, check: (s) => s.lifetimeClicks >= 100 },
    { id: "quarter-k", name: "Quarter Thousand", desc: "250 lifetime presses.", icon: "🎯", rarity: "rare", progress: { target: 250, get: (s) => s.lifetimeClicks }, check: (s) => s.lifetimeClicks >= 250 },
    { id: "half-k", name: "Half Millennium", desc: "500 lifetime presses.", icon: "🚀", rarity: "epic", progress: { target: 500, get: (s) => s.lifetimeClicks }, check: (s) => s.lifetimeClicks >= 500 },
    { id: "one-k", name: "Four-Digit Club", desc: "1,000 lifetime presses.", icon: "🏆", rarity: "epic", progress: { target: 1000, get: (s) => s.lifetimeClicks }, check: (s) => s.lifetimeClicks >= 1000 },
    { id: "chosen-one", name: "The Chosen One", desc: "10,000 lifetime presses.", icon: "👑", rarity: "legendary", progress: { target: 10000, get: (s) => s.lifetimeClicks }, check: (s) => s.lifetimeClicks >= 10000 },
    { id: "breakthrough-1", name: "Eyewitness", desc: "Witness a SYSTEM BREAKTHROUGH.", icon: "🌟", rarity: "epic", progress: { target: 1, get: (s) => s.breakthroughs }, check: (s) => s.breakthroughs >= 1 },
    { id: "ghost-in-machine", name: "Ghost in the Machine", desc: "Witness 2 SYSTEM BREAKTHROUGHs.", icon: "👻", rarity: "legendary", progress: { target: 2, get: (s) => s.breakthroughs }, check: (s) => s.breakthroughs >= 2 },
    { id: "night-owl", name: "Night Owl", desc: "Press between midnight and 4am.", icon: "🦉", rarity: "rare", check: (_, ctx) => !!(ctx && ctx.isNight) },
    { id: "speed-demon", name: "Speed Demon", desc: "10 presses within 5 seconds.", icon: "💨", rarity: "rare", check: (_, ctx) => !!(ctx && ctx.speedDemon) },
    { id: "loyal-employee", name: "Loyal Employee", desc: "Visit on 3 different days.", icon: "📅", rarity: "common", progress: { target: 3, get: (s) => s.visitDays.length }, check: (s) => s.visitDays.length >= 3 },
    { id: "the-answer", name: "The Answer", desc: "Reach exactly 42 lifetime presses.", icon: "🔢", rarity: "rare", progress: { target: 42, get: (s) => Math.min(s.lifetimeClicks, 42) }, check: (s) => s.lifetimeClicks === 42 },
    { id: "not-found", name: "Button Not Found", desc: "Reach exactly 404 lifetime presses.", icon: "🚫", rarity: "rare", progress: { target: 404, get: (s) => Math.min(s.lifetimeClicks, 404) }, check: (s) => s.lifetimeClicks === 404 },
    { id: "elite", name: "Elite Clicker", desc: "Reach exactly 1,337 lifetime presses.", icon: "😎", rarity: "epic", progress: { target: 1337, get: (s) => Math.min(s.lifetimeClicks, 1337) }, check: (s) => s.lifetimeClicks === 1337 },
    { id: "overclocker", name: "Overclocker", desc: "Hold the button for 3 seconds.", icon: "🔥", rarity: "rare", check: (_, ctx) => !!(ctx && ctx.longPress) },
    { id: "secret-committee", name: "Secret Committee Member", desc: "Discover the hidden protocol.", icon: "🗝️", rarity: "epic", check: (_, ctx) => !!(ctx && ctx.konami) },
    { id: "jargon-whisperer", name: "Jargon Whisperer", desc: 'Type the word "synergy".', icon: "🗣️", rarity: "common", check: (_, ctx) => !!(ctx && ctx.synergyWord) },
    { id: "buzzword-bingo", name: "Buzzword Bingo", desc: "Type 5 different corporate buzzwords.", icon: "🎱", rarity: "epic", check: (_, ctx) => !!(ctx && ctx.buzzwordBingo) },
    { id: "right-click-rebel", name: "Right-Click Rebel", desc: "Right-click the button.", icon: "🖱️", rarity: "rare", check: (_, ctx) => !!(ctx && ctx.rightClick) },
    { id: "tug-of-war", name: "Tug of War", desc: "Try to drag the button away.", icon: "🪢", rarity: "rare", check: (_, ctx) => !!(ctx && ctx.dragged) },
    { id: "command-line", name: "Command Line Interface", desc: "Open the command palette.", icon: "⌨️", rarity: "rare", check: (_, ctx) => !!(ctx && ctx.paletteOpened) },
    { id: "behind-the-curtain", name: "Behind the Curtain", desc: "Open Settings.", icon: "🎛️", rarity: "common", check: (_, ctx) => !!(ctx && ctx.settingsOpened) },
    { id: "paper-trail", name: "Paper Trail", desc: "Export your data.", icon: "📤", rarity: "common", check: (_, ctx) => !!(ctx && ctx.exported) },
    { id: "clean-slate", name: "Clean Slate", desc: "Reset your statistics.", icon: "♻️", rarity: "rare", check: (_, ctx) => !!(ctx && ctx.resetDone) },
    { id: "weekend-warrior", name: "Weekend Warrior", desc: "Press on a Saturday or Sunday.", icon: "🌤️", rarity: "common", check: (_, ctx) => !!(ctx && ctx.isWeekend) },
    { id: "full-compliance", name: "Full Compliance", desc: "Touch every setting at least once.", icon: "✅", rarity: "rare", check: (_, ctx) => !!(ctx && ctx.fullCompliance) },
    { id: "tab-abandoner", name: "Tab Abandoner", desc: "Leave the tab and come back.", icon: "🚪", rarity: "common", check: (_, ctx) => !!(ctx && ctx.tabReturned) },
    { id: "patient-one", name: "The Patient One", desc: "Wait 60 seconds without pressing.", icon: "🧘", rarity: "rare", check: (_, ctx) => !!(ctx && ctx.patient) },
    { id: "logo-hunter", name: "Logo Hunter", desc: "Click the logo 5 times quickly.", icon: "🫥", rarity: "common", check: (_, ctx) => !!(ctx && ctx.logoHunter) },
  ];

  /* ------------------------------------------------------------------ */
  /* State                                                               */
  /* ------------------------------------------------------------------ */

  function today() {
    return new Date().toISOString().slice(0, 10);
  }

  function defaultState() {
    return {
      lifetimeClicks: 0,
      breakthroughs: 0,
      achievements: [],
      firstVisit: new Date().toISOString(),
      visitDays: [today()],
      longestSession: 0,
      synergyIndex: 50,
      happiness: 50,
      momentum: 0,
      efficiency: 92,
      departmentCounts: {},
      activityLog: [],
      ticketSeq: 10000 + Math.floor(Math.random() * 9000),
      settings: {
        theme: "dark",
        sound: true,
        haptics: true,
        reduceMotion: false,
        jargon: 2,
      },
    };
  }

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY) || localStorage.getItem("eib:v1");
      if (!raw) return defaultState();
      const parsed = JSON.parse(raw);
      const base = defaultState();
      const merged = Object.assign({}, base, parsed);
      merged.settings = Object.assign({}, base.settings, parsed.settings || {});
      if (!Array.isArray(merged.visitDays)) merged.visitDays = [today()];
      if (!Array.isArray(merged.achievements)) merged.achievements = [];
      if (!Array.isArray(merged.activityLog)) merged.activityLog = [];
      if (!merged.departmentCounts || typeof merged.departmentCounts !== "object") merged.departmentCounts = {};
      const t = today();
      if (merged.visitDays[merged.visitDays.length - 1] !== t) merged.visitDays.push(t);
      return merged;
    } catch (e) {
      return defaultState();
    }
  }

  let state = loadState();
  let saveTimer = null;
  function saveState() {
    clearTimeout(saveTimer);
    saveTimer = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      } catch (e) {
        /* storage unavailable or full; fail silently */
      }
    }, 120);
  }

  const session = {
    clicks: 0,
    start: Date.now(),
    timestamps: [],
    velocityHistory: [],
    achievementsThisSession: 0,
    konamiBuffer: [],
    wordBuffer: "",
    buzzwordsFound: new Set(),
    touchedSettings: new Set(),
    idleTimer: null,
    hoverIdleTimer: null,
  };

  /* ------------------------------------------------------------------ */
  /* Utilities                                                           */
  /* ------------------------------------------------------------------ */

  function randInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  function randomFrom(arr) {
    return arr[randInt(0, arr.length - 1)];
  }
  function formatNumber(n) {
    return new Intl.NumberFormat("en-US").format(Math.round(n));
  }
  function formatDecimal2(n) {
    return n.toFixed(2);
  }
  function formatDuration(ms) {
    const totalSec = Math.floor(ms / 1000);
    const m = Math.floor(totalSec / 60);
    const s = totalSec % 60;
    return `${m}:${String(s).padStart(2, "0")}`;
  }
  function ticket() {
    state.ticketSeq += randInt(1, 7);
    return `EIT-${state.ticketSeq}`;
  }
  function scrollToId(id) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: state.settings.reduceMotion ? "auto" : "smooth", block: "start" });
  }

  function weightedPick(entries) {
    const total = entries.reduce((sum, e) => sum + e.weight, 0);
    let r = Math.random() * total;
    for (const e of entries) {
      if (r < e.weight) return e.key;
      r -= e.weight;
    }
    return entries[entries.length - 1].key;
  }

  function animateNumber(el, to, opts) {
    if (!el) return;
    opts = opts || {};
    const formatter = opts.formatter || formatNumber;
    const from = parseFloat(el.dataset.rawValue || "0") || 0;
    el.dataset.rawValue = String(to);
    if (state.settings.reduceMotion || Math.abs(to - from) < 0.0001) {
      el.textContent = formatter(to);
      return;
    }
    const duration = opts.duration || 500;
    const start = performance.now();
    if (el._numRaf) cancelAnimationFrame(el._numRaf);
    function tick(now) {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const val = from + (to - from) * eased;
      el.textContent = formatter(val);
      if (t < 1) el._numRaf = requestAnimationFrame(tick);
    }
    el._numRaf = requestAnimationFrame(tick);
  }

  /* ------------------------------------------------------------------ */
  /* Sound (Web Audio, generated — no audio files)                      */
  /* ------------------------------------------------------------------ */

  let audioCtx = null;
  function ensureAudio() {
    if (!state.settings.sound) return null;
    if (!audioCtx) {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return null;
      audioCtx = new Ctx();
    }
    if (audioCtx.state === "suspended") audioCtx.resume();
    return audioCtx;
  }

  function tone(freq, duration, opts) {
    const ctx = ensureAudio();
    if (!ctx) return;
    opts = opts || {};
    const t0 = ctx.currentTime + (opts.delay || 0);
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = opts.type || "sine";
    osc.frequency.setValueAtTime(freq, t0);
    if (opts.slideTo) osc.frequency.exponentialRampToValueAtTime(opts.slideTo, t0 + duration);
    const peak = opts.volume != null ? opts.volume : 0.08;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t0);
    osc.stop(t0 + duration + 0.02);
  }

  function playNoise(opts) {
    const ctx = ensureAudio();
    if (!ctx) return;
    opts = opts || {};
    const duration = opts.duration || 0.3;
    const bufferSize = Math.max(1, Math.floor(ctx.sampleRate * duration));
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
    const src = ctx.createBufferSource();
    src.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = opts.filterType || "bandpass";
    filter.frequency.setValueAtTime(opts.freq || 1200, ctx.currentTime);
    if (opts.freqTo) filter.frequency.exponentialRampToValueAtTime(opts.freqTo, ctx.currentTime + duration);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(opts.volume || 0.05, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);
    src.connect(filter).connect(gain).connect(ctx.destination);
    src.start();
    src.stop(ctx.currentTime + duration + 0.02);
  }

  const Sound = {
    click: () => {
      tone(520, 0.09, { type: "sine", slideTo: 380, volume: 0.09 });
      playNoise({ duration: 0.05, filterType: "bandpass", freq: 1800, volume: 0.02 });
    },
    hover: () => tone(1400, 0.04, { type: "sine", volume: 0.015 }),
    tick: () => tone(900, 0.03, { type: "sine", volume: 0.03 }),
    toast: () => tone(720, 0.08, { type: "sine", volume: 0.05 }),
    whoosh: () => playNoise({ duration: 0.32, filterType: "lowpass", freq: 2200, freqTo: 400, volume: 0.04 }),
    whooshClose: () => playNoise({ duration: 0.24, filterType: "lowpass", freq: 500, freqTo: 1800, volume: 0.03 }),
    dragSnap: () => tone(440, 0.1, { type: "sine", slideTo: 220, volume: 0.06 }),
    unlock: (rarity) => {
      tone(523.25, 0.12, { volume: 0.07 });
      tone(659.25, 0.12, { delay: 0.09, volume: 0.07 });
      tone(783.99, 0.18, { delay: 0.18, volume: 0.07 });
      if (rarity === "epic" || rarity === "legendary") tone(987.77, 0.2, { delay: 0.3, volume: 0.07 });
      if (rarity === "legendary") {
        tone(1174.66, 0.3, { delay: 0.42, volume: 0.07 });
        setTimeout(() => playNoise({ duration: 0.5, filterType: "highpass", freq: 3000, volume: 0.03 }), 400);
      }
    },
    processing: () => tone(300, 0.5, { type: "triangle", slideTo: 340, volume: 0.03 }),
    breakthrough: () => {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => tone(f, 0.35, { delay: i * 0.09, volume: 0.075, type: "triangle" }));
      setTimeout(() => playNoise({ duration: 0.6, filterType: "highpass", freq: 2500, volume: 0.035 }), 300);
    },
    warn: () => tone(220, 0.22, { type: "sawtooth", slideTo: 160, volume: 0.05 }),
    denied: () => {
      tone(180, 0.18, { type: "square", volume: 0.05 });
      playNoise({ duration: 0.15, filterType: "highpass", freq: 2000, volume: 0.03 });
    },
  };

  /* ------------------------------------------------------------------ */
  /* Haptics                                                             */
  /* ------------------------------------------------------------------ */

  function vibrate(pattern) {
    if (!state.settings.haptics) return;
    if (navigator.vibrate) {
      try {
        navigator.vibrate(pattern);
      } catch (e) {
        /* ignore */
      }
    }
  }

  /* ------------------------------------------------------------------ */
  /* Theme                                                               */
  /* ------------------------------------------------------------------ */

  function resolveTheme() {
    if (state.settings.theme === "system") {
      return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return state.settings.theme;
  }

  function applyTheme() {
    const resolved = resolveTheme();
    document.documentElement.setAttribute("data-theme", resolved);
    document.body.setAttribute("data-theme", resolved);
    $("#theme-toggle .icon-sun").hidden = resolved === "light" ? false : true;
    $("#theme-toggle .icon-moon").hidden = resolved === "dark" ? false : true;
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", resolved === "dark" ? "#0a0b14" : "#f4f5fb");
    $$("#theme-segmented button").forEach((b) => {
      b.setAttribute("aria-checked", String(b.dataset.themeChoice === state.settings.theme));
    });
  }

  function applyMotionPref() {
    document.documentElement.classList.toggle("reduce-motion", !!state.settings.reduceMotion);
  }

  window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", () => {
      if (state.settings.theme === "system") applyTheme();
    });

  /* ------------------------------------------------------------------ */
  /* Toasts                                                              */
  /* ------------------------------------------------------------------ */

  function showToast(icon, title, body, timeout) {
    const region = $("#toast-region");
    const el = document.createElement("div");
    el.className = "toast";
    el.innerHTML = `<span class="toast-icon">${icon}</span><div><p class="toast-title"></p><p class="toast-body"></p></div>`;
    el.querySelector(".toast-title").textContent = title;
    el.querySelector(".toast-body").textContent = body || "";
    region.appendChild(el);
    Sound.toast();
    const remove = () => {
      el.classList.add("toast-out");
      setTimeout(() => el.remove(), 300);
    };
    setTimeout(remove, timeout || 4200);
  }

  function showAchievementToast(a) {
    const toastEl = $("#achievement-toast");
    toastEl.dataset.rarity = a.rarity;
    $("#achievement-toast-icon").textContent = a.icon;
    $("#achievement-toast-title").textContent = a.name;
    $("#achievement-toast-eyebrow").textContent =
      a.rarity === "legendary" ? "Legendary Achievement Unlocked" : a.rarity === "epic" ? "Epic Achievement Unlocked" : "Achievement Unlocked";
    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add("is-visible"));
    Sound.unlock(a.rarity);
    vibrate(a.rarity === "legendary" ? [20, 40, 20, 40, 60] : [20, 40, 20]);
    launchConfetti(a.rarity === "legendary" ? 200 : a.rarity === "epic" ? 120 : a.rarity === "rare" ? 70 : 40);
    setTimeout(() => {
      toastEl.classList.remove("is-visible");
      setTimeout(() => {
        toastEl.hidden = true;
      }, 500);
    }, 3800);
  }

  /* ------------------------------------------------------------------ */
  /* Activity log                                                        */
  /* ------------------------------------------------------------------ */

  function addLogEntry(icon, text) {
    const entry = { icon, text, time: new Date().toISOString() };
    state.activityLog.unshift(entry);
    if (state.activityLog.length > 40) state.activityLog.length = 40;
    saveState();
    renderLogEntry(entry, true);
    $("#activity-empty").hidden = state.activityLog.length > 0;
  }

  function timeAgoLabel(iso) {
    const d = new Date(iso);
    return d.toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
  }

  function renderLogEntry(entry, prepend) {
    const list = $("#activity-log");
    const li = document.createElement("li");
    li.innerHTML = `<span class="activity-icon">${entry.icon}</span><span><span class="activity-text"></span><span class="activity-time"></span></span>`;
    li.querySelector(".activity-text").textContent = entry.text;
    li.querySelector(".activity-time").textContent = timeAgoLabel(entry.time);
    if (prepend) list.prepend(li);
    else list.appendChild(li);
    while (list.children.length > 40) list.removeChild(list.lastChild);
  }

  function renderFullLog() {
    const list = $("#activity-log");
    list.innerHTML = "";
    state.activityLog.forEach((entry) => renderLogEntry(entry, false));
    $("#activity-empty").hidden = state.activityLog.length > 0;
    $("#activity-empty-text").textContent = randomFrom(EMPTY_LOG_MESSAGES);
  }

  /* ------------------------------------------------------------------ */
  /* Achievements engine                                                 */
  /* ------------------------------------------------------------------ */

  function computePrestige() {
    return state.achievements.reduce((sum, id) => {
      const a = ACHIEVEMENTS.find((x) => x.id === id);
      return sum + (a ? RARITY_POINTS[a.rarity] : 0);
    }, 0);
  }

  function renderAchievements() {
    const grid = $("#achievements-grid");
    grid.innerHTML = "";
    ACHIEVEMENTS.forEach((a) => {
      const unlocked = state.achievements.includes(a.id);
      const card = document.createElement("div");
      card.className = `achievement-card rarity-${a.rarity}` + (unlocked ? " is-unlocked" : "");
      let progressHtml = "";
      if (!unlocked && a.progress) {
        const current = a.progress.get(state);
        const pct = Math.max(0, Math.min(100, (current / a.progress.target) * 100));
        progressHtml = `<div class="achievement-progress-track"><div class="achievement-progress-fill" style="width:${pct}%"></div></div><div class="achievement-progress-label">${formatNumber(Math.min(current, a.progress.target))} / ${formatNumber(a.progress.target)}</div>`;
      }
      card.innerHTML = `
        <span class="achievement-icon">${unlocked ? a.icon : "🔒"}</span>
        <span class="achievement-body">
          <span class="achievement-name-row">
            <span class="achievement-name">${unlocked ? a.name : "Locked"}</span>
            ${unlocked ? `<span class="achievement-rarity-tag">${a.rarity}</span>` : ""}
          </span>
          <span class="achievement-desc">${unlocked ? a.desc : "???"}</span>
          ${progressHtml}
        </span>`;
      grid.appendChild(card);
    });
    $("#stat-achievements-total").textContent = ACHIEVEMENTS.length;
  }

  function checkAchievements(ctx) {
    ACHIEVEMENTS.forEach((a) => {
      if (state.achievements.includes(a.id)) return;
      let unlocked = false;
      try {
        unlocked = !!a.check(state, ctx);
      } catch (e) {
        unlocked = false;
      }
      if (unlocked) {
        state.achievements.push(a.id);
        session.achievementsThisSession++;
        saveState();
        showAchievementToast(a);
        addLogEntry("🏆", `Achievement unlocked: "${a.name}."`);
        renderAchievements();
      }
    });
  }

  /* ------------------------------------------------------------------ */
  /* Confetti                                                            */
  /* ------------------------------------------------------------------ */

  const confettiCanvas = $("#confetti-canvas");
  const confettiCtx = confettiCanvas.getContext("2d");
  let confettiParticles = [];
  let confettiRAF = null;

  function resizeConfetti() {
    confettiCanvas.width = window.innerWidth * devicePixelRatio;
    confettiCanvas.height = window.innerHeight * devicePixelRatio;
    confettiCanvas.style.width = window.innerWidth + "px";
    confettiCanvas.style.height = window.innerHeight + "px";
  }
  window.addEventListener("resize", resizeConfetti);
  resizeConfetti();

  const CONFETTI_COLORS = ["#8b7bff", "#ff6f9c", "#2fd9b5", "#fbbf24", "#6c5ce7"];
  const CONFETTI_SHAPES = ["rect", "circle", "ribbon"];

  function launchConfetti(count) {
    if (state.settings.reduceMotion) return;
    const dpr = devicePixelRatio;
    const cx = window.innerWidth / 2;
    for (let i = 0; i < (count || 90); i++) {
      confettiParticles.push({
        x: (cx + randInt(-80, 80)) * dpr,
        y: window.innerHeight * 0.4 * dpr,
        vx: (Math.random() - 0.5) * 8 * dpr,
        vy: (-Math.random() * 10 - 4) * dpr,
        g: 0.28 * dpr,
        size: (Math.random() * 6 + 4) * dpr,
        color: randomFrom(CONFETTI_COLORS),
        shape: randomFrom(CONFETTI_SHAPES),
        rot: Math.random() * Math.PI,
        vr: (Math.random() - 0.5) * 0.3,
        life: 0,
        maxLife: randInt(70, 130),
      });
    }
    if (!confettiRAF) confettiRAF = requestAnimationFrame(tickConfetti);
  }

  function tickConfetti() {
    confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confettiParticles = confettiParticles.filter((p) => p.life < p.maxLife);
    confettiParticles.forEach((p) => {
      p.vy += p.g;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      p.life++;
      const alpha = 1 - p.life / p.maxLife;
      confettiCtx.save();
      confettiCtx.globalAlpha = Math.max(alpha, 0);
      confettiCtx.translate(p.x, p.y);
      confettiCtx.rotate(p.rot);
      confettiCtx.fillStyle = p.color;
      if (p.shape === "circle") {
        confettiCtx.beginPath();
        confettiCtx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        confettiCtx.fill();
      } else if (p.shape === "ribbon") {
        confettiCtx.fillRect(-p.size / 2, -p.size / 6, p.size, p.size / 3);
      } else {
        confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
      }
      confettiCtx.restore();
    });
    if (confettiParticles.length) {
      confettiRAF = requestAnimationFrame(tickConfetti);
    } else {
      confettiRAF = null;
    }
  }

  /* ------------------------------------------------------------------ */
  /* Button ripple                                                       */
  /* ------------------------------------------------------------------ */

  function spawnRipple(x, y) {
    const btn = $("#the-button");
    const layer = $(".ripple-layer");
    const rect = btn.getBoundingClientRect();
    const size = rect.width * 1.4;
    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.width = size + "px";
    ripple.style.height = size + "px";
    ripple.style.left = (x != null ? x - rect.left : rect.width / 2) + "px";
    ripple.style.top = (y != null ? y - rect.top : rect.height / 2) + "px";
    layer.appendChild(ripple);
    setTimeout(() => ripple.remove(), 750);
  }

  /* ------------------------------------------------------------------ */
  /* Overlays                                                             */
  /* ------------------------------------------------------------------ */

  function animateApprovalChain(duration) {
    const steps = $$("#approval-chain li");
    steps.forEach((s) => s.classList.remove("is-active", "is-done"));
    steps[0].classList.add("is-active");
    const per = duration / steps.length;
    for (let s = 1; s < steps.length; s++) {
      setTimeout(() => {
        steps[s - 1].classList.remove("is-active");
        steps[s - 1].classList.add("is-done");
        steps[s].classList.add("is-active");
      }, per * s);
    }
    setTimeout(() => {
      steps[steps.length - 1].classList.remove("is-active");
      steps[steps.length - 1].classList.add("is-done");
    }, duration);
  }

  function showProcessingOverlay(opts) {
    return new Promise((resolve) => {
      const overlay = $("#processing-overlay");
      const titleEl = $("#processing-title");
      const logEl = $("#processing-log");
      const track = $("#progress-bar-track");
      const fill = $("#progress-bar-fill");
      logEl.innerHTML = "";
      titleEl.textContent = opts.title;
      track.hidden = !opts.progress;
      fill.style.width = "0%";
      overlay.classList.add("is-visible");
      overlay.setAttribute("aria-hidden", "false");
      Sound.processing();
      animateApprovalChain(opts.duration);

      const lines = opts.lines.slice();
      const duration = opts.duration;
      const stepDelay = duration / (lines.length + 1);
      let i = 0;
      const interval = setInterval(() => {
        if (i < lines.length) {
          const li = document.createElement("li");
          li.innerHTML = `${lines[i]}<b> ✓</b>`;
          logEl.appendChild(li);
          i++;
        }
      }, stepDelay);

      if (opts.progress) {
        requestAnimationFrame(() => {
          fill.style.transition = `width ${duration}ms linear`;
          fill.style.width = "100%";
        });
      }

      setTimeout(() => {
        clearInterval(interval);
        overlay.classList.remove("is-visible");
        overlay.setAttribute("aria-hidden", "true");
        setTimeout(resolve, 260);
      }, duration);
    });
  }

  function showBreakthrough(message) {
    const overlay = $("#breakthrough-overlay");
    $("#breakthrough-body").textContent = message;
    overlay.classList.add("is-visible");
    overlay.setAttribute("aria-hidden", "false");
    launchConfetti(220);
    Sound.breakthrough();
    vibrate([30, 60, 30, 60, 80]);
    const dismiss = () => {
      overlay.classList.remove("is-visible");
      overlay.setAttribute("aria-hidden", "true");
    };
    $("#breakthrough-dismiss").onclick = dismiss;
    setTimeout(dismiss, 6500);
  }

  /* ------------------------------------------------------------------ */
  /* Charts (canvas, no libraries)                                       */
  /* ------------------------------------------------------------------ */

  function fitCanvas(canvas) {
    const rect = canvas.getBoundingClientRect();
    const dpr = devicePixelRatio || 1;
    const w = Math.max(rect.width, 1);
    const h = canvas.height || 180;
    if (canvas.dataset.fitted === `${w}x${h}`) return canvas.getContext("2d");
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.height = h + "px";
    canvas.dataset.fitted = `${w}x${h}`;
    const ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    return ctx;
  }

  function cssVar(name) {
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  }

  function drawSpark(canvasId, data) {
    const canvas = $("#" + canvasId);
    if (!canvas) return;
    const ctx = fitCanvas(canvas);
    const w = canvas.clientWidth;
    const h = canvas.height / (devicePixelRatio || 1);
    ctx.clearRect(0, 0, w, h);
    if (data.length < 2) return;
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = (i / (data.length - 1)) * w;
      const y = h - ((v - min) / range) * (h - 6) - 3;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, cssVar("--accent"));
    grad.addColorStop(1, cssVar("--accent-2"));
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();
  }

  function drawVelocityChart() {
    const canvas = $("#chart-velocity");
    if (!canvas) return;
    const ctx = fitCanvas(canvas);
    const w = canvas.clientWidth;
    const h = canvas.height / (devicePixelRatio || 1);
    ctx.clearRect(0, 0, w, h);
    const data = session.velocityHistory.slice(-20);
    const pad = 16;
    ctx.strokeStyle = cssVar("--surface-border");
    ctx.lineWidth = 1;
    for (let i = 0; i <= 3; i++) {
      const y = pad + ((h - pad * 2) / 3) * i;
      ctx.beginPath();
      ctx.moveTo(pad, y);
      ctx.lineTo(w - pad, y);
      ctx.stroke();
    }
    if (data.length < 2) {
      ctx.fillStyle = cssVar("--text-tertiary");
      ctx.font = "12px sans-serif";
      ctx.fillText("Press the button to populate this chart.", pad, h / 2);
      return;
    }
    const max = Math.max(...data, 1);
    ctx.beginPath();
    data.forEach((v, i) => {
      const x = pad + (i / (data.length - 1)) * (w - pad * 2);
      const y = h - pad - (v / max) * (h - pad * 2);
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    });
    const grad = ctx.createLinearGradient(0, 0, w, 0);
    grad.addColorStop(0, cssVar("--accent"));
    grad.addColorStop(1, cssVar("--accent-2"));
    ctx.strokeStyle = grad;
    ctx.lineWidth = 2.5;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";
    ctx.stroke();

    data.forEach((v, i) => {
      const x = pad + (i / (data.length - 1)) * (w - pad * 2);
      const y = h - pad - (v / max) * (h - pad * 2);
      ctx.beginPath();
      ctx.arc(x, y, 2.6, 0, Math.PI * 2);
      ctx.fillStyle = cssVar("--accent-2");
      ctx.fill();
    });
  }

  function drawDepartmentChart() {
    const canvas = $("#chart-departments");
    if (!canvas) return;
    const ctx = fitCanvas(canvas);
    const w = canvas.clientWidth;
    const h = canvas.height / (devicePixelRatio || 1);
    ctx.clearRect(0, 0, w, h);
    const entries = DEPARTMENTS.map((d) => [d, state.departmentCounts[d] || 0]);
    const max = Math.max(...entries.map((e) => e[1]), 1);
    const padTop = 10;
    const padBottom = 34;
    const barGap = 10;
    const barW = (w - barGap * (entries.length - 1)) / entries.length;
    ctx.font = "10px sans-serif";
    ctx.textAlign = "center";
    entries.forEach(([label, val], i) => {
      const x = i * (barW + barGap);
      const barH = ((h - padTop - padBottom) * val) / max;
      const grad = ctx.createLinearGradient(0, h - padBottom - barH, 0, h - padBottom);
      grad.addColorStop(0, cssVar("--accent-2"));
      grad.addColorStop(1, cssVar("--accent"));
      ctx.fillStyle = val > 0 ? grad : cssVar("--surface-border");
      const radius = 5;
      const bh = Math.max(barH, 3);
      const by = h - padBottom - bh;
      ctx.beginPath();
      ctx.moveTo(x, by + bh);
      ctx.lineTo(x, by + radius);
      ctx.quadraticCurveTo(x, by, x + radius, by);
      ctx.lineTo(x + barW - radius, by);
      ctx.quadraticCurveTo(x + barW, by, x + barW, by + radius);
      ctx.lineTo(x + barW, by + bh);
      ctx.closePath();
      ctx.fill();

      ctx.fillStyle = cssVar("--text-primary");
      ctx.font = "11px sans-serif";
      ctx.fillText(String(val), x + barW / 2, by - 6 >= 10 ? by - 6 : by + 12);

      ctx.fillStyle = cssVar("--text-tertiary");
      ctx.font = "9px sans-serif";
      const words = label.split(" ");
      const line1 = words.slice(0, 2).join(" ");
      const line2 = words.slice(2).join(" ");
      ctx.fillText(line1, x + barW / 2, h - padBottom + 12);
      if (line2) ctx.fillText(line2, x + barW / 2, h - padBottom + 22);
    });
  }

  function redrawAllCharts() {
    drawVelocityChart();
    drawDepartmentChart();
    drawSpark("spark-synergy", sparkHistory.synergy);
    drawSpark("spark-happiness", sparkHistory.happiness);
    drawSpark("spark-momentum", sparkHistory.momentum);
    drawSpark("spark-efficiency", sparkHistory.efficiency);
  }

  const sparkHistory = {
    synergy: [state.synergyIndex],
    happiness: [state.happiness],
    momentum: [state.momentum],
    efficiency: [state.efficiency],
  };

  /* ------------------------------------------------------------------ */
  /* KPI / dashboard updates                                             */
  /* ------------------------------------------------------------------ */

  function pushSpark(key, value) {
    const arr = sparkHistory[key];
    arr.push(value);
    if (arr.length > 24) arr.shift();
  }

  function bumpKpis() {
    const prevSynergy = state.synergyIndex;
    const prevHappiness = state.happiness;
    const prevMomentum = state.momentum;
    const prevEfficiency = state.efficiency;

    state.synergyIndex = Math.min(999.99, state.synergyIndex + Math.random() * 2.4);
    state.happiness = Math.min(100, Math.max(0, state.happiness + (Math.random() * 3 - 0.6)));
    state.momentum = Math.max(0, state.momentum + randInt(-2, 6));
    state.efficiency = Math.min(100, Math.max(60, state.efficiency + (Math.random() * 2 - 0.8)));

    pushSpark("synergy", state.synergyIndex);
    pushSpark("happiness", state.happiness);
    pushSpark("momentum", state.momentum);
    pushSpark("efficiency", state.efficiency);

    animateNumber($("#kpi-synergy"), state.synergyIndex, { formatter: formatDecimal2 });
    animateNumber($("#kpi-happiness-num"), Math.round(state.happiness));
    animateNumber($("#kpi-momentum"), state.momentum);
    $("#kpi-efficiency").textContent = state.efficiency >= 97 ? "A++" : state.efficiency >= 90 ? "A+" : state.efficiency >= 80 ? "A" : state.efficiency >= 70 ? "B" : "C";

    setTrend("kpi-synergy-trend", state.synergyIndex - prevSynergy);
    setTrend("kpi-happiness-trend", state.happiness - prevHappiness);
    setTrend("kpi-momentum-trend", state.momentum - prevMomentum);
    setTrend("kpi-efficiency-trend", state.efficiency - prevEfficiency);

    redrawAllCharts();
    saveState();
  }

  function setTrend(id, delta) {
    const el = $("#" + id);
    if (!el) return;
    const pct = Math.abs(delta).toFixed(1);
    if (delta > 0.01) {
      el.textContent = `▲ ${pct}%`;
      el.className = "kpi-trend kpi-trend--up";
    } else if (delta < -0.01) {
      el.textContent = `▼ ${pct}%`;
      el.className = "kpi-trend kpi-trend--down";
    } else {
      el.textContent = `— 0.0%`;
      el.className = "kpi-trend";
    }
  }

  /* ------------------------------------------------------------------ */
  /* Stats rendering                                                     */
  /* ------------------------------------------------------------------ */

  function renderStats() {
    animateNumber($("#session-clicks"), session.clicks, { duration: 350 });
    animateNumber($("#lifetime-clicks"), state.lifetimeClicks, { duration: 350 });

    const now = Date.now();
    const recent = session.timestamps.filter((t) => now - t < 60000);
    animateNumber($("#cpm-value"), recent.length, { duration: 350 });

    $("#mobile-bar-count").textContent = formatNumber(state.lifetimeClicks);

    $("#stat-session-duration").textContent = formatDuration(now - session.start);
    $("#stat-achievements").innerHTML = `${state.achievements.length} / <span id="stat-achievements-total">${ACHIEVEMENTS.length}</span>`;
    animateNumber($("#stat-prestige"), computePrestige(), { duration: 400 });
    animateNumber($("#stat-breakthroughs"), state.breakthroughs, { duration: 400 });
    animateNumber($("#stat-days-visited"), state.visitDays.length, { duration: 400 });
    animateNumber($("#stat-longest-session"), Math.max(state.longestSession, session.clicks), { duration: 400 });

    const first = new Date(state.firstVisit);
    $("#stat-member-since").textContent = first.toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }

  setInterval(() => {
    renderStats();
  }, 1000);

  /* ------------------------------------------------------------------ */
  /* Outcome handlers                                                    */
  /* ------------------------------------------------------------------ */

  function pickDepartment() {
    const dept = randomFrom(DEPARTMENTS);
    state.departmentCounts[dept] = (state.departmentCounts[dept] || 0) + 1;
    return dept;
  }

  const OUTCOME_WEIGHTS = [
    { key: "congratulate", weight: 16 },
    { key: "progressReport", weight: 8 },
    { key: "statIncrease", weight: 14 },
    { key: "celebration", weight: 10 },
    { key: "employeeNotification", weight: 10 },
    { key: "logged", weight: 12 },
    { key: "processingScreen", weight: 10 },
    { key: "chartUpdate", weight: 8 },
    { key: "executiveApproval", weight: 8 },
    { key: "dontPressAgain", weight: 5 },
    { key: "nothing", weight: 8 },
    { key: "breakthrough", weight: 1 },
  ];

  function chooseOutcome() {
    let key = weightedPick(OUTCOME_WEIGHTS);
    if (key === "dontPressAgain" && session.clicks < 4) key = "congratulate";
    if (key === "breakthrough" && state.lifetimeClicks < 5) key = "celebration";
    return key;
  }

  const OUTCOME_HANDLERS = {
    congratulate() {
      const msg = randomFrom(CONGRATS);
      setStatus(msg);
      addLogEntry("✅", msg);
    },
    progressReport() {
      setStatus("Generating your corporate progress report…");
      showProcessingOverlay({
        title: "Generating Corporate Progress Report…",
        lines: ["Compiling quarterly data", "Applying favorable rounding", "Formatting for the Board"],
        duration: randInt(1400, 2600),
        progress: true,
      }).then(() => {
        const result = randomFrom(REPORT_RESULTS);
        showToast("📊", "Progress Report Ready", result);
        addLogEntry("📊", result);
        setStatus("Report delivered. As always, results speak for themselves.");
      });
    },
    statIncrease() {
      const metrics = [
        () => `Global Synergy Index +${(Math.random() * 2).toFixed(2)}%`,
        () => `Stakeholder Happiness +${randInt(1, 4)}%`,
        () => `Quarterly Momentum +${randInt(1, 12)} pts`,
        () => `Operational Efficiency +${(Math.random() * 1.5).toFixed(1)}%`,
        () => `Brand Trust Score +${randInt(1, 3)}%`,
      ];
      const msg = randomFrom(metrics)();
      setStatus(msg);
      addLogEntry("📈", msg);
    },
    celebration() {
      setStatus("A small, entirely appropriate celebration is occurring.");
      launchConfetti(70);
      addLogEntry("🎉", "A tiny celebration animation played in your honor.");
    },
    employeeNotification() {
      const who = randomFrom(EMPLOYEES);
      const msg = `${who} has been notified of your action and reacted with 👍.`;
      setStatus(msg);
      addLogEntry("📣", msg);
    },
    logged() {
      const tk = ticket();
      const msg = `Your action has been logged under ticket #${tk}. Retention period: forever.`;
      setStatus(msg);
      addLogEntry("🗂️", msg);
    },
    processingScreen() {
      setStatus("Please wait. This press is being taken very seriously.");
      const lines = [];
      const n = randInt(2, 3);
      const pool = PROCESSING_LINES.slice();
      for (let i = 0; i < n; i++) {
        lines.push(pool.splice(randInt(0, pool.length - 1), 1)[0]);
      }
      showProcessingOverlay({
        title: randomFrom(["Processing your request…", "Escalating importance…", "Contacting stakeholders…"]),
        lines,
        duration: randInt(1000, 3000),
        progress: false,
      }).then(() => {
        const dept = pickDepartment();
        showToast("✔️", "Processing Complete", `Your press was routed to the ${dept}.`);
        addLogEntry("✔️", `Press routed to the ${dept}.`);
        redrawAllCharts();
      });
    },
    chartUpdate() {
      setStatus("A completely unnecessary chart has just updated.");
      bumpKpis();
      addLogEntry("📉", "An unnecessary chart updated. Nobody will review it.");
    },
    executiveApproval() {
      const name = `${randomFrom(EXEC_FIRST)} ${randomFrom(EXEC_LAST)}`;
      const title = randomFrom(EXEC_TITLES);
      const msg = `Approved by ${name}, ${title}.`;
      setStatus(msg);
      showToast("🖋️", "Executive Approval Received", msg);
      addLogEntry("🖋️", msg);
    },
    dontPressAgain() {
      const msg = randomFrom(DONT_PRESS_AGAIN);
      setStatus(msg);
      Sound.warn();
      addLogEntry("⚠️", msg);
    },
    nothing() {
      const msg = randomFrom(NOTHING);
      setStatus(msg);
      addLogEntry("🌫️", "Nothing happened. It was logged anyway.");
    },
    breakthrough() {
      state.breakthroughs++;
      const msg = randomFrom(BREAKTHROUGH_LINES);
      setStatus("SYSTEM BREAKTHROUGH ACHIEVED.");
      showBreakthrough(msg);
      addLogEntry("🌟", "SYSTEM BREAKTHROUGH: " + msg);
      state.momentum += 50;
      state.synergyIndex += 20;
      state.happiness = Math.min(100, state.happiness + 15);
      saveState();
      redrawAllCharts();
    },
  };

  function setStatus(text) {
    const el = $("#button-status");
    el.style.opacity = "0";
    el.style.transform = "translateY(3px)";
    setTimeout(() => {
      el.textContent = text;
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 120);
  }

  /* ------------------------------------------------------------------ */
  /* Button interactions: press, drag-resist, long-press charge, tilt    */
  /* ------------------------------------------------------------------ */

  const theButton = $("#the-button");
  const tiltWrap = $("#button-tilt-wrap");
  const chargeRing = $("#charge-ring");

  let longPressTimer = null;
  let longPressFired = false;
  let pointerDownInfo = null;
  let dragSuppressClick = false;

  function onButtonPointerDown(e) {
    if (e.button === 2) return;
    try {
      theButton.setPointerCapture(e.pointerId);
    } catch (err) {
      /* ignore */
    }
    pointerDownInfo = { id: e.pointerId, x: e.clientX, y: e.clientY, isDragging: false };
    longPressFired = false;
    theButton.classList.add("is-pressed");
    clearTimeout(longPressTimer);
    chargeRing.classList.remove("is-charging");
    void chargeRing.offsetWidth;
    chargeRing.classList.add("is-charging");
    longPressTimer = setTimeout(() => {
      longPressFired = true;
      vibrate([15, 30, 15, 30, 60]);
      showToast("🔥", "Overclocking Detected", "Sustained pressure logged. Engineering has been alerted.");
    }, 3000);
  }

  function onButtonPointerMove(e) {
    if (!pointerDownInfo || e.pointerId !== pointerDownInfo.id) return;
    const dx = e.clientX - pointerDownInfo.x;
    const dy = e.clientY - pointerDownInfo.y;
    const dist = Math.hypot(dx, dy);
    if (!pointerDownInfo.isDragging && dist > 10) {
      pointerDownInfo.isDragging = true;
      clearTimeout(longPressTimer);
      chargeRing.classList.remove("is-charging");
      theButton.classList.add("is-dragging");
    }
    if (pointerDownInfo.isDragging) {
      const rx = Math.max(-56, Math.min(56, dx * 0.32));
      const ry = Math.max(-56, Math.min(56, dy * 0.32));
      theButton.style.transform = `translate(${rx}px, ${ry}px) scale(0.96)`;
    }
  }

  function onButtonPointerUp(e) {
    if (!pointerDownInfo || e.pointerId !== pointerDownInfo.id) return;
    clearTimeout(longPressTimer);
    theButton.classList.remove("is-pressed");
    chargeRing.classList.remove("is-charging");
    try {
      theButton.releasePointerCapture(e.pointerId);
    } catch (err) {
      /* ignore */
    }
    const wasDragging = pointerDownInfo.isDragging;
    pointerDownInfo = null;
    if (wasDragging) {
      theButton.classList.add("is-snapping");
      theButton.style.transform = "";
      setTimeout(() => theButton.classList.remove("is-snapping", "is-dragging"), 650);
      Sound.dragSnap();
      vibrate([10, 20, 10]);
      showToast("🫷", "Access Denied", "The button resists relocation. It knows exactly where it belongs.");
      checkAchievements({ dragged: true });
      dragSuppressClick = true;
    }
  }

  function onButtonPointerCancel() {
    clearTimeout(longPressTimer);
    theButton.classList.remove("is-pressed", "is-dragging");
    chargeRing.classList.remove("is-charging");
    theButton.style.transform = "";
    pointerDownInfo = null;
  }

  function onButtonContextMenu(e) {
    e.preventDefault();
    theButton.classList.add("is-shaking");
    setTimeout(() => theButton.classList.remove("is-shaking"), 450);
    Sound.denied();
    vibrate(25);
    showToast("🚫", "Access Denied", "Right-click access denied. This button does not support alternative input methods.");
    checkAchievements({ rightClick: true });
  }

  function onButtonPointerEnter(e) {
    if (e.pointerType && e.pointerType !== "mouse") return;
    Sound.hover();
    clearTimeout(session.hoverIdleTimer);
    session.hoverIdleTimer = setTimeout(() => {
      showToast("🥺", "Feeling Neglected", "The button has been hovered, but not pressed, for quite some time.");
    }, 10000);
  }
  function onButtonPointerLeave() {
    clearTimeout(session.hoverIdleTimer);
  }

  function handleClick(e) {
    if (dragSuppressClick) {
      dragSuppressClick = false;
      return;
    }
    const point = e && e.clientX ? { x: e.clientX, y: e.clientY } : null;
    spawnRipple(point ? point.x : null, point ? point.y : null);
    vibrate(18);
    Sound.click();

    const now = Date.now();
    session.clicks++;
    session.timestamps.push(now);
    if (session.timestamps.length > 200) session.timestamps.shift();

    state.lifetimeClicks++;
    pickDepartment();
    session.velocityHistory.push(session.timestamps.filter((t) => now - t < 10000).length);
    if (session.velocityHistory.length > 20) session.velocityHistory.shift();

    state.longestSession = Math.max(state.longestSession, session.clicks);
    saveState();
    renderStats();
    bumpCounterChip();

    const dateNow = new Date();
    const hour = dateNow.getHours();
    const day = dateNow.getDay();
    const speedDemon = session.timestamps.filter((t) => now - t <= 5000).length >= 10;
    const ctx = {
      isNight: hour >= 0 && hour < 4,
      isWeekend: day === 0 || day === 6,
      speedDemon,
      longPress: longPressFired,
      konami: false,
      synergyWord: false,
    };
    longPressFired = false;

    checkAchievements(ctx);

    const key = chooseOutcome();
    try {
      OUTCOME_HANDLERS[key]();
    } catch (err) {
      setStatus("An unexpected but extremely important error occurred.");
    }

    if (Math.random() < 0.35) bumpKpis();
    if (Math.random() < 0.5) drawDepartmentChart();
    drawVelocityChart();

    clearTimeout(session.idleTimer);
    session.idleTimer = setTimeout(() => {
      if (!document.hidden) checkAchievements({ patient: true });
    }, 60000);
  }

  function bumpCounterChip() {
    const chip = $("#lifetime-clicks").closest(".counter-chip");
    if (!chip) return;
    chip.classList.add("is-bumped");
    setTimeout(() => chip.classList.remove("is-bumped"), 220);
  }

  theButton.addEventListener("click", handleClick);
  theButton.addEventListener("pointerdown", onButtonPointerDown);
  theButton.addEventListener("pointermove", onButtonPointerMove);
  theButton.addEventListener("pointerup", onButtonPointerUp);
  theButton.addEventListener("pointercancel", onButtonPointerCancel);
  theButton.addEventListener("contextmenu", onButtonContextMenu);
  theButton.addEventListener("pointerenter", onButtonPointerEnter);
  theButton.addEventListener("pointerleave", onButtonPointerLeave);

  /* ---- 3D tilt / magnetic hover (mouse only) ---- */
  const tiltState = { tx: 0, ty: 0, rx: 0, ry: 0 };
  const tiltTarget = { tx: 0, ty: 0, rx: 0, ry: 0 };
  let tiltRAF = null;
  function onWindowPointerMoveForTilt(e) {
    if (e.pointerType && e.pointerType !== "mouse") return;
    if (state.settings.reduceMotion) return;
    const rect = tiltWrap.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const maxDist = 260;
    if (dist < maxDist) {
      const strength = 1 - dist / maxDist;
      tiltTarget.ry = (dx / rect.width) * 16 * strength;
      tiltTarget.rx = -(dy / rect.height) * 16 * strength;
      tiltTarget.tx = (dx / maxDist) * 10 * strength;
      tiltTarget.ty = (dy / maxDist) * 10 * strength;
    } else {
      tiltTarget.rx = tiltTarget.ry = tiltTarget.tx = tiltTarget.ty = 0;
    }
    if (!tiltRAF) tiltRAF = requestAnimationFrame(tickTilt);
  }
  function tickTilt() {
    tiltState.rx += (tiltTarget.rx - tiltState.rx) * 0.12;
    tiltState.ry += (tiltTarget.ry - tiltState.ry) * 0.12;
    tiltState.tx += (tiltTarget.tx - tiltState.tx) * 0.12;
    tiltState.ty += (tiltTarget.ty - tiltState.ty) * 0.12;
    tiltWrap.style.transform = `translate(${tiltState.tx}px, ${tiltState.ty}px) rotateX(${tiltState.rx}deg) rotateY(${tiltState.ry}deg)`;
    const settled =
      Math.abs(tiltState.rx - tiltTarget.rx) < 0.02 &&
      Math.abs(tiltState.ry - tiltTarget.ry) < 0.02 &&
      Math.abs(tiltTarget.rx) < 0.01 &&
      Math.abs(tiltTarget.ry) < 0.01;
    if (!settled) tiltRAF = requestAnimationFrame(tickTilt);
    else tiltRAF = null;
  }
  window.addEventListener("pointermove", onWindowPointerMoveForTilt);

  /* ------------------------------------------------------------------ */
  /* Easter eggs: Konami, buzzwords, logo, footer                        */
  /* ------------------------------------------------------------------ */

  const KONAMI = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a"];

  document.addEventListener("keydown", (e) => {
    if ($("#palette-backdrop") && !$("#palette-backdrop").hidden) return;

    session.konamiBuffer.push(e.key);
    if (session.konamiBuffer.length > KONAMI.length) session.konamiBuffer.shift();
    if (session.konamiBuffer.join(",").toLowerCase() === KONAMI.join(",").toLowerCase()) {
      checkAchievements({ konami: true });
      showToast("🗝️", "Hidden Protocol Activated", "The Secret Committee welcomes you.");
      launchConfetti(120);
      session.konamiBuffer = [];
    }

    if (/^[a-z]$/i.test(e.key)) {
      session.wordBuffer += e.key.toLowerCase();
      if (session.wordBuffer.length > 24) session.wordBuffer = session.wordBuffer.slice(-24);
      for (const word of BUZZWORDS) {
        if (session.wordBuffer.endsWith(word)) {
          if (!session.buzzwordsFound.has(word)) {
            session.buzzwordsFound.add(word);
            showToast("🗣️", `Buzzword Detected: "${word}"`, BUZZWORD_REACTIONS[word]);
            checkAchievements({ synergyWord: word === "synergy" });
            if (session.buzzwordsFound.size >= 5) checkAchievements({ buzzwordBingo: true });
          }
          session.wordBuffer = "";
          break;
        }
      }
    }
  });

  let logoClicks = 0;
  let logoClickTimer = null;
  $("#brand-mark").addEventListener("click", () => {
    logoClicks++;
    clearTimeout(logoClickTimer);
    logoClickTimer = setTimeout(() => (logoClicks = 0), 900);
    if (logoClicks >= 5) {
      logoClicks = 0;
      showToast("🫥", "Executive Easter Egg", "You found the founders' secret handshake. They are proud, silently.");
      checkAchievements({ logoHunter: true });
    }
  });

  let footerClicks = 0;
  let footerClickTimer = null;
  $("#footer-copyright").addEventListener("click", () => {
    footerClicks++;
    clearTimeout(footerClickTimer);
    footerClickTimer = setTimeout(() => (footerClicks = 0), 1000);
    if (footerClicks >= 3) {
      footerClicks = 0;
      showToast("📜", "Terms Located", "By reading this, you agree to have already agreed. Retroactively.");
    }
  });

  /* ------------------------------------------------------------------ */
  /* Idle tab detection                                                  */
  /* ------------------------------------------------------------------ */

  let visibleTitle = document.title;
  let titleFlashInterval = null;
  let hiddenAt = null;
  function setTitle(t) {
    visibleTitle = t;
    if (!document.hidden) document.title = t;
  }
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      hiddenAt = Date.now();
      let flash = false;
      clearInterval(titleFlashInterval);
      titleFlashInterval = setInterval(() => {
        document.title = flash ? visibleTitle : "🔴 Come back!";
        flash = !flash;
      }, 1500);
    } else {
      clearInterval(titleFlashInterval);
      document.title = visibleTitle;
      if (hiddenAt && Date.now() - hiddenAt > 5000) {
        showToast("👋", "Welcome Back", "Nothing important happened while you were gone. Probably.");
        checkAchievements({ tabReturned: true });
      }
      hiddenAt = null;
    }
  });

  /* ------------------------------------------------------------------ */
  /* Ticker                                                              */
  /* ------------------------------------------------------------------ */

  function buildTicker() {
    const track = $("#ticker-track");
    const html = TICKER_HEADLINES.map((t) => `<span>${t}</span>`).join("");
    track.innerHTML = html + html;
  }

  /* ------------------------------------------------------------------ */
  /* Live global activity + executive quotes + hero subtitle             */
  /* ------------------------------------------------------------------ */

  function pushLiveFeedEntry() {
    const list = $("#live-feed");
    if (!list) return;
    const city = randomFrom(CITIES);
    const action = randomFrom(LIVE_ACTIONS);
    const li = document.createElement("li");
    const time = new Date().toLocaleTimeString(undefined, { hour: "numeric", minute: "2-digit" });
    li.innerHTML = `<span>Someone in <b>${city}</b> ${action}.</span><span class="live-time">${time}</span>`;
    list.prepend(li);
    while (list.children.length > 6) list.removeChild(list.lastChild);
  }
  function scheduleLiveFeed() {
    pushLiveFeedEntry();
    setTimeout(scheduleLiveFeed, randInt(4000, 9000));
  }
  function updateLiveViewers() {
    const el = $("#live-viewers");
    if (!el) return;
    el.textContent = `${formatNumber(randInt(340, 2200))} stakeholders watching`;
  }

  let quoteIndex = 0;
  function rotateQuote() {
    const q = QUOTES[quoteIndex % QUOTES.length];
    const textEl = $("#exec-quote-text");
    const citeEl = $("#exec-quote-cite");
    if (!textEl) return;
    textEl.style.opacity = "0";
    setTimeout(() => {
      textEl.textContent = `“${q.text}”`;
      citeEl.textContent = `— ${q.author}`;
      textEl.style.opacity = "1";
    }, 260);
    quoteIndex++;
  }

  let subtitleIndex = 0;
  function rotateSubtitle() {
    const el = $("#hero-subtitle");
    if (!el) return;
    subtitleIndex = (subtitleIndex + 1) % SUBTITLES.length;
    el.style.opacity = "0";
    setTimeout(() => {
      el.textContent = SUBTITLES[subtitleIndex];
      el.style.opacity = "1";
    }, 260);
  }

  /* ------------------------------------------------------------------ */
  /* Scroll reveal + mobile sticky bar                                   */
  /* ------------------------------------------------------------------ */

  function initScrollReveal() {
    if (!("IntersectionObserver" in window)) {
      $$(".section-reveal").forEach((el) => el.classList.add("is-visible"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    $$(".section-reveal").forEach((el) => observer.observe(el));
    setTimeout(() => $$(".section-reveal").forEach((el) => el.classList.add("is-visible")), 4000);
  }

  function updateMobileBar() {
    const bar = $("#mobile-bar");
    if (window.innerWidth > 640) {
      bar.classList.remove("is-visible");
      return;
    }
    const heroBottom = $("#home").getBoundingClientRect().bottom;
    if (heroBottom < 80) bar.classList.add("is-visible");
    else bar.classList.remove("is-visible");
  }
  let mobileBarRAF = null;
  window.addEventListener(
    "scroll",
    () => {
      if (mobileBarRAF) return;
      mobileBarRAF = requestAnimationFrame(() => {
        updateMobileBar();
        mobileBarRAF = null;
      });
    },
    { passive: true }
  );
  window.addEventListener("resize", updateMobileBar);
  $("#mobile-bar-btn").addEventListener("click", () => handleClick({}));

  /* ------------------------------------------------------------------ */
  /* Command palette                                                     */
  /* ------------------------------------------------------------------ */

  function paletteToast(icon, title, body) {
    showToast(icon, title, body);
  }

  function runSelfDestructBit() {
    showToast("💣", "Self-Destruct Initiated", "Countdown started: 5… 4… 3…");
    Sound.warn();
    setTimeout(() => {
      showToast("🛑", "Self-Destruct Aborted", "Just kidding. HR would never approve this.");
      Sound.toast();
    }, 1300);
  }

  const COMMANDS = [
    { id: "press", label: "Press The Button", desc: "Execute a press from anywhere.", action: () => handleClick({}) },
    { id: "toggle-theme", label: "Toggle Appearance", desc: "Swap light and dark mode.", action: () => $("#theme-toggle").click() },
    { id: "toggle-sound", label: "Toggle Sound", desc: "Mute or unmute the importance.", action: () => $("#sound-toggle").click() },
    { id: "open-settings", label: "Open Settings", desc: "Adjust unnecessary preferences.", action: () => $("#settings-open").click() },
    { id: "share", label: "Share Your Performance", desc: "Generate a performance card.", action: () => $("#share-open").click() },
    { id: "view-dashboard", label: "View Dashboard", desc: "Scroll to the performance dashboard.", action: () => scrollToId("dashboard") },
    { id: "view-activity", label: "View Activity Log", desc: "Scroll to the audit trail.", action: () => scrollToId("activity") },
    { id: "view-achievements", label: "View Achievements", desc: "Scroll to your meaningless recognitions.", action: () => scrollToId("achievements") },
    { id: "escalate-legal", label: "Escalate to Legal", desc: "Involve people who did not ask to be involved.", action: () => paletteToast("⚖️", "Escalated to Legal", "Legal has been made aware. They will not respond.") },
    { id: "summon-board", label: "Summon the Board", desc: "Convene an emergency meeting about nothing.", action: () => paletteToast("🏛️", "The Board Has Been Summoned", "They are already in a meeting about this.") },
    { id: "request-approval", label: "Request Executive Approval", desc: "Skip the line entirely.", action: () => OUTCOME_HANDLERS.executiveApproval() },
    {
      id: "synergy-protocol",
      label: "Initiate Synergy Protocol",
      desc: "Unlock a hidden alignment.",
      action: () => {
        checkAchievements({ synergyWord: true });
        paletteToast("🌀", "Synergy Protocol Initiated", "Alignment achieved. Nobody is sure with what.");
      },
    },
    { id: "file-complaint", label: "File a Complaint", desc: "It will go somewhere.", action: () => paletteToast("📮", "Complaint Filed", "Your complaint has been filed in /dev/null.") },
    { id: "self-destruct", label: "Self-Destruct Sequence", desc: "Do not actually do this.", action: () => runSelfDestructBit() },
    {
      id: "increase-synergy",
      label: "Increase Synergy Manually",
      desc: "Bypass the button entirely.",
      action: () => {
        bumpKpis();
        paletteToast("📈", "Synergy Increased", "Manual override logged for posterity.");
      },
    },
    { id: "export", label: "Export Your Data", desc: "Download your legacy as JSON.", action: () => $("#export-data").click() },
    { id: "about", label: "About This Button", desc: "Read the mission statement.", action: () => ($("#about-backdrop").hidden = false) },
  ];

  let paletteActiveIndex = 0;
  let paletteFiltered = COMMANDS.slice();

  function renderPalette(query) {
    const q = (query || "").trim().toLowerCase();
    paletteFiltered = COMMANDS.filter((c) => !q || c.label.toLowerCase().includes(q) || c.desc.toLowerCase().includes(q));
    paletteActiveIndex = 0;
    const list = $("#palette-list");
    list.innerHTML = "";
    if (!paletteFiltered.length) {
      list.innerHTML = `<li class="palette-empty">No commands match. This has been noted as a personal failing.</li>`;
      return;
    }
    paletteFiltered.forEach((c, i) => {
      const li = document.createElement("li");
      li.className = "palette-item" + (i === 0 ? " is-active" : "");
      li.setAttribute("role", "option");
      li.innerHTML = `<span>${c.label}</span><span class="palette-item-desc">${c.desc}</span>`;
      li.addEventListener("click", () => executePaletteItem(i));
      li.addEventListener("mousemove", () => setPaletteActive(i));
      list.appendChild(li);
    });
  }

  function setPaletteActive(i) {
    paletteActiveIndex = i;
    $$(".palette-item").forEach((el, idx) => el.classList.toggle("is-active", idx === i));
  }

  function executePaletteItem(i) {
    const cmd = paletteFiltered[i];
    if (!cmd) return;
    closePalette();
    cmd.action();
  }

  function openPalette() {
    const backdrop = $("#palette-backdrop");
    backdrop.hidden = false;
    $("#palette-input").value = "";
    renderPalette("");
    Sound.whoosh();
    setTimeout(() => $("#palette-input").focus(), 30);
    checkAchievements({ paletteOpened: true });
  }
  function closePalette() {
    const backdrop = $("#palette-backdrop");
    if (backdrop.hidden) return;
    backdrop.hidden = true;
    Sound.whooshClose();
  }

  $("#palette-open").addEventListener("click", openPalette);
  $("#palette-open-2").addEventListener("click", openPalette);
  $("#palette-backdrop").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) closePalette();
  });
  $("#palette-input").addEventListener("input", (e) => renderPalette(e.target.value));
  $("#palette-input").addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setPaletteActive(Math.min(paletteActiveIndex + 1, paletteFiltered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setPaletteActive(Math.max(paletteActiveIndex - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      executePaletteItem(paletteActiveIndex);
    } else if (e.key === "Escape") {
      closePalette();
    }
  });

  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      if ($("#palette-backdrop").hidden) openPalette();
      else closePalette();
    } else if (e.key === "Escape") {
      closePalette();
      if (!$("#settings-backdrop").hidden) $("#settings-backdrop").hidden = true;
      if (!$("#share-backdrop").hidden) $("#share-backdrop").hidden = true;
      if (!$("#about-backdrop").hidden) $("#about-backdrop").hidden = true;
    }
  });

  /* ------------------------------------------------------------------ */
  /* Settings panel                                                      */
  /* ------------------------------------------------------------------ */

  function checkFullCompliance() {
    if (session.touchedSettings.size >= 5) checkAchievements({ fullCompliance: true });
  }

  function syncSettingsUI() {
    $$("#theme-segmented button").forEach((b) => b.setAttribute("aria-checked", String(b.dataset.themeChoice === state.settings.theme)));
    $("#setting-sound").setAttribute("aria-checked", String(state.settings.sound));
    $("#setting-haptics").setAttribute("aria-checked", String(state.settings.haptics));
    $("#setting-motion").setAttribute("aria-checked", String(state.settings.reduceMotion));
    $("#setting-jargon").value = state.settings.jargon;
    updateSoundIcon();
  }

  function updateSoundIcon() {
    $("#sound-toggle .icon-sound-on").hidden = !state.settings.sound;
    $("#sound-toggle .icon-sound-off").hidden = state.settings.sound;
    $("#sound-toggle").setAttribute("aria-pressed", String(state.settings.sound));
  }

  $("#settings-open").addEventListener("click", () => {
    syncSettingsUI();
    $("#settings-backdrop").hidden = false;
    Sound.whoosh();
    checkAchievements({ settingsOpened: true });
  });
  $("#settings-close").addEventListener("click", () => {
    $("#settings-backdrop").hidden = true;
    Sound.whooshClose();
  });
  $("#settings-backdrop").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      $("#settings-backdrop").hidden = true;
      Sound.whooshClose();
    }
  });

  $$("#theme-segmented button").forEach((b) => {
    b.addEventListener("click", () => {
      state.settings.theme = b.dataset.themeChoice;
      session.touchedSettings.add("theme");
      saveState();
      applyTheme();
      syncSettingsUI();
      Sound.tick();
      checkFullCompliance();
    });
  });

  $("#theme-toggle").addEventListener("click", () => {
    const resolved = resolveTheme();
    state.settings.theme = resolved === "dark" ? "light" : "dark";
    session.touchedSettings.add("theme");
    saveState();
    applyTheme();
    syncSettingsUI();
    checkFullCompliance();
  });

  $("#sound-toggle").addEventListener("click", () => {
    state.settings.sound = !state.settings.sound;
    session.touchedSettings.add("sound");
    saveState();
    syncSettingsUI();
    if (state.settings.sound) Sound.toast();
    checkFullCompliance();
  });

  function bindSwitch(id, key, onChange) {
    $(id).addEventListener("click", () => {
      state.settings[key] = !state.settings[key];
      session.touchedSettings.add(key);
      saveState();
      syncSettingsUI();
      Sound.tick();
      if (onChange) onChange();
      checkFullCompliance();
    });
  }
  bindSwitch("#setting-sound", "sound", () => {
    updateSoundIcon();
    if (state.settings.sound) Sound.toast();
  });
  bindSwitch("#setting-haptics", "haptics", () => vibrate(15));
  bindSwitch("#setting-motion", "reduceMotion", applyMotionPref);

  $("#setting-jargon").addEventListener("input", (e) => {
    state.settings.jargon = Number(e.target.value);
    session.touchedSettings.add("jargon");
    saveState();
    checkFullCompliance();
  });

  $("#export-data").addEventListener("click", () => {
    const payload = JSON.stringify(state, null, 2);
    const blob = new Blob([payload], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "extremely-important-button-data.json";
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
    showToast("📤", "Data Exported", "Your legacy has been downloaded as JSON.");
    checkAchievements({ exported: true });
  });

  $("#reset-data").addEventListener("click", () => {
    if (!confirm("This will permanently erase all lifetime statistics and achievements. Continue?")) return;
    localStorage.removeItem(STORAGE_KEY);
    state = defaultState();
    session.clicks = 0;
    session.start = Date.now();
    session.timestamps = [];
    session.velocityHistory = [];
    session.buzzwordsFound = new Set();
    session.touchedSettings = new Set();
    sparkHistory.synergy = [state.synergyIndex];
    sparkHistory.happiness = [state.happiness];
    sparkHistory.momentum = [state.momentum];
    sparkHistory.efficiency = [state.efficiency];
    saveState();
    renderStats();
    renderAchievements();
    renderFullLog();
    redrawAllCharts();
    applyTheme();
    syncSettingsUI();
    $("#settings-backdrop").hidden = true;
    showToast("♻️", "Statistics Reset", "Your legacy has been erased. A fresh start awaits.");
    checkAchievements({ resetDone: true });
  });

  $("#clear-log").addEventListener("click", () => {
    state.activityLog = [];
    saveState();
    renderFullLog();
    showToast("🧹", "Log Cleared", "The audit trail has been reset (an audit trail entry was created for this).");
  });

  $("#about-close").addEventListener("click", () => ($("#about-backdrop").hidden = true));
  $("#about-backdrop").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) $("#about-backdrop").hidden = true;
  });

  /* ------------------------------------------------------------------ */
  /* Share panel                                                         */
  /* ------------------------------------------------------------------ */

  function drawShareCard() {
    const canvas = $("#share-canvas");
    const ctx = canvas.getContext("2d");
    const w = canvas.width;
    const h = canvas.height;
    const dark = resolveTheme() === "dark";

    const bgGrad = ctx.createLinearGradient(0, 0, w, h);
    if (dark) {
      bgGrad.addColorStop(0, "#141527");
      bgGrad.addColorStop(1, "#0a0b14");
    } else {
      bgGrad.addColorStop(0, "#ffffff");
      bgGrad.addColorStop(1, "#f0f1fa");
    }
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, w, h);

    const glow = ctx.createRadialGradient(w * 0.85, h * 0.1, 10, w * 0.85, h * 0.1, 260);
    glow.addColorStop(0, "rgba(255,111,156,0.35)");
    glow.addColorStop(1, "rgba(255,111,156,0)");
    ctx.fillStyle = glow;
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = dark ? "#f3f3fb" : "#14142b";
    ctx.font = "700 15px sans-serif";
    ctx.fillText("EXTREMELY IMPORTANT TECHNOLOGIES", 34, 44);

    ctx.font = "800 26px sans-serif";
    const titleGrad = ctx.createLinearGradient(34, 0, 400, 0);
    titleGrad.addColorStop(0, "#8b7bff");
    titleGrad.addColorStop(1, "#ff6f9c");
    ctx.fillStyle = titleGrad;
    ctx.fillText("Performance Summary", 34, 82);

    const stats = [
      ["Lifetime Presses", formatNumber(state.lifetimeClicks)],
      ["Session Presses", formatNumber(session.clicks)],
      ["Prestige Score", formatNumber(computePrestige())],
      ["Achievements", `${state.achievements.length} / ${ACHIEVEMENTS.length}`],
      ["System Breakthroughs", formatNumber(state.breakthroughs)],
      ["Global Synergy Index", formatDecimal2(state.synergyIndex)],
    ];

    let y = 122;
    stats.forEach(([label, val]) => {
      ctx.fillStyle = dark ? "#a6a6c1" : "#55556b";
      ctx.font = "600 13px sans-serif";
      ctx.fillText(label, 34, y);
      ctx.fillStyle = dark ? "#f3f3fb" : "#14142b";
      ctx.font = "800 19px sans-serif";
      ctx.textAlign = "right";
      ctx.fillText(val, w - 34, y);
      ctx.textAlign = "left";
      y += 35;
    });

    ctx.strokeStyle = dark ? "rgba(255,255,255,0.1)" : "rgba(20,20,43,0.1)";
    ctx.beginPath();
    ctx.moveTo(34, h - 46);
    ctx.lineTo(w - 34, h - 46);
    ctx.stroke();

    ctx.fillStyle = dark ? "#6f6f8c" : "#8a8aa3";
    ctx.font = "600 11px sans-serif";
    ctx.fillText("© 2026 Extremely Important Technologies. All decisions are final.", 34, h - 22);
  }

  $("#share-open").addEventListener("click", () => {
    drawShareCard();
    $("#share-backdrop").hidden = false;
    Sound.whoosh();
    if (navigator.share) $("#share-native").hidden = false;
  });
  $("#share-close").addEventListener("click", () => {
    $("#share-backdrop").hidden = true;
    Sound.whooshClose();
  });
  $("#share-backdrop").addEventListener("click", (e) => {
    if (e.target === e.currentTarget) {
      $("#share-backdrop").hidden = true;
      Sound.whooshClose();
    }
  });

  $("#share-download").addEventListener("click", () => {
    const canvas = $("#share-canvas");
    const url = canvas.toDataURL("image/png");
    const a = document.createElement("a");
    a.href = url;
    a.download = "my-extremely-important-performance.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
    showToast("🖼️", "Card Downloaded", "Share it wherever importance is valued.");
  });

  function shareSummaryText() {
    return `I have pressed THE EXTREMELY IMPORTANT BUTTON™ ${formatNumber(state.lifetimeClicks)} times, unlocked ${state.achievements.length}/${ACHIEVEMENTS.length} achievements, and witnessed ${formatNumber(state.breakthroughs)} SYSTEM BREAKTHROUGH(S). My Prestige Score is ${formatNumber(computePrestige())}.`;
  }

  $("#share-copy").addEventListener("click", async () => {
    const text = shareSummaryText();
    try {
      await navigator.clipboard.writeText(text);
      showToast("📋", "Copied", "Your performance summary is on the clipboard.");
    } catch (e) {
      showToast("📋", "Copy Unavailable", text);
    }
  });

  $("#share-native").addEventListener("click", async () => {
    try {
      await navigator.share({ title: "THE EXTREMELY IMPORTANT BUTTON™", text: shareSummaryText() });
    } catch (e) {
      /* user cancelled or unsupported; ignore */
    }
  });

  /* ------------------------------------------------------------------ */
  /* Boot sequence                                                       */
  /* ------------------------------------------------------------------ */

  const BOOT_LINES = [
    "Establishing secure synergy channel",
    "Calibrating importance sensors",
    "Provisioning executive bandwidth",
    "Aligning stakeholder expectations",
    "Loading Button Subsystem v4.2.1",
    "Verifying compliance with Bureau standards",
  ];

  function runBoot() {
    const overlay = $("#boot-overlay");
    if (!overlay) return;
    const fill = $("#boot-progress-fill");
    const logEl = $("#boot-log");
    const enterBtn = $("#boot-enter");
    const skipBtn = $("#boot-skip");
    let dismissed = false;
    const totalDuration = state.settings.reduceMotion ? 400 : 2200;
    const lines = BOOT_LINES.slice();

    requestAnimationFrame(() => {
      fill.style.transition = `width ${totalDuration}ms linear`;
      fill.style.width = "100%";
    });

    const stepDelay = totalDuration / (lines.length + 1);
    let i = 0;
    const interval = setInterval(() => {
      if (i < lines.length) {
        const li = document.createElement("li");
        li.innerHTML = `${lines[i]}<b> ✓</b>`;
        logEl.appendChild(li);
        i++;
      } else {
        clearInterval(interval);
        enterBtn.hidden = false;
      }
    }, stepDelay);

    function dismiss() {
      if (dismissed) return;
      dismissed = true;
      clearInterval(interval);
      overlay.classList.add("is-hiding");
      ensureAudio();
      setTimeout(() => overlay.remove(), 650);
      document.removeEventListener("keydown", onKey);
    }
    function onKey(e) {
      if (e.key === "Enter" || e.key === "Escape" || e.key === " ") dismiss();
    }
    enterBtn.addEventListener("click", dismiss);
    skipBtn.addEventListener("click", dismiss);
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) dismiss();
    });
    document.addEventListener("keydown", onKey);
  }

  /* ------------------------------------------------------------------ */
  /* Init                                                                 */
  /* ------------------------------------------------------------------ */

  function init() {
    applyTheme();
    applyMotionPref();
    syncSettingsUI();
    renderStats();
    renderAchievements();
    renderFullLog();
    redrawAllCharts();
    buildTicker();
    updateLiveViewers();
    setInterval(updateLiveViewers, 5000);
    setTimeout(scheduleLiveFeed, 1400);
    setInterval(rotateQuote, 7000);
    setInterval(rotateSubtitle, 9000);
    initScrollReveal();
    updateMobileBar();
    setTitle(document.title);
    window.addEventListener("resize", () => {
      $$("canvas").forEach((c) => (c.dataset.fitted = ""));
      redrawAllCharts();
    });
    checkAchievements({});
    runBoot();
    saveState();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
