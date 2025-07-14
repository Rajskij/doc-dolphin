import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { GiDolphin } from "react-icons/gi";
import { ThemeSwitcher } from "./ui/ThemeSwitcher";
import { useTheme } from "@/context/ThemProvider";
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle";
import { GalleryHorizontalIcon } from "lucide-react";

function Navbar({ navbarRef, isFullWidth, setWidth }) {
    const { theme, setTheme } = useTheme()
    const { user } = useAuthContext();
    const { logout } = useLogout()
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }
    return (
        <header ref={navbarRef} className='sticky flex justify-center w-full top-0 z-10 p-4 bg-sidebar'>
            <nav className={`flex justify-between content-center text-foreground ${isFullWidth && 'max-w-7xl'} w-full px-3 `}>
                <Link to='/' className="flex content-center">
                    <GiDolphin className="text-3xl mr-4" />
                    <h1 className='text-xl font-bold'>Doc Dolphin</h1>
                </Link>
                <div className='flex content-center'>
                    {user && (
                        <div className="flex items-center">
                            <h3 className="mr-4">{user.email}</h3>
                            <span onClick={handleLogout} className="cursor-pointer">Log out</span>
                        </div>
                    )}
                    {!user && <Link to="/login">Log in</Link>}
                    <Separator orientation="vertical" className="mx-3 h-4" />
                    <Toggle onClick={() => setWidth(!isFullWidth)} aria-label="Toggle italic">
                        <GalleryHorizontalIcon className="h-4 w-4" />
                    </Toggle>
                    <Separator orientation="vertical" className="mx-3 h-4" />
                    <div className={`flex items-center justify-center`}>
                        <ThemeSwitcher value={theme} onChange={setTheme} />
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
