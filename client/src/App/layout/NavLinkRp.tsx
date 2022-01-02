import * as React from 'react'
import Link from "../../style/Link";


const NavLinkRp = () => {

    return (

        <>
            <Link to={'/new'} className="nav_link" children='Export Report' />

            <Link to={'/sendemail'} className="nav_link" children='Send Email' />
        </>
    )
}

export default NavLinkRp