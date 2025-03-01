import React, { useState } from "react";
import "./MenstruationTracker.css";

const MenstruationTracker = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    lastMenstruation: "",
    mood: "",
    symptoms: "",
    vaginalDischarge: "",
    digestion: "",
  });

  const [summary, setSummary] = useState(null);
  const [showSummary, setShowSummary] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send the form data to the backend API
      const response = await fetch("https://track-djfkg8d7drhrb7b7.southeastasia-01.azurewebsites.net/track-menstruation/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData) // Convert formData to JSON
      });

      // Check if the response is successful
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Error processing the request");
      }

      // Parse the backend response
      const responseData = await response.json();

      // Update the summary state with the backend-provided data
      setSummary(responseData.summary);
      setShowSummary(true); // Switch to the summary view
      console.log("Response Data:", responseData);

    } catch (error) {
      console.error("Error submitting the form:", error.message);
      alert("An error occurred. Please try again.");
    }

    // Reset form fields after submission
    setFormData({
      name: "",
      age: "",
      weight: "",
      lastMenstruation: "",
      mood: "",
      symptoms: "",
      vaginalDischarge: "",
      digestion: "",
    });
    
  };
  

  const handleGoHome = () => {
    setShowSummary(false); // Return to the form view
  };

  return (
    <div className="form-container">
      {showSummary ? (
        <div className="summary">
          <button onClick={handleGoHome} className="home-btn">
            HOME
          </button>
          <h2>Summary</h2>
          <p><strong>Name:</strong> {summary.name}</p>
          <p><strong>Age:</strong> {summary.age}</p>
          <p><strong>Weight:</strong> {summary.weight} kg</p>
          <p><strong>Last Menstruation:</strong> {summary.lastMenstruation}</p>
          <p><strong>Mood:</strong> {summary.mood}</p>
          <p><strong>Symptoms:</strong> {summary.symptoms}</p>
          <p><strong>Vaginal Discharge:</strong> {summary.vaginalDischarge}</p>
          <p><strong>Digestion:</strong> {summary.digestion}</p>
          <p><strong>Ovulation Date:</strong> {summary.ovulationDate}</p>
          <p><strong>Next Menstruation Date:</strong> {summary.nextMenstruationDate}</p>
        </div>
      ) : (
        <div className="form-card">
          <h1>Menstruation Tracker</h1>
          <p>Track your cycle and health insights.</p>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="form-field">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            {/* Age Field */}
            <div className="form-field">
              <label htmlFor="age">Age</label>
              <input
                type="number"
                id="age"
                name="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                required
              />
            </div>

            {/* Weight Field */}
            <div className="form-field">
              <label htmlFor="weight">Weight (kg)</label>
              <input
                type="number"
                id="weight"
                name="weight"
                placeholder="Enter your weight"
                value={formData.weight}
                onChange={handleChange}
                required
              />
            </div>

            {/* Last Menstruation Field */}
            <div className="form-field">
              <label htmlFor="lastMenstruation">Last Menstruation Date</label>
              <input
                type="date"
                id="lastMenstruation"
                name="lastMenstruation"
                value={formData.lastMenstruation}
                onChange={handleChange}
                required
              />
            </div>

            {/* Mood Field */}
            <div className="form-field">
              <label htmlFor="mood">Mood</label>
              <select
                id="mood"
                name="mood"
                value={formData.mood}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select your mood</option>
                {[
                  "Calm", "Happy", "Energetic", "Frisky", "Mood Swings", 
                  "Irritated", "Sad", "Anxious", "Depressed", "Feeling Guilty", 
                  "Obsessive thoughts", "Low Energy", "Apathetic", "Confused", 
                  "Very Self-critical"
                ].map((mood) => (
                  <option key={mood} value={mood}>{mood}</option>
                ))}
              </select>
            </div>

            {/* Symptoms Field */}
            <div className="form-field">
              <label htmlFor="symptoms">Symptoms</label>
              <select
                id="symptoms"
                name="symptoms"
                value={formData.symptoms}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select your symptoms</option>
                {[
                  "Everything is fine", "Cramps", "Tender Breasts", "Headache", 
                  "Acne", "Backache", "Fatigue", "Cravings", "Insomnia", 
                  "Abdominal pain", "Vaginal Itching", "Vaginal Dryness"
                ].map((symptom) => (
                  <option key={symptom} value={symptom}>{symptom}</option>
                ))}
              </select>
            </div>

            {/* Vaginal Discharge Field */}
            <div className="form-field">
              <label htmlFor="vaginalDischarge">Vaginal Discharge</label>
              <select
                id="vaginalDischarge"
                name="vaginalDischarge"
                value={formData.vaginalDischarge}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select vaginal discharge type</option>
                {[
                  "No discharge", "Creamy", "Watery", "Sticky", "Egg white", 
                  "Spotting", "Unusual", "Clumpy white", "Gray"
                ].map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Digestion Field */}
            <div className="form-field">
              <label htmlFor="digestion">Digestion and Stool</label>
              <select
                id="digestion"
                name="digestion"
                value={formData.digestion}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select digestion symptoms</option>
                {["Nausea", "Bloating", "Constipation", "Diarrhea"].map((digestion) => (
                  <option key={digestion} value={digestion}>{digestion}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="submit-btn">
              Track
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default MenstruationTracker;
