const logregBox = document.querySelector(".logreg-box");
const loginLink = document.querySelector(".login-link");
const registerLink = document.querySelector(".register-link");

registerLink.addEventListener("click", () => {
  logregBox.classList.add("active");
});
loginLink.addEventListener("click", () => {
  logregBox.classList.remove("active");
});

const userSignUp = async () => {
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

document.getElementById("signUp").addEventListener("click", userSignUp);
