import * as React from 'react'
import Link from "../../style/Link";


const NavLinkRe = () => {

    return (

        <>
            <Link to={'/new'} className="nav_link" children='new sample' />
            <Link to={'/verify'} className="nav_link" children='Verify WorkSheet' />
        </>
    )
}

export default NavLinkRe