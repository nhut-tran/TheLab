import Link from "../../style/Link";
import AddIcon from '@mui/icons-material/Add';
import PageviewIcon from '@mui/icons-material/Pageview';

const NavLinkRe = () => {

    return (

        <>
            <Link to={'/new'} className="nav_link"><span>{<AddIcon />}</span>New Samples</Link>
            <Link to={'/verify'} className="nav_link"><span>{<PageviewIcon />}</span>Verify WorkSheet</Link>
        </>
    )
}

export default NavLinkRe