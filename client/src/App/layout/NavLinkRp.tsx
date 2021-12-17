import * as React from 'react'
import Link from "../../style/Link";


const NavLinkRp = () => {

    return (

        <>
            <Link to={'/new'} className="nav_link" children='Export Report' />

            <Link to={'/verify'} className="nav_link" children='Verify' />
        </>
    )
}

export default NavLinkRp