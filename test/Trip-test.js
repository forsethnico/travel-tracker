import chai from 'chai';
const expect = chai.expect;
import Traveler from "../src/Traveler"
import Trip from "../src/Trip"
import {travelers, trips, destinations} from "./Traveler-data.js"

describe('Trip', () => {
  let traveler1, traveler2;
  let trip1, trip2;

  beforeEach(() => {
    traveler1 = new Traveler(travelers[0])
    traveler2 = new Traveler(travelers[1])
    trip1 = new Trip(trips[0])
    trip2 = new Trip(trips[1])
  })

  it('should have a trip id', () => {
    expect(trip1.id).to.equal(116)
  });

  it('should store the userID who booked the trip', () => {
    expect(trip1.userID).to.equal(2)
  });

  it('should have a destination ID', () => {
    expect(trip1.destinationID).to.equal(7)
  });

  it('should have a trip date', () => {
    expect(trip1.date).to.equal("2020/04/03")
  });

  it('should have a duration in number of days', () => {
    expect(trip1.duration).to.equal(8)
  });

  it('should have a trip status', () => {
    expect(trip1.status).to.equal("approved")
  });

  it('should start out with an empty list of suggested activities', () => {
    expect(trip1.suggestedActivities).to.deep.equal([])
  });

//   it('should have a method to calculate individual trip cost for a user', () => {
//     expect(trip1.getTripCost(traveler1, destinations)).to.equal()
//   });

})