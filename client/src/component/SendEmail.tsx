import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Button } from "../App/structure/FormElement";
import { useStore } from "../store/appStore";
import { GridCenter, Wrapper } from "../style/Wrapper";
import SearchInput from "./SearchInput";
import SearchResult from "./SearchResult";

const SendEmail = observer(() => {
    const { commonStore, userStore } = useStore()
    const { url } = useRouteMatch()

    useEffect(() => {
        return () => {
            commonStore.resetSearchValue()
        }
    }, [commonStore])


    return (
        <Wrapper>
            <SearchInput />
            <GridCenter top='10px'>
                <Button position='relative'
                    disabled={commonStore.isFetching}
                    onClick={() => {
                   
                       commonStore.getApprovedWorkSheet();
                    }}
                    type='button'>Get WorkSheet Send Email</Button>
            </GridCenter>

            <SearchResult link={url} data={commonStore.searchData}
                handleClick={commonStore.getSearchValue}
               />
        </Wrapper>
    )
})

export default SendEmail