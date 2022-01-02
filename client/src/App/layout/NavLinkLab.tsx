import * as React from 'react'
import Link from "../../style/Link";


const NavLinkLab = () => {

    return (

        <>

           
            <Link to={'/verifyresult'} className="nav_link" children='Verify Result' />
            <Link to={'/result'} className="nav_link" children='Result' />
        </>
    )
}

export default NavLinkLab