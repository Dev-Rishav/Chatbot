import React, { useContext, useState } from 'react';
import { FiMenu, FiPlus, FiMessageSquare } from 'react-icons/fi';
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
        <div className={`h-full bg-gradient-to-b from-white to-blue-50 border-r border-gray-200 shadow-lg overflow-hidden flex flex-col justify-between transition-all duration-300 ${extended ? 'w-72' : 'w-20'}`}>
            <div className="p-4">
                {/* Header with Menu Icon */}
                <div className="flex items-center mb-8">
                    <button
                        onClick={() => setExtended(prev => !prev)}
                        className="w-10 h-10 rounded-lg bg-white border border-gray-200 hover:bg-gray-50 flex items-center justify-center transition-all shadow-md"
                    >
                        <FiMenu className="text-blue-600 text-xl" />
                    </button>
                   
                </div>

                {/* New Chat Button */}
                <button
                    onClick={newChat}
                    className={`flex items-center ${extended ? 'px-4 py-3 gap-3' : 'justify-center p-3'} w-full rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 mb-6 transition-all shadow-md`}
                >
                    <FiPlus className="text-white text-lg" />
                    {extended && <span className="text-white text-sm font-medium">New Chat</span>}
                </button>

                {/* Recent Prompts */}
                {extended && (
                    <div className="mt-6">
                        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-4 px-2">Recent Chats</h3>
                        <div className="space-y-2 max-h-[300px] overflow-y-auto pr-2">
                            {prevPrompts.map((item, index) => (
                                <button
                                    key={index}
                                    onClick={() => loadPrompt(item)}
                                    className="flex items-center gap-3 w-full p-3 rounded-lg text-gray-700 hover:text-white hover:bg-blue-500 transition-all text-sm text-left group"
                                >
                                    <div className="p-1.5 rounded-md bg-blue-100 group-hover:bg-white transition-colors">
                                        <FiMessageSquare className="text-blue-500 group-hover:text-blue-600" />
                                    </div>
                                    <span className="truncate flex-1">{item.slice(0, 22)}...</span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* About Card */}
            <div className={`p-4 transition-all ${extended ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
                <div className="bg-white/90 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-md">
                    <div className="flex items-center gap-3 mb-3">
                        
                        <div>
                            <h3 className="text-sm font-bold text-gray-800">C.L.A.S.S</h3>
                            <p className="text-xs text-blue-600">Campus Life Assistant and Student Support</p>
                        </div>
                    </div>
                    <p className="text-xs text-gray-600 mb-2">
                        Your intelligent campus guide answering all MANIT-related queries
                    </p>
                    <div className="flex justify-between items-center text-xs text-gray-500">
                        <span>Developed by</span>
                        <div className="flex gap-1">
                            <span className="font-medium text-blue-600">Rishav</span>
                            <span>&</span>
                            <span className="font-medium text-blue-600">Atul</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;