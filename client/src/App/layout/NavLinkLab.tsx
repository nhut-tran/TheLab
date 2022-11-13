import Link from "../../style/Link";
import CheckIcon from '@mui/icons-material/LibraryAddCheck';
import GetIcon from '@mui/icons-material/CompareArrowsTwoTone';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import CreateIcon from '@mui/icons-material/Create';
const NavLinkLab = () => {

    return (

        <>

            <Link to={'/verify'} className="nav_link"><span>{<CheckIcon></CheckIcon>}</span>Verify WorkSheet</Link>
            <Link to={'/WorkSheetForResult'} className="nav_link"><span>{<GetIcon></GetIcon>}</span>Input Result</Link>
            <Link to={'/verifyresult'} className="nav_link"><span>{<FindInPageIcon></FindInPageIcon>}</span>Verify Result</Link>
            <Link to={'/manage-method'} className="nav_link"><span>{<CreateIcon></CreateIcon>}</span>Manage Method</Link>
        </>
    )
}

export default NavLinkLab