import { Separator } from '@/components/ui/separator';

function NotFound() {
    return (
        <div className='flex justify-center items-center h-200 bg-background w-full'>
            <h1 className='text-2xl'>404</h1>
            <Separator
                orientation="vertical"
                className="mx-6 data-[orientation=vertical]:h-14"
            />
            <h2 className='text-xl'>This page could not be found</h2>
        </div>
    );
}

export default NotFound;
