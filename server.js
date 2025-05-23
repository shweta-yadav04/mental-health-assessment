const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

// This is a placeholder. In a real-world scenario, you'd use a more sophisticated NLP model or AI service.
const mentalHealthResponses = {
  "depression": "Depression is a common mental health disorder. If you're feeling persistently sad or hopeless, it's important to seek professional help. Consider talking to a therapist or counselor.",
  "anxiety": "Anxiety can be overwhelming, but there are ways to manage it. Try deep breathing exercises, mindfulness, or consider speaking with a mental health professional for personalized strategies.",
  "stress": "Stress is a normal part of life, but too much can be harmful. Consider stress-reduction techniques like exercise, meditation, or time management strategies.",
  "help": "If you're in crisis or need immediate help, please contact a local emergency service or a mental health helpline. Remember, seeking help is a sign of strength.",
  "default": "I'm here to provide general information about mental health. If you're experiencing severe symptoms or need personalized advice, please consult with a qualified mental health professional."
};

app.post('/api/chat', (req, res) => {
  const userMessage = req.body.message.toLowerCase();
  let response = mentalHealthResponses.default;

  for (const [key, value] of Object.entries(mentalHealthResponses)) {
    if (userMessage.includes(key)) {
      response = value;
      break;
    }
  }

  res.json({ message: response });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));