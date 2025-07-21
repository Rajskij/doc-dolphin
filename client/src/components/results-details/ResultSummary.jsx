import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { CardAction } from "@/components/ui/card"
import { Ellipsis, Pen, Trash2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

function ResultSummary({ resultDetails, setIsEdit, handleDelete }) {
    const isMobile = useIsMobile()

    return (
        <CardAction>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <button className="p-1 opacity-0 group-hover:opacity-100 rounded-sm hover:bg-accent data-[state=open]:opacity-100 ">
                        <Ellipsis />
                    </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                    className="w-24 rounded-lg"
                    align={isMobile ? "end" : "start"}>
                    <DropdownMenuItem onClick={() => setIsEdit(true)}>
                        <Pen />
                        <span>Edit Title</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem variant="destructive" onClick={() => handleDelete(resultDetails._id)}>
                        <Trash2 />
                        <span>Delete</span>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </CardAction>
    );
}

export default ResultSummary;
