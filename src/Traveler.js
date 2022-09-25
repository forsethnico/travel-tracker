import Trip from "./Trip";

class Traveler {
  constructor(user) {
    this.id = user.id;
    this.name = user.name;
    this.travelerType = user.travelerType;
  }

  getFirstName() {
    return this.name.split(" ")[0];
  }

  getAllTrips(trips) {
    let userTrips = trips.filter((trip) => trip.userID === this.id);
    return userTrips.map((trip) => new Trip(trip));
  }

  getPendingTrips(trips) {
    let userTrips =  this.getAllTrips(trips)
    return userTrips.filter(trip => trip.status === "pending")
  }

  getAllExpensesForYear(trips, destinations, currentDateObj) {
    let endDateObj = new Date(currentDateObj.getTime())
    let startDateObj = new Date(currentDateObj.getTime())
    startDateObj.setDate(endDateObj.getDate() - 365);
    console.log(startDateObj)
    console.log(endDateObj)
    let userTrips = this.getAllTrips(trips);
    let yearlyTrips = userTrips.filter(trip => {
      const entryDate = new Date(trip.date)
      return entryDate <= endDateObj && entryDate > startDateObj
    });
    console.log(yearlyTrips)
    let totalExpenses = yearlyTrips.reduce((sum, trip) => {
      let tripCost = trip.getTripCost(destinations);
      sum += tripCost;
      return sum;
    }, 0);
    return totalExpenses;
  }
}

export default Traveler;
