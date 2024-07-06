## Project Bug Tracker

### Overview
Project Bug Tracker is a full-stack web application built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It serves as a platform for managing projects, issues, and tasks within teams. Users can create projects, report bugs, assign tasks, and collaborate effectively through a centralized interface. The application supports authentication for secure user access and features a customizable light and dark mode toggle for improved user experience.

### Features
- Authentication: Secure login and registration system.
- Project Management: Create, view, and manage projects.
- Issue Tracking: Report bugs and track issues associated with each project.
- Task Assignment: Assign tasks to team members within projects.
- User Profiles: View and update user profiles and roles.
- Light and Dark Mode: Customizable theme preferences for enhanced usability.

### Technologies Used
- Frontend:
  - React.js
  - React Router (for navigation)
  - Material-UI (for UI components)
  - Axios (for HTTP requests)
  - Context API (for theme and state management).
- Backend:
  - Node.js
  - Express.js
  - MongoDB (Atlas for cloud database)
  - Mongoose (ODM for MongoDB)
  - JWT (JSON Web Tokens for authentication)
  - bcrypt (for password hashing).
- Deployment:
  - Heroku (for backend and frontend deployment)
 
### Installation
To run this project locally, follow these steps:

1. Clone the repository:
   ``` bash
      git clone https://github.com/your_username/bug-tracker.git
      cd bug-tracker
   ```

2. Install dependencies:
   ``` bash
     npm install
     cd frontend
     npm install
   ```

3. Setup environment variables:
   - Create a .env file in the root directory and add your MongoDB connection URI, JWT secret, and other necessary variables.
  
4. Startup the development server:
   - Uses concurrently to run backend and frontend at the sametime
   ``` bash
     npm run dev
   ```

5. If it does not open automatically:
   - Open your browser and visit http://localhost:3000 to view the application.
  
### Contributions
  - Contributions are welcome! Please fork the repository and create a pull request with your improvements.
