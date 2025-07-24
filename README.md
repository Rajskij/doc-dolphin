# Doc Dolphin

**Live Demo**: [doc-dolphin.app](https://doc-dolphin.netlify.app)

**Project Management**: [Trello Board](https://trello.com/b/YPy1X7Pj)

**Doc Dolphin** is an AI-powered health companion that helps you analyze medical tests, track mood patterns, and gain meaningful insights about your emotional well-being.

## Features

### Test Analyzer
- Upload or enter results from psychological, diagnostic, or personality tests
- Get AI-generated insights about your test results
- Save your test history for future reference

### Results Dashboard
- Centralized view of all your saved test results
- Compare different test sessions over time

### Mood Journal
- Simple, expressive daily mood logging interface
- Add notes and reflections to each entry

### Mood History
- Interactive charts showing emotional trends
- Modify existing entries
- Remove unwanted records

### Mood Insights
- AI-powered analysis of your emotional patterns
- Personalized tips based on your journal entries
- Early detection of concerning trends

## Installation

### Clone the repository:

```bash
git clone https://github.com/Rajskij/doc-dolphin.git
```

### Client Setup (React Frontend)

1. Navigate to the client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

### Server Setup (Backend)

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.example .env
# Fill in your API keys and database configuration
```

4. Start the server:
```bash
npm start
```

## Tech Stack

**Frontend**:
- React.js with Hooks and Context
- ShadCN components
- Tailwind CSS + Lucide icons for styling
- Fetch API for communication and streaming
- React Router for navigation

**Backend**:
- Node.js with Express
- MongoDB
- Bcrypt for password encryption and validation
- JWT for authentication
- Ollama for LLM model interaction

**AI Features**:
- OCR (Optical Character Recognition) for image reading
- Psychological test analysis
- Mood pattern recognition

## Configuration

Required environment variables:

```
# Backend (.env)
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=8000
```

> **Important Note**: Doc Dolphin is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or qualified mental health provider.
