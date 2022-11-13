import { Button } from '../../App/structure/FormElement';
import styled from 'styled-components';
interface Props {
    className: string;
    setDisplay: (display: boolean) => void;
    saveStatus: React.MutableRefObject<boolean>
}
const ModalC = ({ setDisplay, saveStatus, className }: Props) => {

    return (<div className={className}>
        <h2>Leave without saving?</h2>
        <Button position='relative' style={{ zIndex: 100000 }} onClick={() => {
            setDisplay(false)
            saveStatus.current = true

        }}>Yes</Button>
        <Button position='relative' style={{ zIndex: 100000 }} onClick={() => {
            setDisplay(false)
        }}>No</Button>
    </div>
    )

}
export const Modal = styled(ModalC)`
    display: flex ;
    border-radius: 1% ;
    border: 2px solid #76766f;
    background-color: #ffff;
    align-items: center;
    justify-content: space-evenly ;
    width: 30%;
    position: fixed;
    top: 50%;
    height: 30vh;
    left: 40%;
    z-index: 20000
`


