class Trip {
    constructor(trips) {
        this.id = trips.id
        this.userID = trips.userID
        this.destinationID = trips.destinationID
        this.travelers = trips.travelers
        this.date = trips.date
        this.duration = trips.duration
        this.status = trips.status
        this.suggestedActivities = []
    }

    // getTripCost(user, destinations) {

    // }
}

export default Trip