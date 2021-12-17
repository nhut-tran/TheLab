import * as React from 'react'
import Link from "../../style/Link";


const NavLinkManager = () => {

    return (

        <>

            <Link to={'/verify'} className="nav_link" children='Verify WorkSheet' />
            <Link to={'/result'} className="nav_link" children='Result' />
        </>
    )
}

export default NavLinkManager