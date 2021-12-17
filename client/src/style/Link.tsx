import * as React from 'react'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

interface Props {
    className: string,
    fontSize?: string,
    to: string
    children: ReactNode
}

const LinkC = ({ className, to, children }: Props) => {
    return <Link to={to} className={className} children={children} />
}

const LinksS = styled(LinkC)`
    text-decoration: none;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.3rem 0.2rem;
    margin-left: auto;
    margin-right: auto;
    width: 90%;
    text-align: center;
    margin-bottom: 1rem;
    border-bottom: 2px solid #ffff;
    color: #00FFFF;
    font-size: ${props => props.fontSize ? props.fontSize : '1.6rem'};
    &:hover {
    color: #00FF00;
    font-weight: 400;
    }
    transition: all 0.3s;
`;
export default LinksS
