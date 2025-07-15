import { AppSidebar } from "@/components/AppSidebar";
import ContentHeader from "@/components/ContentHeader";
import MainContent from "@/components/MainContent";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";

function MainLayout({ user }) {
    const [navHeight, setNavHight] = useState(62);
    const [isStaticWidth, setIsFullWidth] = useState(true);
    const navbarRef = useRef();

    useEffect(() => {
        const height = navbarRef.current.offsetHeight;
        setNavHight(height)
    }, [])

    // style={{ maxWidth: `${LAYOUT_WIDTH}` }}
    return (
        <SidebarProvider className="flex flex-col items-center bg-sidebar">
            <Navbar navbarRef={navbarRef} isStaticWidth={isStaticWidth} setWidth={setIsFullWidth} />
            <div className={`flex justify-center ${isStaticWidth && 'max-w-7xl'} w-full`}>
                {user && <AppSidebar variant="inset" style={{ top: `${navHeight}px` }} />}
                {/* Main Content Area */}
                <SidebarInset className='mx-4 mb-4 bg-muted rounded-xl'>
                    {user && <ContentHeader navHeight={navHeight} />}
                    <MainContent>
                        <Outlet />
                    </MainContent>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

export default MainLayout;
