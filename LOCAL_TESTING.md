# Testing Backend Locally in GitHub Codespace

Follow these steps to run and test the backend server locally in your GitHub Codespace:

## 1. Open Terminal
Open a terminal in your Codespace environment.

## 2. Install Dependencies
Run the following command to install all required Node.js dependencies:
```
npm install
```

## 3. Start the Backend Server
Run the backend server with:
```
node server.js
```
The server will start and listen on port 3001.

## 4. Access the Backend API
The backend API will be accessible at:
```
http://localhost:3001
```

## 5. Update Frontend API URLs
Make sure your frontend files (e.g., editor2.html, login.html, signup.html, brows.html) use the backend API URL `http://localhost:3001` for all API calls.

## 6. Test Functionality
- Open your frontend pages in the Codespace browser preview or external browser.
- Test signup, login, map publishing, browsing, and sharing features.
- Monitor the backend terminal for logs and errors.

## Notes
- If port 3001 is not accessible externally, you may need to forward the port in Codespaces.
- Use the Codespaces port forwarding UI to expose port 3001 to your browser.

This setup allows you to fully test your backend and frontend integration locally before deploying to a cloud provider.
