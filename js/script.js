// INFO1005 Module 3.2 Marge Simpson multipage template JavaScript
// One shared file controls theme, typewriter, modal and demo form behaviour.

(function () {
  const html = document.documentElement;
  const switcher = document.querySelector('#themeSwitch');
  const themeLabel = document.querySelector('#themeLabel');

  let savedTheme = 'light';
  try {
    savedTheme = localStorage.getItem('maggie-theme') || 'light';
  } catch (error) {
    savedTheme = 'light';
  }

  html.setAttribute('data-bs-theme', savedTheme);

  if (switcher) {
    switcher.checked = savedTheme === 'dark';

    function updateThemeLabel(animate) {
      if (!themeLabel) {
        return;
      }

      const isDark = switcher.checked;
      themeLabel.classList.toggle('bi-sun-fill', !isDark);
      themeLabel.classList.toggle('bi-moon-fill', isDark);
      themeLabel.setAttribute('aria-label', `Current theme: ${isDark ? 'dark' : 'light'}`);

      if (animate) {
        themeLabel.classList.remove('is-changing');
        window.requestAnimationFrame(function () {
          themeLabel.classList.add('is-changing');
        });
      }
    }

    updateThemeLabel(false);

    switcher.addEventListener('change', function () {
      const nextTheme = switcher.checked ? 'dark' : 'light';
      html.setAttribute('data-bs-theme', nextTheme);
      updateThemeLabel(true);

      try {
        localStorage.setItem('maggie-theme', nextTheme);
      } catch (error) {
        // Theme switching still works if storage is unavailable.
      }
    });
  }

  // HOME TYPEWRITER
  const typingTarget = document.querySelector('.typewrite');

  if (typingTarget) {
    const words = JSON.parse(typingTarget.dataset.words || '[]');
    let wordIndex = 0;
    let characterIndex = 0;
    let deleting = false;

    function typeLoop() {
      const word = words[wordIndex] || '';

      characterIndex += deleting ? -1 : 1;
      typingTarget.textContent = word.slice(0, characterIndex);

      let delay = deleting ? 55 : 95;

      if (!deleting && characterIndex === word.length) {
        deleting = true;
        delay = 1200;
      } else if (deleting && characterIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        delay = 350;
      }

      window.setTimeout(typeLoop, delay);
    }

    if (words.length) {
      typeLoop();
    }
  }
})();
