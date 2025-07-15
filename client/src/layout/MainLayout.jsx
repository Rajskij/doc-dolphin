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
    const [isStaticWidth, setIsFullWidth] = useState(true);
    const navbarRef = useRef();

    useEffect(() => {
        const height = navbarRef.current.offsetHeight;
        setNavHight(height)
    }, [])

    // style={{ maxWidth: `${LAYOUT_WIDTH}` }}
    return (
        <SidebarProvider className="flex flex-col items-center bg-sidebar ">
            <Navbar navbarRef={navbarRef} isStaticWidth={isStaticWidth} setWidth={setIsFullWidth} />
            {/* Can remove div below leter if you Ok with one collor */}
            {/* <div className="flex justify-center w-full"> */}
            <div className={`flex justify-center ${isStaticWidth && 'max-w-7xl'} w-full`}>
                {/* {user && <Sidebar navHeight={navHeight} />} */}
                {user && <AppSidebar variant="inset" style={{ top: `${navHeight}px` }} />}
                {/* Main Content Area */}
                <SidebarInset className='mx-4 top-70px'>
                        {user && <ContentHeader navHeight={navHeight} />}
                        <MainContent>{children}</MainContent>
                </SidebarInset>
            </div>
            {/* </div> */}
        </SidebarProvider>
    );
}

export default MainLayout;

//  <div className="flex flex-col items-center bg-sidebar ">
//             <Navbar navbarRef={navbarRef} isStaticWidth={isStaticWidth} setWidth={setIsFullWidth} />
//             <SidebarProvider>
//             {/* Can remove div below leter if you Ok with one collor */}
//             {/* <div className="flex justify-center w-full"> */}
//             <div className={`flex justify-center ${isStaticWidth && 'max-w-7xl'} w-full h-screen mb-4`}>
//                 {/* {user && <Sidebar navHeight={navHeight} />} */}
//                 {user && <AppSidebar variant="inset" navHeight={navHeight} style={{ top: `${navHeight}px` }} />}
//                 {/* Main Content Area */}
//                 <div className="w-full">
//                     {user && <ContentHeader navHeight={navHeight} />}
//                     <SidebarInset className='h-full'>
//                         <MainContent>
//                             {children}
//                         </MainContent>
//                     </SidebarInset>
//                 </div>
//             </div>
//     </SidebarProvider>
//         </div>