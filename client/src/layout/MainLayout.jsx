import { AppSidebar } from "@/components/AppSidebar";
import ContentHeader from "@/components/ContentHeader";
import MainContent from "@/components/MainContent";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { useEffect, useRef, useState } from "react";

const isStaticWidth = true;

function MainLayout({ children, user }) {
    const [navHeight, setNavHight] = useState(62);
    const [isFullWidth, setIsFullWidth] = useState();
    const navbarRef = useRef();

    useEffect(() => {
        const height = navbarRef.current.offsetHeight;
        setNavHight(height + 2)
    }, [])

    // style={{ maxWidth: `${LAYOUT_WIDTH}` }}
    return (
        <div className="flex flex-col items-center bg-sidebar ">
            <Navbar navbarRef={navbarRef} isFullWidth={isFullWidth} setWidth={setIsFullWidth}/>
            {/* Can remove div below leter if you Ok with one collor */}
            {/* <div className="flex justify-center w-full"> */}
            <SidebarProvider className={`flex justify-center ${isFullWidth ? 'max-w-7xl' : 'w-full'}`}>
                {/* {user && <Sidebar navHeight={navHeight} />} */}
                {user && <AppSidebar navHeight={navHeight} style={{ top: `${navHeight}px` }} />}
                {/* Main Content Area */}
                <SidebarInset className='border-t-black '>
                    {user && <ContentHeader navHeight={navHeight} />}
                    <MainContent>
                        {children}
                    </MainContent>
                </SidebarInset>
            </SidebarProvider>
            {/* </div> */}
        </div>
    );
}

export default MainLayout;