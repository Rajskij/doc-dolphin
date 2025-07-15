import { useEffect, useRef, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Link } from 'react-router-dom';
import { useLogout } from "../hooks/useLogout";
import { useNavigate } from "react-router-dom";
import { ThemeSwitcher } from "./ui/ThemeSwitcher";
import { useTheme } from "@/context/ThemProvider";
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle";
import { GalleryHorizontalIcon } from "lucide-react";
import { NavUser } from "@/components/NavUser"
import { Button } from "./ui/button";
import Logo from "./Logo";

function Navbar({ navbarRef, isStaticWidth, setWidth }) {
    const { theme, setTheme } = useTheme()
    const { user } = useAuthContext();
    const { logout } = useLogout()
    const navigate = useNavigate();

    const userData = user && {
        name: user.fullName,
        email: user.email,
        avatar: "/avatars/shadcn.jpg",
    };

    return (
        <header ref={navbarRef} className='sticky flex justify-center w-full top-0 z-10 p-4 bg-sidebar h-20'>
            <nav className={`flex justify-between items-center text-foreground ${isStaticWidth && 'max-w-7xl'} w-full px-3`}>
                <Logo />
                <div className='flex items-center' style={{ '--nav-height': `${navbarRef.current?.offsetHeight  / 2}px` }}>
                    {/* {user && (
                        <div className="flex items-center">
                            <h3 className="mr-4">{user.email}</h3>
                            <span onClick={handleLogout} className="cursor-pointer">Log out</span>
                        </div>
                    )} */}
                    <div className={`flex items-center justify-center`}>
                        <ThemeSwitcher value={theme} onChange={setTheme} />
                    </div>
                    <Separator orientation="vertical" className="mx-3 data-[orientation=vertical]:h-[var(--nav-height)] bg-sidebar-border" />
                    <Toggle onClick={() => setWidth(!isStaticWidth)} className='my-auto'>
                        <GalleryHorizontalIcon />
                    </Toggle>
                    <Separator orientation="vertical" className="mx-3 data-[orientation=vertical]:h-[var(--nav-height)] bg-sidebar-border" />
                    {user && <NavUser user={userData} />}
                    {!user && <Link to="/login" className="ml-1"><Button>Log In</Button></Link>}
                </div>
            </nav>
        </header>
    );
}

export default Navbar;
