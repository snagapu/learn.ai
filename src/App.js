import React, { useState } from "react";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    window.speechSynthesis.speak(utterance);
  };

  const handleAsk = async () => {
    if (!question.trim()) return;
    setLoading(true);
    try {
      const response = await fetch("https://learn-ai-c8w5.onrender.com/api/tutor", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question }),
      });

      const data = await response.json();
      setAnswer(data.answer);
      speak(data.answer);
    } catch (err) {
      console.error("Error fetching answer:", err);
      setAnswer("Sorry, something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-4">Learn.ai - Your AI Learning Tutor</h1>
      <input
        type="text"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        placeholder="Ask me anything..."
        className="w-full max-w-md p-2 rounded border border-gray-300"
      />
      <button
        onClick={handleAsk}
        disabled={loading}
        className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        {loading ? "Thinking..." : "Ask"}
      </button>
      {answer && (
        <div className="mt-6 w-full max-w-md bg-white p-4 rounded shadow">
          <p className="text-gray-800 whitespace-pre-line">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
