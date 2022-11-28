import * as React from 'react'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface Props {
    className: string,
    to: string
    children: ReactNode
    onClick?: () => void
}

const NavLinkC = ({ className, to, children }: Props) => {
    return <Link to={to} className={className} children={children} />
}
export const BasicStyleLink = styled(NavLinkC)`
    text-decoration: none;
    display: flex;
    align-items: center;`


const StyleNavLink = styled(BasicStyleLink)`
    
    padding: 2rem 1rem;
    transition: all 0.3s;
    color: inherit;
    width: 100%;
    & span {
        margin-right: 5px;
    }
    &:hover {
        color: #FFFF;
        background:rgba(0,0,0,.2)
    }
    transition: all 0.5s ease-in-out;
`;

export const ButtonLink = styled(StyleNavLink)`
text-decoration: none;
display: flex;
justify-content: center;
align-items: center;
padding: 0.3rem 0.2rem;
margin-left: auto;
margin-right: auto;
padding: 20px 30px;
text-align: center;
margin-bottom: 1rem;
border-bottom: 2px solid #ffff;
background-color: #00FFFF;
color: #ffff;
font-weight: 900;
&:hover {
color: #ffff;
background-color: #00FF00
}
transition: all 0.3s;
`;

export default StyleNavLink
