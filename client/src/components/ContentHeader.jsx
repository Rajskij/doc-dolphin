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
        console.log(path);
        if (path.includes('/result') && params.result_id) {
            return breadcrumbsConfig['/result/:result_id'];
        }
        return breadcrumbsConfig[path];
    };

    return (
        <div className={`flex sticky items-center gap-2 px-4 py-2 bg-background shadow-sm shadow-muted rounded-t-xl z-10`} style={{ top: `${navHeight}px` }} >
            <SidebarTrigger className="-ml-1" />
            <Separator
                orientation="vertical"
                className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb className={`flex`}>
                <BreadcrumbList>
                    {getBreadcrumbName(location.pathname)?.map((path, i) => (
                        <div key={path} className="flex items-center gap-2">
                            {i !== 0 && <BreadcrumbSeparator className="hidden md:block" />}
                            <BreadcrumbItem className="hidden md:block">
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
    );
}

export default ContentHeader;
