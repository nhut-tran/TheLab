
import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import navLinkConfig from '../../config/NavLinkConfig';
import { useStore } from '../../store/appStore';
interface SideBarProps {
    className?: string
}

const SideBarC = observer(({ className }: SideBarProps) => {

    const { userStore } = useStore();
    console.log('run', userStore.isLogIn())
    let Component = navLinkConfig["default"]
    if (userStore.isLogIn()) {
        Component = navLinkConfig[userStore.user.department]
    }

    return (

        <div className={className}>
            <h2 id="logo"><Link className="nav_link" to='/'>TheLab</Link></h2>
            <Component />
        </div>
    )
})


const SideBar = styled(SideBarC)`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    flex: 0 1 auto;
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    width: 20rem;
    height: 100%;
    position: fixed;
    top:0;
    left: 0;
    background-color:#222A45;
    z-index: 2000;
    color:rgba(255, 255, 255, 0.7);
    & #logo {
        display: flex;
        align-self: center;
        background-color: #ff9e43;
        font-size: 2rem;
        height: 8rem;
        width: 8rem;
        border-radius: 200px;
        align-items:center;
        justify-content: center;
        vertical-align: center;
        margin-bottom: 8rem;
        & a {
            text-decoration:none;
            color: #FFFF;
        }
    }
    
`

export default SideBar