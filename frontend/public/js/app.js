document.getElementById("signupForm").addEventListener("submit", async (event) => {
  event.preventDefault();

  const formData = {
    firstName: document.getElementById("firstName").value,
    lastName: document.getElementById("lastName").value,
    mobileNumber: document.getElementById("mobileNumber").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmPassword").value,
  };

  try {
    const response = await fetch("http://localhost:5000/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();
    const messageElement = document.getElementById("responseMessage");

    if (response.ok) {
      messageElement.textContent = result.message || "Signup successful!";
      messageElement.style.color = "green";
    } else {
      messageElement.textContent = result.message || "Signup failed!";
      messageElement.style.color = "white";
    }
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("responseMessage").textContent =
      "An error occurred. Please try again later.";
    document.getElementById("responseMessage").style.color = "white";
  }
});