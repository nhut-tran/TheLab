import Link from "../../style/Link";
import PageviewIcon from '@mui/icons-material/Pageview';

const NavLinkManager = () => {

    return (

        <>

            <Link to={'/verify'} className="nav_link"><span>{<PageviewIcon />}</span>Verify WorkSheet</Link>

        </>
    )
}

export default NavLinkManager