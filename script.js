// const logregBox = document.querySelector(".logreg-box");
// const loginLink = document.querySelector(".login-link");
// const registerLink = document.querySelector(".register-link");

// registerLink.addEventListener("click", () => {
//   logregBox.classList.add("active");
// });
// loginLink.addEventListener("click", () => {
//   logregBox.classList.remove("active");
// });

const customerSignUp = async (e) => {
  e.preventDefault();
  var url = "http://localhost:8000/customers/signup";
  var addressurl = "http://localhost:8000/customers/address";
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  var phone = document.getElementById("phone").value;
  var street = document.getElementById("street").value;
  var city = document.getElementById("city").value;
  var postalCode = document.getElementById("postal-code").value;

  var country = document.getElementById("country").value;

  try {
    const signupresponse = await fetch(url, {
      method: "POST",
      headers: {
        mode: "no-cors",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, phone }),
    });

    const {
      data: { token },
    } = await signupresponse.json();

    const addressResponse = await fetch(addressurl, {
      method: "POST",
      headers: {
        mode: "no-cors",
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },

      body: JSON.stringify({ street, postalCode, city, country }),
    });

    const { success } = await addressResponse.json();
    if (success) {
      window.location.href = "index.html";
    }
  } catch (error) {
    return error;
  }
};

const customerSignIn = async (e) => {
  e.preventDefault();
  var url = "http://localhost:8000/customers/login";
  var email = document.getElementById("login-email").value;
  var password = document.getElementById("login-password").value;
  try {
    const signInResponse = await fetch(url, {
      method: "POST",
      headers: {
        mode: "no-cors",
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const {
      success,
      data: { token },
    } = await signInResponse.json();

    if (success) {
      /**store JWT token in  lcoal storage */
      localStorage.setItem("token", token);
      window.location.href = "index.html";
    }
  } catch (error) {
    return error;
  }
};
document.getElementById("signUp").addEventListener("click", customerSignUp);
document.getElementById("signIn").addEventListener("click", customerSignIn);

//Toggle Form
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("sign-up-form");
const indicator = document.getElementById("indicator");

const registerLink = document.querySelector(".register-link");
const loginLink = document.querySelector(".login-link");

// console.log("OK");

// function login() {
//   registerForm.style.transform = "translateX(20rem)";
//   loginForm.style.transform = "translateX(20rem)";
// }

// function regsiter() {
//   registerForm.style.transform = "translateX(0rem)";
//   loginForm.style.transform = "translateX(0rem)";
// }

const login = (e) => {
  e.preventDefault();
  registerForm.style.transform = "translateX(20rem)";
  loginForm.style.transform = "translateX(20rem)";
  indicator.style.transform = "translateX(0rem)";
};

const register = (e) => {
  e.preventDefault();
  registerForm.style.transform = "translateX(0rem)";
  loginForm.style.transform = "translateX(0rem)";
  indicator.style.transform = "translateX(6.25rem)";
};

registerLink.addEventListener("click", register);
loginLink.addEventListener("click", login);
