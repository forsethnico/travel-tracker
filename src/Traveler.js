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

  getAllExpenses(trips, destinations) {
    let userTrips = this.getAllTrips(trips);
    let totalExpenses = userTrips.reduce((sum, trip) => {
      let tripCost = trip.getTripCost(destinations);
      sum += tripCost;
      return sum;
    }, 0);
    return totalExpenses;
  }
}

export default Traveler;
