/* ==========================================================================
   Various functions that we want to use within the template
   ========================================================================== */

// Determine the expected state of the theme toggle, which can be "dark", "light", "geek" or
// "system". Default is "system".
let determineThemeSetting = () => {
  let themeSetting = localStorage.getItem("theme");
  return (themeSetting === "dark" || themeSetting === "light" || themeSetting === "geek") 
    ? themeSetting 
    : "system";
};

// Determine the computed theme. If the theme setting is "system", 
// the computed theme is determined based on the user's system preference.
let determineComputedTheme = () => {
  let themeSetting = determineThemeSetting();
  if (themeSetting !== "system") {
    return themeSetting;
  }
  return (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) ? "dark" : "light";
};

// detect OS/browser preference
const browserPref = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';

// Set the theme on page load or when explicitly called
let setTheme = (theme) => {
  const use_theme = theme || localStorage.getItem("theme") || browserPref;
  
  // 移除所有主题属性
  $("html").removeAttr("data-theme");

  if (use_theme === "dark") {
    $("html").attr("data-theme", "dark");
    $("#theme-icon").removeClass("fa-sun fa-terminal").addClass("fa-moon");
  } else if (use_theme === "geek") {
    $("html").attr("data-theme", "geek");
    $("#theme-icon").removeClass("fa-sun fa-moon").addClass("fa-terminal");
  } else {
    // light theme - 不设置 data-theme 属性，使用默认样式
    $("#theme-icon").removeClass("fa-moon fa-terminal").addClass("fa-sun");
  }
  
  // 更新下拉菜单中的选中状态
  $(".theme-dropdown li").removeClass("active");
  $(`.theme-dropdown li[data-theme="${use_theme}"]`).addClass("active");
};

/* ==========================================================================
   PDF Viewer integration
   ========================================================================== */

// 动态加载PDF.js库（如果页面需要）
function loadPDFJS() {
  // 检查页面是否包含PDF容器
  const pdfContainers = document.querySelectorAll('[data-pdf-url]');
  if (pdfContainers.length > 0) {
    // 检查是否已经加载了PDF.js
    if (typeof pdfjsLib === 'undefined') {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.11.338/pdf.min.js';
      script.onload = function() {
        console.log('PDF.js library loaded');
      };
      document.head.appendChild(script);
    }
  }
}

/* ==========================================================================
   Plotly integration script so that Markdown codeblocks will be rendered
   ========================================================================== */

// Read the Plotly data from the code block, hide it, and render the chart as new node. This allows for the 
// JSON data to be retrieve when the theme is switched. The listener should only be added if the data is 
// actually present on the page.
import { plotlyDarkLayout, plotlyLightLayout } from './theme.js';
let plotlyElements = document.querySelectorAll("pre>code.language-plotly");
if (plotlyElements.length > 0) {
  document.addEventListener("readystatechange", () => {
    if (document.readyState === "complete") {
      plotlyElements.forEach((elem) => {
        // Parse the Plotly JSON data and hide it
        var jsonData = JSON.parse(elem.textContent);
        elem.parentElement.classList.add("hidden");

        // Add the Plotly node
        let chartElement = document.createElement("div");
        elem.parentElement.after(chartElement);

        // Set the theme for the plot and render it
        const theme = (determineComputedTheme() === "dark") ? plotlyDarkLayout : plotlyLightLayout;
        if (jsonData.layout) {
          jsonData.layout.template = (jsonData.layout.template) ? { ...theme, ...jsonData.layout.template } : theme;
        } else {
          jsonData.layout = { template: theme };
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
  // SCSS SETTINGS - These should be the same as the settings in the relevant files 
  const scssLarge = 925;          // pixels, from /_sass/_themes.scss
  const scssMastheadHeight = 70;  // pixels, from the current theme (e.g., /_sass/theme/_default.scss)

  // 初始化主题
  setTheme();
  
  // 监听系统主题变化
  window.matchMedia('(prefers-color-scheme: dark)')
        .addEventListener("change", (e) => {
          if (!localStorage.getItem("theme")) {
            setTheme(e.matches ? "dark" : "light");
          }
        });

  // Load PDF.js if needed
  loadPDFJS();

  // 主题选择器下拉菜单交互
  $(".theme-toggle-btn").on("click", function(e) {
    e.stopPropagation();
    $(".theme-dropdown").toggleClass("show");
  });
  
  // 选择主题
  $(".theme-dropdown li").on("click", function(e) {
    e.stopPropagation();
    const newTheme = $(this).data("theme");
    localStorage.setItem("theme", newTheme);
    setTheme(newTheme);
    $(".theme-dropdown").removeClass("show");
  });
  
  // 点击其他地方关闭下拉菜单
  $(document).on("click", function() {
    $(".theme-dropdown").removeClass("show");
  });

  // Enable the sticky footer
  var bumpIt = function () {
    $("body").css("margin-bottom", $(".page__footer").outerHeight(true));
  }
  $(window).resize(function () {
    didResize = true;
  });
  setInterval(function () {
    if (didResize) {
      didResize = false;
      bumpIt();
    }}, 250);
  var didResize = false;
  bumpIt();

  // FitVids init
  fitvids();

  // Follow menu drop down
  $(".author__urls-wrapper button").on("click", function () {
    $(".author__urls").fadeToggle("fast", function () { });
    $(".author__urls-wrapper button").toggleClass("open");
  });

  // Restore the follow menu if toggled on a window resize
  jQuery(window).on('resize', function () {
    if ($('.author__urls.social-icons').css('display') == 'none' && $(window).width() >= scssLarge) {
      $(".author__urls").css('display', 'block')
    }
  });

  // Init smooth scroll, this needs to be slightly more than then fixed masthead height
  $("a").smoothScroll({
    offset: -scssMastheadHeight,
    preventDefault: false,
  });

});