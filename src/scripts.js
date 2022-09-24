import "./css/styles.css";

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import "./images/background.jpg";
import "./images/logo.png";
import "./images/logo_transparent.png";
import { getTravelData, fetchTraveler } from "./apiCalls";
import Traveler from "./Traveler.js";
import Trip from "./Trip.js";
import Destination from "./Destination.js";

//Global Variables
let tripData,
  allTravelers,
  destinationData,
  trips,
  destinations,
  currentTraveler;

//Query Selectors
const errorMessage = document.querySelector(".error-message");
const greeting = document.querySelector(".greeting");
const destinationChoice = document.querySelector("#destination");
const travelerChoice = document.querySelector("#travelers");
const durationChoice = document.querySelector("#duration");
const startDate = document.querySelector("#tripStart");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
//Buttons
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const destinationBtn = document.querySelector("#addDestinationBtn");
const goBookTripBtn = document.querySelector("#bookTripBtn");
const goDashboardBtn = document.querySelector("#goToDashboardBtn");
const navButtons = document.querySelector(".nav-buttons");
const bookBtn = document.querySelector("#bookButton");
const estimateBtn = document.querySelector("#estimateButton");
//Sections
const loginContainer = document.querySelector(".login-container");
const totalExpenses = document.querySelector(".total-expenses");
const dashboard = document.querySelector(".dashboard-page");
const navView = document.querySelector(".nav-view");
const createTrip = document.querySelector(".create-trip-page");
const tripDetails = document.querySelector(".trip-details");
const tripEstimate = document.querySelector(".cost-estimate");
const myTrips = document.querySelector(".my-trips-container");

//Event Listeners
window.addEventListener("load", getAllTravelData);
loginBtn.addEventListener("click", logIn);
logoutBtn.addEventListener("click", logOut);
goDashboardBtn.addEventListener("click", showDashboard);
goBookTripBtn.addEventListener("click", showBookTrip);
estimateBtn.addEventListener("click", estimateCost)

//Functions
function getAllTravelData() {
  getTravelData().then((responses) => {
    allTravelers = responses[0].travelers;
    tripData = responses[1].trips;
    destinationData = responses[2].destinations;
    trips = tripData.map((trip) => {
      return new Trip(trip);
    });
    destinations = destinationData.map((destination) => {
      return new Destination(destination);
    });
    //Remove when login page is enabled
    currentTraveler = new Traveler(allTravelers[6]);
    setCurrentDate();
    showBookTrip();
  });
}

function setCurrentDate() {
  let currentDate = new Date().toJSON().slice(0, 10);
  startDate.value = currentDate;
  startDate.min = currentDate;
}

function getDate(date) {
  return date.split("-").join("/");
}

function hide(element) {
  element.classList.add("hidden");
}

function show(element) {
  element.classList.remove("hidden");
}

function showMainPage() {
  show(loginContainer);
  hide(dashboard);
  hide(navView);
  hide(createTrip);
}

function logIn(event) {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  if (username === "" || password === "") {
    errorMessage.innerText = `Please complete the form.`;
  }
  if (password !== "travel") {
    errorMessage.innerText = `Invalid user password.`;
  }
  const id = username.slice(8, usernameInput.value.length);
  if (id.startsWith(0)) {
    errorMessage.innerText = `Invalid user name.`;
  } else if (id) {
    fetchTraveler(id)
      .then((response) => {
        currentTraveler = new Traveler(response);
        showDashboard();
      })
      .catch((error) => {
        errorMessage.innerText = error.message;
      });
  } else {
    errorMessage.innerText = "";
  }
}

function logOut() {
  hide(dashboard);
  hide(navButtons);
  hide(createTrip);
  show(loginContainer);
  currentTraveler = null;
  usernameInput.value = "";
  passwordInput.value = "";
  errorMessage.innerText = "";
}

function showDashboard() {
  hide(loginContainer);
  hide(createTrip);
  hide(goDashboardBtn);
  hide(loginContainer);
  hide(createTrip);
  show(bookTripBtn);
  show(destinationBtn);
  show(logoutBtn);
  displayUserWelcome();
  displayTotalExpenses();
  displayUserTrips();
}

function showBookTrip() {
  hide(bookTripBtn);
  show(goDashboardBtn);
  show(logoutBtn);
  show(createTrip);
  hide(loginContainer);
  hide(dashboard);
  hide(bookBtn);
  showDestinations();
}

function displayUserWelcome() {
  greeting.innerText = `${currentTraveler.getFirstName()}'s dashboard.`;
}

function displayTotalExpenses() {
  const expenses = currentTraveler.getAllExpenses(trips, destinations);
  totalExpenses.innerHTML = `Total Amount Spent: <br>$${expenses}`;
}

function displayUserTrips() {
  const userTrips = currentTraveler.getAllTrips(trips);
  myTrips.innerHTML = "";
  if (userTrips.length > 0) {
    userTrips.forEach((trip) => {
      let destinationObj = trip.getDestinationInfo(destinations);
      myTrips.innerHTML += `<section class = "user-trip">
            <h3>${destinationObj.destination}</h3>
            <h4>date: ${trip.date}</h4>
            <h4>status: ${trip.status}</h4>
            <img class = "trip-photo" src=${destinationObj.image}/>
            </section>`;
    });
  }
}

function showDestinations() {
    const destinationSelection = document.querySelector(".destination-dropdown");
    let destinationOptions = destinations.map((destination) => {
      return `<option value="${destination.id}">${destination.destination}</option>`;
    });
    destinationSelection.innerHTML = `${destinationOptions}`;
  }
  

function estimateCost() {
  const selectedDate = getDate(startDate.value);
  const numTravelers = travelerChoice.value;
  const selectedDuration = durationChoice.value;
  const selectedDestination = destinationChoice.value;
  let tripObj = {
    destinationID: selectedDestination,
    duration: selectedDuration,
    date: selectedDate,
    travelers: numTravelers,
  };
  const newTrip = new Trip(tripObj);
  const cost = newTrip.getTripCost(destinations)
  tripEstimate.innerHTML = `$${cost} (including 10% travel agent fee)`
}

