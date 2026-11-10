
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    sessionTitle: "",
    feedback: "",
    suggestions: ""
  });

  const [feedbackList, setFeedbackList] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("feedbackList")) || [];
    } catch {
      return [];
    }
  });

  const [message, setMessage] = useState("");

 
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const newFeedback = {
      id: Date.now(),
      ...formData
    };

    const updatedList = [...feedbackList, newFeedback];

    setFeedbackList(updatedList);

    localStorage.setItem(
      "feedbackList",
      JSON.stringify(updatedList)
    );

    setFormData({
      name: "",
      department: "",
      sessionTitle: "",
      feedback: "",
      suggestions: ""
    });

    setMessage("Feedback submitted successfully!");

    setTimeout(() => {
      setMessage("");
    }, 3000);
  };


  const handleDelete = (id) => {
    const updatedList = feedbackList.filter(
      (item) => item.id !== id
    );

    setFeedbackList(updatedList);

    localStorage.setItem(
      "feedbackList",
      JSON.stringify(updatedList)
    );
  };

  return (
    <div className="container">

      <h1>Feedback Management System</h1>

      <form onSubmit={handleSubmit}>

        <label>Name</label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label>Department</label>
        <input
          type="text"
          name="department"
          placeholder="Enter department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <label>Session Title</label>
        <input
          type="text"
          name="sessionTitle"
          placeholder="Enter session title"
          value={formData.sessionTitle}
          onChange={handleChange}
          required
        />

        <label>Feedback</label>
        <textarea
          name="feedback"
          placeholder="Enter your feedback"
          value={formData.feedback}
          onChange={handleChange}
          required
        />

        <label>Suggestions</label>
        <textarea
          name="suggestions"
          placeholder="Enter your suggestions"
          value={formData.suggestions}
          onChange={handleChange}
        />

        <button type="submit">Submit Feedback</button>

      </form>

      {message && (
        <p className="success-message">{message}</p>
      )}

      <div className="feedback-section">

        <h2>Submitted Feedback ({feedbackList.length})</h2>

        {feedbackList.length === 0 ? (
          <p className="empty-message">
            No feedback submitted yet.
          </p>
        ) : (
          feedbackList.map((item) => (

            <div className="feedback-card" key={item.id}>

              <h3>{item.name}</h3>

              <p>
                <strong>Department:</strong> {item.department}
              </p>

              <p>
                <strong>Session Title:</strong> {item.sessionTitle}
              </p>

              <p>
                <strong>Feedback:</strong> {item.feedback}
              </p>

              <p>
                <strong>Suggestions:</strong> {item.suggestions || "No suggestions"}
              </p>

              <button
                type="button"
                className="delete-button"
                onClick={() => handleDelete(item.id)}
              >
                Delete
              </button>

            </div>

          ))

        )}

      </div>

    </div>
  );
}

export default App;
