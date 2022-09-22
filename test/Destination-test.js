import chai from "chai";
const expect = chai.expect;
import Destination from "../src/Destination";
import { destinations } from "./Traveler-data.js";

describe("Destination", () => {
  let destination1;

  beforeEach(() => {
    destination1 = new Destination(destinations[0]);
  });
  it("should have a destination id", () => {
    expect(destination1.id).to.equal(7);
  });
  it("should have a destination place", () => {
    expect(destination1.destination).to.equal("Paris, France");
  });
  it("should have an estimated lodging cost per day", () => {
    expect(destination1.estimatedLodgingCostPerDay).to.equal(100);
  });

  it("should have an estimated flight cost per person", () => {
    expect(destination1.estimatedFlightCostPerPerson).to.equal(395);
  });
  it("should have an image associated with the location", () => {
    expect(destination1.image).to.equal("https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80")
  });
  it("should have an image alt tag", () => {
    expect(destination1.alt).to.equal("city during the day time with eiffel tower")
  });
})