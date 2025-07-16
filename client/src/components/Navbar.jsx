import { Link } from 'react-router-dom';

import { GalleryHorizontalIcon } from "lucide-react";
import { GiDolphin } from "react-icons/gi";
import { Separator } from "@/components/ui/separator"
import { Toggle } from "@/components/ui/toggle";
import { useTheme } from "@/context/ThemProvider";
import { NavUser } from "@/components/NavUser"
import { ThemeSwitcher } from "./ui/ThemeSwitcher";
import { Button } from "./ui/button";
import { useAuthContext } from "@/hooks/useAuthContext";
import { useIsMobile } from "@/hooks/use-mobile";

function Navbar({ navbarRef, isStaticWidth, setWidth }) {
    const { theme, setTheme } = useTheme()
    const { user } = useAuthContext();
    const {isMobile} = useIsMobile();

    const userData = user && {
        name: user.fullName,
        email: user.email,
        avatar: "/avatars/shadcn.jpg",
    };

    return (
        <header ref={navbarRef} className='sticky flex justify-center w-full top-0 z-10 p-4 bg-sidebar h-20'>
            <nav className={`flex justify-between items-center text-foreground ${isStaticWidth && 'max-w-7xl'} w-full px-3`}>
                <Link to='/' className="flex text-primary">
                    <GiDolphin className="text-3xl mr-4" />
                    {!isMobile && <h1 className='text-xl font-bold'>Doc Dolphin</h1>}
                </Link>
                <div className='flex items-center' style={{ '--nav-height': `${navbarRef.current?.offsetHeight / 2}px` }}>
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
