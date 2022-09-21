import chai from 'chai';
const expect = chai.expect;
import Traveler from "../src/Traveler"
import {travelers, trips, destinations} from "./Traveler-data.js"

describe('Traveler', () => {
  let traveler1, traveler2;

  beforeEach(() => {
    traveler1 = new Traveler(travelers[0])
    traveler2 = new Traveler(travelers[1])
  })
  it('should have a traveler id', () => {
    expect(traveler1.id).to.equal(1);
  });

  it('should have a traveler name', () => {
    expect(traveler1.name).to.equal("Ham Leadbeater");
  });

  it('should have a traveler type', () => {
    expect(traveler1.travelerType).to.equal("relaxer");
  });

  it('should have a method to get the travelers first name', () => {
    expect(traveler1.getFirstName()).to.equal("Ham")
  });

  it('should have a method to get all traveler trips for a given traveler', () => {
    expect(traveler2.getAllTrips(trips)).to.deep.equal([
      {
        id: 116,
        userID: 2,
        destinationID: 7,
        travelers: 3,
        date: "2020/04/03",
        duration: 8,
        status: "approved",
        suggestedActivities: [],
      },
      {
        id: 171,
        userID: 2,
        destinationID: 43,
        travelers: 1,
        date: "2020/12/27",
        duration: 18,
        status: "pending",
        suggestedActivities: [],
    }]);
  });

  it ('should have a method to get all pending trips for a given traveler', () => {
    expect(traveler2.getPendingTrips(trips)).to.deep.equal([{
        id: 171,
        userID: 2,
        destinationID: 43,
        travelers: 1,
        date: "2020/12/27",
        duration: 18,
        status: "pending",
        suggestedActivities: [],
    }])
  })

  it('should have a method to get all trip expenses for a given user', () => {
    expect(traveler2.getAllExpenses(trips, destinations)).to.equal(13172.5)
  });


});
