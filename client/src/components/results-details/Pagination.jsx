import { ChevronFirst, ChevronLast, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

function Pagination({ page, setPage, totalPages }) {
    return (
        <div className="ml-auto flex items-center gap-2">
            <div className="flex w-fit items-center justify-center text-sm font-medium">
                {`Page ${page} of ${totalPages}`}
            </div>
            <Button
                variant="outline"
                className="hidden h-8 w-8 p-0 lg:flex"
                onClick={() => setPage(1)}
                disabled={page === 1}>
                <ChevronFirst />
            </Button>
            <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => setPage(prev => prev - 1)}
                disabled={page === 1}>
                <ChevronLeft />
            </Button>
            <Button
                variant="outline"
                className="size-8"
                size="icon"
                onClick={() => setPage(prev => prev + 1)}
                disabled={page === totalPages}>
                <ChevronRight />
            </Button>
            <Button
                variant="outline"
                className="hidden size-8 lg:flex"
                size="icon"
                onClick={() => setPage(totalPages)}
                disabled={page === totalPages}>
                <ChevronLast />
            </Button>
        </div>
    );
}

export default Pagination;
