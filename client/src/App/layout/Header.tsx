import { observer } from "mobx-react-lite";
import Link from "../../style/Link";
import styled from "styled-components";
import { ReactComponent as UserAvatar } from '../../utils/user.svg'
import { useStore } from "../../store/appStore";
import { Button } from "../structure/FormElement";


const HeaderS = styled.header`
display: flex;
justify-content: space-around;
align-items: center;
grid-column: 1 / -1;
grid-row: 1 / 2;
height: 12vh;
min-height: 9vh;
color: #fff;
position: sticky;
top:0px;
/* background-image: linear-gradient(120deg, #71cbce ,rgba(113, 158, 206, 0.5) );  */
background-color: #194060;
top: 0;
left: 8%;
z-index: 2001;
& #header_group {
width: 30%;
display: flex;
justify-content: flex-end;
align-items: center;
}
& #user_name {
    margin-right: 1rem;
}
& #logo {
    margin-right: auto;
}
`


const Header = observer(function Header() {
    const { userStore } = useStore()


    return (
        <>

            <HeaderS>
                <h2 id="logo"><Link className="nav_link" to='/'>The Lab</Link></h2>
                <div id="header_group">
                    <h4 id="user_name">{userStore.user?.userName}</h4>
                    {userStore.isLogIn() ? <h4 onClick={() => userStore.logout()}><Button position='relative' to='/login'>Log Out</Button></h4> :
                        <Link className='nav_link' to='/login'><UserAvatar /> 	&nbsp; Log in</Link>}
                </div>
            </HeaderS>
        </>
    )
})

export default Header