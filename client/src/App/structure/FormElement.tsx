import * as React from "react";
import { useField } from "formik";
import styled from 'styled-components';
import { Spinner } from "../../style/Spinner";
import { useStore } from "../../store/appStore";
import { ShowPassword } from "../../style/ShowPassword"
import { observer } from "mobx-react-lite";

const Style = (comp: any, display?: string) => {
    return styled(comp)`
    margin-bottom: 0.5rem;
    margin-left: 1rem ;
    position: relative;
    display: flex;
    flex-direction: ${display ? display : 'column'};
    ${!display && 'justify-content: center;'}
    ${display && 'align-items: center;'}
    padding-bottom: 1rem;
    
    & label {
        
        color: ${props => props.remark ? '#FF0000' : "#963cff"};
    }
    & input {
        width: 100%;
        display: inline-block;
        padding: 0.7rem 0.9rem;
        border: 1.2px solid #719ECE;
        color: ${props => props.remark ? '#FF0000' : ""};
        &:focus {
        outline: none;
         border-color: #719ECE;
         box-shadow: 0 0 0.5rem #719ECE;
         transition: all 0.3s;
        }
       border-radius: 3px
    }

    & select {
        width: 100%;
        height: 3rem;
        border: 1px solid #719ECE;
        border-radius: 4px;
        margin-right: 0.5rem;
        
        color: ${props => props.remark ? '#FF0000' : ""};
    
        &:focus {
         border-color: #719ECE;
         box-shadow: 0 0 0.5rem #719ECE;
         transition: all 0.3s;
        }
    }
    &.form_group_error {
        font-size: 1rem;
        color: #ff2882;
        position: absolute;
        bottom: -50%;
    }
`


}

interface InputProp {
    label: string,
    type?: string,
    name: string,
    className?: string,
    disabled?: boolean,
    remark?: boolean,

    handleChange?: (e: React.ChangeEvent<any>) => void,
    children?: React.ReactNode
}

export const Input = Style(({ label, className, handleChange, ...props }: InputProp) => {
    const [field, meta] = useField(props)

    return (
        <div className={className}>
            <label htmlFor={label}>{label}</label>
            <input {...field} {...props} type={props.type} />
            {meta.touched && meta.error && <div className={`${className}_error`}>{meta.error}</div>}
        </div>
    )
})
export const InputPassWord = Style(({ label, className, handleChange, ...props }: InputProp) => {
    const [field, meta] = useField(props)
    const [show, setShow] = React.useState(false);
    return (
        <div className={className}>
            <label htmlFor={label}>{label}</label>
            <input {...field} {...props} type={show ? 'text' : 'password'} />
            <ShowPassword show={show} setShow={() => {
                setShow((prev) => !prev)
            }} />
            {meta.touched && meta.error && <div className={`${className}_error`}>{meta.error}</div>}
        </div>
    )
})
export const CheckBox = Style(({ label, className, ...props }: InputProp) => {
    const [field, meta] = useField(props)
    return (
        <div className={className} style={{ flexDirection: 'column' }}>
            <label htmlFor={label}>{label}</label>
            <input {...field} {...props} type={props.type} />
            <div className={`${className}_error`}>{meta.touched && meta.error ? meta.error : null}</div>
        </div>
    )
}, 'row')

export const Select = Style(({ label, className, handleChange, ...props }: InputProp) => {
    const [field, meta] = useField(props)
    //overide onChange
    if (handleChange)
        field.onChange = handleChange;
    return (
        <div className={className}>
            <label htmlFor={label}>{label}</label>
            <select{...props} {...field} ></select>
            {meta.touched && meta.error && <div className={`${className}_error`}>{meta.error}</div>}
        </div>
    )
})


export const TextArea = ({ label, ...props }: InputProp) => {
    const [field, meta] = useField(props)
    return (
        <div>

            <label htmlFor={label}>{label}</label>
            <textarea {...field} {...props}></textarea>
            {meta.touched && meta.error && <div>{meta.error}</div>}
        </div>
    )
}


const ButtonC = observer((props: any) => {
    const { commonStore } = useStore()
    const [loading, setLoading] = React.useState(false)
    const [target, setTarget] = React.useState(false)
    React.useLayoutEffect(() => {
        setLoading(commonStore.isFetching && target)
        setTarget(false)

    }, [commonStore.isFetching])
    return (
        <button key={props.key}
            disabled={loading ? loading : undefined}
            onClick={(e) => {

                setTarget(e.currentTarget === e.target)
                if (props.onClick) props.onClick()
            }} type={props.type}
            className={props.className}>{props.children}
            {loading && <> &nbsp; <Spinner /> </>}
        </button>)
})

export const Button = styled(ButtonC)`
    background-color: ${props => props.disabled ? "#e6e2e2" : "#34c03b"};
    color: #fff;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: space-around;
    position: ${props => props.position ? props.position : 'fixed'};
    top: ${props => props.top};
    left: ${props => props.left};
    border:none;
    border-radius: 4px;
    padding: 0.8rem 1.5rem;
    margin-top:  ${props => props.marginTop ? props.marginTop : 0};
    cursor: pointer;
    transition: all 0.3s;
    &:disabled {
    background-color: #e6e2e2;
    box-shadow: 2px 2px 2px#9cdb9f;
    }
    &:hover {
        background-color: white ;
        color:  ${props => props.disabled ? "#e6e2e2" : "#34c03b"};
        border: 1px solid #34c03b
    }
    &:active {
        padding: 0.7rem 1.4rem;
        box-shadow: 1px 1px #dfdfd7;
    }

    
`

