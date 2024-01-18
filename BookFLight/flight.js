const source_loc = JSON.parse(localStorage.getItem("Sloc"));
const destin_loc = JSON.parse(localStorage.getItem("Dloc"));
const depDate = JSON.parse(localStorage.getItem("Date"));
const table = document.createElement("table");

const flight_id = document.getElementById("fid");
const airline_name = document.getElementById("airline");
const airline_logo = document.getElementById("logo");
const source_name = document.getElementById("from");
const destin_name = document.getElementById("to");
const Ddate = document.getElementById("date");
const duration = document.getElementById("timedur");

const token = JSON.parse(localStorage.getItem("token"));
const user_email = JSON.parse(localStorage.getItem("email"));

var button_id = -2;
let newData = {};

var logB = document.getElementById('logButton');

if(token !== null && user_email !== null) {
  logB.textContent = "Log Out";
  logB.href = "../Logout/logout.html";
}

if (source_loc == "Bhubaneswar" && destin_loc == "Kolkata") {
  fetch(`http://localhost:3000/bbsr2kol`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {

      data.map((el) => {
        let placeholder = document.querySelector("#data_output");
        let out = "";
        for (let el in data) {

          out += `
            <tr>
            <td>${data[el].id}</td>
            <td><img src=${data[el].ImgSrc}><div>${data[el].Airline}</div></td>
            <td>${data[el].Source}</td>
            <td>${data[el].Destination}</td>
            <td>${data[el].Departure}</td>
            <td>${data[el].Duration}</td>  
            <td>${data[el].Arrival}</td>
            <td><button id="Book" onclick = button_click(`+ (++button_id) +`)>Book Now</button></td>        
            </tr>
            `;
        }
        placeholder.innerHTML = out;
      });
    });
} else if (source_loc == "Kolkata" && destin_loc == "Bhubaneswar") {
  fetch(`http://localhost:3000/kol2bbsr`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {

      data.map((el) => {
        let placeholder = document.querySelector("#data_output");
        let out = "";
        for (let el in data) {

          out += `
            <tr>
            <td>${data[el].id}</td>
            <td><img src=${data[el].ImgSrc}><div>${data[el].Airline}</div></td>
            <td>${data[el].Source}</td>
            <td>${data[el].Destination}</td>
            <td>${data[el].Departure}</td>
            <td>${data[el].Duration}</td>  
            <td>${data[el].Arrival}</td>
            <td><button id="Book" onclick = button_click(`+ (++button_id) +`)>Book Now</button></td>        
            </tr>
            `;
        }
        placeholder.innerHTML = out;
      });
    });
}
else {
  document.getElementById("flightTable").style.visibility = "hidden";
  const msgInfo = document.createElement("h2");
  msgInfo.textContent = "Please select proper flight source and destination.";
  const msgArea = document.getElementById("table_display");
  msgArea.append(msgInfo);
}

function button_click(bid) { 
  if (token !== null && user_email !== null) {
    if(source_loc == "Bhubaneswar" && destin_loc == "Kolkata" ) {
      fetch(`http://localhost:3000/bbsr2kol`, {
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        newData = data.filter((item) => item.id == bid);
        console.log(newData);
        localStorage.setItem("bookFlight",JSON.stringify(newData));
      })
    }
    else if(source_loc == "Kolkata" && destin_loc == "Bhubaneswar") {
      fetch(`http://localhost:3000/kol2bbsr`, {
        method: "GET",
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        newData = data.filter((item) => item.id == bid);
        console.log(newData);
        localStorage.setItem("bookFlight",JSON.stringify(newData));
      })
    }
    alert('Flight Booked Successfuly');
    window.open("./bookFlight.html","_self");
  }
  else {
    localStorage.setItem("redirect","true");
    window.location.href = "../Login/login.html";
  }
}

