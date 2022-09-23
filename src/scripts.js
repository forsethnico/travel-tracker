import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/background.jpg'
import './images/logo.png'
import './images/logo_transparent.png'
import { getTravelData, fetchTraveler } from './apiCalls';
import Traveler from "./Traveler.js"
import Trip from "./Trip.js"
import Destination from "./Destination.js"

//Global Variables
let tripData, allTravelers, destinationData, trips, destinations, currentTraveler;

//Query Selectors
const errorMessage = document.querySelector(".error-message")
const greeting = document.querySelector(".greeting")
const destinationChoice = document.querySelector("#destination")
const travelerChoice = document.querySelector("#travelers")
const durationChoice = document.querySelector("#duration")
const startDate = document.querySelector("#tripStart")
const usernameInput = document.querySelector("#username")
const passwordInput = document.querySelector("#password")
//Buttons
const loginBtn = document.querySelector("#loginBtn")
const logoutBtn = document.querySelector("#logoutBtn")
const destinationBtn = document.querySelector("#addDestinationBtn")
const bookBtn = document.querySelector("#bookButton")
const estimateBtn = document.querySelector("#estimateButton")
//Sections
const topContainer = document.querySelector(".top-container")
const bottomContainer = document.querySelector(".bottom-container")
const loginContainer = document.querySelector(".login-container")
const dashboard = document.querySelector(".dashboard-page")
const totalExpenses = document.querySelector(".total-expenses")
const createTrip = document.querySelector(".create-trip-page")
const tripDetails = document.querySelector(".trip-details")
const tripEstimate = document.querySelector(".cost-estimate")
const userTrips = document.querySelector(".user-trips-display")

//Event Listeners
window.addEventListener("load", getAllTravelData)
loginBtn.addEventListener("click", logIn)
// logoutBtn.addEventListener("click", logOut)

//Functions
function getAllTravelData () {
    getTravelData().then((responses)=> {
        allTravelers = responses[0].travelers
        tripData = responses[1].trips
        destinationData = responses[2].destinations
        trips = tripData.map(trip => {
            return new Trip(trip)
        }) 
        destinations = destinationData.map(destination => {
            return new Destination(destination)
        })
        setCurrentDate()
    })
}

function setCurrentDate() {
    let currentDate = new Date().toJSON().slice(0, 10);
    startDate.value = currentDate;
    startDate.min = currentDate;
};

function getDate(date) {
    return date.split("-").join("/");
};

function hide(element) {
    element.classList.add('hidden')
}

function show(element) {
    element.classList.remove('hidden')
}

function logIn(event) {
    event.preventDefault();
    const username = usernameInput.value
    const password = passwordInput.value
    if(username === "" || password === "") {
    errorMessage.innerText = `Please complete the form.`    
    }
    if(password !== "travel") {
        errorMessage.innerText = `Invalid user password.`
    }
    let id = username.slice(8, usernameInput.value.length)
    if(id.startsWith(0)) {
        errorMessage.innerText = `Invalid user name.`
    } else if (id) {
        fetchTraveler(id)
        .then((response) => {
            currentTraveler = new Traveler(response)
            showDashboard()
        }) 
        .catch((error)=> {
            errorMessage.innerText = error.message;
        })
    } else {
        errorMessage.innerText =""
    }
}

function showDashboard() {
    show(displayUserWelcome)
}

function showLoginPage() {
    usernameInput.value = ""
    passwordInput.value = ""
    hide(logoutBtn)
}

function displayUserWelcome() {
    greeting.innerText = `Hello, ${currentTraveler.getFirstName()}!`
}

function displayTotalExpenses() {
    let expenses = currentTraveler.getAllExpenses(trips,destinations)
    totalExpenses.innerHTML = `$${expenses}`
}

function displayUserTrips() {
    let myTrips = currentTraveler.getAllTrips(trips)
    userTrips.innerHTML = ""
    if(userTrips.length > 0) {
        myTrips.forEach(trip => {
            userTrips.innerHTML += `<section class = "user-trip">
            <h4>TRIP DATE: ${trip.date}</h4>
            <img src="
            </section>`
        })
    }

}

