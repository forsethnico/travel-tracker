import "./css/styles.css";
import "./images/background.jpg";
import "./images/logo.png";
import "./images/logo_transparent.png";
import { getTravelData, fetchTraveler } from "./apiCalls";
import Traveler from "./Traveler.js";
import Trip from "./Trip.js";
import Destination from "./Destination.js";

//Global Variables
let tripData, destinationData, allTravelers, trips, destinations, currentTraveler;

//Query Selectors
const greeting = document.querySelector(".greeting");
const destinationChoice = document.querySelector("#destination");
const travelerChoice = document.querySelector("#travelers");
const durationChoice = document.querySelector("#duration");
const startDate = document.querySelector("#tripStart");
const usernameInput = document.querySelector("#username");
const passwordInput = document.querySelector("#password");
const errorMessage = document.querySelector(".error-message");

//Buttons
const loginBtn = document.querySelector("#loginBtn");
const logoutBtn = document.querySelector("#logoutBtn");
const goDestinationBtn = document.querySelector("#goDestinationBtn");
const goBookTripBtn = document.querySelector("#goBookTripBtn");
const goDashboardBtn = document.querySelector("#goToDashboardBtn");
const bookBtn = document.querySelector("#bookButton");
const estimateBtn = document.querySelector("#estimateButton");
const editBtn = document.querySelector("#editBtn");
const addDestinationBtn = document.querySelector("#addDestinationBtn");
const clearDestinationBtn = document.querySelector("#clearDestinationBtn");

//Sections
const loginContainer = document.querySelector(".login-container");
const totalExpenses = document.querySelector(".total-expenses");
const dashboard = document.querySelector(".dashboard-page");
const navView = document.querySelector(".nav-view");
const createTrip = document.querySelector(".create-trip-page");
const destinationPage = document.querySelector(".create-destination-page");
const tripEstimate = document.querySelector(".cost-estimate");
const myTrips = document.querySelector(".my-trips-container");
const successMessage = document.querySelector(".success-message");
const destSuccessMessage = document.querySelector(".dest-success-message");

//Event Listeners
window.addEventListener("load", onLoad);
loginBtn.addEventListener("click", logIn);
logoutBtn.addEventListener("click", logOut);
goDashboardBtn.addEventListener("click", showDashboard);
goBookTripBtn.addEventListener("click", showBookTripPage);
goDestinationBtn.addEventListener("click", showCreateDestinationPage);
estimateBtn.addEventListener("click", estimateCost);
editBtn.addEventListener("click", editTrip);
bookBtn.addEventListener("click", bookNewTrip);
addDestinationBtn.addEventListener("click", addNewDestination);
clearDestinationBtn.addEventListener("click", resetForm);

//Functions
function getAllTravelData() {
  return getTravelData().then((responses) => {
    allTravelers = responses[0].travelers;
    tripData = responses[1].trips;
    destinationData = responses[2].destinations;
    trips = tripData.map((trip) => {
      return new Trip(trip);
    });
    destinations = destinationData.map((destination) => {
      return new Destination(destination);
    });
    setCurrentDate();
  });
}
function onLoad() {
  getAllTravelData().then((responses) => {
    if (currentTraveler === undefined) {
      showMainPage();
    } 
  });
}

function setCurrentDate() {
  let currentDate = new Date().toJSON().slice(0, 10);
  startDate.value = currentDate;
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
  hide(destinationPage);
}

function logIn(event) {
  event.preventDefault();
  const username = usernameInput.value;
  const password = passwordInput.value;
  if (!checkEmptyLogin(username, password)) {
    try {
      setUser(username, password);
    } catch (error) {
      errorMessage.innerText = error.message;
    }
  }
}
const checkEmptyLogin = (username, password) => {
  let emptyFields = false;
  if (username === "") {
    emptyFields = true;
  }
  if (password === "") {
    emptyFields = true;
  }
  return emptyFields;
};

function setUser(username, password) {
  usernameInput.value = "";
  passwordInput.value = "";
  if (password !== "travel") {
    throw new Error("Invalid password.");
  }
  if (!username.startsWith("traveler")) {
    throw new Error("Invalid user name.");
  }
  let id = username.slice(8);
  if (id.startsWith(0)) {
    throw new Error("Invalid user name.");
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
    throw new Error("Invalid user credentials.");
  }
}

function logOut() {
  hide(dashboard);
  hide(createTrip);
  hide(destinationPage);
  hide(navView);
  show(loginContainer);
  currentTraveler = null;
  usernameInput.value = "";
  passwordInput.value = "";
  errorMessage.innerText = "";
}

function showDashboard() {
  hide(loginContainer);
  hide(goDashboardBtn);
  show(goBookTripBtn);
  show(goDestinationBtn);
  show(logoutBtn);
  show(dashboard);
  show(navView);
  hide(destinationPage);
  hide(createTrip);
  displayUserWelcome();
  displayUserTrips();
  displayTotalExpenses();
}

function showBookTripPage() {
  show(navView);
  show(goDashboardBtn);
  show(logoutBtn);
  show(createTrip);
  show(goDestinationBtn);
  hide(goBookTripBtn);
  hide(loginContainer);
  hide(dashboard);
  hide(successMessage);
  hide(destinationPage);
  showDestinations();
}

function displayUserWelcome() {
  greeting.innerText = `${currentTraveler.getFirstName()}'s dashboard.`;
}

function displayTotalExpenses() {
//   const userTrips = currentTraveler.getAllTrips(trips)  
  const expenses = currentTraveler.getAllExpensesForYear(
    trips,
    destinations,
    new Date()
  );
  totalExpenses.innerHTML = `Total Amount Spent This Year: <br>$${expenses.toFixed(
    2
  )}`;
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
            <img class = "trip-photo" src=${destinationObj.image} alt=${destinationObj.alt}/>
            </section>`;
    });
  }
}

function showDestinations() {
  const destinationSelection = document.querySelector(".destination-dropdown");
  let destinationOptions = destinations.sort((a, b) => {
    let firstCity = a.destination.split(",")[0];
    let secondCity = b.destination.split(",")[0];
    return firstCity.localeCompare(secondCity);
  });
  let options = destinationOptions.map((destination) => {
    return `<option value="${destination.id}">${destination.destination}</option>`;
  });
  destinationSelection.innerHTML = `${options}`;
}

function estimateCost() {
  if (!checkTripButtonState()) {
    tripEstimate.innerHTML = `Please enter all required fields.`;
    return;
  }
  const selectedDate = getDate(startDate.value);
  const numTravelers = parseInt(travelerChoice.value);
  const selectedDuration = parseInt(durationChoice.value);
  const selectedDestination = parseInt(destinationChoice.value);
  let tripObj = {
    destinationID: selectedDestination,
    duration: selectedDuration,
    date: selectedDate,
    travelers: numTravelers,
  };
  const newTrip = new Trip(tripObj);
  const cost = newTrip.getTripCost(destinations);
  tripEstimate.innerHTML = `Estimate: $${cost.toFixed(
    2
  )} (inclusive of 10% travel agent fee)`;
  hide(estimateBtn);
  show(editBtn);
  show(bookBtn);
}

function editTrip() {
  hide(bookBtn);
  show(estimateBtn);
  hide(editBtn);
  hide(successMessage);
  tripEstimate.innerHTML = "";
}

function bookNewTrip(event) {
  event.preventDefault();
  if (!checkTripButtonState()) {
    tripEstimate.innerHTML = `Please enter all required fields.`;
    return;
  }
  let sortedTripsByID = trips.sort((a, b) => {
    return b.id - a.id;
  });
  const selectedDate = getDate(startDate.value);
  const numTravelers = parseInt(travelerChoice.value);
  const selectedDuration = parseInt(durationChoice.value);
  const selectedDestination = parseInt(destinationChoice.value);
  const newTripObj = {
    id: sortedTripsByID[0].id + 1,
    userID: currentTraveler.id,
    destinationID: selectedDestination,
    travelers: numTravelers,
    date: selectedDate,
    duration: selectedDuration,
    status: "pending",
    suggestedActivities: [],
  };
  fetch("http://localhost:3001/api/v1/trips", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTripObj),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((response) => {
      getAllTravelData();
      displayTripSuccessMessage(response.message, response.newTrip);
      showNewTrip();
    })
    .catch((err) => {
      errorMessage.innerText = err.message;
    });
}

function showNewTrip() {
  show(createTrip);
  show(navView);
  hide(dashboard);
  show(goDashboardBtn);
  show(goDestinationBtn);
  show(logoutBtn);
  hide(loginContainer);
  show(successMessage);
}

function displayTripSuccessMessage(message, newTrip) {
  const newTripObj = new Trip(newTrip);
  const destinationObj = newTripObj.getDestinationInfo(destinations);
  successMessage.innerHTML = `<section class="just-booked"><p>${message}.<br> Congrats! <br>Your trip to ${destinationObj.destination} is pending approval!</p>
  <img class ="new-trip-photo" src= ${destinationObj.image} alt=${destinationObj.alt}</section>`;
}

function addNewDestination(event) {
  event.preventDefault();
  if (!checkDestinationButtonState()) {
    return;
  }
  const sortedDestinationsByID = destinations.sort((a, b) => {
    return b.id - a.id;
  });
  const newDestination = `${city.value}, ${country.value}`;
  const lodgingEstimate = parseInt(lodging.value);
  const flightCost = parseInt(flight.value);
  const photo = image.value;
  const description = alt.value;
  const newDestinationObj = {
    id: sortedDestinationsByID[0].id + 1,
    destination: newDestination,
    estimatedLodgingCostPerDay: lodgingEstimate,
    estimatedFlightCostPerPerson: flightCost,
    image: photo,
    alt: description,
  };
  fetch("http://localhost:3001/api/v1/destinations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newDestinationObj),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(response.statusText);
      } else {
        return response.json();
      }
    })
    .then((response) => {
      getAllTravelData();
      displayDestSuccessMessage(response.message, response.newDestination);
      showNewDestination();
    })
    .catch((err) => {
      errorMessage.innerText = err.message;
    });
}

function showCreateDestinationPage() {
  hide(createTrip);
  hide(loginContainer);
  hide(dashboard);
  hide(goDestinationBtn);
  show(goDashboardBtn);
  show(logoutBtn);
  show(navView);
  show(goBookTripBtn);
  show(destinationPage);
}

function displayDestSuccessMessage(message, newDestination) {
  const newDestObj = new Destination(newDestination);
  destSuccessMessage.innerHTML = `<section class="just-booked"><p>${message}. <br>
    You added info for ${newDestObj.destination} to the list of locales. Go book a new trip!</p><img class = "new-trip-photo" src=${newDestObj.image} alt=${newDestObj.alt}</section>`;
}

function showNewDestination() {
  hide(createTrip);
  show(navView);
  hide(dashboard);
  show(goDashboardBtn);
  hide(goDestinationBtn);
  show(logoutBtn);
  hide(loginContainer);
  show(destinationPage);
  show(destSuccessMessage);
}

function resetForm() {
  hide(destSuccessMessage);
  const destinationForm = document.getElementById("destinationForm");
  destinationForm.reset();
}

const checkDestinationButtonState = () => {
  if (
    city.value === "" ||
    country.value === "" ||
    lodging.value === "" ||
    flight.value === "" ||
    image.value === "" ||
    alt.value === ""
  ) {
    return false;
  } else {
    return true;
  }
};

const checkTripButtonState = () => {
  if (
    tripStart.value === "" ||
    destination.value === "" ||
    duration.value === "" ||
    travelers.value === ""
  ) {
    return false;
  } else {
    return true;
  }
};
