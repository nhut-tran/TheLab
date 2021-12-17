
import { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components";

interface Prop {
    position: string,
    className: string,
    children: ReactNode,

    ind: number
}

const ErrorToasterC = ({ className, children, position }: Prop) => {
    const ref = useRef<HTMLDivElement>(null)
    useEffect(() => {

        if (ref.current) {
            ref.current.style.animation = 'moveToLeft 0.3s ease, moveToTop 0.5s ease 3s'
            ref.current.style.animationFillMode = 'forwards'

        }
    }, [])


    return (
        children ? <div ref={ref} className={className}>{children}</div> : null
    )
}


const ErrorToaster = styled(ErrorToasterC)`


@keyframes moveToTop {
    0%   {top: ${props => props.position}}
    100% {top: -100px;}

}
    @keyframes moveToLeft {
    0% {
        transform: translateX(10rem)
    }
    4% {
        transform: translateX(-9rem);
    }

    5% {
        transform: translateX(-5rem);
    }

    6% {
        transform: translate(0);
    }
    100% {
        transform: translate(0);
    }
}

    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 3px;
    position: fixed;
    background-color:  #dc3545;
    color: #fff;
    z-index: 30000;
    width: 30%;
    height: 50px;
    top:${props => props.position};
    right: 0;
    transform-origin: right;
    animation-name: moveToLeft;
    animation-duration: 0.15s;
    animation-timing-function: cubic-bezier(.13,.82,1,-0.08)
`

export default ErrorToaster