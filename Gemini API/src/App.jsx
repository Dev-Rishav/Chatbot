import { useState } from 'react';
import run from './gemini';

function App() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    try {
      const response = await run(prompt);
      setResponses(prev => [...prev, { prompt, response }]);
      setPrompt('');
    } catch (error) {
      console.error('Error:', error);
      setResponses(prev => [...prev, { prompt, response: "Error getting response" }]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Fixed Header */}
      <header className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 shadow-2xl sticky top-0 z-10">
        <h1 className="text-xl font-bold text-center">Chatbot with Gemini-2.0-Flash API</h1>
      </header>

      {/* Chat Content */}
      <div className="flex-1 overflow-y-auto px-4 space-y-2 mt-1"> 
        {responses.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            Start a conversation with the chatbot
          </div>
        ) : (
          responses.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="bg-blue-500 text-white p-3 rounded-lg max-w-3xl ml-auto">
                {item.prompt}
              </div>
              <div className="bg-gray-200 p-3 rounded-lg max-w-3xl mr-auto">
                {item.response}
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="bg-gray-200 p-3 rounded-lg max-w-3xl mr-auto">
            Processing...
          </div>
        )}
      </div>

      {/* Input Form */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-300 bg-white rounded-3xl m-2">
        <div className="flex space-x-2">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
            disabled={isLoading || !prompt.trim()}
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

export default App;