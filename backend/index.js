const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const axios = require("axios");
const cors = require("cors");
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(cors());
const GROQ_API_KEY = process.env.GROQ_API_KEY;
app.post('/api/generate-email', async (req, res) => {
  const { prompt } = req.body;
  try {
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 500,
      },
      {
        headers: { Authorization: `Bearer ${GROQ_API_KEY}` }
      }
    );
    res.json({ email: response.data.choices[0].message.content });
  } catch (error) {
    console.error("Groq API Error:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: "Error generating email." });
  }
});
app.post('/api/send-email', async (req, res) => {
  const { to, subject, body } = req.body;
  try {
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,         
        pass: process.env.GMAIL_PASS          
      }
    });

    await transporter.sendMail({
      from: `"AI Email Sender" <${process.env.GMAIL_USER}>`,
      to,
      subject,
      text: body
    });

    res.json({ status: "Email sent successfully" });
  } catch (error) {
    console.error("Email sending error:", error);
    res.status(500).json({ error: "Error sending email." });
  }
});
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
