import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import styled, { keyframes } from "styled-components";
import { useStore } from "../../store/appStore";
import { BasicStyleLink } from "../../style/Link";
import UserIcon from '@mui/icons-material/Person';
import WidgetsIcon from '@mui/icons-material/Widgets';


const StyleHeader = styled.header`
display: flex;
align-items: center;
justify-content:flex-start;
height: 12vh;
min-height: 9vh;
position: fixed;
width: 100%;
top: 0;
left:20rem;
box-shadow: 0px 5px 5px -3px rgba(0, 0, 0, 0.06),0px 8px 10px 1px rgba(0, 0, 0, 0.042),0px 3px 14px 2px rgba(0, 0, 0, 0.036);
z-index: 2001;
background-color: #FFFF;
& .widget {
    margin-right: 70vw;
    margin-left: 2rem;
    font-size: 5rem;
}
& #user_name {
   display: flex;
   position: relative;
   align-items: center;
   width: 5rem;
   height: 5rem;
   justify-content: center;
    align-items: center;
   border-radius: 200px;
   background-color:  #222A45;
   cursor: pointer;
   color: rgba(255, 255, 255, 0.87);
   transition: all 150ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
  
   &:hover {
    outline: 10px solid #222a4588;
    color: #FFFF;
   }
}
& #logo {
    margin-right: auto;
}
`
const appearIn = keyframes`
    from {
        opacity: 0
       
    }

    to {
        opacity: 1;
      
    }
`
const StyleHeaderMenu = styled.ul`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    list-style: none;
    width: 20rem;
    background-color: #FFFF;
    color:rgba(255, 255, 255, 0.95);
    min-height: 100px;
    border-radius: 3px;
    position: absolute;
    top: 90%;
    right: -100%;
    padding:0px ;
    box-shadow: 5px 5px 3px 3px rgba(0, 0, 0, 0.08);
    outline:0.5px solid rgba(0, 0, 0, 0.08);
    animation: ${appearIn} 0.45s ease-in-out;
    background-color: rgba(0, 0, 0, 0.02);
    transform-origin: bottom;
   
    z-index: 3000;
    li {
        width: 100%;
    }
    
    
`

const StyleHeaderLink = styled(BasicStyleLink)`
    color:#222A45;
    width: 100%;
    padding: 1.5rem 1rem;
    justify-content: center;
    font-weight: normal;
    &:hover {
        background-color: rgba(0, 0, 0, 0.08);
    }

`

const Header = observer(function Header() {
    const { userStore } = useStore();
    const [open, setOpen] = useState(false);
    const handleOpen = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen((prev) => !prev);

    }

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setOpen(false);

    }
    let timeout: NodeJS.Timeout;
    const hanldeCloseOnMoveLeave = (e: React.MouseEvent) => {
        timeout = setTimeout(() => handleClose(e), 900)
    }
    useEffect(() => () => {
        clearTimeout(timeout)
    }, [])
    return (
        <>

            <StyleHeader>
                <BasicStyleLink className="widget" to="/dashboard"><WidgetsIcon color="info" fontSize="inherit" /></BasicStyleLink>

                <h4 id="user_name" onClick={handleOpen}> {userStore.isLogIn() ? userStore.user.userName.substring(0, 2) : <UserIcon color="info" />}
                    {open && <StyleHeaderMenu onMouseLeave={hanldeCloseOnMoveLeave} >
                        {
                            userStore.isLogIn() ?
                                <>
                                    <li onClick={(e) => {
                                        handleClose(e);
                                        userStore.logout();
                                    }} ><StyleHeaderLink className="header-menu-item" to="">Log out</StyleHeaderLink></li>
                                </>
                                :
                                <>  <li onClick={handleClose}><StyleHeaderLink className="header-menu-item" to="/intro">How to use guide</StyleHeaderLink></li>
                                    <li onClick={handleClose} ><StyleHeaderLink className="header-menu-item" to="/login">Log In</StyleHeaderLink></li>
                                </>
                        }
                    </StyleHeaderMenu>}
                </h4>
            </StyleHeader>
        </>
    )
})

export default Header