import { AppSidebar } from "@/components/AppSidebar";
import ContentHeader from "@/components/ContentHeader";
import MainContent from "@/components/MainContent";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useEffect, useRef, useState } from "react";

function MainLayout({ children, user }) {
    const [navHeight, setNavHight] = useState(62);
    const navbarRef = useRef();

    useEffect(() => {
        const height = navbarRef.current.offsetHeight;
        setNavHight(height + 2)
    }, [])

    return (
        <div className="flex flex-col items-center">
            <Navbar navbarRef={navbarRef} />
                <SidebarProvider className="flex flex-1 max-w-250 w-full">
                    {/* {user && <Sidebar navHeight={navHeight} />} */}
                    {user && <AppSidebar navHeight={navHeight} />}
                    {/* Main Content Area */}
                    <div className='flex-1'>
                        {user && <ContentHeader navHeight={navHeight} />}
                        <MainContent>
                            {children}
                        </MainContent>
                    </div>
                </SidebarProvider>
        </div>
    );
}

export default MainLayout;