import { StyleLink } from '../style/List';

interface Props {
    handleCheck: (value: string, addorsub: boolean) => void,
    handleClick: (id: string) => void,
    value: string,
    index: number,
    link: string
    displayValue: string,
    status?: boolean
}
const ListItemWithCheck = ({ handleCheck, status, handleClick, value, displayValue, link, index }: Props) => {

    return (
        <div style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <StyleLink onClick={() => handleClick(value)} to={`${link}/${displayValue}`}> {displayValue} </StyleLink>
            <input type='checkbox' disabled={status} checked={status ? status : undefined} onChange={(e) => {
                handleCheck(value, e.target.checked)
            }} />
        </div>
    )
}

export default ListItemWithCheck