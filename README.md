# EventHive Frontend

## 🎓 Final Year Project - React + Vite Frontend
This project is a React application built with Vite. It includes various components, hooks, and context providers to manage state and functionality across the application.

## 📖 Table of Contents
- Description
- Tech Stack
- Project Structure
- Getting Started
- Available Scripts
- Features
- Contributing
- License
- Contact

## 📝 Description
EventHive is a comprehensive event management platform that connects users with local venues and event services. It includes features for user authentication, event and venue management, booking, and profile management. This frontend is designed to provide an intuitive and seamless user experience.

## 🛠 Tech Stack
- **Frontend Framework:** React
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Form Handling:** React Hook Form, Yup
- **Animations:** Framer Motion, GSAP
- **HTTP Client:** Axios
- **Notifications:** React Toastify
- **PDF Generation:** jsPDF
- **QR Code Generation:** QRCode.react
- **Image Upload:** Cloudinary

## 📂 Project Structure
```
EventHive-frontEnd/
├── public/        # Static assets
├── src/
│   ├── components/ # Reusable UI components
│   ├── pages/      # Main application pages
│   ├── context/    # Context providers for state management
│   ├── hooks/      # Custom React hooks
│   ├── services/   # API services and utility functions
│   ├── styles/     # Global and component-specific styles
│   ├── App.js      # Main application entry point
│   ├── index.js    # Root file
├── .gitignore      # Files to ignore in git
├── package.json    # Project dependencies and scripts
└── README.md       # Documentation
```

## 🚀 Getting Started
To get started with this project, clone the repository and install the dependencies:

```bash
git clone https://github.com/mrfaisal607/EventHive-frontEnd.git
cd EventHive-frontEnd
npm install
```

### Start Development Server
```bash
npm run dev
```
The application should now be running at `http://localhost:3000`.

## 📜 Available Scripts
In the project directory, you can run:

- `npm run dev` - Starts the development server.
- `npm run build` - Builds the app for production.
- `npm run preview` - Previews the production build locally.
- `npm run lint` - Runs ESLint to check for linting errors.

## 🔥 Features
- **Authentication:** Managed by `AuthContext` in `src/context/AuthContext.js`.
- **Event Management:** Managed by `EventContext` in `src/context/EventContext.js`.
- **Venue Management:** Managed by `VenueContext` in `src/context/VenueContext.js`.
- **Custom Hooks:** Includes `useAuth` and `useFetch` in `src/hooks`.
- **Responsive Design:** Utilizes Tailwind CSS for styling.
- **Animations:** Uses Framer Motion and GSAP for animations.
- **Form Handling:** Uses React Hook Form and Yup for form validation.
- **Notifications:** Uses React Toastify for notifications.
- **PDF Generation:** Uses jsPDF for generating PDFs.
- **QR Code Generation:** Uses QRCode.react for generating QR codes.
- **Image Upload:** Integrated with Cloudinary for uploading event images.

## 📜 Environment Variables
Create a `.env` file in the root directory and configure the following variables:
```env
REACT_APP_API_BASE_URL=your_backend_api_url
REACT_APP_AUTH_SECRET=your_auth_secret
```

## 🚀 Build & Deployment
To create a production build:
```bash
npm run build
```
To deploy the application, use services like Vercel, Netlify, or Firebase.

## 🤝 Contributing
Contributions are welcome! To contribute:
1. Fork the repository.
2. Create a new branch: `git checkout -b feature-branch`
3. Commit your changes: `git commit -m "Added a new feature"`
4. Push to the branch: `git push origin feature-branch`
5. Open a Pull Request.

## 🛡 License
This project is licensed under the MIT License.

## 📧 Contact
For queries or support, reach out to:
- **GitHub:** [@mrfaisal607](https://github.com/mrfaisal607)
- **Email:** mrfaisal607@gmail.com

---
💡 *Enjoy building and managing events with EventHive!*

