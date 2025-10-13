const submitPayment = (args) => {
  document
    .querySelector(".payment__container")
    .querySelector(".loading__api")
    .classList.remove("hidden");
  const captcha = document.querySelector(
    "#captchaContainer input[name='captcha']"
  ).value;
  const captchaid = document.querySelector(
    "#captchaContainer input[name='captchaid']"
  ).value;
  const stringJson = JSON.stringify(args.source?.rows[0]);
  $bc.setSource("cms.submit", {
    value: stringJson,
    captcha: captcha,
    captchaid: captchaid,
    run: true,
  });
};
const schemaRendered = () => {
  document.querySelector(".unit").querySelector("input").value = "ریال";
  document
    .querySelector(".unit")
    .querySelector("input")
    .setAttribute("readonly", true);
  document
    .querySelector(".price")
    .querySelector("input")
    .setAttribute(
      "onkeyup",
      "this.value=this.value.replace(/[^0-9]/g, '');seprator(this)"
    );
};
const renderCaptchaCode = (element) => {
  $bc.setSource("captcha.refresh", true);
};
async function OnProcessedEditObject(args) {
  document
    .querySelector(".payment__container")
    .querySelector(".loading__api")
    .classList.add("hidden");
  var response = args.response;
  var json = await response.json();
  var errorid = json.errorid;
  document.querySelector(".message__api").innerHTML = "";
  if (errorid == "6") {
    document
      .querySelector(".payment__container")
      .querySelector(".loading__api")
      .classList.remove("hidden");
    fetch("/Client_Bank_List_ver.2.bc", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        firstpay: document.querySelector(".price input").value,
      }),
    })
      .then((response) => response.text())
      .then((responseText) => {
        document
          .querySelector(".payment__container .loading__api")
          .classList.add("hidden");
        document
          .querySelector(".payment__container .payment__content")
          .insertAdjacentHTML("beforeend", responseText);
      });
  } else {
    renderCaptchaCode();
    setTimeout(() => {
      document.querySelector(".message__api").innerHTML =
        "خطایی رخ داده, لطفا مجدد اقدام کنید";
    }, 2000);
  }
}
const seprator = (element) => {
  let inputValue = element.value.replace(/[^0-9]/g, "");
  let decimalCount = inputValue.split(".").length - 1;
  if (decimalCount > 1) {
    inputValue = inputValue.slice(0, -1);
  }
  let parts = inputValue.split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  let formattedValue = parts.join(".");
  element.value = formattedValue;
};

const check_invoice = (element, type) => {
  if (element.closest(".payment__container").querySelector(".dot-waiting")) {
    element
      .closest(".payment__container")
      .querySelector(".dot-waiting")
      .remove();
  }
  if (element.getAttribute("data-clicked") == 0) {
    for (
      var i = 0;
      i <
      element
        .closest(".payment__container")
        .getElementsByClassName("invoice-content").length;
      i++
    ) {
      element
        .closest(".payment__container")
        .getElementsByClassName("invoice-content")
        [i].setAttribute("data-clicked", "1");
      element
        .closest(".payment__container")
        .getElementsByClassName("invoice-content")
        [i].classList.add("not-active");
    }
    if (type == "bankInvoice") {
      element
        .closest(".payment__container")
        .insertAdjacentHTML(
          "beforeend",
          `<div class="dot-waiting">در حال اتصال به درگاه بانک، لطفا منتظر بمانید</div>`
        );
      element.insertAdjacentHTML(
        "beforeend",
        `
                        <form method="post" action="/final/payment" class="payment__form">
                            <input type="hidden" value='${
                              element.querySelector(".bankwid").value
                            }' name="bank_id"/>
                            <input type="hidden" value='${document
                              .querySelector(".payment__content")
                              .querySelector(".price")
                              .querySelector("input")
                              .value.replace(/,/g, "")}' name="price"/>
                            <input type="hidden" value='${
                              document
                                .querySelector(".payment__content")
                                .querySelector(".name")
                                .querySelector("input").value
                            }' name="name"/>
                            <input type="hidden" value='${
                              document
                                .querySelector(".payment__content")
                                .querySelector(".phone")
                                .querySelector("input").value
                            }' name="phone"/>
                            <input type="hidden" value='${
                              document
                                .querySelector(".payment__content")
                                .querySelector(".desc")
                                .querySelector("textarea").value
                            }' name="desc"/>
                        </form>`
      );
      document.querySelector(".payment__form").submit();
    }
  }
};

if (document.querySelectorAll(".amount")[0]) {
  document.querySelectorAll(".amount").forEach((e) => {
    let number = e.textContent;
    let formattedNumber = number
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    e.textContent = formattedNumber;
  });
}
