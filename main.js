const cardNumber = document.querySelector("#card_number");
const month = document.querySelector("#month");
const year = document.querySelector("#year");
const cvc = document.querySelector("#cvc");
const form = document.querySelector("#form");
const cardHolderName = document.querySelector("#cardholder_name");

const cardHolderNameError = cardHolderName.nextElementSibling;
const cardNumberError = cardNumber.nextElementSibling;
const monthYearError = year.nextElementSibling;
const cvcError = cvc.nextElementSibling;

const cardNumberFront = document.querySelector(".card_details .card_number");
const nameFront = document.querySelector(".card_name_expiry_date .name");
const monthFront = document.querySelector(".month_front");
const yearFront = document.querySelector(".year_front");
const cvcFront = document.querySelector(".cvc_number");

const thankYou = document.querySelector(".thank_you");

var patternMask = IMask(cardNumber, {
  mask: "**** **** **** ****",
});

cardNumber.addEventListener("input", (e) => {
  cardNumberFront.innerHTML =
    cardNumber.value === ""
      ? "0000 0000 0000 0000"
      : e.target.value.toUpperCase();
});

cardHolderName.addEventListener("input", (e) => {
  nameFront.innerHTML =
    cardHolderName.value === ""
      ? "JANE APPLESEED"
      : e.target.value.toUpperCase();
});

month.addEventListener("input", (e) => {
  const { value } = e.target;
  e.target.value = value.replace(/[^0-9]/g, "");
  monthFront.innerHTML = e.target.value === "" ? "00" : e.target.value;
});

year.addEventListener("input", (e) => {
  const { value } = e.target;
  e.target.value = value.replace(/[^0-9]/g, "");
  yearFront.innerHTML = e.target.value === "" ? "00" : e.target.value;
});

cvc.addEventListener("input", (e) => {
  const { value } = e.target;
  e.target.value = value.replace(/[^0-9]/g, "");
  cvcFront.innerHTML = e.target.value === "" ? "000" : e.target.value;
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let error = false;
  if (cardHolderName.value === "") {
    error = true;
    cardHolderNameError.style.visibility = "visible";
    cardHolderName.classList.add("error-border");
  } else {
    cardHolderNameError.style.visibility = "hidden";
    cardHolderName.classList.remove("error-border");
  }
  if (
    cardNumber.value === "" ||
    cardNumber.value.length < 19 ||
    /[a-zA-Z]/g.test(cardNumber.value)
  ) {
    error = true;

    cardNumberError.innerHTML =
      cardNumber.value === ""
        ? "Can't be blank"
        : /[a-zA-Z]/g.test(cardNumber.value)
        ? "Wrong format, numbers only"
        : "Invalid card number";

    cardNumberError.style.visibility = "visible";
    cardNumber.classList.add("error-border");
  } else {
    cardNumberError.style.visibility = "hidden";
    cardNumber.classList.remove("error-border");
  }

  if (
    month.value === "" ||
    month.value.length < 2 ||
    month.value > 12 ||
    month.value < 1
  ) {
    error = true;
    monthYearError.innerHTML =
      month.value === ""
        ? "Can't be blank"
        : month.value.length < 2
        ? "Month/Year should be 2 digits"
        : "Invalid Month";
    monthYearError.style.visibility = "visible";
    month.classList.add("error-border");
  } else {
    month.classList.remove("error-border");
  }

  if (year.value === "" || year.value.length < 2) {
    error = true;
    monthYearError.innerHTML =
      year.value === "" ? "Can't be blank" : "Month/Year should be 2 digits";
    monthYearError.style.visibility = "visible";
    year.classList.add("error-border");
  } else {
    year.classList.remove("error-border");
  }
  if (
    month.value !== "" &&
    year.value !== "" &&
    month.value.length === 2 &&
    year.value.length === 2 &&
    month.value < 13 &&
    month.value > 0
  ) {
    const expiryDate = new Date(`20${year.value}`, month.value - 1, 28);
    const currentDate = new Date();
    if (currentDate.valueOf() > expiryDate.valueOf()) {
      error = true;
      monthYearError.innerHTML = "Expired Card";
      monthYearError.style.visibility = "visible";
      month.classList.add("error-border");
      year.classList.add("error-border");
    } else {
      monthYearError.style.visibility = "hidden";
      month.classList.remove("error-border");
      year.classList.remove("error-border");
    }
  }
  if (cvc.value === "" || cvc.value.length < 2) {
    error = true;
    cvcError.innerHTML =
      cvc.value === "" ? "Can't be blank" : "CVC should be 2 digits";
    cvcError.style.visibility = "visible";
    cvc.classList.add("error-border");
  } else {
    cvcError.style.visibility = "hidden";
    cvc.classList.remove("error-border");
  }
  if (!error) {
    form.style.display = "none";
    thankYou.style.display = "flex";
  }
});

thankYou.addEventListener("click", (e) => {
  window.location.href = "index.html";
});
