const travelers = [
  {
    id: 1,
    name: "Ham Leadbeater",
    travelerType: "relaxer",
  },
  {
    id: 2,
    name: "Rachael Vaughten",
    travelerType: "thrill-seeker",
  },
  {
    id: 3,
    name: "Sibby Dawidowitsch",
    travelerType: "shopper",
  },
  {
    id: 4,
    name: "Leila Thebeaud",
    travelerType: "photographer",
  },
  {
    id: 5,
    name: "Tiffy Grout",
    travelerType: "thrill-seeker",
  },
];

const trips = [
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
    id: 117,
    userID: 1,
    destinationID: 28,
    travelers: 3,
    date: "2021/01/09",
    duration: 15,
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
  },
  {
    id: 177,
    userID: 2,
    destinationID: 20,
    travelers: 6,
    date: "2022/01/29",
    duration: 8,
    status: "approved",
    suggestedActivities: [ ]
    }
];

const destinations = [
  {
    id: 7,
    destination: "Paris, France",
    estimatedLodgingCostPerDay: 100,
    estimatedFlightCostPerPerson: 395,
    image:
      "https://images.unsplash.com/photo-1524396309943-e03f5249f002?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1567&q=80",
    alt: "city during the day time with eiffel tower",
  },
  {
    id: 20,
    destination: "Miami, Florida",
    estimatedLodgingCostPerDay: 158,
    estimatedFlightCostPerPerson: 275,
    image: "https://images.unsplash.com/photo-1514214246283-d427a95c5d2f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1573&q=80",
    alt: "sand with palm trees and tall buildings in the background"
    },
  {
    id: 43,
    destination: "Nassau, The Bahamas",
    estimatedLodgingCostPerDay: 550,
    estimatedFlightCostPerPerson: 90,
    image:
      "https://images.unsplash.com/photo-1548574505-5e239809ee19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1664&q=80",
    alt: "aerial photography of white and blue cruise ships during daytime",
  }
];

export { travelers, trips, destinations };
