import * as React from 'react'
import styled from 'styled-components'
import navLinkConfig from '../../config/NavLinkConfig'
import { useStore } from '../../store/appStore'

interface SideBarProps {
    className?: string
}

const SideBarC = ({ className }: SideBarProps) => {
    const { userStore } = useStore()
    const def = userStore.user?.department.toString() || 'Mi';

    const Component = navLinkConfig[def]
    return (

        <div className={className}>
            {
                userStore.isLogIn() && <Component />

            }
        </div>
    )
}


const SideBar = styled(SideBarC)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    flex: 0 1 auto;
    grid-column: 1 / 2;
    grid-row: 1 / -1;
    height: 100%;
    position: sticky;
    bottom: 0;
    background-color:#194060;
    margin-right: 0;
    margin-top: 0;
    z-index: 2000;
    color: #fff;
    
    
`

export default SideBar