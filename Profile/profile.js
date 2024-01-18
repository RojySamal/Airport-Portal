const token = JSON.parse(localStorage.getItem("token"));
const user_email = JSON.parse(localStorage.getItem("email"));
const table_body = document.getElementById("flight-table-body");
const wel = document.getElementById("Welcome");
const table_ele = document.getElementById("flight-table");
const book_ele = document.getElementById("book_msg");

wel.innerText = "Welcome " + user_email + "!";

var logB = document.getElementById('logButton');

if(token !== null && user_email !== null) {
  logB.textContent = "Log Out";
  logB.href = "../Logout/logout.html";
}

document.addEventListener("DOMContentLoaded", function () {
  if (token !== null) {
    fetch(`http://localhost:3000/user_flights`,{
      method : "GET",
  })
  .then((res) => res.json())
  .then((data) => {
        const newData = data.filter((item) => item.email === user_email);
        
        console.log(newData.length)

        if(newData.length === 0) {
          table_ele.style.visibility = "hidden";
          book_ele.innerText = "You haven't booked any flights yet. Start your travel adventure now!";
        }

        newData.map((el) => {
          const flightRow = document.createElement("tr");
          const airline = document.createElement("td");
          const airP = document.createElement("p");
          airP.textContent = el.Airline;

          const imgsrc = document.createElement("img");
          imgsrc.src = el.ImgSrc;
          airline.append(imgsrc,airP);
          
          const source = document.createElement("td");
          source.textContent = el.Source;
          
          const dest = document.createElement("td");
          dest.textContent = el.Destination;
          
          const dep = document.createElement("td");
          dep.textContent = el.Departure;
          
          const dur = document.createElement("td");
          dur.textContent = el.Duration;
          
          const arrival = document.createElement("td");
          arrival.textContent = el.Arrival;
          
          flightRow.append(airline,source,dest,dep,dur,arrival);

          table_body.append(flightRow);
        });
    })
  }
  else {
    window.location.href = "../Login/login.html";
  }
})