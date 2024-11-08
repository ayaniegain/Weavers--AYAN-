let storeArray = [];
let myObj = {};
let currentId = 1;

// let storeArrays = [
//   {
//     id: 1,
//     fullName: "Ayan Biswas",
//     email: "ayan@gmail.com",
//     age: 25,
//     phone: "9066357988",
//     gender: "Male",
//     school: "Weavers",
//     course: ["android", "js", "Node.js"],
//   },
//   {
//     id: 2,
//     fullName: "zayd Doe",
//     email: "john.doe@example.com",
//     age: 30,
//     phone: "9876543210",
//     gender: "Male",
//     school: "Other",
//     course: ["Mern", "React", "Node.js"],
//   },
//   {
//     id: 3,
//     fullName: "john Smith",
//     email: "jane.smith@example.com",
//     age: 28,
//     phone: "9123456789",
//     gender: "Female",
//     school: "Weavers",
//     course: ["Angular", "TypeScript"],
//   },
// ];

let firstname = document.querySelector("#first_name");
let lastname = document.querySelector("#last_name");
let email = document.querySelector("#email");
let age = document.querySelector("#age");
let phone = document.querySelector("#phone");
let school = document.querySelector("#school");
let loadingError = document.getElementById("loading_error");
let tbodyTag = document.querySelector("tbody");

function handleClick() {
  const firstnameValue = firstname.value.trim();
  const lastnameValue = lastname.value.trim();
  const emailValue = email.value.trim();
  const ageValue = age.value.trim();
  const phoneValue = phone.value.trim();
  const schoolValue = school.value;
  const genderValue = document.querySelector(
    'input[name="gender"]:checked'
  )?.value;
  const selectedCheckboxes = document.querySelectorAll(
    '.fourth-div input[type="checkbox"]:checked'
  );
  const course = Array.from(selectedCheckboxes).map(
    (checkbox) => checkbox.value
  );

  // Validation message container
  loadingError.innerHTML = "";

  // Error handling flag
  let hasError = false;

  // Validation for each field
  if (firstnameValue === "" || firstnameValue.length < 4) {
    loadingError.innerHTML +=
      "* First name should not be blank and must be at least 4 characters.<br>";
    hasError = true;
  }

  if (lastnameValue === "" || lastnameValue.length < 4) {
    loadingError.innerHTML +=
      "* Last name should not be blank and must be at least 4 characters.<br>";
    hasError = true;
  }

  if (emailValue === "" || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailValue)) {
    loadingError.innerHTML += "* Please enter a valid email address.<br>";
    hasError = true;
  }

  if (ageValue === "" || isNaN(ageValue) || ageValue < 18 || ageValue > 100) {
    loadingError.innerHTML +=
      "* Age should be a number between 18 and 100.<br>";
    hasError = true;
  }

  if (phoneValue === "" || !/^\d{10}$/.test(phoneValue)) {
    loadingError.innerHTML += "* Phone number must be 10 digits.<br>";
    hasError = true;
  }

  if (schoolValue === "") {
    loadingError.innerHTML += "* Please select a school.<br>";
    hasError = true;
  }

  if (!genderValue) {
    loadingError.innerHTML += "* Please select your gender.<br>";
    hasError = true;
  }

  if (course.length === 0) {
    loadingError.innerHTML += "* Please select at least one course.<br>";
    hasError = true;
  }

  if (hasError) {
    console.log("Validation failed");
    return;
  }

  let fullName = `${firstnameValue} ${lastnameValue}`;

  //unique id generatuion
  // let id = Math.floor(Math.random() * 90) + 10;

  let id = currentId;
  currentId++;

  loadingError.innerHTML = "Form submitted successfully!";

  myObj = {
    id,
    fullName,
    email: emailValue,
    age: ageValue,
    phone: phoneValue,
    school: schoolValue,
    gender: genderValue,
    course,
  };

  storeArray.push(myObj);

  disabledBtnFunc();

  // Clear form inputs after successful submissiona
  firstname.value = "";
  lastname.value = "";
  email.value = "";
  age.value = "";
  phone.value = "";
  school.value = "";
  document.querySelector('input[name="gender"]:checked').checked = false;
  selectedCheckboxes.forEach((checkbox) => (checkbox.checked = false));
}

function disabledBtnFunc() {
  if (storeArray.length >= 1) {
    let showTable = document.getElementById("show_table");

    let enableBtn1 = document.getElementById("show_btn1");
    let enableBtn2 = document.getElementById("show_btn2");
    let enableBtn3 = document.getElementById("show_btn3");
    let enableBtn4 = document.getElementById("show_btn4");

    showTable.disabled = false;
    enableBtn1.disabled = false;
    enableBtn2.disabled = false;
    enableBtn3.disabled = false;
    enableBtn4.disabled = false;
  }
  if (storeArray.length === 0) {
    let showTable = document.getElementById("show_table");

    let enableBtn1 = document.getElementById("show_btn1");
    let enableBtn2 = document.getElementById("show_btn2");
    let enableBtn3 = document.getElementById("show_btn3");
    let enableBtn4 = document.getElementById("show_btn4");

    showTable.disabled = true;
    enableBtn1.disabled = true;
    enableBtn2.disabled = true;
    enableBtn3.disabled = true;
    enableBtn4.disabled = true;
  }
}

function showTable(data = storeArray) {
  loadingError.innerHTML = "";

  if (data.length === 0) {
    tbodyTag.innerHTML = `<tr><td colspan="8" style="text-align: center;">No data found in table</td></tr>`;

    return;
  }
  tbodyTag.innerHTML = "";

  data.forEach((user) => {
    const { id, fullName, email, age, phone, gender, school, course } = user;

    tbodyTag.innerHTML += `<tr>
      <td>${id}</td>
      <td>${fullName}</td>
      <td>${email}</td>
      <td>${age}</td>
      <td>${phone}</td>
      <td>${gender}</td>
      <td>${school}</td>
      <td>${course.join(", ")}</td>
      </tr>`;
  });
}

showTable(storeArray);

function filterAge() {
  let filterAge = storeArray.filter((item) => item.age > 25);
  showTable(filterAge);
}

function sortByAge() {
  let sortByAge = [...storeArray].sort((a, b) => a.age - b.age);
  showTable(sortByAge);
}

function sortByName() {
  const sortedByName = [...storeArray].sort((a, b) =>
    a.fullName.localeCompare(b.fullName)
  );
  showTable(sortedByName);
}

function resetTable() {
  storeArray.length = 0;
  tbodyTag.innerHTML = `<tr><td colspan="8" style="text-align: center;">No data found in table</td></tr>`;

  disabledBtnFunc();
}
