const apiUrl = 'https://ipgeolocation.abstractapi.com/v1/?api_key=3f737fb9e8d24661a20c4c54fcad4a27&ip_address=2.134.234.159';

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        document.getElementById('city').textContent = `City: ${data.city}`;
        document.getElementById('country').textContent = `Country: ${data.country}`;
        document.getElementById('timezone').textContent = `Timezone: ${data.timezone.name} (${data.timezone.abbreviation})`;
        document.getElementById('currency').textContent = `Currency: ${data.currency.currency_name} (${data.currency.currency_code})`;
        document.getElementById('ip').textContent = `IP Address: ${data.ip_address}`;
        document.getElementById('current-time').textContent = `Current Time: ${data.timezone.current_time}`;
        document.getElementById('country-flag').src = data.flag.png;
      })
      .catch(error => {
        console.error('Error fetching the API:', error);
      });
 

document.addEventListener("DOMContentLoaded", function() {
  updateUserInterface();

  document.getElementById("showLogin").addEventListener("click", displayLoginForm);
  document.getElementById("showRegister").addEventListener("click", displayRegisterForm);
});

function updateUserInterface() {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAuthenticated = sessionStorage.getItem("isAuthenticated") === "true";

  if (isAuthenticated && user) {
      displayProfile(user);
      displayLogoutButton();
  } else if (user) {
      displayLoginForm();
  } else {
      displayRegisterForm();
  }
}

function registerUser(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const passwordConfirmation = document.getElementById("passwordConfirmation").value;

  if (password !== passwordConfirmation) {
      alert("Passwords do not match!");
      return;
  }

  const user = { name, email, password };
  localStorage.setItem("user", JSON.stringify(user));
  sessionStorage.setItem("isAuthenticated", "false");

  alert("Registration successful! You can now log in.");
  displayLoginForm();
}

function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const storedUser = JSON.parse(localStorage.getItem("user"));

  if (storedUser && storedUser.email === email && storedUser.password === password) {
      sessionStorage.setItem("isAuthenticated", "true");
      alert("Login successful!");
      displayProfile(storedUser);
      displayLogoutButton();
  } else {
      alert("Invalid email or password.");
  }
}

function logoutUser() {
  sessionStorage.removeItem("isAuthenticated");
  alert("You have been logged out.");
  displayLoginForm();
}

function displayProfile(user) {
  document.getElementById("profileName").textContent = `Name: ${user.name}`;
  document.getElementById("profileEmail").textContent = `Email: ${user.email}`;
  document.getElementById("profile").style.display = "block";
}

function displayRegisterForm() {
  document.getElementById("register").style.display = "block";
  document.getElementById("login").style.display = "none";
  document.getElementById("logoutBtn").style.display = "none";
  document.getElementById("profile").style.display = "none"; 
}

function displayLoginForm() {
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "block";
  document.getElementById("logoutBtn").style.display = "none";
  document.getElementById("profile").style.display = "none"; 
}

function displayLogoutButton() {
  document.getElementById("register").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("logoutBtn").style.display = "block";
}

document.addEventListener("DOMContentLoaded", function() {
  let isDarkMode = localStorage.getItem("isDarkMode") === "true";
  applyTheme(isDarkMode);

  document.getElementById("toggle-theme").addEventListener("click", () => {
    isDarkMode = !isDarkMode;
    localStorage.setItem("isDarkMode", isDarkMode);
    applyTheme(isDarkMode);
  });
});

function applyTheme(isDarkMode) {
  if (isDarkMode) {
    document.body.classList.add('body-dark-mode');
    document.body.classList.remove('body-light-mode');
  } else {
    document.body.classList.add('body-light-mode');
    document.body.classList.remove('body-dark-mode');
  }
}


function updateDateTime(dateTimeElement) {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', hour12: true };
    dateTimeElement.textContent = now.toLocaleString('en-US', options);
}
function initializePage() { 

const dateTimeElement = document.getElementById('date-time');

updateDateTime(dateTimeElement);
setInterval(() => updateDateTime(dateTimeElement), 60000);
}
initializePage();

var countDownDate = new Date("Jan 5, 2025 15:37:25").getTime();

var x = setInterval(function() {

var now = new Date().getTime();

var distance = countDownDate - now;

var days = Math.floor(distance / (1000 * 60 * 60 * 24));
var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
var seconds = Math.floor((distance % (1000 * 60)) / 1000);

document.getElementById("demo").innerHTML = days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

if (distance < 0) {
    clearInterval(x);
    document.getElementById("demo").innerHTML = "EXPIRED";
}
}, 1000);
function toggleAnswer(element) {
    const answer = element.nextElementSibling;
  
    if (answer.classList.contains('show')) {
      answer.classList.remove('show');
    } else {
      answer.classList.add('show');
    }
}

  subscribeBtn.addEventListener('click', function() {
    popupForm.style.display = 'block';
    overlay.style.display = 'block';
  });

  closeBtn.addEventListener('click', function() {
    popupForm.style.display = 'none';
    overlay.style.display = 'none';
  });

  overlay.addEventListener('click', function() {
    popupForm.style.display = 'none';
    overlay.style.display = 'none';
  });
  
  document.addEventListener("DOMContentLoaded", function() {
    const feedbackForm = document.getElementById("feedbackForm");
    const successMessage = document.getElementById("successMessage");
  
    feedbackForm.addEventListener("submit", async function(event) {
      event.preventDefault();
  
      const formData = new FormData(feedbackForm);
      const formDataObject = Object.fromEntries(formData.entries());
  
      try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formDataObject),
        });
  
        if (response.ok) {
          successMessage.style.display = "block";
          successMessage.textContent = "Your message was successfully submitted!";
          feedbackForm.reset();
        } else {
          throw new Error("Failed to submit message.");
        }
      } catch (error) {
        successMessage.style.display = "block";
        successMessage.style.color = "red";
        successMessage.textContent = "There was an error submitting your message. Please try again.";
        console.error("Error:", error);
      }
    });
  });
  const correctWord = ["S", "A", "L", "E"];

  document.querySelectorAll(".letter").forEach(letter => {
      letter.addEventListener("dragstart", dragStart);
  });
  
  document.querySelectorAll(".cell").forEach(cell => {
      cell.addEventListener("dragover", dragOver);
      cell.addEventListener("drop", drop);
  });
  
  function dragStart(event) {
      event.dataTransfer.setData("text", event.target.textContent);
  }
  
  function dragOver(event) {
      event.preventDefault(); 
  }
  
  function drop(event) {
      event.preventDefault();
      const letter = event.dataTransfer.getData("text");
      if (!event.target.textContent) {
          event.target.textContent = letter; 
      }
  }
  
  function checkWord() {
      const playerWord = Array.from(document.querySelectorAll(".cell")).map(cell => cell.textContent);
      const resultText = playerWord.join("") === correctWord.join("") ? "Congratulations! You guessed the word!" : "Wrong, try again.";
      document.getElementById("result").textContent = resultText;
  }
  