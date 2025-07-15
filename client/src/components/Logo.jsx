import { GiDolphin } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";

function Logo() {
    const isMobile = useIsMobile()

    return (
        <Link to='/' className="flex text-primary">
            <GiDolphin className="text-3xl mr-4" />
            {!isMobile && <h1 className='text-xl font-bold'>Doc Dolphin</h1>}
        </Link>
    );
}

export default Logo;