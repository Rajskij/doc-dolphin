import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Label } from "@/components/ui/label";

function DropdownSelector({ rows, setRows }) {
    return (
        <div className="hidden items-center gap-2 lg:flex">
            <Label htmlFor="rows-per-page" className="text-sm font-medium">
                Rows per page
            </Label>
            <Select
                value={rows}
                onValueChange={(value) => {
                    setRows(Number(value))
                }}>
                <SelectTrigger size="sm" className="w-20" id="rows-per-page">
                    <SelectValue placeholder={rows} />
                </SelectTrigger>
                <SelectContent side="top">
                    {[5, 10, 15, 20].map((pageSize) => (
                        <SelectItem key={pageSize} value={pageSize}>
                            {pageSize}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    );
}

export default DropdownSelector;