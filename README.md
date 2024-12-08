# MedQ Summarizer - Summarizing queries for improved doctor-patient insights

## The slides from the final presentation for this project can be found at:

https://docs.google.com/presentation/d/1QDLu8O1R9VyrZMDtGLwLYf_MrDNv2kwCEqsrpldNlNk/edit?usp=sharing

## Project Status Update (as of Nov 18, 2024)

This document provides an overview of the current status and future plans for the AI-powered chat summarization tool.

### 1. Completed Work

* **Core Functionality:**
    * Integrated OpenAI 3.5 Turbo LLM with the chat interface.
    * Implemented a functional "Summarize" button for individual messages.
    * Implemented a functional "Summarize Chat" button for the entire conversation.
    * Enabled the display of the generated summary within the chat window.
    * Added an option to disable the "Summary" feature for users who prefer not to use AI.
* **Initial Design:**
    * Created a responsive design that adapts to different screen sizes.
    * Ensured the UI is clean and intuitive to use.
* **Home Page:**
    * Built a basic home page with a functional "Messages" button (other buttons are currently non-clickable placeholders).
* As of now, the LLM tries to imitate a clinician’s response.

### 2. Future Steps (Design)

* **Server Module:** Create a separate "Server" module to handle LLM interactions and chat data loading.
* **Accessibility:**
    * Implement ARIA attributes for screen reader compatibility.
    * Enhance color contrast for improved readability.
    * Introduce color palette options for users with color blindness.
* **Screen Reader Integration:** Explore the use of an LLM to provide narration capabilities.

### 3. Future Steps (Feedback and Iterative Design)

* **Usability Testing:** Conduct usability testing with clinicians to gather feedback on the interface.
* **Iterative Design:**  Use feedback to iteratively improve the design and address usability issues.
* **Performance Optimization:** Optimize the summarization process for speed and efficiency.

### 4. Running the project

* Refer to the Readme.md inside the medq folder for detailed instructions.
