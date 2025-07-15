import {
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { useLogout } from "@/hooks/useLogout";
import { BadgeCheck, Bell, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";

function UserAction() {
    const { logout } = useLogout()
    const navigate = useNavigate();

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <>
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Bell />
                    Notifications
                </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
                <LogOut />
                Log out
            </DropdownMenuItem>
        </>
    );
}

export default UserAction;