# Use schema with validation

## To get started with this project:

Run these two commands to install npm packages for both the client and the server

- In the root folder: npm run i:client
- In the root folder: npm run i:server

To run the project:

- In the root folder: npm run s:client
- In the root folder: npm run s:server

# The project

## Testing

After installing and running the application using the previous steps, fill out the application to see the result.

### Frontend

Created a simple form in React that takes in:

- Name
- Email
- Phone number
- Zip code

For validating the form inputs I am using React-hook-form (https://react-hook-form.com) with a few regex strings for email, phone and zip-code.

### Backend

Created a simple Node.js backend that fetches all the zip codes from a .txt file that i got from bring (https://www.bring.no/tjenester/adressetjenester/postnummer)

The server has two endpoints:

- '/zip': GET endpoint that returns all the zip codes as an array of object.
- '/api': POST endpoint that validates the form data and returns a status based on the validation of the form fields.
  - 200 if all fields are OK
  - 400 if something is wrong

## Structure

- Client
  - src
    - api
      - A collection of the api functions
    - components
      - Components used by the app. Mainly form fields in this case
    - types
      - Typescript types / interfaces for the application
    - utils
      - Helper functions to make the code inside components a bit cleaner
- Server
  - server.js

# Known missing features

- Country code on phone number is missing
- Backend is a bit barebones.
- Backend does not send a notification to the supplied email address.
- Backend does not take account for any spam
- Feedback after form submitt could be a bit better

# Further improvements

- Handle incomming spam in the backend
- Further increase the form to give instant feedback on the form inputs, instead of on submit