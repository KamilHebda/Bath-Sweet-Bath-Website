let toggleBtn;
let navbarMenu;
let aboutUsBtn;
let aboutUsItem;
let bathBombsBtn;
let bathBombsItem;
let ourProductsBtn;
let ourProductsItem;
let contactBtn;
let contactItem;
let toTopBtn;
let username;
let email;
let contactMessage;
let sendBtn;
let popup;
let closeBtn;
let headerItem;
let navItem;
let contactSloganItem;
let contactItems;
let socials;
let footer;

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
};

const prepareDOMElements = () => {
  toggleBtn = document.querySelector(".toggle-btn");
  navbarMenu = document.querySelector(".navbar__menu");
  aboutUsBtn = document.querySelector(".about_us_section");
  aboutUsItem = document.querySelector(".about-us");
  bathBombsBtn = document.querySelector(".bath_bombs_section");
  bathBombsItem = document.querySelector(".bath-bombs");
  ourProductsBtn = document.querySelector(".our_products_section");
  ourProductsItem = document.querySelector(".our-products");
  contactBtn = document.querySelector(".contact_section");
  contactItem = document.querySelector(".contact");
  toTopBtn = document.querySelector(".to-top");
  username = document.querySelector("#username");
  email = document.querySelector("#email");
  contactMessage = document.querySelector("#contact__message");
  sendBtn = document.querySelector(".contact__btn--submit");
  popup = document.querySelector(".contact__popup");
  closeBtn = document.querySelector(".contact__btn--close");
  headerItem = document.querySelector(".banner");
  navItem = document.querySelector(".navbar");
  contactSloganItem = document.querySelector(".contact__slogan");
  socialsItems = document.querySelector(".socials");
  footerItem = document.querySelector("footer");
};

const prepareDOMEvents = () => {
  window.addEventListener("load", slider);
  toggleBtn.addEventListener("click", hamburgerMenu);
  aboutUsBtn.addEventListener("click", toAboutUs);
  bathBombsBtn.addEventListener("click", toBathBombs);
  ourProductsBtn.addEventListener("click", toOurProducts);
  contactBtn.addEventListener("click", toContact);
  window.addEventListener("scroll", toTop);
  sendBtn.addEventListener("click", (e) => {
    e.preventDefault();

    checkName(username);
    checkLength(username, 50);
    checkMail(email);
    checkLength(email, 50);
    checkMessage(contactMessage);
    checkLength(contactMessage, 3000);
    checkErrors();
    sendemail();
  });

  closeBtn.addEventListener("click", (e) => {
    e.preventDefault();

    closePopup();
  });
};

const slider = () => {
  const slides = document.querySelectorAll(".about-us__carousel-item");
  let addActive = (slide) => {
    slide.classList.toggle("active");
  };

  addActive(slides[0]);

  setInterval(() => {
    for (let i = 0; i < slides.length; i++) {
      if (i + 1 === slides.length) {
        addActive(slides[0]);
        setTimeout(addActive, 350, slides[i]);
      } else if (slides[i].classList.contains("active")) {
        setTimeout(addActive, 350, slides[i]);
        addActive(slides[i + 1]);
        return;
      }
    }
  }, 4000);
};

const hamburgerMenu = () => {
  navbarMenu.classList.toggle("active");
};

const toAboutUs = () => {
  aboutUsItem.scrollIntoView({ behavior: "smooth" });
};

const toBathBombs = () => {
  bathBombsItem.scrollIntoView({ behavior: "smooth" });
};

const toOurProducts = () => {
  ourProductsItem.scrollIntoView({ behavior: "smooth" });
};

const toContact = () => {
  contactItem.scrollIntoView({ behavior: "smooth" });
};

const toTop = () => {
  if (window.pageYOffset > 100) {
    toTopBtn.classList.add("active");
  } else {
    toTopBtn.classList.remove("active");
  }
};

const showError = (input, msg) => {
  const contactItems = input.parentElement;
  const errorMsg = contactItems.querySelector(".error-text");

  contactItems.classList.add("error");
  errorMsg.textContent = msg;
};

const clearError = (input) => {
  const contactItems = input.parentElement;
  contactItems.classList.remove("error");
};

const checkName = (username) => {
  const re = /^[a-zA-Z][a-zA-Z .,'-]*$/im;

  if (re.test(username.value)) {
    clearError(username);
  } else if (username.value === "") {
    showError(username, "Pole nie może być puste");
  } else {
    showError(username, "Błędne imię");
  }
};

const checkMail = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (re.test(email.value)) {
    clearError(email);
  } else if (email.value === "") {
    showError(email, "Pole nie może być puste");
  } else {
    showError(email, "Błędny adres e-mail");
  }
};

const checkMessage = (contactMessage) => {
  if (contactMessage.value === "") {
    showError(contactMessage, "Zostaw Nam wiadomość");
  } else {
    clearError(contactMessage);
  }
};

const checkLength = (input, max) => {
  if (input.value.length > max) {
    showError(input, `Dopuszczalne jest maksymalnie ${max} znaków`);
  }
};

const checkErrors = () => {
  const allInputs = document.querySelectorAll(".contact__items");
  let errorCount = 0;

  allInputs.forEach((el) => {
    if (el.classList.contains("error")) {
      errorCount++;
    }
  });

  if (errorCount === 0) {
    popup.classList.add("contact__popup--show");

    aboutUsItem.classList.add("blur");
    bathBombsItem.classList.add("blur");
    ourProductsItem.classList.add("blur");
    headerItem.classList.add("blur");
    navItem.classList.add("blur");
    contactSloganItem.classList.add("blur");
    username.parentElement.classList.add("blur");
    email.parentElement.classList.add("blur");
    contactMessage.parentElement.classList.add("blur");
    sendBtn.classList.add("blur");
    socialsItems.classList.add("blur");
    toTopBtn.classList.add("blur");
    footerItem.classList.add("blur");
  }
};

const closePopup = () => {
  popup.classList.remove("contact__popup--show");

  aboutUsItem.classList.remove("blur");
  bathBombsItem.classList.remove("blur");
  ourProductsItem.classList.remove("blur");
  headerItem.classList.remove("blur");
  navItem.classList.remove("blur");
  contactSloganItem.classList.remove("blur");
  username.parentElement.classList.remove("blur");
  email.parentElement.classList.remove("blur");
  contactMessage.parentElement.classList.remove("blur");
  sendBtn.classList.remove("blur");
  socialsItems.classList.remove("blur");
  toTopBtn.classList.remove("blur");
  footerItem.classList.remove("blur");

  contactMessage.value = "";
  const allInputs = document.querySelectorAll("input").forEach((el) => {
    el.value = "";
  });
};

(function () {
  emailjs.init("bpy3zYQ_SAda44C9t");
})();

function sendemail() {
  let name = username.value;
  let mail = email.value;
  let message = contactMessage.value;

  let contactParams = {
    from_name: name,
    from_email: mail,
    message: message,
  };

  emailjs
    .send("service_ddq276h", "template_qzugxpr", contactParams)
    .then(function (res) {});
}

document.addEventListener("DOMContentLoaded", main);
