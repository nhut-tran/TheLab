import styled from "styled-components";
import * as React from 'react'
import { ReactNode } from "react";
import { ReactComponent as Loading } from '../utils/spinner.svg'
import { ReactComponent as BigLoading } from '../utils/bspinner.svg'
interface SpinnerProps {
    className?: string,
    isDisPlay?: boolean,
    children?: ReactNode
}

const SpinnerC = ({ className = 'spinner', isDisPlay, children }: SpinnerProps) => {

    return (

        <div className={className}>
            <Loading className='loading-icon' fill='' />
            Please wait...
        </div>
    )
}

export const Spinner = styled(SpinnerC)`
    width: 100%;
    z-index: 1000;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    transition: all  0.1s;
    & {
        .loading-icon{
            margin: auto;
        }
        
       
    }
`

const BigSpinnerC = ({ className = 'bspinner' }: SpinnerProps) => {
    return (

        <div className={className}>
            <div>
                <BigLoading className='loading-icon' fill='' />
                Please wait...
            </div>
        </div>
    )
}

export const BigSpiner = styled(BigSpinnerC)`
        display: flex;
        justify-content: center;
        align-items: center;

        position: fixed;
        top: 50%;
        left: 50%;
        color: red;
       transform: translate(-50%, -50%);
        margin: 0;
        padding: 0;
        width: ${props => !props.isDisPlay ? 0 : '100%'};
        height: ${props => !props.isDisPlay ? 0 : '100%'};
        opacity: ${props => !props.isDisPlay ? 0 : 0.5};
        background-color:  #c9caca94;
        z-index: 1000;
        transition: all  0.1s;
        & {
            .loading-icon{
                margin: auto;
            }
            
        
        }
`
