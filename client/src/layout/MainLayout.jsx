import { AppSidebar } from "@/components/sidebar/AppSidebar";
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
    const insetRef = useRef();

    useEffect(() => {
        const height = navbarRef.current.offsetHeight;
        setNavHight(height)
    }, [])

    return (
        <SidebarProvider className="flex flex-col items-center bg-sidebar">
            <Navbar navbarRef={navbarRef} isStaticWidth={isStaticWidth} setWidth={setIsFullWidth} />
            <div className={`flex justify-center ${isStaticWidth && 'max-w-7xl'} w-full`}>
                {user && <AppSidebar variant="inset" style={{ top: `${navHeight}px` }} />}
                {/* Main Content Area */}
                <SidebarInset ref={insetRef} className='mb-4'>
                    {user && <ContentHeader navHeight={navHeight} />}
                    <MainContent insetRef={insetRef} navHeight={navHeight}>
                        <Outlet />
                    </MainContent>
                </SidebarInset>
            </div>
        </SidebarProvider>
    );
}

export default MainLayout;
