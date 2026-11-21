// How to Land a Spaceship: the ship computer (2026-10-17; levels, crews and the three ways to run it 2026-11-21).
// The teacher puts this page on the projector; each crew types its station codes and the ship's systems turn from
// red to green, then the crew picks the re-entry angle and watches the Sentinel come down. The answers live in
// MISSION (Officer level) and LEVEL_STATIONS (Cadet and Commander) below and match the teacher guide (../guide/) and
// the crew cards (../print/); a teacher can change any code on the setup screen, and the settings ride in the
// address (#...), so a bookmark keeps them. Nothing here loads from another site and nothing is sent anywhere: the
// page works from a downloaded copy (this file next to index.html). The guide's Cadet and Commander sections and
// print/cards-cadet.html and cards-commander.html are written from LEVEL_STATIONS by
// Website backend/notes/_docs/escape-room-tools/make-levels.mjs. Tests: Website backend/tests/escape-room.test.mjs.
(function () {
  'use strict';

  // ------------------------------------------------------------ the mission (Officer level, grades 6 to 9)
  // after: the stations that must be green first. code: the default answer (the teacher can change it).
  var MISSION = [
    { id: 'gravity', name: 'Artificial gravity', short: 'Gravity', room: 'Bridge', after: [],
      ask: 'Which switches are true? Type their numbers in order.', code: '245',
      hints: ['Read each switch out loud. Does it match what happens on a skateboard when the board stops?',
        'Without gravity, nothing slows down or speeds up unless something pushes it. Three switches are true.',
        'Switches 2, 4 and 5 are true. The code is 245.'] },
    { id: 'lift', name: 'Engine lift', short: 'Lift', room: 'Engine Room', after: ['gravity'],
      ask: 'How many newtons must you pull with to hold the engine up?', code: '30',
      hints: ['Count the pieces of rope that go up from the engine part to the pulleys.',
        'The pieces share the weight. Four pieces hold 120 newtons, so each holds a quarter.',
        '120 newtons shared by 4 pieces of rope is 30 newtons. The code is 30.'] },
    { id: 'gears', name: 'Engine gears', short: 'Gears', room: 'Engine Room', after: ['gravity'],
      ask: 'How many times must the small gear turn?', code: '20',
      hints: ['Turn the small gear once and watch how far the big gear goes.',
        'The big gear has 48 teeth and the small one has 12, so the big gear turns once for every 4 turns of the small one.',
        '5 turns of the big gear need 5 times 4 turns of the small gear. The code is 20.'] },
    { id: 'tank', name: 'Fuel tank', short: 'Tank', room: 'Fuel Bay', after: ['gravity'],
      ask: 'How many milliliters of fuel go in the tank?', code: '1183',
      hints: ['Protocol 65 says the tank holds exactly 5 cups. The computer counts in milliliters.',
        'One cup is 236.6 milliliters. Multiply by 5.',
        '5 times 236.6 is 1183. The code is 1183.'] },
    { id: 'balance', name: 'Fuel balance', short: 'Balance', room: 'Fuel Bay', after: ['gravity'],
      ask: 'How many centimeters from the middle does the 400 g tank go?', code: '15',
      hints: ['A heavy thing close to the middle can balance a light thing far away. Try it on the ruler.',
        'Weight times distance must match on both sides: 300 g at 20 cm makes 6000.',
        '6000 divided by 400 g is 15 cm. The code is 15.'] },
    { id: 'wiring', name: 'Navigation wiring', short: 'Wiring', room: 'Navigation', after: ['gravity'],
      ask: 'Add up the numbers on the lamps that light. What do you get?', code: '11',
      hints: ['Build the circuit exactly as the diagram shows, then look at which lamps are on.',
        'A gap in a path turns off everything on that path. The other paths still work.',
        'Lamps 8, 2 and 1 light; lamp 4 is on the path with the open switch. 8 + 2 + 1 = 11. The code is 11.'] },
    { id: 'thrusters', name: 'Thrusters', short: 'Thrusters', room: 'Navigation', after: ['gravity'],
      ask: 'What is the pod\'s acceleration, in meters per second each second?', code: '4',
      hints: ['Launch the tray with one rubber band, then with three. Which one goes faster?',
        'Newton\'s second law: force = mass times acceleration, so acceleration = force divided by mass.',
        '12 newtons divided by 3 kilograms is 4. The code is 4.'] },
    { id: 'computer', name: 'Main computer', short: 'Computer', room: 'Bridge', after: ['lift', 'gears', 'tank', 'balance', 'wiring', 'thrusters'],
      ask: 'Decode the Admiral\'s message. What number does it give?', code: '11000',
      hints: ['Each letter on the screen has been moved forward in the alphabet. The key is the number of rope pieces holding the engine.',
        'Move each letter back 4 places: I becomes E, R becomes N.',
        'The message says ENTRY SPEED ELEVEN THOUSAND. The code is 11000.'] },
    { id: 'reentry', name: 'Re-entry angle', short: 'Re-entry', room: 'Bridge', after: ['computer'], angle: true,
      ask: 'What angle will you enter the atmosphere at, in degrees?', code: '',
      hints: ['Work out the angle for all three paths on the card, then pick the one inside the safe window.',
        'Angle is about 57 times the drop, divided by the distance forward. Path B drops 10 km over 95 km.',
        '57 times 10 divided by 95 is 6.0 degrees: Path B. Type 6.'] }
  ];

  // ------------------------------------------------------------ the other two levels
  // The same props and the same story; only the question changes. Gravity and the main computer are the same at
  // every level. card: the crew card's words (printed and in the guide, word for word). paper: what a paper-only
  // crew reads instead of doing the hands-on part (Cadet only: the Officer and Commander cards carry every number).
  var LEVELS = [
    { id: 'cadet', name: 'Cadet', grades: 'grades 4 to 6', what: 'Observe, measure and count. No equations.' },
    { id: 'officer', name: 'Officer', grades: 'grades 6 to 9', what: 'Ratios and simple formulas.' },
    { id: 'commander', name: 'Commander', grades: 'high school physics', what: 'The real equations: work, torque, Boyle\'s law, Ohm\'s law, momentum, the sine of the entry angle.' }
  ];
  var LEVEL_STATIONS = {
    cadet: {
      lift: { code: '40', ask: 'How many centimeters of rope did you pull to lift the engine 10 cm?',
        card: 'The engine block came loose in the strike. Rig the rope like the drawing so that 4 pieces of rope hold the engine. Put a piece of tape on the rope where it leaves your hand. Pull until the engine rises 10 cm, then measure how far the tape moved. How many centimeters of rope did you pull?',
        paper: 'Engine lift: pulled 8 cm of rope, the engine rose 2 cm. Pulled 20 cm, it rose 5 cm. Pulled 32 cm, it rose 8 cm.',
        hints: ['Use a ruler to see how high the engine goes. Stop when it has gone up 10 cm.',
          'Each of the 4 pieces of rope gets 10 cm shorter, so you pull more rope than the engine moves.',
          '4 pieces of rope times 10 cm is 40 cm of rope. The code is 40.'] },
      gears: { code: '4', ask: 'How many times did the small gear turn while the big gear went around once?',
        card: 'To restart the engine, the big gear must turn all the way around once. The starter motor can only turn the small gear. Turn the small gear and count its turns until the big gear has gone around once. How many times did the small gear turn?',
        paper: 'Engine gears: no gears? Use the paper gears. The big gear has 48 teeth and the small one has 12. Each turn of the small gear moves the big gear along by 12 teeth.',
        hints: ['Put a pencil mark on each gear so you can see when it has gone all the way around.',
          'Count out loud each time the small gear\'s mark comes back to the top.',
          'The small gear turns 4 times for one turn of the big gear. The code is 4.'] },
      tank: { code: '5', ask: 'How many cups does it take to fill the tank?',
        card: 'ROBOT PROTOCOL 65: before landing, the fuel tank must be full. Fill it to the line with the measuring cup, one full cup at a time. How many cups does it take?',
        paper: 'Fuel tank: after 1 cup the tank was one fifth full. After 2 cups it was two fifths full.',
        hints: ['Fill the cup all the way each time, pour it in, and count.',
          'Stop when the water reaches the line. Don\'t go over.',
          'The tank holds 5 cups. The code is 5.'] },
      balance: { code: '6', ask: 'How many centimeters from the middle is the stack of 4 coins?',
        card: 'The ship tips if its fuel isn\'t balanced. Put 3 coins on the ruler 8 cm to the left of the middle. Slide a stack of 4 coins along the right side until the ruler balances. How many centimeters from the middle is the stack?',
        paper: 'Fuel balance: 4 coins at 4 cm, the left side went down. At 6 cm, the ruler was level. At 8 cm, the right side went down.',
        hints: ['Measure from the middle of the ruler (the 15 cm mark), not from the end.',
          'The heavier stack has to sit closer to the middle than the lighter one.',
          'The 4 coins balance 6 cm from the middle. The code is 6.'] },
      wiring: { code: '3', ask: 'How many lamps light up?',
        card: 'The navigation wire was knocked loose. Build the backup circuit exactly as the diagram shows. How many lamps light up?',
        paper: 'Navigation wiring: no kit? Trace each path on the diagram with a pencil, from the battery and back. A lamp lights only if your pencil gets all the way around without crossing a gap.',
        hints: ['Build the circuit exactly as the diagram shows, then look at which lamps are on.',
          'Electricity has to go all the way around a path and back to the battery. An open switch is a gap.',
          'Lamps 8, 2 and 1 light; lamp 4 stays dark. The code is 3.'] },
      thrusters: { code: '3', ask: 'How many rubber bands sent the tray the farthest?',
        card: 'PSHH! The steering thrusters need testing. Launch the tray with 1 rubber band, then with 2, then with 3. Measure how far it slides each time. How many rubber bands sent it the farthest?',
        paper: 'Thrusters: with 1 rubber band the tray slid 40 cm. With 2 it slid 90 cm. With 3 it slid 150 cm.',
        hints: ['Pull the tray back the same distance every time so the test is fair.',
          'More rubber bands push harder.',
          '3 rubber bands push the hardest and send the tray the farthest. The code is 3.'] },
      reentry: {
        card: 'The Sentinel\'s heat shield is safe between 5.2° and 7.2°. Steeper than 7.2° and the ship burns up. Shallower than 5.2° and it skips off the air back into space. Navigation has three paths. Path A goes in at 2°. Path B goes in at 6°. Path C goes in at 12°. Pick the safe path and type its angle into the ship computer.',
        hints: ['Safe means more than 5.2 and less than 7.2.',
          'Path A is too shallow and Path C is too steep.',
          'Path B, at 6 degrees, is the safe one. Type 6.'] }
    },
    commander: {
      lift: { code: '60', ask: 'How many joules of work does it take to lift the engine 0.5 m?',
        card: 'The engine block came loose in the strike. It weighs 120 newtons. Rig the rope like the drawing so that 4 pieces of rope hold it, then lift it 0.5 m. Find the force you pull with and how much rope you pull. The work you do is that force times that distance. How many joules of work does it take?',
        hints: ['Four pieces of rope share the weight, and each one gets 0.5 m shorter.',
          'You pull with 120 ÷ 4 = 30 newtons, over 4 × 0.5 = 2 m of rope.',
          '30 newtons times 2 m is 60 joules, the same as lifting 120 newtons by 0.5 m by hand. The code is 60.'] },
      gears: { code: '14', ask: 'What torque does the big gear give the engine, in newton meters?',
        card: 'To restart the engine, the big gear (48 teeth) has to twist hard. The starter motor turns the small gear (12 teeth) with a torque of 3.5 newton meters. What torque does the big gear give the engine, in newton meters? Leave out friction.',
        hints: ['Where the teeth meet, the gears push on each other with the same force. Torque is that force times the gear\'s radius.',
          'The big gear\'s radius is 4 times the small one\'s (48 teeth ÷ 12 teeth), so its torque is 4 times as big.',
          '3.5 newton meters times 4 is 14 newton meters. The code is 14.'] },
      tank: { code: '237', ask: 'What is the pressure in the landing tank, in kPa?',
        card: 'ROBOT PROTOCOL 65: refill the tank to the line. It holds exactly 5 cups (1183 mL) of fuel vapor at 100 kPa. Before landing, the pump squeezes all of it into the 500 mL landing tank at the same temperature. What is the pressure in the landing tank, in kPa? Round to the nearest kPa.',
        hints: ['At the same temperature, pressure times volume stays the same: P1 × V1 = P2 × V2 (Boyle\'s law).',
          '100 kPa × 1183 mL = P2 × 500 mL.',
          'P2 = 118,300 ÷ 500 = 236.6, which rounds to 237 kPa. The code is 237.'] },
      balance: { code: '30', ask: 'How many centimeters from the middle does the 400 g tank go?',
        card: 'The ship tips if its fuel isn\'t balanced. The left tank (300 g) sits 20 cm from the middle, and a 200 g sensor is bolted 30 cm out on the same side. The right tank weighs 400 g. How many centimeters from the middle must the right tank go so the torques balance? Try a smaller version on the ruler first.',
        hints: ['Each mass makes a torque: its weight times its distance from the middle. Add up the torques on each side.',
          'Left side: 300 × 20 + 200 × 30 = 12,000 gram centimeters.',
          '12,000 ÷ 400 = 30 cm. The code is 30.'] },
      wiring: { code: '750', ask: 'How much current flows through path C, in milliamps?',
        card: 'The navigation wire was knocked loose. Build the backup circuit exactly as the diagram shows. The battery gives 9 volts and every lamp is 6 ohms. How much current flows through path C, in milliamps?',
        hints: ['Paths side by side each get the battery\'s full 9 volts. Look at path C on its own.',
          'Path C has two 6 ohm lamps one after the other, so it has 12 ohms. Current = voltage ÷ resistance.',
          '9 volts ÷ 12 ohms = 0.75 amps, which is 750 milliamps. The code is 750.'] },
      thrusters: { code: '10', ask: 'How fast does the pod move forward, in meters per second?',
        card: 'PSHH! The steering thrusters need testing. Launch the tray with 1 rubber band, then with 3, and feel which way the bands push back. Now the real thing: the 3 kg landing pod sits still, then a thruster throws 0.2 kg of gas backward at 150 m/s. How fast does the pod move forward, in meters per second?',
        hints: ['Newton\'s third law: the gas pushes the pod as hard as the pod pushes the gas, so their momentum (mass × speed) is equal and opposite.',
          'The gas carries 0.2 × 150 = 30 kilogram meters per second backward.',
          '30 ÷ 3 kg = 10 m/s forward. The code is 10.'] },
      reentry: {
        card: 'The Sentinel\'s heat shield is safe between 5.2° and 7.2°. Steeper than 7.2° and the ship burns up. Shallower than 5.2° and it skips off the air back into space. The ship moves at 11,000 m/s along its path, and each path has its own speed straight down. The sine of the angle below level is the speed down ÷ the speed along the path. Path A: 350 m/s down. Path B: 1,150 m/s down. Path C: 2,300 m/s down. Work out all three, pick the safe one, and type its angle.',
        hints: ['sin(angle) = speed down ÷ speed along the path. Use the inverse sine button on the calculator.',
          'Path B: 1,150 ÷ 11,000 = 0.1045.',
          'The inverse sine of 0.1045 is 6.0 degrees: Path B. Type 6.'] }
    }
  };
  // The three ways to run it. crews: the crews it starts with.
  var MODES = [
    { id: 'room', name: 'The full room', crews: ['Sentinel crew'] },
    { id: 'table', name: 'The table kit', crews: ['Crew 1', 'Crew 2', 'Crew 3', 'Crew 4'] },
    { id: 'paper', name: 'Paper only', crews: ['Crew 1', 'Crew 2', 'Crew 3', 'Crew 4'] }
  ];
  var MAX_CREWS = 6;
  var MESSAGE = 'ENTRY SPEED ELEVEN THOUSAND';

  // ------------------------------------------------------------ pure pieces (tested in node)
  function pick(list, id) { for (var i = 0; i < list.length; i++) if (list[i].id === id) return list[i]; return null; }
  function stations(level) {
    var over = LEVEL_STATIONS[level] || {};
    return MISSION.map(function (s) { var o = over[s.id] || {}, out = {}; for (var k in s) out[k] = s[k]; for (k in o) out[k] = o[k]; return out; });
  }
  function codesFor(level) { var c = {}; stations(level).forEach(function (s) { if (!s.angle) c[s.id] = s.code; }); return c; }
  var DEFAULTS = { minutes: 35, level: 'officer', mode: 'room', crews: MODES[0].crews, shift: 4, min: 5.2, max: 7.2, codes: codesFor('officer') };

  function clean(v) { return String(v == null ? '' : v).replace(/[\s,]/g, '').toUpperCase(); }
  // A number code also matches with zeros in front, so a 4-digit lock set to 0005 and the screen agree.
  function same(a, b) { a = clean(a); b = clean(b); var z = function (t) { return /^\d+$/.test(t) ? t.replace(/^0+(?=\d)/, '') : t; }; return z(a) === z(b); }
  function num(v, lo, hi, d) { var n = parseFloat(v); return isFinite(n) && n >= lo && n <= hi ? n : d; }
  function crewList(v) {
    var out = [];
    String(v || '').split(',').forEach(function (n) { n = n.replace(/\s+/g, ' ').trim().slice(0, 24); if (n && out.length < MAX_CREWS) out.push(n); });
    return out;
  }

  function parseSettings(hash) {
    var p = {};
    String(hash || '').replace(/^#/, '').split('&').forEach(function (pair) {
      if (!pair) return;
      var i = pair.indexOf('=');
      try { p[decodeURIComponent(i < 0 ? pair : pair.slice(0, i))] = i < 0 ? '' : decodeURIComponent(pair.slice(i + 1).replace(/\+/g, ' ')); } catch (e) {}
    });
    var level = pick(LEVELS, p.lv) ? p.lv : DEFAULTS.level, mode = pick(MODES, p.mode) ? p.mode : DEFAULTS.mode;
    var s = { minutes: Math.round(num(p.m, 5, 120, DEFAULTS.minutes)), level: level, mode: mode,
      crews: crewList(p.crew).length ? crewList(p.crew) : pick(MODES, mode).crews.slice(),
      shift: Math.round(num(p.shift, 1, 25, DEFAULTS.shift)), min: num(p.min, 0.1, 89, DEFAULTS.min), max: num(p.max, 0.1, 89, DEFAULTS.max),
      codes: codesFor(level) };
    for (var k in p) if (k.slice(0, 2) === 'c.' && Object.prototype.hasOwnProperty.call(s.codes, k.slice(2)) && clean(p[k])) s.codes[k.slice(2)] = clean(p[k]).slice(0, 12);
    if (s.min >= s.max) { s.min = DEFAULTS.min; s.max = DEFAULTS.max; }
    return s;
  }
  // Only what differs from the defaults, so a plain class gets a short address.
  function settingsToHash(s) {
    var out = [], codes = codesFor(s.level);
    if (s.minutes !== DEFAULTS.minutes) out.push('m=' + s.minutes);
    if (s.level !== DEFAULTS.level) out.push('lv=' + s.level);
    if (s.mode !== DEFAULTS.mode) out.push('mode=' + s.mode);
    if (s.crews.join(',') !== pick(MODES, s.mode).crews.join(',')) out.push('crew=' + encodeURIComponent(s.crews.join(',')));
    if (s.shift !== DEFAULTS.shift) out.push('shift=' + s.shift);
    if (s.min !== DEFAULTS.min) out.push('min=' + s.min);
    if (s.max !== DEFAULTS.max) out.push('max=' + s.max);
    for (var k in codes) if (s.codes[k] !== codes[k]) out.push('c.' + k + '=' + encodeURIComponent(s.codes[k]));
    return out.length ? '#' + out.join('&') : '';
  }
  function caesar(text, shift) {
    return text.replace(/[A-Z]/g, function (c) { return String.fromCharCode((c.charCodeAt(0) - 65 + shift % 26 + 26) % 26 + 65); });
  }
  function reentry(angle, s) {
    var a = parseFloat(String(angle).replace(',', '.'));
    if (!isFinite(a) || a <= 0 || a >= 90) return 'bad';
    return a < s.min ? 'skip' : a > s.max ? 'burn' : 'land';
  }
  function station(id, level) { return pick(stations(level || 'officer'), id); }
  function isOpen(id, solved) { var st = pick(MISSION, id); return !!st && st.after.every(function (a) { return solved[a] != null; }); }
  // 'right' | 'wrong' | 'locked' for a code; for the angle, the landing ('land' | 'skip' | 'burn' | 'bad').
  function check(id, input, s, solved) {
    var st = station(id, s.level);
    if (!st || !isOpen(id, solved || {})) return 'locked';
    if (st.angle) return reentry(input, s);
    return same(input, s.codes[id]) ? 'right' : 'wrong';
  }

  var api = { MISSION: MISSION, LEVELS: LEVELS, LEVEL_STATIONS: LEVEL_STATIONS, MODES: MODES, MESSAGE: MESSAGE, DEFAULTS: DEFAULTS,
    stations: stations, codesFor: codesFor, parseSettings: parseSettings, settingsToHash: settingsToHash, caesar: caesar, reentry: reentry,
    check: check, isOpen: isOpen };
  if (typeof module !== 'undefined' && module.exports) module.exports = api;
  if (typeof document === 'undefined') return;

  // ------------------------------------------------------------ the page
  var $ = function (sel) { return document.querySelector(sel); };
  var S = parseSettings(location.hash), LIST = stations(S.level);
  var KEY = 'hls-run';
  // run: { v: 2, crews: [{ solved: {id: secondsIn}, hints: {id: n}, crashes, done, angle }], left, used, paused }
  var run = null, open = null, ticker = null, muted = false;
  var still = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function save() { try { if (run) localStorage.setItem(KEY, JSON.stringify({ run: run, hash: location.hash })); else localStorage.removeItem(KEY); } catch (e) {} }
  function load() {
    try {
      var j = JSON.parse(localStorage.getItem(KEY) || 'null');
      return j && j.hash === location.hash && j.run && j.run.v === 2 && j.run.crews && j.run.crews.length === S.crews.length && !allHome(j.run) ? j.run : null;
    } catch (e) { return null; }
  }
  function allHome(r) { return r.crews.every(function (c) { return c.done; }); }

  // Sounds made in the browser, nothing to download.
  var ac = null;
  function tone(freq, dur, type, vol, when) {
    if (muted) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      if (ac.state === 'suspended') ac.resume();
      var t = ac.currentTime + (when || 0), o = ac.createOscillator(), g = ac.createGain();
      o.type = type || 'sine'; o.frequency.setValueAtTime(freq, t);
      g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(vol || 0.2, t + 0.02); g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(g); g.connect(ac.destination); o.start(t); o.stop(t + dur + 0.05);
    } catch (e) {}
  }
  // A low rumble for the trip through the air (filtered noise, made here).
  function rumble(sec) {
    if (muted) return;
    try {
      ac = ac || new (window.AudioContext || window.webkitAudioContext)();
      var n = Math.floor(ac.sampleRate * sec), buf = ac.createBuffer(1, n, ac.sampleRate), d = buf.getChannelData(0), last = 0;
      for (var i = 0; i < n; i++) { last = last * 0.97 + (Math.random() * 2 - 1) * 0.03; d[i] = last * 6; }
      var src = ac.createBufferSource(), g = ac.createGain(), t = ac.currentTime;
      src.buffer = buf; g.gain.setValueAtTime(0.0001, t); g.gain.exponentialRampToValueAtTime(0.5, t + sec * 0.35); g.gain.exponentialRampToValueAtTime(0.0001, t + sec);
      src.connect(g); g.connect(ac.destination); src.start(t);
    } catch (e) {}
  }
  // The ship's voice: the browser's own speech, calm and a little low. Off with the sound.
  function say(text) {
    if (muted || !window.speechSynthesis || !window.SpeechSynthesisUtterance) return;
    try { var u = new SpeechSynthesisUtterance(text); u.rate = 0.92; u.pitch = 0.85; u.volume = 0.9; speechSynthesis.cancel(); speechSynthesis.speak(u); } catch (e) {}
  }
  var sfx = {
    good: function () { tone(660, 0.18, 'triangle'); tone(880, 0.25, 'triangle', 0.2, 0.12); tone(1320, 0.4, 'triangle', 0.15, 0.24); },
    bad: function () { tone(140, 0.35, 'sawtooth', 0.15); tone(110, 0.4, 'sawtooth', 0.12, 0.15); },
    alarm: function () { tone(880, 0.2, 'square', 0.08); tone(660, 0.2, 'square', 0.08, 0.25); },
    strike: function () { tone(70, 1.2, 'sawtooth', 0.25); tone(55, 1.4, 'square', 0.12, 0.1); for (var i = 0; i < 3; i++) { tone(880, 0.2, 'square', 0.07, 0.9 + i * 0.5); tone(660, 0.2, 'square', 0.07, 1.15 + i * 0.5); } },
    win: function () { [523, 659, 784, 1047].forEach(function (f, i) { tone(f, 0.6, 'triangle', 0.18, i * 0.15); }); }
  };

  function fmt(sec) { sec = Math.max(0, Math.ceil(sec)); return Math.floor(sec / 60) + ':' + ('0' + sec % 60).slice(-2); }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function show(id) { ['setup', 'mission', 'done'].forEach(function (v) { $('#' + v).hidden = v !== id; }); }
  function st(id) { return pick(LIST, id); }

  // ---------------- setup
  var PRINT = { cadet: '../kit/cards-cadet.pdf', officer: '../kit/printables.pdf', commander: '../kit/cards-commander.pdf' };
  function radios(name, list, value) {
    return list.map(function (o) {
      return '<label class="choice"><input type="radio" name="' + name + '" value="' + o.id + '"' + (o.id === value ? ' checked' : '') + '><b>' + esc(o.name) + '</b><small>' + esc(o.grades || o.line) + '</small></label>';
    }).join('');
  }
  var MODE_LINES = { room: 'One crew of 6 to 15 around the room', table: 'A whole class in 2 to 6 crews, at tables', paper: 'Crews at desks, only the printed cards' };
  function fillSetup() {
    $('#f-mode').innerHTML = radios('mode', MODES.map(function (m) { return { id: m.id, name: m.name, line: MODE_LINES[m.id] }; }), S.mode);
    $('#f-level').innerHTML = radios('level', LEVELS, S.level);
    $('#f-crew').value = S.crews.join(', '); $('#f-min').value = S.minutes; $('#f-shift').value = S.shift;
    $('#f-lo').value = S.min; $('#f-hi').value = S.max;
    fillCodes();
  }
  function fillCodes() {
    var lv = S.level, list = stations(lv);
    $('#codes').innerHTML = list.filter(function (s) { return !s.angle; }).map(function (s) {
      return '<label class="code-row"><span>' + esc(s.name) + ' <small>' + esc(s.room) + '</small></span>' +
        '<input data-code="' + s.id + '" value="' + esc(S.codes[s.id]) + '" inputmode="numeric" autocomplete="off" maxlength="12"></label>';
    }).join('');
    var L = pick(LEVELS, lv);
    $('#level-print').innerHTML = 'Print for ' + esc(L.name) + ': <a href="' + PRINT[lv] + '">' + (lv === 'officer' ? 'the printables' : 'the ' + esc(L.name) + ' crew cards') + '</a>' +
      (lv === 'officer' ? '' : ' (with the signs, wiring diagram, rope drawing and log from <a href="../kit/printables.pdf">the printables</a>)') + '.';
  }
  function checked(name) { var r = document.querySelector('input[name="' + name + '"]:checked'); return r ? r.value : ''; }
  function readSetup() {
    var h = ['m=' + $('#f-min').value, 'lv=' + checked('level'), 'mode=' + checked('mode'), 'crew=' + encodeURIComponent($('#f-crew').value), 'shift=' + $('#f-shift').value, 'min=' + $('#f-lo').value, 'max=' + $('#f-hi').value];
    document.querySelectorAll('[data-code]').forEach(function (i) { h.push('c.' + i.getAttribute('data-code') + '=' + encodeURIComponent(i.value)); });
    S = parseSettings('#' + h.join('&')); LIST = stations(S.level);
    history.replaceState(null, '', location.pathname + location.search + settingsToHash(S));
  }

  // ---------------- mission
  function newCrew() { return { solved: {}, hints: {}, crashes: 0, done: false, angle: null }; }
  function start(resume) {
    var fresh = !resume;
    run = resume || { v: 2, crews: S.crews.map(newCrew), left: S.minutes * 60, used: 0, paused: false };
    var L = pick(LEVELS, S.level);
    $('#crew').textContent = S.crews.length > 1 ? S.crews.length + ' crews' : S.crews[0];
    $('#level').textContent = L.name + ' level';
    document.body.classList.toggle('many', S.crews.length > 1);
    show('mission'); drawPanel(); closePanel(); tick(true);
    clearInterval(ticker); ticker = setInterval(tick, 250);
    save();
    if (fresh) { sfx.strike(); setTimeout(function () { say('Warning. Meteor strike. Artificial gravity is offline.'); }, 900); }
  }
  var last = 0;
  function tick(first) {
    var now = Date.now();
    if (!first && run && !run.paused && !allHome(run) && run.left > 0) {
      var was = run.left, dt = (now - last) / 1000;
      run.left -= dt; run.used += dt;
      if (Math.floor(was) !== Math.floor(run.left) && Math.floor(run.left) % 5 === 0) save();
      if (was > 300 && run.left <= 300) say('Five minutes to the re-entry window.');
      if (was > 60 && run.left <= 60) { sfx.alarm(); setTimeout(sfx.alarm, 600); setTimeout(function () { say('One minute to the re-entry window.'); }, 1300); }
      if (run.left <= 0) { run.left = 0; sfx.bad(); save(); }
    }
    last = now;
    if (!run) return;
    $('#clock').textContent = fmt(run.left);
    document.body.classList.toggle('low', run.left > 0 && run.left <= 60 && !run.paused);
    document.body.classList.toggle('out', run.left <= 0);
    $('#paused').hidden = !run.paused;
    $('#timeout').hidden = !(run.left <= 0 && !allHome(run)) || !$('#flight').hidden;
  }
  function sysButton(c, s, mini) {
    var crew = run.crews[c];
    var state = crew.solved[s.id] != null ? 'green' : isOpen(s.id, crew.solved) ? 'red' : 'off';
    var label = state === 'green' ? 'Online' : state === 'red' ? (mini ? 'Offline' : 'Offline: tap to fix') : 'Waiting';
    return '<button class="sys ' + state + (mini ? ' mini' : '') + '" data-crew="' + c + '" data-sys="' + s.id + '"' + (state === 'off' ? ' disabled' : '') +
      ' aria-label="' + esc((S.crews.length > 1 ? S.crews[c] + ', ' : '') + s.name + ': ' + label) + '"><span class="light"></span><b>' + esc(mini ? s.short : s.name) + '</b><small>' + label + '</small></button>';
  }
  function drawPanel() {
    var html = '';
    if (run.crews.length === 1) {
      // The bridge first (gravity), the three rooms, then coming home (the computer and the landing).
      [['Bridge', ['gravity']], ['Engine Room'], ['Fuel Bay'], ['Navigation'], ['Coming home', ['computer', 'reentry']]].forEach(function (g) {
        var list = g[1] ? g[1].map(st) : LIST.filter(function (s) { return s.room === g[0]; });
        html += '<div class="group"><h3>' + esc(g[0]) + '</h3>' + list.map(function (s) { return sysButton(0, s, false); }).join('') + '</div>';
      });
      $('#panel').className = '';
      $('#progress').textContent = Object.keys(run.crews[0].solved).length + ' of ' + LIST.length + ' systems online';
    } else {
      // One lane a crew, every system in mission order.
      html = run.crews.map(function (crew, c) {
        var n = Object.keys(crew.solved).length;
        return '<div class="lane' + (crew.done ? ' home' : '') + '"><div class="lane-name"><b>' + esc(S.crews[c]) + '</b><small>' +
          (crew.done ? 'Home at ' + fmt(crew.solved.reentry) : n + ' of ' + LIST.length + ' online') + '</small></div><div class="lane-sys">' +
          LIST.map(function (s) { return sysButton(c, s, true); }).join('') + '</div></div>';
      }).join('');
      $('#panel').className = 'lanes';
      var home = run.crews.filter(function (c) { return c.done; }).length;
      $('#progress').textContent = home ? home + ' of ' + run.crews.length + ' crews home' : 'Every crew starts with artificial gravity';
    }
    $('#panel').innerHTML = html;
    $('#b-results').hidden = run.crews.length < 2 || !run.crews.some(function (c) { return c.done; });
  }
  function openPanel(c, id) {
    var s = st(id), crew = run.crews[c]; if (!s || !crew || crew.solved[id] != null || !isOpen(id, crew.solved)) return;
    open = { c: c, id: id };
    $('#q-room').textContent = (run.crews.length > 1 ? S.crews[c] + ' · ' : '') + s.room; $('#q-name').textContent = s.name; $('#q-ask').textContent = s.ask;
    $('#q-msg').hidden = id !== 'computer';
    if (id === 'computer') $('#q-msg').textContent = caesar(MESSAGE, S.shift);
    $('#q-in').value = ''; $('#q-in').setAttribute('inputmode', s.angle ? 'decimal' : 'numeric');
    $('#q-note').textContent = ''; $('#q-note').className = 'note';
    showHints();
    $('#entry').hidden = false; $('#entry').classList.remove('shake');
    $('#q-in').focus();
  }
  function closePanel() {
    var was = open; open = null; $('#entry').hidden = true;
    if (was) { var b = document.querySelector('[data-crew="' + was.c + '"][data-sys="' + was.id + '"]'); if (b) b.focus(); }
  }
  function showHints() {
    var n = run.crews[open.c].hints[open.id] || 0, s = st(open.id);
    $('#q-hints').innerHTML = s.hints.slice(0, n).map(function (h, i) { return '<li><b>Hint ' + (i + 1) + '</b> ' + esc(h) + '</li>'; }).join('');
    $('#q-hint').textContent = n >= s.hints.length ? 'No more hints' : 'Hint ' + (n + 1) + ' of 3 (H)';
    $('#q-hint').disabled = n >= s.hints.length;
  }
  function hint() {
    if (!open) return; var h = run.crews[open.c].hints, s = st(open.id);
    h[open.id] = Math.min(s.hints.length, (h[open.id] || 0) + 1); showHints(); save();
  }
  function submit() {
    if (!open || run.paused) return;
    var v = $('#q-in').value, s = st(open.id), crew = run.crews[open.c], r = check(open.id, v, S, crew.solved), note = $('#q-note');
    if (!clean(v)) return;
    if (s.angle) {
      if (r === 'bad') { note.textContent = 'Type an angle in degrees, like 4.5.'; note.className = 'note bad'; return; }
      var c = open.c; open = null; $('#entry').hidden = true; fly(c, parseFloat(String(v).replace(',', '.')), r); return;
    }
    if (r === 'right') {
      crew.solved[open.id] = Math.round(run.used); sfx.good(); save();
      var at = open; open = null; $('#entry').hidden = true; drawPanel();
      var b = document.querySelector('[data-crew="' + at.c + '"][data-sys="' + at.id + '"]');
      var next = document.querySelector('[data-crew="' + at.c + '"].sys.red') || b;
      if (b) b.classList.add('flash');
      if (next) next.focus();
      var who = run.crews.length > 1 ? S.crews[at.c] + ': ' : '';
      announce(who + s.name + ' is back online.');
      say((run.crews.length > 1 ? S.crews[at.c] + '. ' : '') + s.name + ' online.' + (at.id === 'gravity' && run.crews.length === 1 ? ' Engine Room, Fuel Bay and Navigation, report.' : ''));
      if (LIST.every(function (x) { return x.angle || crew.solved[x.id] != null; })) setTimeout(function () { say('All systems online. Choose your entry angle.'); }, 1800);
    } else {
      sfx.bad(); note.textContent = 'Code rejected. Check your work and try again.'; note.className = 'note bad';
      var e = $('#entry'); e.classList.remove('shake'); void e.offsetWidth; e.classList.add('shake');
      $('#q-in').select();
    }
  }
  function announce(t) { var a = $('#announce'); a.textContent = t; a.classList.add('on'); clearTimeout(announce.t); announce.t = setTimeout(function () { a.classList.remove('on'); }, 2600); }
  function pause() { if (!run || allHome(run)) return; run.paused = !run.paused; tick(true); save(); }

  // ---------------- re-entry: the Sentinel comes down (or doesn't)
  // A side view: space at the top, the air getting thicker toward the sea. Drawn steeper than real, so the difference
  // between 2°, 6° and 12° shows. Burn: the glow grows until the ship breaks up. Skip: a short glow, then back out.
  // Land: a long glow that fades as it slows, the small parachute, three big ones, and a splash.
  function fly(c, angle, outcome) {
    var cv = $('#sky'), box = $('#flight'), ctx = cv.getContext('2d');
    box.hidden = false; $('#flight-again').hidden = true; $('#timeout').hidden = true;
    $('#flight-note').textContent = (run.crews.length > 1 ? S.crews[c] + ': ' : '') + 'entering at ' + angle + '°';
    var dpr = window.devicePixelRatio || 1, W = cv.width = cv.clientWidth * dpr, H = cv.height = cv.clientHeight * dpr;
    var u = Math.min(W, H * 1.6) / 160, t0 = performance.now(), D = still ? 1 : outcome === 'land' ? 9000 : 6000;
    var stars = []; for (var i = 0; i < 140; i++) stars.push([Math.random() * W, Math.random() * H * 0.6, Math.random() * 1.4 + 0.3, Math.random() * 6]);
    var airTop = H * 0.34, sea = H * 0.8, trail = [], bits = [];
    rumble(outcome === 'land' ? 6 : 4);
    function path(k) {
      var x, y, heat = 0, slow = 0;
      if (outcome === 'skip') {
        x = W * 0.06 + W * 0.92 * k;
        var dip = Math.sin(Math.PI * Math.min(1, k / 0.9)); // in and back out
        y = H * 0.12 + (airTop + H * 0.06 - H * 0.12) * dip - (k > 0.9 ? (k - 0.9) * H : 0);
        heat = y > airTop ? (y - airTop) / (H * 0.06) * 0.7 : 0;
      } else if (outcome === 'burn') {
        var q = Math.min(1, k / 0.75);
        x = W * 0.1 + W * 0.5 * q; y = H * 0.1 + (sea - H * 0.1) * q * q * 0.95;
        heat = y > airTop ? Math.min(2.2, (y - airTop) / (sea - airTop) * 4) : 0;
      } else {
        var d = Math.min(1, k / 0.55); // the fall through the air, then the parachutes
        x = W * 0.08 + W * 0.52 * (1 - Math.pow(1 - d, 2)) + (k > 0.55 ? W * 0.04 * (k - 0.55) : 0);
        y = H * 0.1 + (H * 0.6 - H * 0.1) * d + (k > 0.55 ? (sea - H * 0.6) * Math.min(1, (k - 0.55) / 0.42) : 0);
        heat = y > airTop && d < 1 ? Math.min(1, (y - airTop) / (H * 0.12)) * (1 - Math.pow(d, 3)) : 0;
        slow = k;
      }
      return { x: x, y: y, heat: heat, slow: slow };
    }
    function sky() {
      var g = ctx.createLinearGradient(0, 0, 0, sea);
      g.addColorStop(0, '#02040b'); g.addColorStop(airTop / sea, '#071430'); g.addColorStop(0.8, '#1f5fa8'); g.addColorStop(1, '#79b6e8');
      ctx.fillStyle = g; ctx.fillRect(0, 0, W, sea);
      stars.forEach(function (s) { if (s[1] < airTop) { ctx.fillStyle = 'rgba(255,255,255,' + (0.35 + 0.3 * Math.sin(s[3])) + ')'; ctx.fillRect(s[0], s[1], s[2] * dpr, s[2] * dpr); } });
      // the curve of the Earth at the edge of the air
      ctx.strokeStyle = 'rgba(120,190,255,.35)'; ctx.lineWidth = u * 0.6; ctx.beginPath(); ctx.ellipse(W / 2, airTop + W * 2, W * 2.2, W * 2, 0, Math.PI * 1.25, Math.PI * 1.75); ctx.stroke();
      var s2 = ctx.createLinearGradient(0, sea, 0, H); s2.addColorStop(0, '#0d4f86'); s2.addColorStop(1, '#062744');
      ctx.fillStyle = s2; ctx.fillRect(0, sea, W, H - sea);
      ctx.strokeStyle = 'rgba(255,255,255,.12)'; ctx.lineWidth = dpr;
      for (var r = 0; r < 5; r++) { var yy = sea + (H - sea) * (r + 1) / 6; ctx.beginPath(); for (var xx = 0; xx <= W; xx += 20 * dpr) ctx.lineTo(xx, yy + Math.sin(xx / (40 * dpr) + performance.now() / 600 + r) * 2 * dpr); ctx.stroke(); }
    }
    function capsule(x, y, ang, heat) {
      ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
      if (heat > 0.05) { // the shock layer in front of the heat shield
        var r = u * (5 + heat * 5), gl = ctx.createRadialGradient(u * 2.5, 0, 0, u * 2.5, 0, r);
        gl.addColorStop(0, 'rgba(255,245,210,' + Math.min(1, heat) + ')'); gl.addColorStop(0.35, 'rgba(255,140,40,' + Math.min(0.85, heat * 0.7) + ')'); gl.addColorStop(1, 'rgba(255,60,0,0)');
        ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(u * 2.5, 0, r, 0, 7); ctx.fill();
      }
      ctx.fillStyle = '#c9ced8'; ctx.beginPath(); ctx.moveTo(-u * 3, -u * 1); ctx.lineTo(u * 2, -u * 2.6); ctx.lineTo(u * 2, u * 2.6); ctx.lineTo(-u * 3, u * 1); ctx.closePath(); ctx.fill();
      ctx.fillStyle = '#5a3a22'; ctx.fillRect(u * 1.8, -u * 2.6, u * 0.8, u * 5.2);
      ctx.fillStyle = '#0a1020'; ctx.fillRect(-u * 0.6, -u * 0.9, u * 1.1, u * 0.9);
      ctx.restore();
    }
    function chutes(x, y, k) {
      var drogue = k > 0.55 && k < 0.66, mains = k >= 0.66, open = Math.min(1, (k - 0.66) / 0.06);
      ctx.strokeStyle = 'rgba(230,230,230,.8)'; ctx.lineWidth = Math.max(1, u * 0.18);
      if (drogue) { ctx.beginPath(); ctx.moveTo(x, y - u * 3); ctx.lineTo(x, y - u * 9); ctx.stroke(); ctx.fillStyle = '#e8573c'; ctx.beginPath(); ctx.ellipse(x, y - u * 10, u * 1.8, u * 1.1, 0, Math.PI, 0); ctx.fill(); }
      if (mains) [-1, 0, 1].forEach(function (side, j) {
        var cx = x + side * u * 7 * open, cy = y - u * (15 + (side ? 0 : 2)) * (0.6 + 0.4 * open);
        ctx.beginPath(); ctx.moveTo(x, y - u * 3); ctx.lineTo(cx - u * 4.5 * open, cy); ctx.moveTo(x, y - u * 3); ctx.lineTo(cx + u * 4.5 * open, cy); ctx.stroke();
        ctx.fillStyle = j === 1 ? '#f2f2f2' : '#e8573c'; ctx.beginPath(); ctx.ellipse(cx, cy, u * 5 * open + u * 0.5, u * 2.8 * open + u * 0.3, 0, Math.PI, 0); ctx.fill();
        ctx.fillStyle = j === 1 ? '#e8573c' : '#f2f2f2'; ctx.beginPath(); ctx.ellipse(cx, cy, u * 1.6 * open + u * 0.2, u * 2.8 * open + u * 0.3, 0, Math.PI, 0); ctx.fill();
      });
    }
    function frame(now) {
      var k = Math.min(1, (now - t0) / D), p = path(k), q = path(Math.max(0, k - 0.01));
      sky();
      if (p.heat > 0.05) trail.push([p.x, p.y, p.heat]); if (trail.length > 70 || (p.heat <= 0.05 && trail.length)) trail.shift();
      trail.forEach(function (t, i) { var a = i / trail.length * Math.min(1, t[2]) * 0.55; ctx.fillStyle = 'rgba(255,' + (110 + i) + ',40,' + a + ')'; ctx.beginPath(); ctx.arc(t[0], t[1], u * (0.6 + i / trail.length * 1.6), 0, 7); ctx.fill(); });
      var gone = outcome === 'burn' && (p.heat >= 2.1 || k > 0.72);
      if (!gone) {
        var ang = outcome === 'land' && k > 0.55 ? Math.PI / 2 : Math.atan2(p.y - q.y, p.x - q.x || 1e-6);
        if (outcome === 'land') chutes(p.x, p.y, k);
        capsule(p.x, p.y, ang, p.heat);
      } else {
        if (!bits.length) for (var b = 0; b < 60; b++) bits.push([p.x, p.y, (Math.random() - 0.2) * u * 1.2, (Math.random() - 0.4) * u * 1.2, 1]);
        bits.forEach(function (z) { z[0] += z[2]; z[1] += z[3]; z[3] += u * 0.02; z[4] *= 0.975; ctx.fillStyle = 'rgba(255,' + (120 + Math.random() * 120 | 0) + ',40,' + z[4] + ')'; ctx.fillRect(z[0], z[1], u * 0.7, u * 0.7); });
      }
      if (outcome === 'land' && k > 0.97) { ctx.strokeStyle = 'rgba(255,255,255,.75)'; ctx.lineWidth = u * 0.35; for (var w = 0; w < 3; w++) { var rr = Math.max(0, (k - 0.97 - w * 0.008)) * 900 * u; ctx.beginPath(); ctx.ellipse(p.x, sea, rr, rr * 0.22, 0, 0, 7); ctx.stroke(); } }
      if (k < 1) requestAnimationFrame(frame); else landed(c, angle, outcome);
    }
    requestAnimationFrame(frame);
  }
  var WHY = {
    skip: 'Too shallow. The Sentinel skimmed the top of the air and bounced back out into space. The safe window is ',
    burn: 'Too steep. The Sentinel hit thick air too fast and the heat shield could not take it. The safe window is '
  };
  function landed(c, angle, outcome) {
    var crew = run.crews[c];
    if (outcome === 'land') {
      crew.solved.reentry = Math.round(run.used); crew.done = true; crew.angle = angle; save(); sfx.win();
      say((run.crews.length > 1 ? S.crews[c] + '. ' : '') + 'Splashdown. Welcome home.');
      if (allHome(run)) { setTimeout(finish, still ? 0 : 1200); return; }
      $('#flight-note').innerHTML = '<b>' + esc(S.crews[c]) + '</b> is home, at ' + angle + '°.';
      $('#flight-again').textContent = 'Back to the panel'; $('#flight-again').hidden = false; $('#flight-again').focus();
      $('#flight-again').onclick = function () { $('#flight').hidden = true; drawPanel(); tick(true); };
    } else {
      crew.crashes++; save(); sfx.bad();
      $('#flight-note').innerHTML = esc(WHY[outcome]) + '<b>' + S.min + '° to ' + S.max + '°</b>. The Admiral rewinds the simulation: try again.';
      $('#flight-again').textContent = 'Try another angle'; $('#flight-again').hidden = false; $('#flight-again').focus();
      $('#flight-again').onclick = function () { $('#flight').hidden = true; tick(true); openPanel(c, 'reentry'); };
    }
  }
  function hintsOf(crew) { return Object.keys(crew.hints).reduce(function (a, k) { return a + crew.hints[k]; }, 0); }
  function finish() {
    clearInterval(ticker); document.body.classList.remove('low', 'out');
    $('#flight').hidden = true;
    var crews = run.crews.map(function (crew, c) { return { name: S.crews[c], crew: crew }; });
    if (crews.length === 1) {
      var crew = crews[0].crew, hints = hintsOf(crew);
      $('#d-crew').textContent = crews[0].name;
      $('#d-time').textContent = fmt(crew.solved.reentry) + (crew.solved.reentry > S.minutes * 60 ? ' (after the clock ran out)' : '');
      $('#d-angle').textContent = crew.angle + '°';
      $('#d-hints').textContent = hints === 0 ? 'none' : String(hints);
      $('#d-tries').textContent = crew.crashes === 0 ? 'first try' : (crew.crashes + 1) + ' tries';
      $('#d-one').hidden = false; $('#d-many').hidden = true;
      $('#done h1').textContent = 'The Sentinel is home';
    } else {
      crews.sort(function (a, b) { return (a.crew.done ? a.crew.solved.reentry : 1e9) - (b.crew.done ? b.crew.solved.reentry : 1e9); });
      var home = crews.filter(function (x) { return x.crew.done; }).length;
      $('#done h1').textContent = home === crews.length ? 'Every crew is home' : home + ' of ' + crews.length + ' crews are home';
      $('#d-rows').innerHTML = crews.map(function (x) {
        var cr = x.crew, n = Object.keys(cr.solved).length;
        return '<tr><th scope="row">' + esc(x.name) + '</th><td>' + (cr.done ? fmt(cr.solved.reentry) : n + ' of ' + LIST.length + ' online') + '</td><td>' +
          (cr.done ? cr.angle + '°' : '') + '</td><td>' + hintsOf(cr) + '</td><td>' + (cr.done ? (cr.crashes === 0 ? 'first try' : (cr.crashes + 1) + ' tries') : '') + '</td></tr>';
      }).join('');
      $('#d-one').hidden = true; $('#d-many').hidden = false;
    }
    try { localStorage.removeItem(KEY); } catch (e) {}
    show('done'); $('#again').focus();
  }

  // ---------------- wiring
  document.addEventListener('DOMContentLoaded', function () {
    fillSetup();
    if (load()) $('#resume').hidden = false;
    $('#go').addEventListener('click', function () { readSetup(); start(); });
    $('#resume-go').addEventListener('click', function () { start(load()); });
    $('#setup-form').addEventListener('submit', function (e) { e.preventDefault(); readSetup(); start(); });
    $('#reset-codes').addEventListener('click', function () { S.codes = codesFor(S.level); fillCodes(); });
    $('#f-level').addEventListener('change', function () { S.level = checked('level'); S.codes = codesFor(S.level); fillCodes(); });
    $('#f-mode').addEventListener('change', function () {
      var was = pick(MODES, S.mode), now = pick(MODES, checked('mode'));
      if (crewList($('#f-crew').value).join(',') === was.crews.join(',')) $('#f-crew').value = now.crews.join(', ');
      S.mode = now.id;
    });
    $('#panel').addEventListener('click', function (e) { var b = e.target.closest('[data-sys]'); if (b && !run.paused) openPanel(+b.getAttribute('data-crew'), b.getAttribute('data-sys')); });
    $('#q-form').addEventListener('submit', function (e) { e.preventDefault(); submit(); });
    $('#q-hint').addEventListener('click', hint);
    $('#q-close').addEventListener('click', closePanel);
    $('#b-pause').addEventListener('click', pause);
    $('#b-mute').addEventListener('click', function () { muted = !muted; if (muted && window.speechSynthesis) try { speechSynthesis.cancel(); } catch (e) {} this.textContent = muted ? 'Sound off' : 'Sound on'; this.setAttribute('aria-pressed', String(muted)); });
    $('#b-plus').addEventListener('click', function () { run.left += 300; tick(true); save(); });
    $('#b-results').addEventListener('click', finish);
    $('#b-setup').addEventListener('click', function () { if (confirm('End this mission and go back to setup?')) { run = null; save(); clearInterval(ticker); show('setup'); } });
    $('#timeout-plus').addEventListener('click', function () { run.left += 300; tick(true); save(); });
    $('#again').addEventListener('click', function () { run = null; show('setup'); });
    $('#print').addEventListener('click', function () { window.print(); });
    document.addEventListener('keydown', function (e) {
      if ($('#mission').hidden || e.metaKey || e.ctrlKey || e.altKey) return;
      var typing = e.target && e.target.tagName === 'INPUT';
      if (e.key === 'Escape') { closePanel(); return; }
      if (e.key === 'h' || e.key === 'H') { if (open) { e.preventDefault(); hint(); } return; }
      if (typing) return;
      if (e.key === 'p' || e.key === 'P' || (e.key === ' ' && !(e.target && e.target.tagName === 'BUTTON'))) { e.preventDefault(); pause(); }
      else if (e.key === 'f' || e.key === 'F') { var d = document.documentElement; if (!document.fullscreenElement && d.requestFullscreen) d.requestFullscreen().catch(function () {}); else if (document.exitFullscreen) document.exitFullscreen().catch(function () {}); }
    });
    show('setup');
  });
})();
