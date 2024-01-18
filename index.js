const search_button = document.getElementById("search");
const source_loc = document.getElementById("source");
const destin_loc = document.getElementById("destination");
const depDate = document.getElementById("myDateInput");
const class_cat = document.getElementsByName("air_radio");

var adult_cat = document.getElementById("adult");
var child_cat = document.getElementById("child");
var infant_cat = document.getElementById("infant");

var today = new Date().toISOString().split("T")[0];
document.getElementById("myDateInput").min = today;

const Ddate = document.getElementById("myDateInput").value;
console.log(Ddate);

const radio_btn1 = document.getElementById("radio_one");
const radio_btn2 = document.getElementById("radio_two");
const radio_btn3 = document.getElementById("radio_three");

const token = JSON.parse(localStorage.getItem("token"));
const user_email = JSON.parse(localStorage.getItem("email"));

var logB = document.getElementById('logButton');

if(token !== null && user_email !== null) {
  logB.textContent = "Log Out";
  logB.href = "./Logout/logout.html";
}


search_button.addEventListener("click", () => {
  const searchObj = {
    source: source_loc.value,
    destination: destin_loc.value,
    myDateInput: depDate.value,
    adult: adult_cat.value,
    child: child_cat.value,
    infant: infant_cat.value,
    class_radio: class_cat.value,
  };
  console.log(searchObj);
  if (radio_btn1.checked == false && radio_btn2.checked == false) {
    localStorage.setItem("flight_class", JSON.stringify(radio_btn3.value));
  }
  if (radio_btn2.checked == false && radio_btn3.checked == false) {
    localStorage.setItem("flight_class", JSON.stringify(radio_btn1.value));
  }
  if (radio_btn1.checked == false && radio_btn3.checked == false) {
    localStorage.setItem("flight_class", JSON.stringify(radio_btn2.value));
  }

  localStorage.setItem("Sloc", JSON.stringify(source_loc.value));
  localStorage.setItem("Dloc", JSON.stringify(destin_loc.value));
  localStorage.setItem("Date", JSON.stringify(depDate.value));

  localStorage.setItem("Adult", JSON.stringify(adult_cat.value));
  localStorage.setItem("Child", JSON.stringify(child_cat.value));
  localStorage.setItem("Infant", JSON.stringify(infant_cat.value));

  alert("Flight List's being fetched.Please wait!");
  window.location.href = "./BookFlight/flight.html";
});

function openForm() {
  document.getElementById("myForm").style.display = "block";
}

function closeForm() {
  document.getElementById("myForm").style.display = "none";
}
