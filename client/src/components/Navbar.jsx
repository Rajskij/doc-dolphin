import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { GiDolphin } from "react-icons/gi";
import { ThemeSwitcher } from "./ui/ThemeSwitcher";
import { useTheme } from "@/context/ThemProvider";

function Navbar({ navbarRef }) {
    const { theme, setTheme } = useTheme()
    const { user } = useAuthContext();
    const { logout } = useLogout()
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }
    return (
        <header ref={navbarRef} className='flex justify-center w-full sticky top-0 z-10 text-white p-4 bg-green-300'>
            <nav className="flex justify-between content-center text-foreground max-w-300 w-full px-3">
                <Link to='/' className="flex content-center">
                    <GiDolphin className="text-3xl mr-4" />
                    <h1 className='text-xl font-bold'>Doc Dolphin</h1>
                </Link>
                <div className='flex content-center'>
                    <div className={`flex items-center justify-center ${theme === 'dark' && 'dark bg-black'}`}>
                        <ThemeSwitcher value={theme} onChange={setTheme} />
                    </div>
                    {user && (
                        <div className="flex items-center">
                            <h3 className="ml-4">{user.email}</h3>
                            <span onClick={handleLogout} className="ml-3 cursor-pointer">Log out</span>
                        </div>
                    )}
                    {!user && <Link to="/login">Log in</Link>}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
