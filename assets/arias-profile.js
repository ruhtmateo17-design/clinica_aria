/* ===== Clínica Arias · Perfil de Dirección + iconos 3D =====
   EDITA AQUÍ tus datos. Para usar tu foto: guarda una imagen llamada
   "ruht.jpg" dentro de la carpeta assets/ (si no existe, se muestran tus iniciales en 3D). */
(function () {
  var PERFIL = {
    nombre: 'Lic. Ruht E. Mateo',
    cargo: 'Directora y Encargada General',
    iniciales: 'RM',
    foto: 'assets/ruht.jpg',
    email: 'atencionpaciente@clinicaarias.es',
    mensaje: 'Bienvenidos a Clínica Arias. Nuestro compromiso es ofrecerle una atención segura, ' +
             'humana y de excelencia, con un equipo profesional que pone al paciente y a su familia ' +
             'en el centro de cada decisión.'
  };

  /* Iconos más relacionados con el área médica */
  var SWAP = { grid_view: 'monitor_heart', dashboard: 'monitor_heart', vital_signs: 'ecg_heart',
               manage_accounts: 'admin_panel_settings', clinical_notes: 'medical_information' };
  /* Colores por tipo de icono (RGB) */
  var RED = [226, 62, 70], GREEN = [20, 160, 108], TEAL = [18, 130, 168], VIOLET = [112, 92, 200], AMBER = [230, 140, 20];
  var PAL = { emergency: RED, warning: RED, error: RED, bloodtype: RED, notifications: RED, ecg_heart: RED, monitor_heart: RED,
              favorite: RED, local_fire_department: RED, personal_injury: RED, bed: TEAL, biotech: VIOLET, science: VIOLET,
              vaccines: GREEN, medication: GREEN, payments: GREEN, point_of_sale: GREEN, check_circle: GREEN, verified: GREEN,
              health_and_safety: GREEN, schedule: AMBER, pending: AMBER, forum: TEAL, medical_information: TEAL, local_hospital: RED };
  var BEAT = { ecg_heart: 1, monitor_heart: 1, favorite: 1 };
  var ALERT = { notifications: 1, warning: 1 };

  function parse(c) { var m = c.match(/[\d.]+/g) || [0, 0, 0]; return [+m[0], +m[1], +m[2]]; }
  function mix(a, b, t) { return a.map(function (v, i) { return Math.round(v + (b[i] - v) * t); }); }
  function css(a, al) { return al == null ? 'rgb(' + a.join(',') + ')' : 'rgba(' + a.join(',') + ',' + al + ')'; }

  function icon3d(el) {
    if (el.dataset.d3) return;
    var t = el.textContent.trim();
    if (SWAP[t]) { el.textContent = SWAP[t]; t = SWAP[t]; }
    var cs = getComputedStyle(el), base = parse(cs.color);
    var lum = 0.299 * base[0] + 0.587 * base[1] + 0.114 * base[2];
    var sat = Math.max.apply(null, base) - Math.min.apply(null, base);
    var light, dark;
    if (lum > 205) {                         /* icono blanco sobre fondo oscuro */
      light = [255, 255, 255]; base = [208, 232, 246]; dark = [20, 60, 85];
    } else {
      if (PAL[t]) base = PAL[t]; else if (sat < 35) base = [13, 105, 140];
      light = mix(base, [255, 255, 255], 0.5); dark = mix(base, [0, 12, 24], 0.55);
    }
    el.style.setProperty('--i1', css(light)); el.style.setProperty('--i2', css(base));
    el.style.setProperty('--i3', css(dark)); el.style.setProperty('--sh', css(dark, 0.35));
    el.dataset.d3 = '1';
    var size = parseFloat(cs.fontSize);
    if (BEAT[t]) el.classList.add('d3-beat');
    else if (ALERT[t]) el.classList.add('d3-alert');
    else if (size >= 22) { el.classList.add('d3-float'); el.style.setProperty('--dly', (Math.random() * 2).toFixed(2) + 's'); }
    var p = el.parentElement;               /* baldosa con relieve */
    if (p && p.children.length === 1 && /rounded/.test(p.className) && /\b(w|h)-\d+/.test(p.className)) p.classList.add('arias-tile');
  }
  function run(root) { (root || document).querySelectorAll('.material-symbols-outlined:not([data-d3])').forEach(icon3d); }

  function avatar(size, extra) {
    var d = document.createElement('div');
    d.className = 'ap-avatar' + (extra ? ' ' + extra : '');
    d.style.width = d.style.height = size + 'px';
    d.innerHTML = '<div class="ap-face" style="font-size:' + Math.round(size * 0.36) + 'px">' + PERFIL.iniciales +
      '<img alt="' + PERFIL.nombre + '" src="' + PERFIL.foto + '" onerror="this.remove()"></div><span class="ap-dot"></span>';
    return d;
  }

  function profileSystem() {
    var aside = document.querySelector('aside');
    if (aside) {
      var bottom = aside.lastElementChild;
      var card = document.createElement('div'); card.className = 'ap-side-card';
      card.appendChild(avatar(46));
      var t = document.createElement('div');
      t.innerHTML = '<div class="ap-n">' + PERFIL.nombre + '</div><div class="ap-c">' + PERFIL.cargo + '</div>';
      card.appendChild(t);
      if (bottom) bottom.insertBefore(card, bottom.firstChild); else aside.appendChild(card);
    }
    var hdr = document.querySelector('header .w-8.h-8.rounded-full');
    if (hdr) {
      var chip = document.createElement('div'); chip.className = 'ap-head-chip';
      var tx = document.createElement('div'); tx.className = 'ap-txt'; tx.style.textAlign = 'right';
      tx.innerHTML = '<div class="ap-n">' + PERFIL.nombre + '</div><div class="ap-c">' + PERFIL.cargo + '</div>';
      chip.appendChild(tx); chip.appendChild(avatar(38));
      hdr.replaceWith(chip);
    }
  }

  function profilePortal() {
    var hero = document.querySelector('div.lg\\:col-span-5.relative');
    if (hero) {
      var hc = document.createElement('div'); hc.className = 'ap-hero-card';
      hc.appendChild(avatar(46));
      var t = document.createElement('div');
      t.innerHTML = '<div class="ap-n">' + PERFIL.nombre + '</div><div class="ap-c">' + PERFIL.cargo + '</div>';
      hc.appendChild(t); hero.appendChild(hc);
    }
    var staff = document.getElementById('staff-medico');
    if (!staff) return;
    var sec = document.createElement('section');
    sec.id = 'direccion'; sec.className = 'w-full px-gutter-desktop mx-auto mt-space-xl';
    var box = document.createElement('div'); box.className = 'ap-dir';
    box.appendChild(avatar(190, 'ap-big'));
    var info = document.createElement('div');
    info.innerHTML =
      '<span class="ap-kicker"><span class="material-symbols-outlined" style="font-size:16px">verified</span>Dirección General</span>' +
      '<h2>' + PERFIL.nombre + '</h2><div class="ap-role">' + PERFIL.cargo + ' · Clínica Arias</div>' +
      '<p class="ap-msg">“' + PERFIL.mensaje + '”</p>' +
      '<div class="ap-chips">' +
        '<div class="ap-chip"><span class="ic"><span class="material-symbols-outlined" style="font-size:22px">favorite</span></span>Atención humana</div>' +
        '<div class="ap-chip"><span class="ic"><span class="material-symbols-outlined" style="font-size:22px">health_and_safety</span></span>Seguridad del paciente</div>' +
        '<div class="ap-chip"><span class="ic"><span class="material-symbols-outlined" style="font-size:22px">stethoscope</span></span>Excelencia médica</div>' +
      '</div>' +
      '<div class="ap-btns"><a class="ap-btn p" href="#widget-reserva"><span class="material-symbols-outlined" style="font-size:20px;color:#fff">calendar_month</span>Agendar cita</a>' +
      '<a class="ap-btn s" href="mailto:' + PERFIL.email + '"><span class="material-symbols-outlined" style="font-size:20px">mail</span>Contactar a la Dirección</a></div>';
    box.appendChild(info); sec.appendChild(box);
    staff.parentNode.insertBefore(sec, staff);
  }

  function init() {
    if (document.getElementById('staff-medico')) profilePortal(); else profileSystem();
    run();
    var timer; new MutationObserver(function () { clearTimeout(timer); timer = setTimeout(run, 120); })
      .observe(document.body, { childList: true, subtree: true });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
