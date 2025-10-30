import React, { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./LanguageSelector.css";

const LanguageSelector = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const languages = [
    { code: "en", name: "English", flag: "🇺🇸" },
    { code: "uk", name: "Українська", flag: "🇺🇦" },
    { code: "de", name: "Deutsch", flag: "🇩🇪" },
    { code: "zh", name: "简体中文", flag: "🇨🇳" },
    { code: "es", name: "Español", flag: "🇪🇸" },
    { code: "fr", name: "Français", flag: "🇫🇷" },
    { code: "ja", name: "日本語", flag: "🇯🇵" },
    { code: "ko", name: "한국어", flag: "🇰🇷" },
    { code: "pt", name: "Português", flag: "🇵🇹" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "ar", name: "العربية", flag: "🇸🇦" },
    { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
    { code: "id", name: "Bahasa Indonesia", flag: "🇮🇩" },
    { code: "vi", name: "Tiếng Việt", flag: "🇻🇳" },
    { code: "th", name: "ไทย", flag: "🇹🇭" },
    { code: "it", name: "Italiano", flag: "🇮🇹" },
  ];

  const resolvedCode = (i18n.resolvedLanguage || i18n.language || "en").split(
    "-"
  )[0];
  const currentLanguage =
    languages.find((lang) => lang.code === resolvedCode) || languages[0];

  const handleLanguageChange = (languageCode) => {
    i18n.changeLanguage(languageCode);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button
        className="language-selector-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-label={t("language.select")}
        data-testid="language-selector-button"
      >
        <span className="language-flag">{currentLanguage.flag}</span>
        <span className="language-name">{currentLanguage.name}</span>
        <span className={`dropdown-arrow ${isOpen ? "open" : ""}`}>▼</span>
      </button>

      {isOpen && (
        <div className="language-dropdown" data-testid="language-dropdown">
          {languages.map((language) => (
            <button
              key={language.code}
              className={`language-option ${
                i18n.language === language.code ? "active" : ""
              }`}
              onClick={() => handleLanguageChange(language.code)}
              data-testid={`language-option-${language.code}`}
            >
              <span className="language-flag">{language.flag}</span>
              <span className="language-name">{language.name}</span>
              {i18n.language === language.code && (
                <span className="checkmark">✓</span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
