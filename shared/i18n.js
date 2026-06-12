(function () {
  const KEY = 'gshow-deck-lang';

  function normalize(lang) {
    return lang === 'en' ? 'en' : 'zh';
  }

  function readLang() {
    const params = new URLSearchParams(window.location.search);
    const fromUrl = params.get('lang');
    if (fromUrl) return normalize(fromUrl);
    try {
      return normalize(localStorage.getItem(KEY));
    } catch (_) {
      return 'zh';
    }
  }

  function applyLang(lang) {
    const next = normalize(lang);
    document.documentElement.lang = next === 'en' ? 'en' : 'zh-CN';
    document.body.dataset.lang = next;

    document.querySelectorAll('[data-en]').forEach((node) => {
      if (!node.dataset.zh) node.dataset.zh = node.innerHTML;
      node.innerHTML = next === 'en' ? node.dataset.en : node.dataset.zh;
    });

    const titleEn = document.documentElement.dataset.titleEn;
    if (titleEn) {
      if (!document.documentElement.dataset.titleZh) {
        document.documentElement.dataset.titleZh = document.title;
      }
      document.title = next === 'en' ? titleEn : document.documentElement.dataset.titleZh;
    }
  }

  window.GShowI18n = {
    applyLang,
    readLang,
    setLang(lang) {
      const next = normalize(lang);
      try {
        localStorage.setItem(KEY, next);
      } catch (_) {}
      applyLang(next);
    },
  };

  window.addEventListener('message', (event) => {
    if (!event.data || event.data.type !== 'gshow:set-lang') return;
    window.GShowI18n.setLang(event.data.lang);
  });

  window.addEventListener('storage', (event) => {
    if (event.key === KEY) applyLang(event.newValue);
  });

  window.addEventListener('keydown', (event) => {
    if (event.target && ['INPUT', 'TEXTAREA'].includes(event.target.tagName)) return;
    if (event.key !== 'l' && event.key !== 'L') return;
    event.preventDefault();
    if (window.parent && window.parent !== window) {
      window.parent.postMessage({ type: 'gshow:toggle-lang' }, '*');
      return;
    }
    const next = readLang() === 'en' ? 'zh' : 'en';
    window.GShowI18n.setLang(next);
  });

  document.addEventListener('DOMContentLoaded', () => {
    applyLang(readLang());
  });
})();
