const { useState, useEffect } = React;
const { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } = Recharts;

function MoodTracker() {
  const [moodData, setMoodData] = useState([]);
  const [currentMood, setCurrentMood] = useState(5);
  const [activity, setActivity] = useState('');

  useEffect(() => {
    const mockData = [
      { date: '2024-09-01', mood: 7, activity: 'Exercise' },
      { date: '2024-09-02', mood: 6, activity: 'Reading' },
      { date: '2024-09-03', mood: 8, activity: 'Socializing' },
      { date: '2024-09-04', mood: 5, activity: 'Work' },
      { date: '2024-09-05', mood: 7, activity: 'Meditation' },
    ];
    setMoodData(mockData);
  }, []);

  const addMoodEntry = () => {
    const newEntry = {
      date: new Date().toISOString().split('T')[0],
      mood: currentMood,
      activity: activity,
    };
    setMoodData([...moodData, newEntry]);
    setActivity('');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-center text-blue-600">Mental Health Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="shadow-lg">
          <h2 className="text-2xl text-blue-700 mb-4">Mood Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={moodData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 10]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="mood" stroke="#8884d8" strokeWidth={2} dot={{ strokeWidth: 2 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="shadow-lg">
          <h2 className="text-2xl text-green-700 mb-4">Log Your Mood</h2>
          <div className="space-y-6">
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700">Current Mood (1-10):</label>
              <input
                type="number"
                min="1"
                max="10"
                value={currentMood}
                onChange={(e) => setCurrentMood(Number(e.target.value))}
                className="form-control"
              />
            </div>
            <div>
              <label className="block mb-2 text-lg font-medium text-gray-700">Activity:</label>
              <select
                value={activity}
                onChange={(e) => setActivity(e.target.value)}
                className="form-select"
              >
                <option value="">Select an activity</option>
                <option value="Exercise">Exercise</option>
                <option value="Reading">Reading</option>
                <option value="Socializing">Socializing</option>
                <option value="Work">Work</option>
                <option value="Meditation">Meditation</option>
              </select>
            </div>
            <button onClick={addMoodEntry} className="btn btn-primary w-100">Log Mood</button>
          </div>
        </div>
      </div>

      <div className="shadow-lg">
        <h2 className="text-2xl text-purple-700 mb-4">Mood History</h2>
        <ul className="list-group">
          {moodData.map((entry, index) => (
            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>{entry.date}</span>
              <span>Mood: {entry.mood}</span>
              <span>{entry.activity}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}