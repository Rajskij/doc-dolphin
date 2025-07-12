// Sidebar.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Sidebar({ navHeight }) {
    const [isOpen, setIsOpen] = useState(true);

    return (
        <aside
            className="sticky w-42 bg-gray-200 flex flex-col"
            style={{
                top: `${navHeight}px`,
                height: `calc(100vh - ${navHeight}px)`
            }}
        >
            {/* Sidebar Header (fixed) */}
            <div className="p-4 border-b border-gray-300">
                <h2 className="font-bold">Sidebar</h2>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto p-4">
                <ul className="space-y-2">
                    <Link to='/' className="block py-2 px-3 hover:bg-gray-300 rounded">
                        <span className="material-symbols-outlined mr-2">home</span>
                        {isOpen && 'Home'}
                    </Link>
                    <Link to='/users' className="block py-2 px-3 hover:bg-gray-300 rounded">
                        <span className="material-symbols-outlined mr-2">account_circle</span>
                        {isOpen && 'Users'}
                    </Link>
                    <Link to='/about' className="block py-2 px-3 hover:bg-gray-300 rounded">
                        <span className="material-symbols-outlined mr-2">info</span>
                        {isOpen && 'About'}
                    </Link>
                </ul>
            </div>
            
            {/* Optional Sidebar Footer (fixed) */}
            <div className="p-4 border-t border-gray-300">
                <p>Footer</p>
            </div>
        </aside>
    );
}
