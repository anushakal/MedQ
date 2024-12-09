# MedQ
The MedQ App is an interactive web application designed to facilitate communication between patients and clinicians. The app can work in integration with the existing hospital portals and help users get a quick and crisp summary of their queries.

## Key Features:
**Chat Interface**: Allows patients to engage in real-time messaging with clinicians.
**MedQ Enable**: Enable or disable the MedQ feature that provides summarized medical queries.
**High Contrast Mode**: Toggle between regular and high-contrast modes for accessibility.
**Chat Summarization**: Get summaries of individual messages or entire chat history.
**User Feedback**: Patients can rate the usefulness of summaries using emojis.

## Project Files:
- **images**: Contains static image assets used across the application (e.g., icons, logos).
- **App.css**: Defines global CSS styles for the main application component, ensuring consistent styling across the app.
- **App.js**: The root component that initializes and renders the main structure of the application.
- **App.test.js**: Contains unit tests for the `App.js` component to ensure correct functionality.
- **HomePage.css**: Contains CSS styles specific to the layout and design of the home page.
- **HomePage.js**: The home page component that serves as the landing page of the application, with introductory content and navigation options.
- **Messages.css**: Defines CSS styles for the message display area, including the chat interface and message formatting.
- **Messages.js**: Manages the logic for rendering and interacting with the messages, including chat history and user inputs.
- **index.css**: Global CSS file that includes default styles for the application, affecting the overall layout.
- **index.js**: The entry point of the React application, responsible for rendering the `App.js` component into the DOM.

## Dependencies
This project uses the following libraries and frameworks:
Node.js: JavaScript runtime used for building and running the application.
npm: Node package manager used to install and manage the app’s dependencies.
React: A JavaScript library for building user interfaces.
OpenAI API: For integrating GPT-3.5 to generate responses from the clinician and summarization.
Axios (optional): For making HTTP requests if needed for backend services.
React Router: For navigation and page routing.
CSS/SCSS: For styling the user interface, including high contrast mode.

## Installing dependencies 
- Install Node.js and npm (based on your OS)
  
- OPEN AI API KEY - Register for a key at: https://openai.com/
 
## Setup Instructions
To get started with the project, follow these steps:
**1. Clone the Repository**

Start by cloning this repository to your local machine.

  git clone https://github.com/anushakal/MedQ.git

**2. **
- Install Node.js and npm (Depending on your OS)

- Open AI API key 
   
Navigate to the project folder and install the required dependencies.

cd messages-dashboard-app
npm install
3. Set Up OpenAI API
To interact with the OpenAI API, you need an API key. Create an .env file in the root of your project and add the following:

makefile
Copy code
REACT_APP_OPENAI_API_KEY=your-api-key-here
4. Run the Application
Once the dependencies are installed and the API key is configured, run the application using:

bash
Copy code
npm start
This will start the development server and open the app in your default web browser. The app should be accessible at http://localhost:3000.

5. Optional: Backend Setup (If applicable)
If your project uses a backend server for additional features or data storage, follow the specific setup instructions for the backend (e.g., running a server with node server.js, setting up database credentials, etc.).

License
This project is licensed under the MIT License - see the LICENSE file for details.

## Notes:
Ensure that the OpenAI API key handling and environment variables are securely configured.

