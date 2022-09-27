import chai from "chai";
const expect = chai.expect;
import Trip from "../src/Trip";
import { trips, destinations } from "./Traveler-data.js";

describe("Trip", () => {
  let trip1;

  beforeEach(() => {
    trip1 = new Trip(trips[0]);
  });

  it("should have a trip id", () => {
    expect(trip1.id).to.equal(116);
  });

  it("should store the userID who booked the trip", () => {
    expect(trip1.userID).to.equal(2);
  });

  it("should have a destination ID", () => {
    expect(trip1.destinationID).to.equal(7);
  });

  it("should have a trip date", () => {
    expect(trip1.date).to.equal("2020/04/03");
  });

  it("should have a duration in number of days", () => {
    expect(trip1.duration).to.equal(8);
  });

  it("should have a trip status", () => {
    expect(trip1.status).to.equal("approved");
  });

  it("should start out with an empty list of suggested activities", () => {
    expect(trip1.suggestedActivities).to.deep.equal([]);
  });

  it("should have a method to calculate individual trip cost", () => {
    expect(trip1.getTripCost(destinations)).to.equal(2183.5);
  });

  it("should have a method to get find the destination info for the trip", () => {
    expect(trip1.getDestinationInfo(destinations)).to.deep.equal({
      id: 7,
      destination: "Paris, France",
      estimatedLodgingCostPerDay: 100,
      estimatedFlightCostPerPerson: 395,
      image:
        "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
      alt: "city during the day time with eiffel tower",
    });
  });
});
