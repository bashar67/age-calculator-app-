const dayInput = document.getElementById("day");
const monthInput = document.getElementById("month");
const yearInput = document.getElementById("year");
const button = document.querySelector(".btn");

button.addEventListener("click", () => {
  validateDate();
  showResult();
});

// show error message//
const setError = (input, message) => {
  const inputControl = input.parentElement;
  const errorDisplay = inputControl.querySelector(".error");

  errorDisplay.innerText = message;
  inputControl.classList.add("error");
  inputControl.classList.remove("success");
};

// validate data
const validateDate = () => {
  // coverting string input to number
  const day = parseInt(dayInput.value, 10);
  const month = parseInt(monthInput.value, 10);
  const year = parseInt(yearInput.value, 10);

  // check if the input is empty && check if the input is a number
  if (isNaN(day) || isNaN(month) || isNaN(year)) {
    setError(dayInput, "All fields are required");
    setError(monthInput, "All fields are required");
    setError(yearInput, "All fields are required");
    return;
  }

  // check if the day is valid
  if (day < 1 || day > 31) {
    setError(dayInput, "Invalid day");
    return;
  }

  //check if this months has 30 days
  if (day > 30 && (month === 4 || month === 6 || month === 9 || month === 11)) {
    setError(dayInput, "Invalid day for this month");
    return;
  }

  //check if february has 28 days
  if (day > 28 && month === 2) {
    setError(dayInput, "Invalid day for this month");
    return;
  }

  //check if the month is valid
  if (month < 1 || month > 12) {
    setError(monthInput, "Invalid month");
    return;
  }

  //check if the year is valid
  if (year < 1900 || year > 2024) {
    setError(yearInput, "Invalid year");
    return;
  }
};

const showResult = () => {
  const day = parseInt(dayInput.value, 10);
  const month = parseInt(monthInput.value, 10);
  const year = parseInt(yearInput.value, 10);

  const dayResult = document.querySelector(".day-result");
  const monthResult = document.querySelector(".month-result");
  const yearResult = document.querySelector(".year-result");

  const today = new Date(); // current date
  const birthDate = new Date(year, month - 1, day); // birth date && month - 1 because month is 0 based &&sprate it to (year, month, day)

  // calculate the age
  let ageYears = today.getFullYear() - birthDate.getFullYear();
  let ageMonths = today.getMonth() - birthDate.getMonth();
  let ageDays = today.getDate() - birthDate.getDate();

  // check if the day is negative && decrease the month by 1
  if (ageDays < 0) {
    ageMonths--;
    ageDays += new Date(today.getFullYear(), today.getMonth(), 0).getDate();
  }

  // check if the month is negative && decrease the year by 1
  if (ageMonths < 0) {
    ageYears--;
    ageMonths += 12;
  }

  // to be sure that the input is a number if is not a number return and don't show the result on screen
  if (isNaN(ageYears) || isNaN(ageMonths) || isNaN(ageDays)) {
    return;
  } else {
    dayResult.innerText = ageDays;
    monthResult.innerText = ageMonths;
    yearResult.innerText = ageYears;
  }
};
