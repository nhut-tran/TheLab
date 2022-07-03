import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface LinkProp {
    to: string,
    disbaled?: boolean,
    children?: ReactNode,
    selected?: boolean,
    onClick: () => void,
    className?: string
}
const LinkC = ({ to, children, className, onClick, disbaled }: LinkProp) => <Link aria-disabled={disbaled} onClick={onClick} className={className} to={to}>{children}</Link>

export const StyleLink = styled(LinkC)`
    
    height: 3.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: inherit;
    color:  ${props => props.selected ? "#34c03b" : "#242424"};
    font-weight: 600;
    text-decoration: none;
    width: 100%;
    padding: 2rem 3rem;
    &:hover {
        color: #34c03b;
        text-decoration: underline
    }

`


