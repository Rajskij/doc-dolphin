import ContentHeader from "@/components/ContentHeader";
import MainContent from "@/components/MainContent";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { useEffect, useRef, useState } from "react";

function MainLayout({ children, user }) {
    const [navHeight, setNavHight] = useState(64);
    const navbarRef = useRef();

    useEffect(() => {
        const height = navbarRef.current.offsetHeight;
        setNavHight(height)
    }, [])

    return (
        <div>
            <Navbar navbarRef={navbarRef} />
            <div className="flex flex-1">
                {user && <Sidebar navHeight={navHeight} />}
                {/* Main Content Area */}
                <div className='flex-1'>
                    {user && <ContentHeader navHeight={navHeight} />}
                    <MainContent>
                        {children}
                    </MainContent>
                </div>
            </div>
        </div>
    );
}

export default MainLayout;