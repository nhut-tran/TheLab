import { ReactNode } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

interface LinkProp {
    strip?: number,
    to: string,
    disbaled?: boolean,
    children?: ReactNode,
    selected?: boolean,
    onClick: () => void,
    className?: string
}
const LinkC = ({ strip, to, children, className, onClick, disbaled }: LinkProp) => <Link aria-disabled={disbaled} onClick={onClick} className={className} to={to}>{children}</Link>

export const StyleLink = styled(LinkC)`
    
    height: 3.9rem;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: inherit;
    color :  ${props => props.selected ? "#34c03b" : "#242424"};
    font-weight: 600;
    text-decoration: none;
    width: 100%;
    background-color: ${props => ((props.strip && props.strip % 2 === 0) ? "#cef7c14b" : "#fff")};
    border-bottom: 1px solid #e6e3e3cc;
    padding: 2rem 3rem;

`


