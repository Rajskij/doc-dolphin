import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Link, useLocation, useParams } from "react-router-dom";

const breadcrumbsConfig = {
    '/': [{
        name: 'Home',
        url: '/'
    }],
    '/analyze': [{
        name: 'Analyze Test',
        url: '/analyze'
    }],
    '/results': [{
        name: 'Test Results',
        url: '/results'
    }],
    '/result/:result_id': [{
        name: 'Test Results',
        url: '/results'
    },
    {
        name: 'Result Details',
        url: null
    }],
    '/mood': [{
        name: 'Log Mood',
        url: '/mood'
    }],
    '/mood/history': [{
        name: 'Mood History',
        url: '/mood/history'
    }],
    '/mood/insights': [{
        name: 'Mood Insights',
        url: '/mood/insights'
    }]
};

function ContentHeader({ navHeight }) {
    const params = useParams();
    const location = useLocation();

    const getBreadcrumbName = (path) => {
        if (path.includes('/result') && params.result_id) {
            return breadcrumbsConfig['/result/:result_id'];
        }
        return breadcrumbsConfig[path];
    };

    return (
        <div className={`flex sticky items-center bg-sidebar shadow-sm shadow-sidebar z-10`} style={{ top: `${navHeight}px` }} >
            {/* Div above to maintain rounded corners while scrolling */}
            <div className='flex flex-1 gap-2 px-4 py-2 bg-background rounded-t-xl'>
                <SidebarTrigger className="-ml-1" />
                <Separator
                    orientation="vertical"
                    className="mr-2 data-[orientation=vertical]:h-4"
                />
                <Breadcrumb className={`flex`}>
                    <BreadcrumbList>
                        {getBreadcrumbName(location.pathname)?.map((path, i) => (
                            <div key={path + i} className="flex items-center gap-2">
                                {i !== 0 && <BreadcrumbSeparator className="" />}
                                <BreadcrumbItem className="">
                                    {i === 0
                                        ? <Link to={path.url}>{path.name}</Link>
                                        : path.name
                                    }
                                </BreadcrumbItem>
                            </div>
                        ))}
                    </BreadcrumbList>
                </Breadcrumb>
            </div>
        </div>
    );
}

export default ContentHeader;
