const STORAGE_KEY = "erick-ui-theme";
const DEFAULT_THEME = "classic";

const THEMES = [
  { id: "classic", label: "Current (default)" },
  { id: "skeuomorphism", label: "Skeuomorphism" },
  { id: "neomorphism", label: "Neomorphism" },
  { id: "glassmorphism", label: "Glassmorphism" },
  { id: "claymorphism", label: "Claymorphism" },
  { id: "minimalism", label: "Minimalism" },
  { id: "maximalism", label: "Maximalism" },
  { id: "brutalism", label: "Brutalism" },
  { id: "liquid-glass", label: "Liquid Glass" },
  { id: "bento", label: "Bento Grid" },
  { id: "spatial", label: "Spatial UI" },
];

function isValidTheme(id) {
  return THEMES.some((theme) => theme.id === id);
}

function getStoredTheme() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return isValidTheme(stored) ? stored : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
}

function applyTheme(id) {
  const theme = isValidTheme(id) ? id : DEFAULT_THEME;
  document.documentElement.setAttribute("data-ui", theme);
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* ignore quota / private mode */
  }
  return theme;
}

function themeLabel(id) {
  return THEMES.find((theme) => theme.id === id)?.label ?? "Current (default)";
}

function buildToggle(current) {
  const root = document.createElement("div");
  root.className = "ui-theme-toggle";

  const button = document.createElement("button");
  button.type = "button";
  button.className = "ui-theme-toggle__btn";
  button.setAttribute("aria-haspopup", "listbox");
  button.setAttribute("aria-expanded", "false");
  button.setAttribute("aria-controls", "uiThemePanel");
  button.innerHTML = `<span aria-hidden="true">◐</span><span data-theme-label>UI style</span>`;

  const panel = document.createElement("div");
  panel.id = "uiThemePanel";
  panel.className = "ui-theme-toggle__panel";
  panel.hidden = true;
  panel.setAttribute("role", "listbox");
  panel.setAttribute("aria-label", "UI style");

  const label = document.createElement("span");
  label.className = "ui-theme-toggle__label";
  label.textContent = "UI style";
  panel.appendChild(label);

  const options = THEMES.map((theme) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "ui-theme-toggle__option";
    option.setAttribute("role", "option");
    option.setAttribute("data-theme", theme.id);
    option.setAttribute("aria-checked", theme.id === current ? "true" : "false");
    option.textContent = theme.label;
    panel.appendChild(option);
    return option;
  });

  function syncOptions(active) {
    options.forEach((option) => {
      const selected = option.getAttribute("data-theme") === active;
      option.setAttribute("aria-checked", selected ? "true" : "false");
    });
    button.setAttribute("title", `UI style: ${themeLabel(active)}`);
    button.setAttribute("aria-label", `UI style, ${themeLabel(active)}`);
  }

  function closePanel() {
    panel.hidden = true;
    root.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
  }

  function openPanel() {
    panel.hidden = false;
    root.classList.add("is-open", "has-been-opened");
    button.setAttribute("aria-expanded", "true");
    const selected = options.find(
      (option) => option.getAttribute("aria-checked") === "true"
    );
    selected?.focus();
  }

  button.addEventListener("click", () => {
    if (panel.hidden) openPanel();
    else closePanel();
  });

  panel.addEventListener("click", (event) => {
    const option = event.target.closest("[data-theme]");
    if (!option) return;
    const next = applyTheme(option.getAttribute("data-theme"));
    syncOptions(next);
    closePanel();
    button.focus();
  });

  document.addEventListener("click", (event) => {
    if (!root.contains(event.target)) closePanel();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closePanel();
  });

  syncOptions(current);
  root.append(button, panel);
  document.body.appendChild(root);
}

const initial = applyTheme(getStoredTheme());
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => buildToggle(initial));
} else {
  buildToggle(initial);
}
