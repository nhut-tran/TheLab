import { useEffect, useLayoutEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './layout/Header';
import '../style/index.css'
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/appStore';
import { BigSpiner } from '../style/Spinner';
import SideBar from './layout/SideBar';
import { Container } from '../style/Container';

import mapUserIdentityUrl from '../utils/MapUserIndentityUrl';
import mainConfig from '../config/MainConfig';
import ToasterContainer from '../features/ErrorHandle/ToasterContainer';



const App = observer(function App() {

  const { commonStore, userStore } = useStore()
  useEffect(() => {

    userStore.checkCurrentUser()


  }, [commonStore, userStore])

  if (!commonStore.appReady) return <BigSpiner isDisPlay />

  return (

    <>


      <ToasterContainer />
      <Container>
        <Header />
        <SideBar className='SideBar' />
        <Switch>

          {
            mainConfig.map((route, index) => {
              const Comp = mapUserIdentityUrl(route, userStore.user)
              return <Route key={index} path={route.path} exact={true} render={() => <Comp />} />
            })
          }
        </Switch>
      </Container>

    </>
  )

})
export default App;
