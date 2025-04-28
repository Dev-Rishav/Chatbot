import React, { useContext } from 'react';
import { FiSend } from 'react-icons/fi';
import { FaGem } from 'react-icons/fa';
import { IoBulbOutline, IoCompassOutline, IoCodeSlash } from 'react-icons/io5';
import { Context } from '../context/Context';
import logo from '../assets/logo.png'; 
import helper from './helper';

const Main = () => {
    const {
        onSent,
        recentPrompt,
        showResult,
        loading,
        resultData,
        setInput,
        input,
        newChat
    } = useContext(Context);

    const handleKeyPress =async (e) => {
        if (e.key === 'Enter'){
                //   await helper(e.target.value)
            // console.log("Response received",res);
            
            await onSent();
        }
    };

    const handleSuggestion = (prompt) => {
        setInput(prompt);
        onSent();
    };

    const suggestions = [
        {
            prompt: "What is the campus size of MANIT Bhopal",
            icon: <IoCompassOutline className="w-6 h-6 text-blue-600" />,
            bg: "bg-blue-50 hover:bg-blue-100"
        },
        {
            prompt: "Name a popular late-night canteen on campus",
            icon: <IoBulbOutline className="w-6 h-6 text-amber-500" />,
            bg: "bg-amber-50 hover:bg-amber-100"
        },
        {
            prompt: "What is the dating scene like at MANIT",
            icon: <IoCodeSlash className="w-6 h-6 text-rose-500" />,
            bg: "bg-rose-50 hover:bg-rose-100"
        },
        {
            prompt: "What is the name of the artificial lake at MANIT",
            icon: <IoCodeSlash className="w-6 h-6 text-emerald-500" />,
            bg: "bg-emerald-50 hover:bg-emerald-100"
        }
    ];

    return (
        <div className="flex-1 flex flex-col bg-white">
            {/* Header */}
            <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-md border-b border-gray-200 shadow-sm px-6 py-4 flex items-center justify-between">
                <div 
                    onClick={newChat}
                    className="flex items-center gap-3 cursor-pointer group"
                >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-md">
                        <img src={logo} alt="CLASS Logo" className="w-8 h-8" />
                    </div>
                    <h1 className="text-xl font-bold">
                        <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">CLASS</span>
                        <span className="block text-xs font-normal text-blue-600">Campus Life Assistant and Student Support</span>
                    </h1>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-gray-300 shadow-sm flex items-center justify-center">
                    <img src={logo} alt="Logo" className="w-6 h-6" />
                </div>
            </header>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto p-6">
                {showResult ? (
                    <div className="max-w-3xl mx-auto space-y-6">
                        {/* User Question */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-white/80 backdrop-blur-md border border-gray-200 shadow-sm flex items-center justify-center flex-shrink-0">
                                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                                    <span className="text-blue-600 font-bold">U</span>
                                </div>
                            </div>
                            <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 flex-1 border border-gray-200 shadow-sm">
                                <p className="text-gray-800 font-medium">{recentPrompt}</p>
                            </div>
                        </div>

                        {/* AI Response */}
                        <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 shadow-md flex items-center justify-center flex-shrink-0">
                                <FaGem className="text-white text-lg" />
                            </div>
                            <div className="bg-white/80 backdrop-blur-md rounded-xl p-4 flex-1 min-h-32 border border-gray-200 shadow-sm">
                                {loading ? (
                                    <div className="space-y-3">
                                        <div className="flex space-x-2">
                                            {[...Array(3)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-2.5 h-2.5 bg-blue-500 rounded-full animate-bounce"
                                                    style={{ animationDelay: `${i * 0.2}s` }}
                                                />
                                            ))}
                                        </div>
                                        <p className="text-blue-600 font-medium text-sm">
                                            CLASS is thinking...
                                        </p>
                                    </div>
                                ) : (
                                    <div className="text-gray-700 prose max-w-none" dangerouslySetInnerHTML={{ __html: resultData }} />
                                )}
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="max-w-4xl mx-auto text-center py-8">
                        {/* Welcome Section */}
                        <div className="mb-12">
                            <div className="w-20 h-20 mx-auto rounded-2xl bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg flex items-center justify-center mb-6">
                                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-md flex items-center justify-center">
                                    <img src={logo} alt="CLASS Logo" className="w-10 h-10" />
                                </div>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-3">
                                Hello, I'm <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">CLASS</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-1">Your Campus Life Assistant</p>
                            <p className="text-gray-500">Developed by Rishav and Atul</p>
                        </div>

                        {/* Suggestions */}
                        <div className="mb-12">
                            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
                                Quick Suggestions
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {suggestions.map((item, index) => (
                                    <button
                                        key={index}
                                        onClick={() => handleSuggestion(item.prompt)}
                                        className={`${item.bg} rounded-xl p-5 text-left group transition-all duration-300 border border-gray-200 shadow-sm hover:shadow-md`}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="p-2 rounded-lg bg-white border border-gray-200 group-hover:border-blue-300 transition-colors">
                                                {item.icon}
                                            </div>
                                            <p className="text-gray-700 font-medium group-hover:text-blue-600 transition-colors">
                                                {item.prompt}
                                            </p>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Input Section */}
            <div className="sticky bottom-0 bg-white/80 backdrop-blur-md border-t border-gray-200 shadow-lg py-4 px-6">
                <div className="max-w-3xl mx-auto">
                    <div className="flex items-center bg-white/90 rounded-full px-5 py-3 border border-gray-300 shadow-inner focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-200 transition-all">
                        <input
                            onChange={(e) => setInput(e.target.value)}
                            value={input}
                            onKeyPress={handleKeyPress}
                            type="text"
                            placeholder="Ask me anything about campus..."
                            className="flex-1 bg-transparent border-none outline-none text-gray-700 placeholder-gray-400 text-sm"
                        />
                        <button 
                            onClick={onSent}
                            disabled={!input.trim()}
                            className={`p-2 rounded-full ml-3 ${input.trim() ? 'bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md hover:shadow-lg' : 'bg-gray-200 text-gray-400'} transition-all`}
                        >
                            <FiSend className="w-5 h-5" />
                        </button>
                    </div>
                    <p className="text-xs text-center text-gray-500 mt-3">
                        CLASS may display inaccurate info. Please verify important details.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Main;