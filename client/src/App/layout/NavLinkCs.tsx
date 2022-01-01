import * as React from 'react'
import Link from "../../style/Link";


const NavLinkCs = () => {

    return (

        <>
            <Link to={'/verify'} className="nav_link" children='Get List WorkSheet' />

            <Link to={'/payment'} className="nav_link" children='Get list of payment' />
        </>
    )
}

export default NavLinkCs