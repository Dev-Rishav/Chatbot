import React, { useContext, useState } from 'react';
import { FiMenu, FiPlus, FiMessageSquare, FiHelpCircle, FiClock, FiSettings } from 'react-icons/fi';
import { Context } from '../context/Context';
import logo from '../assets/logo.png'; 

const Sidebar = () => {
    const [extended, setExtended] = useState(false);
    const { onSent, prevPrompts, setRecentPrompt, newChat } = useContext(Context);

    const loadPrompt = async (prompt) => {
        setRecentPrompt(prompt);
        await onSent(prompt);
    };

    return (
        <div className={`h-full bg-white/80 backdrop-blur-md border-r border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between transition-all duration-300 ${extended ? 'w-64' : 'w-20'}`}>
            <div className="p-4">
                {/* Menu Icon */}
                <button
                    onClick={() => setExtended(prev => !prev)}
                    className="w-10 h-10 rounded-lg bg-white border border-gray-300 hover:bg-gray-100 flex items-center justify-center mb-6 transition-colors shadow-sm"
                >
                    <FiMenu className="text-blue-600 text-xl" />
                </button>

                {/* New Chat */}
                <button
                    onClick={newChat}
                    className={`flex items-center ${extended ? 'px-4 py-3 gap-3' : 'justify-center p-3'} w-full rounded-lg bg-blue-50 hover:bg-blue-100 mb-6 transition-colors border border-blue-200 shadow-sm`}
                >
                    <FiPlus className="text-blue-600 text-lg" />
                    {extended && <span className="text-blue-600 text-sm font-medium">New Chat</span>}
                </button>

                {/* Recent Prompts */}
                {extended && (
                    <div className="mt-6">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Recent</h3>
                        <div className="space-y-2">
                            {prevPrompts.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => loadPrompt(item)}
                                    className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-colors text-sm text-left border border-transparent hover:border-blue-200"
                                >
                                    <FiMessageSquare className="text-blue-500 flex-shrink-0" />
                                    <span className="truncate">{item.slice(0, 18)}...</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Bottom Menu */}
            <div className="p-4 space-y-2">
                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                    <FiHelpCircle className="text-lg" />
                    {extended && <span className="text-sm">Help</span>}
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                    <FiClock className="text-lg" />
                    {extended && <span className="text-sm">Activity</span>}
                </button>
                <button className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors">
                    <FiSettings className="text-lg" />
                    {extended && <span className="text-sm">Settings</span>}
                </button>
            </div>
        </div>
    );
};

export default Sidebar;