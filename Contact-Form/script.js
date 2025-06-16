document.addEventListener("DOMContentLoaded",function(){
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent form submission

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const message = document.getElementById("message").value.trim();

  if (!firstName || !lastName || !email || !mobile || !message) {
    alert("Please fill in all fields.");
    return;
  }

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }

const mobilePattern = /^[6-9][0-9]{9}$/;

if (!mobilePattern.test(mobile)) {
  alert("Please enter a valid 10-digit mobile number starting with 6-9.");
  return;
}
  alert("Form submitted successfully!");
});
});