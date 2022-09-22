import './css/styles.css';

// An example of how you tell webpack to use an image (also need to link to it in the index.html)
import './images/turing-logo.png'
import { getTravelData, fetchTraveler } from './apiCalls';
import Traveler from "./Traveler.js"
import Trip from "./Trip.js"

//Global Variables
let tripData, allTravelers, destinationData;

//Query Selectors
const errorMessage = document.querySelector(".error-message")
const greeting = document.querySelector(".greeting")
const destinationChoice = document.querySelector("#destination")
const travelerChoice = document.querySelector("#travelers")
const durationChoice = document.querySelector("#duration")
const startDate = document.querySelector("#tripStart")
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
logoutBtn.addEventListener("click", logOut)

//Functions
function getAllTravelData () {
    getTravelData().then((responses)=> {
        allTravelers = responses[0]
        tripData = responses[1]
        destinationData = responses[2]
        trips = tripData.map(trip => {
            return new Trip(trip)
        }) 
        destinations = destinationData.map(destination => {
            return new Destination(destination)
        })
        setCurrentDate()
    })
}



