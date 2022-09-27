const fetchTraveler = (id) => {
  return fetch(`http://localhost:3001/api/v1/travelers/${id}`).then(
    (response) => {
      if (!response.ok) {
        throw new Error("User does not exist.");
      } else {
        return response.json();
      }
    }
  );
};

const fetchTravelData = (detail) => {
  return fetch(`http://localhost:3001/api/v1/${detail}`)
    .then((response) => {
        if(!response.ok){
            throw new Error("Issue loading information. Please refresh page.")
        } else {
        return response.json()
        }
    })
    .catch((error) => console.log(`API error: ${error.message}`))
};


const getTravelData = () => {
  const result = Promise.all([
    fetchTravelData("travelers"),
    fetchTravelData("trips"),
    fetchTravelData("destinations"),
  ]).then((responses) => {
    return responses;
  });
  return result;
};

export { getTravelData, fetchTraveler };
