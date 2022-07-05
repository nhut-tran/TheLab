import * as React from 'react'
import Link from "../../style/Link";
import ArticleIcon from '@mui/icons-material/Article';
import EmailIcon from '@mui/icons-material/MarkEmailRead';

const NavLinkRp = () => {

    return (

        <>
            <Link to={'/new'} className="nav_link"><span>{<ArticleIcon />}</span>Export Report</Link>
            <Link to={'/sendemail'} className="nav_link"><span>{<EmailIcon />}</span>Send Email</Link>

        </>
    )
}

export default NavLinkRp