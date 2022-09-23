class Trip {
  constructor(trips) {
    this.id = trips.id;
    this.userID = trips.userID;
    this.destinationID = trips.destinationID;
    this.travelers = trips.travelers;
    this.date = trips.date;
    this.duration = trips.duration;
    this.status = trips.status;
    this.suggestedActivities = [];
  }

  getTripCost(destinations) {
    let foundDestination = destinations.find(
      (destination) => destination.id === this.destinationID
    );
    let totalLodgingCost =
      foundDestination.estimatedLodgingCostPerDay * this.duration;
    let totalFlightCost =
      foundDestination.estimatedFlightCostPerPerson * this.travelers;
    let expenses = totalFlightCost + totalLodgingCost;
    let tripCost = expenses + expenses * 0.1;
    return parseFloat(tripCost.toFixed(2));
  }

  getDestinationInfo(destinations) {
    return destinations.find(
      (destination) => destination.id === this.destinationID
    );
  }
}

export default Trip;
