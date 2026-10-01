(() => {
  const root = document.documentElement;
  const store = {
    get: k => { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} },
  };

  /* ---------- Language ---------- */
  // English lives in the HTML; French is applied on top. Keys match data-i18n.
  const FR = {
    'skip': 'Aller au contenu',
    'nav.about': 'À propos',
    'nav.projects': 'Projets',
    'nav.experience': 'Expérience',
    'nav.interests': 'Centres d’intérêt',
    'nav.contact': 'Contact',
    'hero.pitch': 'Étudiant en deuxième année d’informatique à l’université de Loughborough. Je développe en Python, en Java et pour le web, et c’est en construisant que j’apprends le plus vite.',
    'hero.status': 'Je recherche un stage en développement logiciel.',
    'cta.cv': 'Télécharger le CV (PDF, en anglais)',
    'cta.email': 'M’écrire',
    'about.title': 'À propos',
    'about.p1': 'Je suis en deuxième année de MSci en informatique à l’université de Loughborough. J’ai surtout appris en construisant : des projets universitaires en Java et en PHP, un jeu en Pygame, et des prototypes montés le temps d’un week-end de hackathon à ETH Oxford, à Hack Sussex et à Loughborough, où nous avons remporté en binôme la première place de l’EDI AI Hackathon.',
    'about.p2': 'En dehors du code, je donne des cours de programmation à des élèves de 9 à 18 ans, j’ai travaillé au support informatique de niveau 2 du Leicestershire County Council, et j’apprends le français depuis plus de sept ans, dernièrement à Sciences Po, à Paris.',
    'skills.languages': 'Langages',
    'skills.tools': 'Frameworks et outils',
    'projects.title': 'Projets',
    'projects.ff.meta': 'Projet personnel',
    'projects.ff.desc': 'Un jeu 2D inspiré de Fruit Ninja, avec des effets visuels, conçu en programmation orientée objet, avec un fichier JSON pour la configuration et les meilleurs scores.',
    'projects.more': 'Retrouvez mon code sur GitHub',
    'exp.title': 'Expérience',
    'date.2025now': '2025 – aujourd’hui',
    'date.2024now': '2024 – aujourd’hui',
    'date.jul2025': 'Juil. 2025',
    'date.jul2023': 'Juil. 2023',
    'date.summer2026': 'Été 2026',
    'exp.tutor.title': 'Professeur particulier d’informatique',
    'exp.tutor.org': 'Indépendant',
    'exp.tutor.desc': 'Cours de Python, de pseudo-code et de pensée algorithmique pour des élèves de 9 à 18 ans.',
    'exp.amazon.title': 'Programme Step‑Up d’Amazon',
    'exp.amazon.org': 'Bureaux d’Amazon, Manchester',
    'exp.amazon.desc': 'En équipe et dans un temps limité : conception, chiffrage et présentation d’un nouveau produit devant des acheteurs seniors.',
    'exp.uw.title': 'Distributeur',
    'exp.uw.desc': 'Commercialisation d’offres haut débit, énergie et mobile auprès de la clientèle locale, avec suivi de la relation client et du support.',
    'exp.lcc.title': 'Support informatique de niveau 2',
    'exp.lcc.desc': 'Traitement des tickets et résolution d’incidents techniques dans une organisation d’environ 5 000 employés.',
    'edu.title': 'Formation',
    'edu.lboro.title': 'MSci en informatique',
    'edu.lboro.org': 'Université de Loughborough',
    'edu.lboro.desc': 'Première année : 2:1. Génie logiciel, systèmes embarqués, programmation web, POO et projets d’équipe.',
    'edu.scpo.title': 'Français, niveau B2–C1',
    'edu.scpo.desc': 'Programme intensif de langue, résultat final : 76,5 %. DALF C1 prévu fin 2026 ou début 2027.',
    'edu.dl.desc': 'Informatique (A), mathématiques, physique, français. Extended Project Qualification : A*.',
    'int.title': 'Centres d’intérêt et motivations',
    'int.lang.title': 'L’apprentissage des langues',
    'int.lang.quote': 'Apprendre une autre langue, c’est acquérir une autre âme !',
    'int.lang.p1': 'J’apprends le français depuis plus de sept ans, et j’ai constaté qu’il existe un vrai besoin de meilleures plateformes d’apprentissage des langues.',
    'int.lang.p2': 'Les plateformes en ligne ou « ludiques » sacrifient souvent la profondeur et la complexité au profit de la simplicité : les apprenants de niveau avancé (B2, C1, C2) peinent alors à trouver des ressources en dehors des manuels et des cours particuliers, qui coûtent cher.',
    'int.lang.p3': 'Je travaille actuellement sur un projet personnel pour répondre à certains de ces problèmes, en prenant mon propre parcours d’apprentissage comme référence pour le fonctionnement d’une plateforme.',
    'contact.title': 'Dites bonjour, ou hello.',
    'contact.lead': 'Le plus simple pour me joindre, c’est par e-mail.',
    'contact.cv': 'CV (PDF, en anglais)',
    'footer.place': 'Loughborough, Royaume-Uni',
  };
  const META = {
    en: { title: document.title, htmlLang: 'en-GB' },
    fr: { title: 'Joseph Yewlett — Développeur logiciel', htmlLang: 'fr-FR' },
  };
  const LABELS = {
    en: { dark: 'Switch to dark theme', light: 'Switch to light theme', open: 'Open menu', close: 'Close menu' },
    fr: { dark: 'Passer au thème sombre', light: 'Passer au thème clair', open: 'Ouvrir le menu', close: 'Fermer le menu' },
  };

  const nodes = [...document.querySelectorAll('[data-i18n]')];
  const EN = Object.fromEntries(nodes.map(n => [n.dataset.i18n, n.innerHTML]));
  let lang = root.dataset.lang === 'fr' ? 'fr' : 'en';

  const applyLang = (next, animate) => {
    const swap = () => {
      lang = next;
      const dict = next === 'fr' ? FR : EN;
      nodes.forEach(n => { const v = dict[n.dataset.i18n]; if (v != null) n.innerHTML = v; });
      root.lang = META[next].htmlLang;
      root.dataset.lang = next;
      document.title = META[next].title;
      document.querySelectorAll('.lang__btn').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === next)));
      syncThemeBtn();
      syncMenuBtn();
    };
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!animate || reduced) return swap();
    // The one authored transition on the page: text dissolves and resolves in the other language
    root.classList.add('is-switching');
    setTimeout(() => { swap(); requestAnimationFrame(() => root.classList.remove('is-switching')); }, 180);
  };

  document.querySelectorAll('.lang__btn').forEach(b => b.addEventListener('click', () => {
    if (b.dataset.lang === lang) return;
    store.set('lang', b.dataset.lang);
    applyLang(b.dataset.lang, true);
  }));

  /* ---------- Theme ---------- */
  const themeBtn = document.getElementById('theme-btn');
  const systemDark = matchMedia('(prefers-color-scheme: dark)');
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : systemDark.matches;
  function syncThemeBtn() {
    themeBtn.setAttribute('aria-label', LABELS[lang][isDark() ? 'light' : 'dark']);
    document.querySelectorAll('meta[name="theme-color"]').forEach(m => m.content = isDark() ? '#101113' : '#f7f7f5');
  }
  themeBtn.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    store.set('theme', next);
    syncThemeBtn();
  });
  systemDark.addEventListener('change', syncThemeBtn);

  /* ---------- Mobile menu ---------- */
  const nav = document.getElementById('nav');
  const menuBtn = document.getElementById('menu-btn');
  function syncMenuBtn() {
    const open = nav.classList.contains('is-open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', LABELS[lang][open ? 'close' : 'open']);
  }
  const setMenu = open => { nav.classList.toggle('is-open', open); syncMenuBtn(); };
  menuBtn.addEventListener('click', () => setMenu(!nav.classList.contains('is-open')));
  document.querySelectorAll('#menu a').forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) { setMenu(false); menuBtn.focus(); }
  });

  /* ---------- Current section in nav ---------- */
  const links = new Map([...document.querySelectorAll('#menu a')].map(a => [a.getAttribute('href').slice(1), a]));
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const a = links.get(e.target.id);
        if (!a) return;
        if (e.isIntersecting) {
          links.forEach(l => l.removeAttribute('aria-current'));
          a.setAttribute('aria-current', 'true');
        } else if (a.hasAttribute('aria-current')) {
          a.removeAttribute('aria-current');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    links.forEach((_, id) => { const s = document.getElementById(id); if (s) io.observe(s); });
  }

  applyLang(lang, false);
})();
