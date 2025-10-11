function placeHolders() {
  const liBtns = document.querySelectorAll(".reservation-item li");

  if (document.querySelector(".hotel-landing")) {
    const searchHistory = document.querySelector(".hotel-searchHistory");
    if (searchHistory) {
      searchHistory.classList.remove("hidden");
    }
    liBtns.forEach((li) => {
      if (!li.classList.contains("hotel-btn")) {
        li.classList.remove("active-module");
      } else {
        li.classList.add("active-module");
      }
    });
  }

  if (document.querySelector(".flighthotel-landing")) {
    const searchHistory = document.querySelector(".flighthotel-searchHistory");
    if (searchHistory) {
      searchHistory.classList.remove("hidden");
    }
    liBtns.forEach((li) => {
      if (!li.classList.contains("flighthotel-btn")) {
        li.classList.remove("active-module");
      } else {
        li.classList.add("active-module");
      }
    });
  }
  if (document.querySelector(".tour-landing")) {
    const searchHistory = document.querySelector(".tour-searchHistory");
    if (searchHistory) {
      searchHistory.classList.remove("hidden");
    }
    liBtns.forEach((li) => {
      if (!li.classList.contains("tour-btn")) {
        li.classList.remove("active-module");
      } else {
        li.classList.add("active-module");
      }
    });
  }

  document.querySelector(
    "#r-tour .searchList input.reserve-location"
  ).readOnly = true;

  const span1 = document.querySelectorAll(
    "#search-box .passenger-counts.adult-count"
  );
  span1.forEach((span) => {
    span.parentElement.classList.add("parent-for-counters");
  });
  document.querySelectorAll(".text-value").forEach((el) => {
    el.value = "";
  });
  const cipBtn = document.querySelector(
    ".reservation-item .cip-btn .module-name"
  );
  cipBtn.innerText = "خدمات cip";

  const flightDP = document.querySelectorAll(
    "#r-flight .departure-route input.text-value"
  );
  flightDP.forEach((input) => {
    input.placeholder = "مبدا";
  });
  const flightHDP = document.querySelectorAll(
    "#r-flighthotel .departure-route input.text-value"
  );
  flightHDP.forEach((input) => {
    input.placeholder = "مبدا";
  });

  const flightDs = document.querySelectorAll(
    "#r-flight .destination-route input.text-value"
  );
  flightDs.forEach((input) => {
    input.placeholder = "مقصد";
  });

  const flightHDs = document.querySelectorAll(
    "#r-flighthotel .destination-route input.text-value"
  );
  flightHDs.forEach((input) => {
    input.placeholder = "مقصد";
  });

  const startDate = document.querySelectorAll(
    ".Basis_Date_Box .departure-date input.h-full"
  );
  startDate.forEach((input) => {
    input.placeholder = "تاریخ رفت";
  });
  const endDate = document.querySelectorAll(
    ".Basis_Date_Box .return-date  input.h-full"
  );
  endDate.forEach((input) => {
    input.placeholder = "تاریخ برگشت";
  });
  // ___________________
  // ___________________
  // ___________________
  // ___________________
  const label = document.querySelector(
    "#r-cip .traveltype-field label[for='traveltype']"
  );
  if (!label) return;

  const firstSvg = label.querySelector("svg");
  if (!firstSvg) return;

  const newSvgString = `<img src="../images/travelTypeIcon.svg" alt="travelTypeIcon"/>`;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = newSvgString.trim();
  const newSvg = tempDiv.firstChild;

  firstSvg.replaceWith(newSvg);
  // ___________________
  // ___________________
  // ___________________
  // ___________________
  // ___________________

  const label2 = document.querySelector(
    "#r-cip .flighttype-field .border-type-1 label"
  );

  if (!label2) return;

  const firstSvg2 = label2.querySelector("svg");

  if (!firstSvg2) return;

  const newSvgString2 = `<img src="../images/cip-flight-type.svg" alt="flighttypeIcon"/>`;

  const tempDiv2 = document.createElement("div");
  tempDiv2.innerHTML = newSvgString2.trim();
  const newSvg2 = tempDiv2.firstChild;

  firstSvg2.replaceWith(newSvg2);
  // ___________________
  // ___________________
  // ___________________
  // ___________________
  // ___________________
}

document.addEventListener("DOMContentLoaded", function () {
  const requiredFiles = ["mobin.ui.min.css"];

  function checkAllResourcesLoaded() {
    const resources = performance.getEntriesByType("resource");
    const loadedFiles = resources
      .map((res) => res.name.split("/").pop())
      .filter((name) => requiredFiles.includes(name));
    // console.log(resources);

    return requiredFiles.every((file) => loadedFiles.includes(file));
  }

  if (document.getElementById("search-box")) {
    function fetchEngine() {
      try {
        const xhrobj = new XMLHttpRequest();
        xhrobj.open("GET", "search-engine.bc");
        xhrobj.send();

        xhrobj.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            const container = document.getElementById("search-box");
            container.innerHTML = xhrobj.responseText;
            placeHolders();
            const scripts = container.getElementsByTagName("script");
            for (let i = 0; i < scripts.length; i++) {
              const scriptTag = document.createElement("script");
              if (scripts[i].src) {
                scriptTag.src = scripts[i].src;
                scriptTag.async = false;
              } else {
                scriptTag.text = scripts[i].textContent;
              }
              document.head
                .appendChild(scriptTag)
                .parentNode.removeChild(scriptTag);
            }
          }
        };
      } catch (error) {
        console.error("مشکلی پیش آمده است. لطفا صبور باشید", error);
      }
    }

    function waitForFiles() {
      if (checkAllResourcesLoaded()) {
        fetchEngine();
      } else {
        setTimeout(waitForFiles, 500);
      }
    }
    waitForFiles();
  }
});
// ____________________________________
// ____________________________________
// ____________________________________
// ____________________________________
// ____________________________________
// ____________________________________
// _______________________________
// _______________________________
// _______________________________
function watchForFlightTypeField(callback) {
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      for (const node of mutation.addedNodes) {
        if (node.nodeType === Node.ELEMENT_NODE) {
          if (node.matches(".flighttype-field")) {
            callback(node);
          }

          const matches = node.querySelectorAll(".flighttype-field");
          matches.forEach((match) => callback(match));
        }
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });

  document.querySelectorAll(".flighttype-field").forEach(callback);
}
watchForFlightTypeField((el) => {
  const liObserver = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      if (
        mutation.type === "attributes" &&
        mutation.attributeName === "class"
      ) {
        const target = mutation.target;
        if (target.classList.contains("active-module")) {
          const navValue = target.getAttribute("data-nav");
          const validPaths = ["/", "/default.bc"];
          if (validPaths.includes(window.location.pathname)) {
            if (navValue) {
              document
                .querySelectorAll(".reservation-item li")
                .forEach((li) => {
                  const val = li.getAttribute("data-nav");
                  if (val) {
                    document.body.classList.remove(val);
                  }
                });
              document.body.classList.add(navValue);
            }
          }
        }
      }
    }
  });

  const reservationItems = document.querySelectorAll(".reservation-item li");
  reservationItems.forEach((li) => {
    liObserver.observe(li, {
      attributes: true,
      attributeFilter: ["class"],
    });
  });
});

// ---------------------------------
// ____________________________________
// ____________________________________
// ____________________________________
// ____________________________________
// ____________________________________
const commonQS = document.querySelectorAll(".common-qs-r");

commonQS.forEach((container) => {
  const questions = container.querySelectorAll(".box");

  questions.forEach((item) => {
    item.addEventListener("click", (e) => {
      // جلوگیری از بسته شدن فوری با جلوگیری از انتشار
      e.stopPropagation();
      // فقط این سوال فعال شود، بقیه غیرفعال شوند
      questions.forEach((q) => {
        if (q !== item) q.classList.remove("active");
      });
      item.classList.toggle("active");
    });
  });
});

// فقط یک بار روی document کلیک‌گیر بگذار
document.addEventListener("click", (e) => {
  document.querySelectorAll(".common-qs-r .box.active").forEach((item) => {
    if (!item.contains(e.target)) {
      item.classList.remove("active");
    }
  });
});

// _____________________________________________________________
  function showAllCards() {
    let cards = document.querySelectorAll(".tour-card");
    cards.forEach((card) => {
      card.style.display = "flex";
    });

    const noResultsMessage = document.querySelector(".no-results-message");
    if (noResultsMessage) {
      noResultsMessage.remove();
    }

    const paging = document.getElementById("paging");
    paging.style.display = "flex";
  }
  function applyFilters() {
    filterItems = document.querySelectorAll(".filters-ul li"); // دوباره گرفتن فیلترها
    if (document.querySelector(".no-cards-found")) {
      document.querySelector(".no-results-message")?.classList.add("hidden");
    } else {
      document.querySelector(".no-results-message")?.classList.remove("hidden");
    }
    if (document.querySelector(".filter-box span")) {
      document.querySelector(".filter-box span").innerText = "مرتب سازی";
    }
    if (window.innerWidth >= 1024) {
      filterItems.forEach((filter) => {
        filter.classList.remove("active");
      });

      if (filterItems.length > 0) {
        filterItems[0].classList.add("active");
      }
    }

    // اعمال فیلترینگ بر روی کارت‌ها
    filterItems.forEach((filter) => {
      filter.addEventListener("click", () => {
        if (filter.classList.contains("all")) {
          // نمایش همه کارت‌ها وقتی "همه" کلیک می‌شود
          showAllCards();
          return;
        }

        const filterClass = filter.classList[0];
        let anyCardVisible = false;

        // دوباره فیلتر کردن کارت‌ها پس از هر بار فچ
        let cards = document.querySelectorAll(".tour-card");
        cards.forEach((card) => {
          const filterElement = card.querySelector(`.${filterClass}`);
          if (filterElement && filterElement.textContent.trim() !== "") {
            card.style.display = "flex";
            anyCardVisible = true;
          } else {
            card.style.display = "none";
          }
        });

        const toursContainer = document.querySelector(".tours-container");
        const paging = document.getElementById("paging");

        if (!anyCardVisible) {
          if (!document.querySelector(".no-results-message")) {
            const noResultsMessage = document.createElement("p");
            noResultsMessage.classList.add("no-results-message");
            noResultsMessage.textContent = "موردی یافت نشد !";
            toursContainer.appendChild(noResultsMessage);
            paging.style.display = "none";
            if (document.querySelector(".no-cards-found")) {
              document
                .querySelector(".no-results-message")
                ?.classList.add("hidden");
            }
          }
        } else {
          const noResultsMessage = document.querySelector(
            ".no-results-message"
          );
          if (noResultsMessage) {
            noResultsMessage.remove();
          }

          paging.style.display = "flex";
        }
      });
    });
  }
  // ___________________________________
  
if (document.querySelectorAll(".swiper-3-9").length > 0)
  swiper = new Swiper(".swiper-3-9", {
    slidesPerView: 3.85,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 16,
    grabCursor: !0,
    // autoplay: { delay: 2500, disableOnInteraction: !1 },
    loop: 0,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-ft",
      prevEl: ".swiper-button-prev-ft",
    },
    breakpoints: {
      640: { slidesPerView: 3.7, spaceBetween: 12 },
      768: { slidesPerView: 3.7, spaceBetween: 12 },
      1024: { slidesPerView: 3.85, spaceBetween: 16 },
    },
  });
if (document.querySelectorAll(".swiper-4").length > 0)
  swiper = new Swiper(".swiper-4", {
    slidesPerView: 4.26,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 16,
    grabCursor: !0,
    // autoplay: { delay: 4500, disableOnInteraction: !1 },
    loop: 0,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-fl",
      prevEl: ".swiper-button-prev-fl",
    },
    breakpoints: {
      640: { slidesPerView: 4, spaceBetween: 16 },
      768: { slidesPerView: 4, spaceBetween: 16 },
      1024: { slidesPerView: 4.26, spaceBetween: 16 },
    },
  });
if (document.querySelectorAll(".swiper-el").length > 0)
  swiper = new Swiper(".swiper-el", {
    slidesPerView: 1.39,
    speed: 400,
    centeredSlides: !1,
    spaceBetween: 10,
    grabCursor: !0,
    // autoplay: { delay: 2500, disableOnInteraction: !1 },
    loop: 0,
  });
if (document.querySelectorAll(".swiper-4-mob").length > 0)
  swiper = new Swiper(".swiper-4-mob", {
    slidesPerView: 1.24,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 16,
    grabCursor: !0,
    // autoplay: { delay: 4500, disableOnInteraction: !1 },
    loop: 0,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-fl",
      prevEl: ".swiper-button-prev-fl",
    },
    breakpoints: {
      640: { slidesPerView: 1.24, spaceBetween: 16 },
      768: { slidesPerView: 1.24, spaceBetween: 16 },
      1024: { slidesPerView: 1.24, spaceBetween: 16 },
    },
  });
if (document.querySelectorAll(".swiper-3").length > 0)
  swiper = new Swiper(".swiper-3", {
    slidesPerView: 3,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 24,
    grabCursor: !0,
    autoplay: { delay: 3000, disableOnInteraction: !1 },
    loop: 0,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 3, spaceBetween: 24 },
      768: { slidesPerView: 3, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 24 },
    },
  });
if (document.querySelectorAll(".swiper-1").length > 0)
  swiper = new Swiper(".swiper-1", {
    slidesPerView: 1,
    speed: 400,
    centeredSlides: !1,
    spaceBetween: 14,
    grabCursor: !0,
    autoplay: { delay: 3000, disableOnInteraction: !1 },
    loop: 0,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 1, spaceBetween: 14 },
      768: { slidesPerView: 1, spaceBetween: 14 },
      1024: { slidesPerView: 1, spaceBetween: 14 },
    },
  });
if (document.querySelectorAll(".swiper-mobile").length > 0)
  swiper = new Swiper(".swiper-mobile", {
    slidesPerView: 1.2,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 10,
    grabCursor: !0,
    autoplay: { delay: 6500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 1.2, spaceBetween: 10 },
      768: { slidesPerView: 1.2, spaceBetween: 10 },
      1024: { slidesPerView: 1.2, spaceBetween: 10 },
    },
  });
if (document.querySelectorAll(".swiper-mobile2").length > 0)
  swiper = new Swiper(".swiper-mobile2", {
    slidesPerView: 1.424,
    speed: 700,
    centeredSlides: !1,
    spaceBetween: 10,
    grabCursor: !0,
    autoplay: { delay: 6500, disableOnInteraction: !1 },
    loop: 1,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-f",
      prevEl: ".swiper-button-prev-f",
    },
    breakpoints: {
      640: { slidesPerView: 1.55, spaceBetween: 10 },
      768: { slidesPerView: 1.35, spaceBetween: 10 },
      1024: { slidesPerView: 1.424, spaceBetween: 10 },
    },
  });

if (document.querySelectorAll(".swiper-mobile3").length > 0)
  swiper = new Swiper(".swiper-mobile3", {
    slidesPerView: 1.15,
    speed: 400,
    centeredSlides: !1,
    spaceBetween: 10,
    grabCursor: !0,
    autoplay: { delay: 6500, disableOnInteraction: !1 },
    loop: 0,
    pagination: { el: ".swiper-pagination", clickable: !0 },
    navigation: {
      nextEl: ".swiper-button-next-ft",
      prevEl: ".swiper-button-prev-ft",
    },
    breakpoints: {
      640: { slidesPerView: 1.15, spaceBetween: 10 },
      768: { slidesPerView: 1.15, spaceBetween: 10 },
      1024: { slidesPerView: 1.15, spaceBetween: 10 },
    },
  });
const headerMenu = document.querySelector(".header-menu");
const headerMenuClose = document.querySelector(".header-menu-close");
const bars3 = document.querySelector(".bars3");

if (window.innerWidth >= 1034) {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.visibility = "hidden";
    headerMenu.style.opacity = "0";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.visibility = "visible";
    headerMenu.style.opacity = "1";
  });
} else {
  headerMenuClose.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(1024px)";
    document.querySelector("body").style.overflow = "";
  });
  bars3.addEventListener("click", function () {
    headerMenu.style.transform = "translateX(0)";
    document.querySelector("body").style.overflow = "hidden";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const toggleDropdowns = document.querySelectorAll(".toggle-dropdown");
  const dropdownIcons = document.querySelectorAll(".dropdown-icon");

  toggleDropdowns.forEach((toggle, index) => {
    const submenu = toggle.nextElementSibling;
    const dropdownIcon = dropdownIcons[index];

    toggle.addEventListener("click", function () {
      dropdownIcon.classList.toggle("rotate-180");

      if (submenu.style.maxHeight) {
        submenu.style.maxHeight = null;
        submenu.style.opacity = "0";
      } else {
        submenu.style.maxHeight = submenu.scrollHeight * 30 + "px";
        submenu.style.opacity = "1";
      }
    });
  });
});

const DropDownInFooter = document.querySelectorAll(".footer-dropDown");
DropDownInFooter.forEach((el) => {
  el.addEventListener("click", () => {
    el.querySelector("button").classList.toggle("rotate-180");
    el.querySelector(".drop-down-list").classList.toggle("h-0");
    el.querySelector(".drop-down-list").classList.toggle("opacity-0");
    el.querySelector(".drop-down-list").classList.toggle("overflow-hidden");
  });
});
// ____________________
document.addEventListener("DOMContentLoaded", function () {
  const headerB = document.querySelector("header");

  if (!headerB) return;
  headerB.style.borderBottom = "1px solid var(--secondary-200)";
  window.addEventListener("scroll", function () {
    if (window.innerWidth < 1000) {
      if (window.scrollY >= 800) {
        headerB.style.position = "fixed";
      } else {
        headerB.style.position = "";
      }
    }
  });
});
// _____________________________________
// _____________________________________
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll(".see-more-section");
  const cardsPerClick = 8;

  sections.forEach((section) => {
    const button = section.nextElementSibling;
    if (!button || !button.classList.contains("see-more-btn")) return;

    const cards = section.querySelectorAll(".group");
    let currentVisible = cardsPerClick;

    // نمایش ۸ کارت اول، بقیه مخفی با !important
    cards.forEach((card, index) => {
      if (index < cardsPerClick) {
        card.style.removeProperty("display");
      } else {
        card.style.setProperty("display", "none", "important");
      }
    });

    // اگر کمتر از ۸ کارت بود، دکمه رو مخفی کن
    if (cards.length <= cardsPerClick) {
      button.style.setProperty("display", "none", "important");
      return;
    }

    button.addEventListener("click", function () {
      const nextVisible = currentVisible + cardsPerClick;

      cards.forEach((card, index) => {
        if (index < nextVisible) {
          card.style.removeProperty("display");
        }
      });

      currentVisible = nextVisible;

      if (currentVisible >= cards.length) {
        button.style.setProperty("display", "none", "important");
      }
    });
  });
});

// _____________________________________
// _____________________________________
function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    // روش مدرن
    navigator.clipboard
      .writeText(text)
      .then(() => {
        showAlert(); // تابعی که کلاس اکتیو رو اضافه می‌کنه
      })
      .catch((err) => {
        console.error("خطا در کپی با Clipboard API:", err);
      });
  } else {
    // روش قدیمی
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "absolute";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      showAlert();
    } catch (err) {
      console.error("کپی کردن ناموفق بود:", err);
    }
    document.body.removeChild(textarea);
  }
}

function showAlert() {
  const alertEl = document.querySelector(".alert");
  if (alertEl) {
    alertEl.classList.add("active");
    setTimeout(() => {
      alertEl.classList.remove("active");
    }, 12000);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const shareBtn = document.querySelector(".share-Articles");
  if (shareBtn) {
    shareBtn.addEventListener("click", function () {
      const currentUrl = window.location.href;
      copyToClipboard(currentUrl);
    });
  }
});

// _____________________________________
// _____________________________________
// _____________________________________
// _____________________________________
document.addEventListener("DOMContentLoaded", function () {
  const currentUrl = encodeURIComponent(window.location.href);

  const shareTelegram = document.getElementById("share-telegram");
  const shareFacebook = document.getElementById("share-facebook");
  const shareTwitter = document.getElementById("share-twitter");

  // تلگرام
  if (shareTelegram) {
    shareTelegram.setAttribute(
      "href",
      `https://t.me/share/url?url=${currentUrl}`
    );
    shareTelegram.setAttribute("target", "_blank");
  }

  // فیسبوک
  if (shareFacebook) {
    shareFacebook.setAttribute(
      "href",
      `https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`
    );
    shareFacebook.setAttribute("target", "_blank");
  }

  // توییتر (X)
  if (shareTwitter) {
    shareTwitter.setAttribute(
      "href",
      `https://twitter.com/intent/tweet?url=${currentUrl}`
    );
    shareTwitter.setAttribute("target", "_blank");
  }
});

// _____________________________________
// _____________________________________
// _____________________________________
// _____________________________________
// _____________________________________
// _____________________________________
// _____________________________________
// _____________________________________
// _____________________________________
const filteringBox = document.querySelectorAll(".filter-box");
if (filteringBox.length > 0) {
  filteringBox.forEach((el) => {
    el.addEventListener("click", () => {
      el.querySelector("ul").classList.toggle("hidden");
    });
    const li = el.querySelectorAll("li");
    li.forEach((item) => {
      item.addEventListener("click", () => {
        el.querySelector("span").innerText = item.innerText;
      });
    });
  });
}
// _____________________________________
const desktopFilter = document.querySelectorAll(".desktop-filter");
desktopFilter.forEach((el) => {
  el.querySelector(".open").addEventListener("click", () => {
    el.querySelector("ul").classList.toggle("w-0");
    el.querySelector("ul").classList.toggle("overflow-hidden");
    el.querySelector("ul").classList.toggle("opacity-0");
  });
});
// _____________________________________
// _____________________________________
const clickerUl = document.querySelectorAll("ul.clicker-list");
clickerUl.forEach((el) => {
  const liItem = el.querySelectorAll("li");
  liItem[0].classList.add("active");
  liItem.forEach((li) => {
    li.addEventListener("click", () => {
      liItem.forEach((element) => {
        element.classList.remove("active");
      });
      li.classList.add("active");
    });
  });
});
// ___________________________________________
// ___________________________________________
// ___________________________________________
// ___________________________________________
// ___________________________________________
// ___________________________________________
// ___________________________________________
function watchAllFlightCards() {
  const seenCards = new WeakSet();

  function handleCard(card) {
    if (seenCards.has(card)) return;
    seenCards.add(card);

    card.addEventListener("click", () => {
      card.style.backgroundColor = "blue";
    });
  }

  function logNewCards(cards) {
    cards.forEach((card) => handleCard(card));
  }

  // کارت‌های اولیه
  const initialCards = document.querySelectorAll(".flight-card");
  logNewCards(initialCards);

  // کارت‌های داینامیک
  const observer = new MutationObserver((mutationsList) => {
    for (const mutation of mutationsList) {
      for (const node of mutation.addedNodes) {
        if (!(node instanceof HTMLElement)) continue;

        if (node.classList.contains("flight-card")) {
          logNewCards([node]);
        }

        const nested = node.querySelectorAll?.(".flight-card") || [];
        logNewCards(nested);
      }
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}

// ___________________________________________
// ___________________________________________
// ___________________________________________
// ___________________________________________
// ___________________________________________
document.querySelector(".mobile-login").addEventListener("click", () => {
  if (document.querySelector(".Login-information .btnstyle")) {
    document.querySelector(".Login-information .btnstyle").click();
  }
});
// _________________________
// _________________________
// _________________________
function flightCard() {
  var tCard = document.querySelectorAll(".flight-card");
  tCard.forEach((card) => {
    card.addEventListener("click", () => {
      const dpCity = card.querySelector(".dep-name").innerText,
        dpId = card.querySelector(".dep-id").innerText,
        rtCity = card.querySelector(".des-name").innerText,
        rtId = card.querySelector(".des-id").innerText;
      const liBtns = document.querySelectorAll(".reservation-item li");
      liBtns.forEach((li) => {
        if (!li.classList.contains("flight-btn")) {
          li.classList.remove("active-module");
        } else {
          li.classList.add("active-module");
        }
      });
      document.querySelector("#r-hotel").classList.add("hidden");
      document.querySelector("#r-flight").classList.remove("hidden");
      document.querySelector("#r-flighthotel").classList.add("hidden");
      document.querySelector("#r-cip").classList.add("hidden");
      document.querySelector("#r-tour").classList.add("hidden");
      document.querySelector(
        ".r-flight .flight-routes .departure.text-value"
      ).value = dpCity;
      document.querySelector(
        ".r-flight .flight-routes .locationId.from"
      ).value = dpId;
      document.querySelector(
        ".r-flight .flight-routes .destination.text-value"
      ).value = rtCity;
      document.querySelector(".r-flight .flight-routes .locationId.to").value =
        rtId;
      var main = document.querySelector("main");
      main && window.scrollTo({ top: main.offsetTop + 50, behavior: "smooth" });
    });
  });
}
// _________________________
// _________________________
// _________________________

document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-destination"),
    t = document.querySelectorAll(".destination-li");

  if (e) {
    async function n(t = 215766) {
      e.innerHTML =
        '<div class="w-full flex p-6 justify-center items-center"><span class="loader"></span></div>';
      try {
        let n = await fetch(`/destination-load-items.bc?catid=${t}`);
        if (!n.ok) throw Error(`HTTP error! Status: ${n.status}`);
        let o = await n.text();
        (e.innerHTML = o),
          window.destinationSwiper && window.destinationSwiper.destroy(!0, !0),
          (window.destinationSwiper = new Swiper(
            "#destination-list-container",
            {
              slidesPerView: 4.26,
              speed: 300,
              centeredSlides: !1,
              spaceBetween: 16,
              grabCursor: !0,
              autoplay: { delay: 3500, disableOnInteraction: !1 },
              pagination: { el: ".swiper-pagination", clickable: !0 },
              navigation: {
                nextEl: ".swiper-button-next-fl",
                prevEl: ".swiper-button-prev-fl",
              },
              breakpoints: {
                640: { slidesPerView: 1.3, spaceBetween: 20 },
                768: { slidesPerView: 4.26, spaceBetween: 16 },
                1024: { slidesPerView: 4.26, spaceBetween: 16 },
              },
            }
          ));
        flightCard();
      } catch (t) {
        console.error("Fetch failed:", t),
          (e.innerHTML = `<p>Error loading data: ${t.message}</p>`);
      }
    }
    n(),
      t.forEach((e) => {
        e.addEventListener("click", function () {
          t.forEach((e) => {
            (e.style.backgroundColor = ""), (e.style.color = "");
          }),
            n(e.getAttribute("data-id"));
        });
      });
  }
});
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-hotel"),
    t = document.querySelectorAll(".hotel-li");

  if (e) {
    async function n(t = 215860) {
      e.innerHTML =
        '<div class="w-full flex p-6 justify-center items-center"><span class="loader"></span></div>';
      try {
        let n = await fetch(`/hotel-load-items.bc?catid=${t}`);
        if (!n.ok) throw Error(`HTTP error! Status: ${n.status}`);
        let o = await n.text();
        (e.innerHTML = o),
          window.hotelSwiper && window.hotelSwiper.destroy(!0, !0),
          (window.hotelSwiper = new Swiper("#hotel-list-container", {
            slidesPerView: 4.26,
            speed: 300,
            centeredSlides: !1,
            spaceBetween: 16,
            grabCursor: !0,
            autoplay: { delay: 3500, disableOnInteraction: !1 },
            pagination: { el: ".swiper-pagination", clickable: !0 },
            navigation: {
              nextEl: ".swiper-button-next-fl",
              prevEl: ".swiper-button-prev-fl",
            },
            breakpoints: {
              640: { slidesPerView: 1.3, spaceBetween: 20 },
              768: { slidesPerView: 4.26, spaceBetween: 16 },
              1024: { slidesPerView: 4.26, spaceBetween: 16 },
            },
          }));
      } catch (t) {
        console.error("Fetch failed:", t),
          (e.innerHTML = `<p>Error loading data: ${t.message}</p>`);
      }
    }
    n(),
      t.forEach((e) => {
        e.addEventListener("click", function () {
          t.forEach((e) => {
            (e.style.backgroundColor = ""), (e.style.color = "");
          }),
            n(e.getAttribute("data-id"));
        });
      });
  }
});

// _________________________
// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-tour"),
    t = document.querySelectorAll(".tour-li");

  if (e) {
    async function n(t = 215880) {
      e.innerHTML =
        '<div class="w-full flex justify-center p-6"><span class="loader"></span></div>';
      try {
        let n = await fetch(`/tour-load-items.bc?catid=${t}`);
        if (!n.ok) throw Error(`HTTP error! Status: ${n.status}`);
        let o = await n.text();
        (e.innerHTML = o),
          window.tourSwiper && window.tourSwiper.destroy(!0, !0),
          (window.tourSwiper = new Swiper("#tour-list-container", {
            slidesPerView: 3.85,
            speed: 500,
            centeredSlides: !1,
            spaceBetween: 16,
            grabCursor: !0,
            autoplay: { delay: 9500, disableOnInteraction: !1 },
            pagination: { el: ".swiper-pagination", clickable: !0 },
            navigation: {
              nextEl: ".swiper-button-next-ft",
              prevEl: ".swiper-button-prev-ft",
            },
            breakpoints: {
              640: { slidesPerView: 3.85, spaceBetween: 16 },
              768: { slidesPerView: 3.85, spaceBetween: 16 },
              1024: { slidesPerView: 3.85, spaceBetween: 16 },
            },
          }));
      } catch (t) {
        console.error("Fetch failed:", t),
          (e.innerHTML = `<p>Error loading data: ${t.message}</p>`);
      }
    }
    n(),
      t.forEach((e) => {
        e.addEventListener("click", function () {
          t.forEach((e) => {
            (e.style.backgroundColor = ""), (e.style.color = "");
          }),
            n(e.getAttribute("data-id"));
        });
      });
  }
});
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-tour2"),
    t = document.querySelectorAll(".tour2-li");

  if (e) {
    async function n(t = 215757) {
      e.innerHTML =
        '<div class="w-full flex justify-center p-6"><span class="loader"></span></div>';
      try {
        let n = await fetch(`/tour-load-items.bc?catid=${t}`);
        if (!n.ok) throw Error(`HTTP error! Status: ${n.status}`);
        let o = await n.text();
        (e.innerHTML = o),
          window.tour2Swiper && window.tour2Swiper.destroy(!0, !0),
          (window.tour2Swiper = new Swiper("#tour2-list-container", {
            slidesPerView: 3.85,
            speed: 500,
            centeredSlides: !1,
            spaceBetween: 16,
            grabCursor: !0,
            autoplay: { delay: 9500, disableOnInteraction: !1 },
            pagination: { el: ".swiper-pagination", clickable: !0 },
            navigation: {
              nextEl: ".swiper-button-next-ft",
              prevEl: ".swiper-button-prev-ft",
            },
            breakpoints: {
              640: { slidesPerView: 3.85, spaceBetween: 16 },
              768: { slidesPerView: 3.85, spaceBetween: 16 },
              1024: { slidesPerView: 3.85, spaceBetween: 16 },
            },
          }));
      } catch (t) {
        console.error("Fetch failed:", t),
          (e.innerHTML = `<p>Error loading data: ${t.message}</p>`);
      }
    }
    n(),
      t.forEach((e) => {
        e.addEventListener("click", function () {
          t.forEach((e) => {
            (e.style.backgroundColor = ""), (e.style.color = "");
          }),
            n(e.getAttribute("data-id"));
        });
      });
  }
});

// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-faq"),
    t = document.querySelectorAll(".faq-li");

  if (t.length >= 1) {
    t[0].classList.add("tst");
    let n = t[0].getAttribute("data-id");
    if (e) {
      (async function () {
        let t = await fetch(`/faq-load-items.bc?id=${n}`),
          c = await t.text();

        e.innerHTML = c;
        for (
          var r = document
              .querySelector(".fetch-content-faq")
              .getElementsByTagName("script"),
            a = 0;
          a < r.length;
          a++
        ) {
          var o = document.createElement("script");
          r[a].src
            ? ((o.src = r[a].src), (o.async = !1))
            : (o.text = r[a].textContent),
            document.head.appendChild(o).parentNode.removeChild(o);
        }
      })(),
        t.forEach((n) => {
          n.addEventListener("click", function () {
            t.forEach((e) => {
              (e.style.backgroundColor = ""), (e.style.color = "");
              e.classList.remove("tst");
            }),
              (document.querySelector(
                ".fetch-content-faq"
              ).innerHTML = `<div class="w-full flex justify-center items-center p-6"><span class="loader"></span></div>`),
              (n.style.backgroundColor = "");
            n.classList.add("active");

            let c = n.getAttribute("data-id");
            !(async function () {
              try {
                let a = await fetch(`/faq-load-items.bc?id=${c}`);
                if (!a.ok) throw Error(`HTTP error! Status: ${a.status}`);
                let o = await a.text();

                e.innerHTML = o;
                for (
                  var t = document
                      .querySelector(".fetch-content-faq")
                      .getElementsByTagName("script"),
                    n = 0;
                  n < t.length;
                  n++
                ) {
                  var r = document.createElement("script");
                  t[n].src
                    ? ((r.src = t[n].src), (r.async = !1))
                    : (r.text = t[n].textContent),
                    document.head.appendChild(r).parentNode.removeChild(r);
                }
              } catch (t) {
                e.innerHTML = "<p>an error occured: " + t.message + "</p>";
              }
            })();
          });
        });
    }
  }
});
// _________________________
// _________________________
// _________________________
// _________________________
// ________________________________________________
// ________________________________________________
// ________________________________________________
// ________________________________________________
// _________________________________________________
function handleCommonQS(container) {
  const boxes = container.querySelectorAll(".box");

  boxes.forEach((box) => {
    const counter = box.querySelector(".counter");
    if (counter) {
      let current = parseInt(counter.textContent.trim());
      if (!isNaN(current) && current > 0) {
        counter.textContent = current - 1;
      }
    }

    box.addEventListener("click", () => {
      box.classList.toggle("active");
    });

    document.addEventListener("click", (e) => {
      if (!box.contains(e.target)) {
        box.classList.remove("active");
      }
    });
  });
}

document.querySelectorAll(".common-qs").forEach(handleCommonQS);

const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    mutation.addedNodes.forEach((node) => {
      if (node.nodeType === 1) {
        if (node.classList.contains("common-qs")) {
          handleCommonQS(node);
        }

        const insideCommonQS = node.querySelectorAll?.(".common-qs");
        if (insideCommonQS?.length) {
          insideCommonQS.forEach(handleCommonQS);
        }
      }
    });
  });
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
});

// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-destinationmob"),
    t = document.querySelectorAll(".destinatrionmob-li");

  if (e) {
    async function n(t = 215766) {
      e.innerHTML =
        '<div class="w-full flex p-6 justify-center items-center"><span class="loader"></span></div>';
      try {
        let n = await fetch(`/destination-load-items.bc?catid=${t}`);
        if (!n.ok) throw Error(`HTTP error! Status: ${n.status}`);
        let o = await n.text();
        (e.innerHTML = o),
          window.destinationmobSwiper &&
            window.destinationmobSwiper.destroy(!0, !0),
          (window.destinationmobSwiper = new Swiper(
            "#destinationmob-list-container",
            {
              slidesPerView: 1.24,
              speed: 300,
              centeredSlides: !1,
              spaceBetween: 16,
              grabCursor: !0,
              autoplay: { delay: 3500, disableOnInteraction: !1 },
              pagination: { el: ".swiper-pagination", clickable: !0 },
              navigation: {
                nextEl: ".swiper-button-next-fl",
                prevEl: ".swiper-button-prev-fl",
              },
              breakpoints: {
                640: { slidesPerView: 1.24, spaceBetween: 16 },
                768: { slidesPerView: 1.24, spaceBetween: 16 },
                1024: { slidesPerView: 1.24, spaceBetween: 16 },
              },
            }
          ));
        flightCard();
      } catch (t) {
        console.error("Fetch failed:", t),
          (e.innerHTML = `<p>Error loading data: ${t.message}</p>`);
      }
    }
    n(),
      t.forEach((e) => {
        e.addEventListener("click", function () {
          t.forEach((e) => {
            (e.style.backgroundColor = ""), (e.style.color = "");
          }),
            n(e.getAttribute("data-id"));
        });
      });
  }
});

// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-hotelmob"),
    t = document.querySelectorAll(".hotelmob-li");

  if (e) {
    async function n(t = 215860) {
      e.innerHTML =
        '<div class="w-full flex p-6 justify-center items-center"><span class="loader"></span></div>';
      try {
        let n = await fetch(`/hotel-load-items.bc?catid=${t}`);
        if (!n.ok) throw Error(`HTTP error! Status: ${n.status}`);
        let o = await n.text();
        (e.innerHTML = o),
          window.hotelmobSwiper && window.hotelmobSwiper.destroy(!0, !0),
          (window.hotelmobSwiper = new Swiper("#hotelmob-list-container", {
            slidesPerView: 1.24,
            speed: 300,
            centeredSlides: !1,
            spaceBetween: 16,
            grabCursor: !0,
            autoplay: { delay: 3500, disableOnInteraction: !1 },
            pagination: { el: ".swiper-pagination", clickable: !0 },
            navigation: {
              nextEl: ".swiper-button-next-fl",
              prevEl: ".swiper-button-prev-fl",
            },
            breakpoints: {
              640: { slidesPerView: 1.24, spaceBetween: 16 },
              768: { slidesPerView: 1.24, spaceBetween: 16 },
              1024: { slidesPerView: 1.24, spaceBetween: 16 },
            },
          }));
      } catch (t) {
        console.error("Fetch failed:", t),
          (e.innerHTML = `<p>Error loading data: ${t.message}</p>`);
      }
    }
    n(),
      t.forEach((e) => {
        e.addEventListener("click", function () {
          t.forEach((e) => {
            (e.style.backgroundColor = ""), (e.style.color = "");
          }),
            n(e.getAttribute("data-id"));
        });
      });
  }
});

// _________________________
// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-tourmob"),
    t = document.querySelectorAll(".tourmob-li");

  if (e) {
    async function n(t = 215880) {
      e.innerHTML =
        '<div class="w-full flex justify-center p-6"><span class="loader"></span></div>';
      try {
        let n = await fetch(`/tour-load-items.bc?catid=${t}`);
        if (!n.ok) throw Error(`HTTP error! Status: ${n.status}`);
        let o = await n.text();
        (e.innerHTML = o),
          window.tourmobSwiper && window.tourmobSwiper.destroy(!0, !0),
          (window.tourmobSwiper = new Swiper("#tourmob-list-container", {
            slidesPerView: 1.15,
            speed: 500,
            centeredSlides: !1,
            spaceBetween: 10,
            grabCursor: !0,
            autoplay: { delay: 9500, disableOnInteraction: !1 },
            pagination: { el: ".swiper-pagination", clickable: !0 },
            navigation: {
              nextEl: ".swiper-button-next-ft",
              prevEl: ".swiper-button-prev-ft",
            },
            breakpoints: {
              640: { slidesPerView: 1.15, spaceBetween: 10 },
              768: { slidesPerView: 1.15, spaceBetween: 10 },
              1024: { slidesPerView: 1.15, spaceBetween: 10 },
            },
          }));
      } catch (t) {
        console.error("Fetch failed:", t),
          (e.innerHTML = `<p>Error loading data: ${t.message}</p>`);
      }
    }
    n(),
      t.forEach((e) => {
        e.addEventListener("click", function () {
          t.forEach((e) => {
            (e.style.backgroundColor = ""), (e.style.color = "");
          }),
            n(e.getAttribute("data-id"));
        });
      });
  }
});

// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-tourFmob"),
    t = document.querySelectorAll(".tourFmob-li");

  if (e) {
    async function n(t = 215757) {
      e.innerHTML =
        '<div class="w-full flex justify-center p-6"><span class="loader"></span></div>';
      try {
        let n = await fetch(`/tour-load-items.bc?catid=${t}`);
        if (!n.ok) throw Error(`HTTP error! Status: ${n.status}`);
        let o = await n.text();
        (e.innerHTML = o),
          window.tourFmobSwiper && window.tourFmobSwiper.destroy(!0, !0),
          (window.tourFmobSwiper = new Swiper("#tourFmob-list-container", {
            slidesPerView: 1.15,
            speed: 500,
            centeredSlides: !1,
            spaceBetween: 10,
            grabCursor: !0,
            autoplay: { delay: 9500, disableOnInteraction: !1 },
            pagination: { el: ".swiper-pagination", clickable: !0 },
            navigation: {
              nextEl: ".swiper-button-next-ft",
              prevEl: ".swiper-button-prev-ft",
            },
            breakpoints: {
              640: { slidesPerView: 1.15, spaceBetween: 10 },
              768: { slidesPerView: 1.15, spaceBetween: 10 },
              1024: { slidesPerView: 1.15, spaceBetween: 10 },
            },
          }));
      } catch (t) {
        console.error("Fetch failed:", t),
          (e.innerHTML = `<p>Error loading data: ${t.message}</p>`);
      }
    }
    n(),
      t.forEach((e) => {
        e.addEventListener("click", function () {
          t.forEach((e) => {
            (e.style.backgroundColor = ""), (e.style.color = "");
          }),
            n(e.getAttribute("data-id"));
        });
      });
  }
});

// _________________________
// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-flights"),
    t = document.querySelectorAll(".flights-li");

  if (t.length >= 1) {
    t[0].classList.add("tst");
    let n = t[0].getAttribute("data-id");
    if (e) {
      (async function () {
        let t = await fetch(`/flights-load-items.bc?catid=${n}`),
          c = await t.text();

        e.innerHTML = c;
        for (
          var r = document
              .querySelector(".fetch-content-flights")
              .getElementsByTagName("script"),
            a = 0;
          a < r.length;
          a++
        ) {
          var o = document.createElement("script");
          r[a].src
            ? ((o.src = r[a].src), (o.async = !1))
            : (o.text = r[a].textContent),
            document.head.appendChild(o).parentNode.removeChild(o);
        }
      })(),
        t.forEach((n) => {
          n.addEventListener("click", function () {
            t.forEach((e) => {
              (e.style.backgroundColor = ""), (e.style.color = "");
              e.classList.remove("tst");
            }),
              (document.querySelector(
                ".fetch-content-flights"
              ).innerHTML = `<div class="w-full flex justify-center items-center p-6"><span class="loader"></span></div>`),
              (n.style.backgroundColor = "");
            n.classList.add("tst");

            let c = n.getAttribute("data-id");
            !(async function () {
              try {
                let a = await fetch(`/flights-load-items.bc?catid=${c}`);
                if (!a.ok) throw Error(`HTTP error! Status: ${a.status}`);
                let o = await a.text();

                e.innerHTML = o;
                for (
                  var t = document
                      .querySelector(".fetch-content-flights")
                      .getElementsByTagName("script"),
                    n = 0;
                  n < t.length;
                  n++
                ) {
                  var r = document.createElement("script");
                  t[n].src
                    ? ((r.src = t[n].src), (r.async = !1))
                    : (r.text = t[n].textContent),
                    document.head.appendChild(r).parentNode.removeChild(r);
                }
              } catch (t) {
                e.innerHTML = "<p>an error occured: " + t.message + "</p>";
              }
            })();
          });
        });
    }
  }
});
// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-flighthotel"),
    t = document.querySelectorAll(".flighthotel-li");

  if (t.length >= 1) {
    t[0].classList.add("tst");
    let n = t[0].getAttribute("data-id");
    if (e) {
      (async function () {
        let t = await fetch(`/flightHotel-load-items.bc?catid=${n}`),
          c = await t.text();

        e.innerHTML = c;
        for (
          var r = document
              .querySelector(".fetch-content-flighthotel")
              .getElementsByTagName("script"),
            a = 0;
          a < r.length;
          a++
        ) {
          var o = document.createElement("script");
          r[a].src
            ? ((o.src = r[a].src), (o.async = !1))
            : (o.text = r[a].textContent),
            document.head.appendChild(o).parentNode.removeChild(o);
        }
      })(),
        t.forEach((n) => {
          n.addEventListener("click", function () {
            t.forEach((e) => {
              (e.style.backgroundColor = ""), (e.style.color = "");
              e.classList.remove("tst");
            }),
              (document.querySelector(
                ".fetch-content-flighthotel"
              ).innerHTML = `<div class="w-full flex justify-center items-center p-6"><span class="loader"></span></div>`),
              (n.style.backgroundColor = "");
            n.classList.add("tst");

            let c = n.getAttribute("data-id");
            !(async function () {
              try {
                let a = await fetch(`/flightHotel-load-items.bc?catid=${c}`);
                if (!a.ok) throw Error(`HTTP error! Status: ${a.status}`);
                let o = await a.text();

                e.innerHTML = o;
                for (
                  var t = document
                      .querySelector(".fetch-content-flighthotel")
                      .getElementsByTagName("script"),
                    n = 0;
                  n < t.length;
                  n++
                ) {
                  var r = document.createElement("script");
                  t[n].src
                    ? ((r.src = t[n].src), (r.async = !1))
                    : (r.text = t[n].textContent),
                    document.head.appendChild(r).parentNode.removeChild(r);
                }
              } catch (t) {
                e.innerHTML = "<p>an error occured: " + t.message + "</p>";
              }
            })();
          });
        });
    }
  }
});
// _________________________
// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-hotelList"),
    t = document.querySelectorAll(".hotelList-li");

  if (t.length >= 1) {
    t[0].classList.add("tst");
    let n = t[0].getAttribute("data-id");
    if (e) {
      (async function () {
        let t = await fetch(`/hotelList-load-items.bc?catid=${n}`),
          c = await t.text();

        e.innerHTML = c;
        for (
          var r = document
              .querySelector(".fetch-content-hotelList")
              .getElementsByTagName("script"),
            a = 0;
          a < r.length;
          a++
        ) {
          var o = document.createElement("script");
          r[a].src
            ? ((o.src = r[a].src), (o.async = !1))
            : (o.text = r[a].textContent),
            document.head.appendChild(o).parentNode.removeChild(o);
        }
      })(),
        t.forEach((n) => {
          n.addEventListener("click", function () {
            t.forEach((e) => {
              (e.style.backgroundColor = ""), (e.style.color = "");
              e.classList.remove("tst");
            }),
              (document.querySelector(
                ".fetch-content-hotelList"
              ).innerHTML = `<div class="w-full flex justify-center items-center p-6"><span class="loader"></span></div>`),
              (n.style.backgroundColor = "");
            n.classList.add("tst");

            let c = n.getAttribute("data-id");
            !(async function () {
              try {
                let a = await fetch(`/hotelList-load-items.bc?catid=${c}`);
                if (!a.ok) throw Error(`HTTP error! Status: ${a.status}`);
                let o = await a.text();

                e.innerHTML = o;
                for (
                  var t = document
                      .querySelector(".fetch-content-hotelList")
                      .getElementsByTagName("script"),
                    n = 0;
                  n < t.length;
                  n++
                ) {
                  var r = document.createElement("script");
                  t[n].src
                    ? ((r.src = t[n].src), (r.async = !1))
                    : (r.text = t[n].textContent),
                    document.head.appendChild(r).parentNode.removeChild(r);
                }
              } catch (t) {
                e.innerHTML = "<p>an error occured: " + t.message + "</p>";
              }
            })();
          });
        });
    }
  }
});
// _________________________
// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", () => {
  const el = document.querySelector('.stay-for-data[data-id]');
  if (el) {
    const catId = el.getAttribute("data-id");

    fetch(`tourList-load-items.bc?catid=${catId}`)
      .then(res => res.text())
      .then(html => {
        el.innerHTML = html;
        applyFilters();
      })
      .catch(err => {
        console.error("خطا در گرفتن دیتا:", err);
      });
  }
});

// _________________________
// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-tourList"),
    t = document.querySelectorAll(".tourList-li"),
    filterItems = document.querySelectorAll(".filters-ul li"); // گرفتن همه لیست‌های فیلتر

  if (t.length >= 1) {
    t[0].classList.add("tst");
    let n = t[0].getAttribute("data-id");

    if (e) {
      (async function () {
        let t = await fetch(`/tourList-load-items.bc?catid=${n}`),
          c = await t.text();

        e.innerHTML = c;

        applyFilters();

        for (
          var r = document
              .querySelector(".fetch-content-tourList")
              .getElementsByTagName("script"),
            a = 0;
          a < r.length;
          a++
        ) {
          var o = document.createElement("script");
          r[a].src
            ? ((o.src = r[a].src), (o.async = !1))
            : (o.text = r[a].textContent),
            document.head.appendChild(o).parentNode.removeChild(o);
        }
      })();

      t.forEach((n) => {
        n.addEventListener("click", function () {
          t.forEach((e) => {
            (e.style.backgroundColor = ""), (e.style.color = "");
            e.classList.remove("tst");
          }),
            (document.querySelector(
              ".fetch-content-tourList"
            ).innerHTML = `<div class="w-full flex justify-center items-center p-6"><span class="loader"></span></div>`),
            (n.style.backgroundColor = "");
          n.classList.add("tst");

          let c = n.getAttribute("data-id");
          !(async function () {
            try {
              let a = await fetch(`/tourList-load-items.bc?catid=${c}`);
              if (!a.ok) throw Error(`HTTP error! Status: ${a.status}`);
              let o = await a.text();

              e.innerHTML = o;

              applyFilters();

              for (
                var t = document
                    .querySelector(".fetch-content-tourList")
                    .getElementsByTagName("script"),
                  n = 0;
                n < t.length;
                n++
              ) {
                var r = document.createElement("script");
                t[n].src
                  ? ((r.src = t[n].src), (r.async = !1))
                  : (r.text = t[n].textContent),
                  document.head.appendChild(r).parentNode.removeChild(r);
              }
            } catch (t) {
              e.innerHTML = "<p>an error occurred: " + t.message + "</p>";
            }
          })();
        });
      });
    }
  }

  // تابع برای اعمال فیلترها


  // تابع برای نمایش همه کارت‌ها
  function showAllCards() {
    let cards = document.querySelectorAll(".tour-card");
    cards.forEach((card) => {
      card.style.display = "flex";
    });

    const noResultsMessage = document.querySelector(".no-results-message");
    if (noResultsMessage) {
      noResultsMessage.remove();
    }

    const paging = document.getElementById("paging");
    paging.style.display = "flex";
  }
});

// _________________________
// _________________________
// _________________________
document.addEventListener("DOMContentLoaded", function () {
  let e = document.querySelector(".fetch-content-articles"),
    t = document.querySelectorAll(".articles-li");

  if (t.length >= 1) {
    t[0].classList.add("tst");
    let n = t[0].getAttribute("data-id");
    if (e) {
      (async function () {
        let t = await fetch(`/article-load-items.bc?catid=${n}`),
          c = await t.text();

        e.innerHTML = c;
        for (
          var r = document
              .querySelector(".fetch-content-articles")
              .getElementsByTagName("script"),
            a = 0;
          a < r.length;
          a++
        ) {
          var o = document.createElement("script");
          r[a].src
            ? ((o.src = r[a].src), (o.async = !1))
            : (o.text = r[a].textContent),
            document.head.appendChild(o).parentNode.removeChild(o);
        }
      })(),
        t.forEach((n) => {
          n.addEventListener("click", function () {
            t.forEach((e) => {
              (e.style.backgroundColor = ""), (e.style.color = "");
              e.classList.remove("tst");
            }),
              (document.querySelector(
                ".fetch-content-articles"
              ).innerHTML = `<div class="w-full flex justify-center items-center p-6"><span class="loader"></span></div>`),
              (n.style.backgroundColor = "");
            n.classList.add("tst");

            let c = n.getAttribute("data-id");
            !(async function () {
              try {
                let a = await fetch(`/article-load-items.bc?catid=${c}`);
                if (!a.ok) throw Error(`HTTP error! Status: ${a.status}`);
                let o = await a.text();

                e.innerHTML = o;
                for (
                  var t = document
                      .querySelector(".fetch-content-articles")
                      .getElementsByTagName("script"),
                    n = 0;
                  n < t.length;
                  n++
                ) {
                  var r = document.createElement("script");
                  t[n].src
                    ? ((r.src = t[n].src), (r.async = !1))
                    : (r.text = t[n].textContent),
                    document.head.appendChild(r).parentNode.removeChild(r);
                }
              } catch (t) {
                e.innerHTML = "<p>an error occured: " + t.message + "</p>";
              }
            })();
          });
        });
    }
  }
});
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
const elements = document.querySelectorAll(".Facilities-section .element");
const sections = document.querySelectorAll('.Facilities-section [id^="for"]');

if (sections.length >= 1) {
  elements.forEach((el, index) => {
    el.addEventListener("click", () => {
      elements.forEach((item) => item.classList.remove("active"));

      el.classList.add("active");

      sections.forEach((sec) => sec.classList.remove("active"));

      const targetSection = document.getElementById(`for${index + 1}`);
      if (targetSection) {
        targetSection.classList.add("active");
      }
    });
  });
}

// _________________________
// _________________________
// _________________________
if (document.querySelector(".no-element-has-found")) {
  document.querySelector(".fetch-content-tourList").classList.add("hidden");
}
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
// _________________________
