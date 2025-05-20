import React, { useState } from 'react';

const StudyForm = () => {
  const [formData, setFormData] = useState({
    task: 'Study',
    subjectsWithChapters: '', // e.g. "Math:10, Physics:5"
    startDate: '',
    days: '',
    notes: '',
    startTime: '',
    endTime: '',
  });

  const [plan, setPlan] = useState([]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const generatePlan = async (e) => {
  e.preventDefault();

  const { subjectsWithChapters, startDate, days, task, notes, startTime, endTime } = formData;

  // Validation
  if (!subjectsWithChapters || !startDate || !days || !startTime || !endTime) {
    alert('Please fill all fields including start time and end time.');
    return;
  }

  const numDays = parseInt(days);
  if (isNaN(numDays) || numDays <= 0) {
    alert('Enter a valid number of days.');
    return;
  }

  // Subjects parse karna
  const subjects = subjectsWithChapters.split(',').map((item) => {
    const [subject, chapters] = item.split(':').map(str => str.trim());
    return {
      subject,
      chapters: parseInt(chapters),
    };
  });

  for (let sub of subjects) {
    if (!sub.subject || isNaN(sub.chapters) || sub.chapters <= 0) {
      alert('Enter valid subject:chapters pairs like "Math:10, Physics:5"');
      return;
    }
  }

  // Daily plan banana (optional agar backend se plan aayega to ye chhodo)
  let dailyPlan = [];
  for (let day = 0; day < numDays; day++) {
    dailyPlan[day] = { day: day + 1, tasks: [] };
  }

    subjects.forEach(({ subject, chapters }) => {
    const baseChaptersPerDay = Math.floor(chapters / numDays);
    let extraChapters = chapters % numDays;

    for (let day = 0; day < numDays; day++) {
      let chaptersToday = baseChaptersPerDay;
      if (extraChapters > 0) {
        chaptersToday += 1;
        extraChapters--;
      }

      dailyPlan[day].tasks.push({
        subject,
        chaptersToStudy: chaptersToday,
        taskName: `${task} - ${subject}`,
        notes,
        startTime,
        endTime,
      });
    }
  });

let subjectCompletionDays = {};

subjects.forEach(({ subject, chapters }) => {
  let remaining = chapters;

  for (let day = 0; day < numDays; day++) {
    const chaptersPerDay = chapters / numDays;
    let chaptersToday = Math.floor(chaptersPerDay);
    if (day === numDays - 1) {
      const chaptersDone = chaptersPerDay * day;
      chaptersToday = Math.round(chapters - chaptersDone);
    }

    remaining -= chaptersToday;
    if (remaining <= 0 && !subjectCompletionDays[subject]) {
      subjectCompletionDays[subject] = day + 1; // +1 because days are 1-indexed
    }
  }
});


  setPlan(dailyPlan); // Frontend pe plan dikhane ke liye

  // Backend request bhejna
  const dataToSend = { ...formData };

  try {
   const response = await fetch('https://study-planner-r7qw.onrender.com/api/study-plan', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(dataToSend),
});

    if (!response.ok) {
      alert('Data save nahi hua, try karo firse');
      return;
    }

    const result = await response.json();
    alert('Data backend pe save ho gaya!');

    // Agar backend se plan mile to yaha setPlan kar sakte hain
    // setPlan(result.dailyPlan);

  } catch (error) {
    alert('Error aaya: ' + error.message);
  }

  // Optional: form reset karna
  setFormData({
    task: 'Study',
    subjectsWithChapters: '',
    startDate: '',
    days: '',
    notes: '',
    startTime: '',
    endTime: '',
  });
};


  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📘 Study Planner</h2>
      <form onSubmit={generatePlan} style={styles.form}>
        <label style={styles.label}>Base Task Name:</label>
        <input
          type="text"
          name="task"
          value={formData.task}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>
          Subjects with Remaining Chapters (format: Subject:Chapters, ...):
        </label>
        <input
          type="text"
          name="subjectsWithChapters"
          value={formData.subjectsWithChapters}
          onChange={handleChange}
          placeholder="Math:10, Physics:5, Chemistry:8"
          style={styles.input}
          required
        />

        <label style={styles.label}>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Number of Days to Complete:</label>
        <input
          type="number"
          name="days"
          value={formData.days}
          onChange={handleChange}
          placeholder="Enter total days"
          style={styles.input}
          min="1"
          required
        />

        <label style={styles.label}>Start Time:</label>
        <input
          type="time"
          name="startTime"
          value={formData.startTime}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>End Time:</label>
        <input
          type="time"
          name="endTime"
          value={formData.endTime}
          onChange={handleChange}
          style={styles.input}
          required
        />

        <label style={styles.label}>Notes (optional):</label>
        <textarea
          name="notes"
          value={formData.notes}
          onChange={handleChange}
          placeholder="Add any notes..."
          style={{ ...styles.input, height: '80px', resize: 'vertical' }}
        />

        <button type="submit" style={styles.button}>
          Generate Task Plan
        </button>
      </form>

      {plan.length > 0 && (
        <div style={{ marginTop: 30, color: '#fff' }}>
          <h3>Your Daily Study Plan:</h3>
          {plan.map(({ day, tasks }) => (
            <div
              key={day}
              style={{
                backgroundColor: 'rgba(255,255,255,0.1)',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '12px',
              }}
            >
              <h4>Day {day}</h4>
              {tasks.map(({ subject, chaptersToStudy, taskName, notes, startTime, endTime }, i) => (
                <div key={i} style={{ marginBottom: '8px' }}>
                  <strong>{taskName}</strong> <br />
                  Subject: {subject} <br />
                  Chapters to study: {chaptersToStudy} <br />
                  Study Time: {startTime} - {endTime} <br />
                  {notes && <>Notes: {notes}</>}
               
                  {/* ✅ Show message on last day */}
        {day === plan.length && (
          <div style={{ color: '#00ff88', fontWeight: 'bold' }}>
            ✅ {subject} completed!
          </div>
        )}
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: 500,
    margin: '40px auto',
    padding: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    backdropFilter: 'blur(12px)',
    border: '1px solid rgba(255, 255, 255, 0.2)',
    borderRadius: 12,
    color: '#fff',
    fontFamily: 'sans-serif',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
  },
  heading: {
    textAlign: 'center',
    color: '#e67e22',
    marginBottom: 20,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  label: {
    marginBottom: 5,
    marginTop: 15,
    fontWeight: 'bold',
    color: '#f1f1f1',
  },
  input: {
    padding: 10,
    fontSize: '1rem',
    borderRadius: 6,
    border: '1px solid #ccc',
    outline: 'none',
    width: '100%',
  },
  button: {
    marginTop: 25,
    padding: 12,
    fontSize: '1rem',
    backgroundColor: '#e67e22',
    color: '#fff',
    border: 'none',
    borderRadius: 8,
    cursor: 'pointer',
  },
};

export default StudyForm;
