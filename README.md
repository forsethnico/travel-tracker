# Travel Tracker - Go Nomad.

## Table of Contents
- [Introduction](#introduction)
- [Links](#links)
- [Learning Goals](#learning-goals)
- [Features](#features)
- [Setup](#setup)
- [Future Additions](#future-additions)
- [Technologies](#Technologies)
- [Contributors](#contributors)

## Introduction
Travel Tracker is an application that manages and tracks trips for users. 

## Links
- [Project spec](https://frontend.turing.edu/projects/travel-tracker.html)
- [Project Board](https://github.com/users/forsethnico/projects/3)

## Learning Goals 
- Use OOP and drive design of the application and code. 
- Implement a robust testing suite using TDD (test driven development).
- Work with local server and make network requests to API endpoints to retrieve and manipulate data.
- Ensure our app follows best practices for accessibility.
- Utilize proper error handling for our users to ensure they get data and submit POST requests. 

## Features
The traveler(user) is directed to login using a username (such as "traveler50") and password("travel") to enter the website. Then the user is taken to their dashboard which shows all trips that they have taken (either pending or approved). The dollar amount the user has spent on travel in the last year is also listed. Then the user can choose to book a new trip or add a new destination to the list of potential places to travel. 

![Main_Page_Go Nomad]

To book a new trip the traveler can select their destination from a drop down, then select duration, number of travelers, and start date for the trip. They can click to get an estimate cost for trip, then either go back and edit the current trip, or book it! This posts the data to the local api behind the scenes and a success message is shown to the user. To add a new destination, a user must enter the city, country, estimated flights and lodging costs, a photo and some alt text for the photo. Upon successful addition, a success message is also shown to the user. This location is now available for booking new trips!

![Book Trip](

## Setup
1. Clone down this repo.
3. Once you have cloned the repo, change into the directory and install the project dependencies. Run `npm install` to install project dependencies.
4. Run `npm start` in the terminal to see the HTML page running in your browser on `http://localhost:8080/`. `Control + C` is the command to stop running the local server.  Closing the terminal without stopping the server first could allow the server to continue to run in the background and cause problems. This command is not specific to Webpack; make note of it for future use. 
5. Clone the [Travel Tracker API](https://github.com/turingschool-examples/travel-tracker-api) to a separate folder, CD into it and run `npm install`. 
6. The local server is now running on `https://localhost:3001/api/v1/trips` for example. Make sure to use `Control + C` to close the local server before closing the terminal when finished.
7. Enjoy!

## Future Additions
- Adding functionality for a travel agent to go in and approve trips. 
- Implementing Dayjs to be able to work with dates more easily. 
- Adding functionality to delete booking.

## Technologies
This project used JavaScript, HTML, and CSS. Test driven development using Mocha and Chai was also used. Accessibility was tested using LightHouse and  network requests were used to fetch information from an API. 

## Contributors
This solo project was built by [Nicole Forseth](https://github.com/forsethnico), a Front End Engineering student at Turing School of Software and Design.

## Extra Info

## Linting Your Code

Run the command in your terminal `npm run lint` to run the linter on your JavaScript code. There will be errors and warnings right from the start in this starter kit - the linter is still running successfully.

Your linter will look at the JavaScript files you have within the `src` directory and the `test` directory.

## Deploying to GitHub Pages

_If you are finished with the functionality and testing of your project_, then you can consider deploying your project to the web! This way anyone can play it without cloning down your repo.

[GitHub Pages](https://pages.github.com/) is a great way to deploy your project to the web. Don't worry about this until your project is free of bugs and well tested!

If you _are_ done, you can follow [this procedure](./gh-pages-procedure.md) to get your project live on GitHub Pages.
