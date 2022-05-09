
import { useReducer } from "react"




export const useSearchResultHanlde = () => {

    const initialList = new Array<string>();

    // const [approveList, setApproveList] = useState<string[]>([])

    function reducer(state: string[], action: { type: boolean, value: string }) {
        switch (action.type) {
            case true: //aka add
                return [...state, action.value]

            case false: //aka subtract
                return [...state].filter(i => i !== action.value)
            default:
                return state;
        }
    }

    return useReducer(reducer, initialList)
}