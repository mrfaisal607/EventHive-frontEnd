# Final Year Project - React + Vite Frontend

This project is a React application built with Vite. It includes various components, hooks, and context providers to manage state and functionality across the application.

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Description

This project is a comprehensive event management platform that connects users with local venues and event services. It includes features for user authentication, event and venue management, booking, and profile management.

## Tech Stack

- **Frontend Framework**: React
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit
- **Form Handling**: React Hook Form, Yup
- **Animations**: Framer Motion, GSAP
- **HTTP Client**: Axios
- **Notifications**: React Toastify
- **PDF Generation**: jsPDF
- **QR Code Generation**: QRCode.react
- **Image Upload**: Cloudinary


## Getting Started

To get started with this project, clone the repository and install the dependencies:

```sh
git clone https://github.com/your-username/your-repo.git
cd your-repo
npm install


npm run dev


Available Scripts
In the project directory, you can run:

npm run dev: Starts the development server.
npm run build: Builds the app for production.
npm run preview: Previews the production build locally.
npm run lint: Runs ESLint to check for linting errors.
Features
Authentication: Managed by AuthContext in src/context/AuthContext.js.
Event Management: Managed by EventContext in src/context/EventContext.js.
Venue Management: Managed by VenueContext in src/context/VenueContext.js.
Custom Hooks: Includes useAuth and useFetch in src/hooks.
Responsive Design: Utilizes Tailwind CSS for styling.
Animations: Uses Framer Motion and GSAP for animations.
Form Handling: Uses React Hook Form and Yup for form validation.
Notifications: Uses React Toastify for notifications.
PDF Generation: Uses jsPDF for generating PDFs.
QR Code Generation: Uses QRCode.react for generating QR codes.

Contributing
Contributions are welcome! Please open an issue or submit a pull request for any changes.

License
This project is licensed under the MIT License.