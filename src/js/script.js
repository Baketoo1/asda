// Načist dark mode nebo white mode
if (localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  document.documentElement.classList.add("dark");
} else {
  document.documentElement.classList.remove("dark");
}

var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Změnit ikony tlačítka podle předchozího nastavení
if (localStorage.getItem("color-theme") === "dark" || (!("color-theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

// Event listener pro tlačítko pro přepínání tématu
themeToggleBtn.addEventListener("click", function () {
  // přepínat ikony uvnitř tlačítka
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // pokud bylo dříve nastaveno prostřednictvím místního úložiště
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // pokud NENÍ nastaveno dříve prostřednictvím místního úložiště
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});

const tham = document.querySelector(".tham");
const hamMenu = document.getElementById("hamburger-menu");
const hamBtn = document.getElementById("hamburger-btn");

hamBtn.addEventListener("click", () => {
  tham.classList.toggle("tham-active");
  hamMenu.classList.toggle("opacity-0");
  hamMenu.classList.toggle("hidden");
});

// Skrýt všechny sekce
function skryjVsechnySekce() {
  const sekce = document.querySelectorAll("section");
  sekce.forEach((sekce) => {
    sekce.classList.add("hidden");
  });
}

// Funkce pro zobrazení vybrané sekce
function zobrazSekci(id) {
  // Ošetření neplatného ID sekce
  const vybranaSekce = document.getElementById(id);
  if (!vybranaSekce) {
    console.error("Sekce s ID " + id + " nebyla nalezena!");
    return;
  }

  // Uložit sekci do paměti prohlížeče
  localStorage.setItem("sekceZobrazeni", id);

  // Skrýt všechny sekce
  skryjVsechnySekce();

  // Zobrazit vybranou sekci
  vybranaSekce.classList.remove("hidden");
}

// Načtení defaultní sekce
var sekceZobrazeni = localStorage.getItem("sekceZobrazeni");
if (!sekceZobrazeni) {
  console.error("Defaultní sekce nenalezena v localStorage!");
  sekceZobrazeni = "section1"; // Nastavení defaultní sekce
}

// Zobrazit výchozí sekci
zobrazSekci(sekceZobrazeni);

const btnSubmit = document.getElementById("btn-submit");
const errorMsg = document.querySelectorAll("#error-message");

const fristName = document.getElementById("frist-name-input");
const lastName = document.getElementById("last-name-input");
const email = document.getElementById("email-input");
const message = document.getElementById("message-input");

const inputs = [fristName,lastName,email,message];

inputs.forEach((input, index) => {
  input.addEventListener("click", () => {
    input.classList.add("border-white");
    input.classList.remove("border-red-500");
    input.classList.remove("border-green-500");
    errorMsg[index].classList.add("opacity-0");
  });
});

btnSubmit.addEventListener("click", (event) => {
  event.preventDefault();

  // Validace polí a přidání nebo odebrání tříd
  inputs.forEach((input, index) => {
    input.classList.remove("border-white");
    input.classList.remove("border-red-500");
    input.classList.remove("border-green-500");

    if (input.value) {
      success(input, index);
    } else {
      error(input, index);
    }
  });
  
  // Získání pole, zda jsou všechna pole validní
  const allValid = inputs.every((input) => input.value);

  // Pokud jsou všechna pole validní, formulář se odešle
  if (allValid) {
    // Odešlání formuláře
    event.target.closest("form").submit();
  }
});

function success(input, index) {
  input.classList.remove("border-red-500");
  input.classList.add("border-green-500");
  errorMsg[index].classList.add("text-green-500");
  errorMsg[index].classList.remove("text-red-500");
  errorMsg[index].classList.remove("hidden");
}

function error(input, index) {
  input.classList.remove("border-green-500");
  input.classList.add("border-red-500");
  errorMsg[index].classList.add("text-red-500");
  errorMsg[index].classList.remove("text-green-500");
  errorMsg[index].classList.remove("hidden");
  errorMsg[index].classList.remove("opacity-0");
}
