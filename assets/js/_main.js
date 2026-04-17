/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

const themeMediaQuery =
  window.matchMedia && typeof window.matchMedia === "function"
    ? window.matchMedia("(prefers-color-scheme: dark)")
    : null;

let determineThemeSetting = () => {
  const themeSetting = localStorage.getItem("theme");
  return themeSetting === "dark" || themeSetting === "light" || themeSetting === "geek"
    ? themeSetting
    : "system";
};

let determineComputedTheme = () => {
  const themeSetting = determineThemeSetting();

  if (themeSetting !== "system") {
    return themeSetting;
  }

  return themeMediaQuery && themeMediaQuery.matches ? "dark" : "light";
};

let updateThemeIcon = (theme) => {
  const $themeIcon = $("#theme-icon");

  if (!$themeIcon.length) {
    return;
  }

  if (theme === "dark") {
    $themeIcon.removeClass("fa-sun fa-terminal").addClass("fa-moon");
    return;
  }

  if (theme === "geek") {
    $themeIcon.removeClass("fa-sun fa-moon").addClass("fa-terminal");
    return;
  }

  $themeIcon.removeClass("fa-moon fa-terminal").addClass("fa-sun");
};

let setTheme = (theme) => {
  const resolvedTheme = theme || determineComputedTheme();

  $("html").removeAttr("data-theme");

  if (resolvedTheme === "dark" || resolvedTheme === "geek") {
    $("html").attr("data-theme", resolvedTheme);
  }

  updateThemeIcon(resolvedTheme);

  $(".theme-dropdown li").removeClass("active");
  $(`.theme-dropdown li[data-theme="${resolvedTheme}"]`).addClass("active");

  return resolvedTheme;
};

let bindThemeSelector = () => {
  const $themeToggleButton = $(".theme-toggle-btn");
  const $themeDropdown = $(".theme-dropdown");

  if (!$themeToggleButton.length || !$themeDropdown.length) {
    return;
  }

  window.__themeSelectorBundleReady = true;

  const closeThemeDropdown = () => {
    $themeDropdown.removeClass("show");
    $themeToggleButton.attr("aria-expanded", "false");
  };

  $themeToggleButton.attr("aria-expanded", "false");

  $themeToggleButton.off("click").on("click", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const shouldOpen = !$themeDropdown.hasClass("show");
    $themeDropdown.toggleClass("show", shouldOpen);
    $themeToggleButton.attr("aria-expanded", shouldOpen ? "true" : "false");
  });

  $themeDropdown.off("click", "li").on("click", "li", function (event) {
    event.preventDefault();
    event.stopPropagation();

    const newTheme = $(this).data("theme");
    if (!newTheme) {
      return;
    }

    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    closeThemeDropdown();
  });

  $(document)
    .off("click.themeDropdown")
    .on("click.themeDropdown", function () {
      closeThemeDropdown();
    });

  $(document)
    .off("keydown.themeDropdown")
    .on("keydown.themeDropdown", function (event) {
      if (event.key === "Escape") {
        closeThemeDropdown();
      }
    });
};

let listenForSystemThemeChanges = () => {
  if (!themeMediaQuery) {
    return;
  }

  const handleThemeChange = (event) => {
    if (!localStorage.getItem("theme")) {
      setTheme(event.matches ? "dark" : "light");
    }
  };

  if (typeof themeMediaQuery.addEventListener === "function") {
    themeMediaQuery.addEventListener("change", handleThemeChange);
    return;
  }

  if (typeof themeMediaQuery.addListener === "function") {
    themeMediaQuery.addListener(handleThemeChange);
  }
};

/* ==========================================================================
   PDF Viewer integration
   ========================================================================== */

function loadPDFJS() {
  const pdfContainers = document.querySelectorAll("[data-pdf-url]");

  if (!pdfContainers.length || typeof pdfjsLib !== "undefined") {
    return;
  }

  const script = document.createElement("script");
  script.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js";
  script.onload = function () {
    console.log("PDF.js library loaded");
  };
  document.head.appendChild(script);
}

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

import { plotlyDarkLayout, plotlyLightLayout } from "./theme.js";

let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      plotlyElements.forEach((elem) => {
        var jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        const plotlyTheme =
          determineComputedTheme() === "light" ? plotlyLightLayout : plotlyDarkLayout;

        if (jsonData.layout) {
          jsonData.layout.template = jsonData.layout.template
            ? { ...plotlyTheme, ...jsonData.layout.template }
            : plotlyTheme;
        } else {
          jsonData.layout = { template: plotlyTheme };
        }

        Plotly.react(chartElement, jsonData.data, jsonData.layout);
      });
    }
  });
}

/* ==========================================================================
   Actions that should occur when the page has been fully loaded
   ========================================================================== */

$(document).ready(function () {
  const scssLarge = 925;
  const scssMastheadHeight = 70;

  setTheme();
  bindThemeSelector();
  listenForSystemThemeChanges();
  loadPDFJS();

  var bumpIt = function () {
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  };

  $(window).resize(function () {
    didResize = true;
  });

  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }
  }, 250);

  var didResize = false;
  bumpIt();

  fitvids();

  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () {});
    $(".author__urls-wrapper button").toggleClass("open");
  });

  jQuery(window).on("resize", function () {
    if ($(".author__urls.social-icons").css("display") == "none" && $(window).width() >= scssLarge) {
      $(".author__urls").css("display", "block");
    }
  });

  $("a").smoothScroll({
    offset: -scssMastheadHeight,
    preventDefault: false,
  });
});
