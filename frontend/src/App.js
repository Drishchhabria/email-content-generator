import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [recipient, setRecipient] = useState('');
  const [prompt, setPrompt] = useState('');
  const [generatedEmail, setGeneratedEmail] = useState('');
  const [subject, setSubject] = useState('AI Generated Email');
  const [loading, setLoading] = useState(false);
  const [hasGenerated, setHasGenerated] = useState(false);
  const [error, setError] = useState('');

  // Get backend API base url from environment variable
  const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:5000';

  const generateEmail = async () => {
    if (!prompt.trim()) {
      setError('Please enter an email prompt.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const response = await axios.post(`${apiUrl}/api/generate-email`, { prompt });
      setGeneratedEmail(response.data.email || '');
      setHasGenerated(true);
    } catch (err) {
      setError('Failed to generate email. Please try again.');
    }
    setLoading(false);
  };
 

  const sendEmail = async () => {
    if (!recipient.trim()) {
      setError('Please enter recipient email.');
      return;
    }
    if (!subject.trim()) {
      setError('Please enter an email subject.');
      return;
    }
    if (!generatedEmail.trim()) {
      setError('Email content cannot be empty.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      await axios.post(`${apiUrl}/api/send-email`, {
        to: recipient,
        subject,
        body: generatedEmail
      });
      alert('Email sent successfully!');
      setHasGenerated(false);
      setPrompt('');
      setGeneratedEmail('');
      setRecipient('');
      setSubject('AI Generated Email');
    } catch (err) {
      setError('Failed to send email. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div style={styles.bg}>
      <div style={styles.container}>
        <h1 style={styles.title}>AI Email Sender</h1>

        {error && <div style={styles.error}>{error}</div>}

        <label style={styles.label}>Recipient Email</label>
        <input
          type="email"
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          style={styles.input}
          placeholder="example@example.com"
          disabled={loading}
        />

        <label style={styles.label}>Email Prompt</label>
        <textarea
          value={prompt}
          onChange={e => setPrompt(e.target.value)}
          rows={3}
          style={styles.textarea}
          placeholder="Enter prompt for AI to generate email"
          disabled={loading}
        />

        <button
          onClick={generateEmail}
          style={{
            ...styles.button,
            background: loading ? '#8b8eaf' : 'linear-gradient(90deg, #6366F1 40%, #36c1fe 100%)'
          }}
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Email'}
        </button>
        <button
          onClick={()=>{
            setRecipient('');
            setPrompt('');
            setGeneratedEmail('');
            setSubject('AI generated email');
            setError('');
            setHasGenerated(false);
          }}
          style={{ ...styles.button,background:'#ccc',colors: '#333',marginBottom:12}}>
            Clear All
        </button>
        <label style={styles.label}>Recipient Email</label>
        <input
        type="email"
        value={recipient}
        onChange={e => setRecipient(e.target.value)}
        style={styles.input}
        placeholder="example@example.com"
        disabled={loading}/>

        {hasGenerated && (
          <>
            <label style={styles.label}>Subject</label>
            <input
              type="text"
              value={subject}
              onChange={e => setSubject(e.target.value)}
              style={styles.input}
              disabled={loading}
            />

            <label style={styles.label}>Generated Email (editable)</label>
            <textarea
              value={generatedEmail}
              onChange={e => setGeneratedEmail(e.target.value)}
              rows={8}
              style={styles.textarea}
              disabled={loading}
            />


            <button
              onClick={sendEmail}
              style={{
                ...styles.button,
                background: loading ? '#8b8eaf' : 'linear-gradient(90deg, #FF85A2 20%, #FBDA61 100%)'
              }}
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Email'}
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const styles = {
  bg: {
    minHeight: '100vh',
    width: '100vw',
    margin: 0,
    padding: 0,
    background: 'linear-gradient(135deg, #140048 0%, #1e2979 55%, #33c5ff 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  container: {
    width: '95%',
    maxWidth: 500,
    padding: '36px 32px',
    borderRadius: 20,
    background: 'rgba(255, 255, 255, 0.17)',
    boxShadow:
      '0 8px 32px 0 rgba(31, 38, 135, 0.2), 0 1.5px 8px 0 rgba(36, 11, 54, 0.13)',
    backdropFilter: 'blur(13px)',
    WebkitBackdropFilter: 'blur(13px)',
    border: '1.5px solid rgba(255,255,255,0.14)',
    marginTop: 32
  },
  title: {
    textAlign: 'center',
    marginBottom: 28,
    fontWeight: 900,
    fontSize: 32,
    letterSpacing: 1,
    color: '#fff',
    textShadow: '0 2px 10px #9da9bbff, 0 0 10px #7df'
  },
  label: {
    display: 'block',
    marginBottom: 6,
    marginTop: 9,
    fontWeight: 600,
    fontSize: 14,
    color: '#eef8fd',
    textShadow: '0 0 3px #fff'
  },
  input: {
    width: '100%',
    padding: '14px 15px',
    marginBottom: 16,
    fontSize: 16,
    borderRadius: 10,
    border: '1.5px solid rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(0,0,0,0.15)',
    color: '#eef0f5',
    boxSizing: 'border-box',
    outline: 'none',
    fontWeight: 600,
    boxShadow: '0 0 2.5px rgba(54,193,254,0.6)',
  },
  textarea: {
    width: '100%',
    padding: '14px 15px',
    marginBottom: 16,
    fontSize: 16,
    borderRadius: 10,
    border: '1.5px solid rgba(255, 255, 255, 0.6)',
    backgroundColor: 'rgba(0,0,0,0.15)',
    color: '#eef0f5',
    boxSizing: 'border-box',
    outline: 'none',
    fontWeight: 600,
    boxShadow: '0 0 2.5px rgba(54,193,254,0.6)',
    resize: 'vertical',
    minHeight: 50
  },
  button: {
    width: '100%',
    padding: 12,
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
    marginBottom: 24,
    letterSpacing: 0.5,
    boxShadow: '0 3px 16px #36c1fe22, 0 1.5px 8px #ff85a222'
  },
  error: {
    background: "rgba(234,73,98,0.92)",
    color: "#fff",
    padding: "11px 0",
    marginBottom: 19,
    marginTop: -9,
    borderRadius: 6,
    fontWeight: "bold",
    textAlign: "center",
    border: "1px solid #ecbcbc",
    letterSpacing: 0.2
  }
};


export default App;
