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
    return trips.filter((trip) => trip.userID === this.id);
  }

  getAllExpenses(trips, destinations) {
    let userTrips = this.getAllTrips(trips);
    let totalCost = userTrips.reduce((sum, trip) => {
      let foundDestination = destinations.find(
        (destination) => destination.id === trip.destinationID
      );
      let totalLodgingCost =
        foundDestination.estimatedLodgingCostPerDay * trip.duration;
      let totalFlightCost =
        foundDestination.estimatedFlightCostPerPerson * trip.travelers;
      let tripCost = totalFlightCost + totalLodgingCost  
      sum += (tripCost + (tripCost* 0.1))
      return sum;
    }, 0);
    return totalCost;
  }
}

export default Traveler;
