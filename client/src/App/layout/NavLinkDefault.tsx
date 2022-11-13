import Link from "../../style/Link";

import GetIcon from '@mui/icons-material/CompareArrowsTwoTone';

const NavLinkDefault = () => {

    return (

        <>
            <Link to={'/login'} className="nav_link"><span>{<GetIcon></GetIcon>}</span>Login</Link>

        </>
    )
}

export default NavLinkDefault;