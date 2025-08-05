AI Email Sender
===============

Full-stack app to generate and send AI-powered emails.

--------------------------------------------------

Prerequisites:
--------------
- Node.js (v14 or later)
- npm or yarn
- Groq AI API Key (free tier available) - https://console.groq.com/
- Gmail account with 2-Step Verification enabled + App Password - https://myaccount.google.com/apppasswords

--------------------------------------------------
Backend Setup:
--------------

1. Open your terminal.

2. Navigate to the backend folder:
   cd backend

3. Install backend dependencies:
   npm install

4. Create a .env file in the backend folder with the following content:

   GROQ_API_KEY=your_groq_api_key_here
   GMAIL_USER=your_gmail_address_here
   GMAIL_PASS=your_gmail_app_password_here
   PORT=5000

5. Start the backend server:
   node index.js

--------------------------------------------------

Frontend Setup:
---------------

1. Open a new terminal window.

2. Navigate to the frontend folder:
   cd frontend

3. Install frontend dependencies:
   npm install

4. (Optional) If your backend URL is not http://localhost:5000,
   update the API URLs inside src/App.js accordingly.

5. Start the frontend:
   npm start



