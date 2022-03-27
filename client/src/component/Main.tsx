import { useStore } from '../store/appStore';
import { observer } from 'mobx-react-lite';
import Login from '../features/Identity/Login'
import Search from './Search';
import { Wrapper } from '../style/Wrapper';
import SearchResult from './SearchResult';
import { useRouteMatch } from 'react-router-dom';


const Main = observer(() => {

    const { userStore, commonStore } = useStore()
    if (!userStore.isLogIn()) {
        return <Login />
    }
    const { url } = useRouteMatch()

    return (
        <Wrapper>
            <Search />
            <SearchResult data={commonStore.searchData} handleClick={commonStore.getSearchValue} link={`${url === '/' ? '' : url}`} />
        </Wrapper>
    )
})

export default Main