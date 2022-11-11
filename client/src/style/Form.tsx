import { forwardRef, LegacyRef, ReactNode } from "react";
import styled from "styled-components";
import { Form } from 'formik';

interface Props {
    className: string,
    display?: string,
    direction?: string
    children: ReactNode,
    justify?: string,
    width?: string,
    last?: boolean
}
const F = ({ display, direction, className, children }: Props, ref: LegacyRef<HTMLDivElement>) => {

    return <div ref={ref} className={className}>{children}</div>
}
export const FormSectionC = forwardRef(F);

const FormCotainerC = ({ className, children }: Props) => <div className={className}>{children}</div>
export const FormSection = styled(FormSectionC)`
    display: flex;
    align-items: center;
    display: ${props => props.display || 'flex'};
    flex-direction: ${props => props.direction || 'row'};
    border-bottom: ${props => props.last ? 'none' : '1px solid #76766f'};
    width: 100%;
    & h4 {
        width: 100%;
        border-top: 1px solid #8a8a8a50;
    }
    
`

export const FormContainer = styled(FormCotainerC)`
    display: flex;
    position: relative;
    align-items: center;
    flex-wrap: wrap;
    justify-content:  ${props => props.justify || 'flex-start'};;
    display: ${props => props.display || 'flex'};
    flex-direction: ${props => props.direction || 'row'};
    width: ${props => props.width || '100%'};
    padding-left: 2rem;
    padding-right: 2rem;
    padding-top: 1rem;

  
   
`

export const FormContainerGrid = styled(FormCotainerC)`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-rows: auto

`

export const StyleForm = styled(Form)`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 0;
   
`