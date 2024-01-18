var flight_data = JSON.parse(localStorage.getItem("bookFlight"));

console.log(flight_data);

var data = {
  "email" : JSON.parse(localStorage.getItem("email")),
  "Airline" : flight_data[0].Airline,
  "ImgSrc" : flight_data[0].ImgSrc,
  "Source" : flight_data[0].Source,
  "Destination" : flight_data[0].Destination,
  "Departure" : flight_data[0].Departure,
  "Duration" : flight_data[0].Duration,
  "Airline" : flight_data[0].Airline,
  "Arrival" : flight_data[0].Arrival,
}

localStorage.setItem("data",JSON.stringify(flight_data[0].Airline));

fetch(`http://localhost:3000/user_flights`,{
  method:"POST",
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
})
.then((res) => res.json())
.then((data) => console.log(data))

window.location.href = "../Profile/profile.html";