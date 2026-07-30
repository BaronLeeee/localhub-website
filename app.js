(() => {
  const header = document.querySelector("[data-header]");
  const languageSwitch = document.querySelector("[data-language-switch]");
  const translatedNodes = document.querySelectorAll("[data-en][data-zh]");
  const titleByLanguage = {
    en: "LocalHub — Share from Android to any browser",
    zh: "LocalHub — 从 Android 分享到任意浏览器"
  };
  const descriptionByLanguage = {
    en: "Turn your Android device into a private local sharing hub. Send files, stream media, or share your screen to any browser—no receiver app or cloud upload required.",
    zh: "把 Android 设备变成私密的局域网共享中心，向任意浏览器传文件、播放媒体或共享屏幕；接收端无需安装，也无需上传云端。"
  };

  const applyLanguage = (language) => {
    const nextLanguage = language === "zh" ? "zh" : "en";

    document.documentElement.lang = nextLanguage === "zh" ? "zh-CN" : "en";
    document.title = titleByLanguage[nextLanguage];
    document.querySelector('meta[name="description"]')?.setAttribute("content", descriptionByLanguage[nextLanguage]);

    translatedNodes.forEach((node) => {
      node.textContent = node.dataset[nextLanguage];
    });

    if (languageSwitch) {
      languageSwitch.textContent = nextLanguage === "en" ? "中文" : "EN";
      languageSwitch.setAttribute("aria-label", nextLanguage === "en" ? "切换到中文" : "Switch to English");
    }

    try {
      localStorage.setItem("localhub-language", nextLanguage);
    } catch {
      // The language switch remains usable when storage is unavailable.
    }
  };

  let storedLanguage;
  try {
    storedLanguage = localStorage.getItem("localhub-language");
  } catch {
    storedLanguage = null;
  }

  const initialLanguage = storedLanguage || (navigator.language.toLowerCase().startsWith("zh") ? "zh" : "en");
  applyLanguage(initialLanguage);

  languageSwitch?.addEventListener("click", () => {
    applyLanguage(document.documentElement.lang.startsWith("zh") ? "en" : "zh");
  });

  const updateHeader = () => {
    header?.classList.toggle("scrolled", window.scrollY > 18);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });
})();
