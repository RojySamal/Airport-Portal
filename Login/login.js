const signUpButton = document.getElementById("signUp");
const signInButton = document.getElementById("signIn");
const signup = document.getElementById("signup1");
const signin = document.getElementById("signin1");
const container = document.getElementById("container");
const sign_email = document.getElementById("sign_email");
const log_email = document.getElementById("log_email");
const uname = document.getElementById("name");
const sign_pass = document.getElementById("sign_pass");
const log_pass = document.getElementById("log_pass");
const token = JSON.parse(localStorage.getItem("id"));
const user_email = JSON.parse(localStorage.getItem("email"));


if(token !== null && user_email !== null) {
  window.location.href = "../Profile/profile.html";
}

signUpButton.addEventListener("click", () => {
  container.classList.add("right-panel-active");
});
signup.addEventListener("click", () => {
  const dataobj = {
    name: uname.value,
    email: sign_email.value,
    password: sign_pass.value,
  };
  fetch("http://localhost:3000/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataobj),
  })
    .then((res) => res.json())
    .then((data) => {
      alert("Account created successfully!");
      window.location.replace(`./login.html`);
    });
});

signInButton.addEventListener("click", () => {
  container.classList.remove("right-panel-active");
});
signin.addEventListener("click", () => {
  fetch("http://localhost:3000/users", {
    method: "GET",
  })
    .then((res) => res.json())
    .then((data) => {
      const comparision = data.find((ele) => ele.email === log_email.value);
      console.log(comparision.password);
      if (
        comparision.email === log_email.value &&
        comparision.password === log_pass.value
      ) {
        alert("Logged in Successfully!");
        localStorage.setItem("token", JSON.stringify(Date.now()));
        localStorage.setItem("id", JSON.stringify(comparision.id));
        localStorage.setItem("email",JSON.stringify(comparision.email));
        if(JSON.parse(localStorage.getItem("redirect")) === null)
          window.location.href = "../Profile/profile.html";
        else
          window.location.href = "../BookFlight/flight.html";
      } else {
        alert("You are not registered in!");
      }
    });
});
