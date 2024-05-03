/**
 *  Form Wizard
 */

"use strict";

$(function () {
  const select2 = $(".select2"),
    selectPicker = $(".selectpicker");

  // Bootstrap select
  if (selectPicker.length) {
    selectPicker.selectpicker();
  }

  // select2
  if (select2.length) {
    select2.each(function () {
      var $this = $(this);
      $this.wrap('<div class="position-relative"></div>');
      $this.select2({
        placeholder: "Select value",
        dropdownParent: $this.parent(),
      });
    });
  }
});

(function () {
  function formatDate(dateString) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const date = new Date(dateString);
    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    return `${dayOfWeek} ${month} ${
      dayOfMonth < 10 ? "0" + dayOfMonth : dayOfMonth
    } ${year}`;
  }
  // Icons Modern Wizard
  // --------------------------------------------------------------------
  const wizardIconsModern = document.querySelector(
    ".wizard-modern-icons-example"
  );

  if (typeof wizardIconsModern !== undefined && wizardIconsModern !== null) {
    const wizardIconsModernBtnNextList = [].slice.call(
        wizardIconsModern.querySelectorAll(".btn-next")
      ),
      wizardIconsModernBtnPrevList = [].slice.call(
        wizardIconsModern.querySelectorAll(".btn-prev")
      ),
      wizardIconsModernBtnSubmit =
        wizardIconsModern.querySelector(".btn-submit");

    const modernIconsStepper = new Stepper(wizardIconsModern, {
      linear: false,
    });

    if (wizardIconsModernBtnNextList) {
      wizardIconsModernBtnNextList.forEach((wizardIconsModernBtnNext) => {
        wizardIconsModernBtnNext.addEventListener("click", (event) => {
          const fullname = document.getElementById("full-name-modern").value;
          const sex = document.getElementById("sex-modern").value;
          const idd = document.getElementById("idd-modern").value;
          const app = document.getElementById("date-modern").value;

          // Address
          const address = document.getElementById("address-modern-input").value;
          const ward = document.getElementById("landmark-modern").value;
          const city = document.getElementById("city-modern").value;
          const province = document.getElementById("Province-modern").value;

          const phoneNumber = document.getElementById("phone-modern").value;
          const email = document.getElementById("email-modern").value;
          const healthInsurance = document.getElementById("BHYT-modern").value;
          const conditionDescription =
            document.getElementById("des-modern").value;


          document.getElementById("inputFName").textContent = fullname;
          document.getElementById("inputSex").textContent = sex;
          document.getElementById("inputIdd").textContent = idd;
          document.getElementById("inputApp").textContent = formatDate(app);

          document.getElementById("inputAddress").textContent = address;
          document.getElementById("inputWard").textContent = ward;
          document.getElementById("inputCity").textContent = city;
          document.getElementById("inputProvince").textContent = province;

          document.getElementById("inputPhone").textContent = phoneNumber;
          document.getElementById("inputEmail").textContent = email;
          document.getElementById("inputHealthInsurance").textContent =
            healthInsurance;
          document.getElementById("inputConditionDescription").textContent =
            conditionDescription;

          modernIconsStepper.next();
        });
      });
    }
    if (wizardIconsModernBtnPrevList) {
      wizardIconsModernBtnPrevList.forEach((wizardIconsModernBtnPrev) => {
        wizardIconsModernBtnPrev.addEventListener("click", (event) => {
          modernIconsStepper.previous();
        });
      });
    }
    if (wizardIconsModernBtnSubmit) {
      wizardIconsModernBtnSubmit.addEventListener("click", (event) => {
        const fullname = document.getElementById("full-name-modern").value;
        const sex = document.getElementById("sex-modern").value;
        const idd = document.getElementById("idd-modern").value;
        const app = document.getElementById("date-modern").value;

        // Address
        const address = document.getElementById("address-modern-input").value;
        const ward = document.getElementById("landmark-modern").value;
        const city = document.getElementById("city-modern").value;
        const province = document.getElementById("Province-modern").value;

        const phoneNumber = document.getElementById("phone-modern").value;
        const email = document.getElementById("email-modern").value;
        const healthInsurance = document.getElementById("BHYT-modern").value;
        const conditionDescription =
          document.getElementById("des-modern").value;
          // const {appointment, email, phone, sex, idd, name}
        try {
          const response = fetch("../../api/booking", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              appointment: formatDate(app),
              email: email,
              phone: phoneNumber,
              sex: sex,
              idd: idd,
              name: fullname
             }),
          });
        } catch (error) {
          console.log(error);
        }
        Swal.fire({
          title: "Booking successfully!",
          text: "Your appointment has been sent successfully!",
          icon: "success",
          customClass: {
            confirmButton: "btn btn-primary",
          },
          buttonsStyling: false,
        });
      });
    }
  }
})();
