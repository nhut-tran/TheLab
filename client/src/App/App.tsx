import { useEffect, useState } from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './layout/Header';
import '../style/index.css'
import { observer } from 'mobx-react-lite';
import { useStore } from '../store/appStore';
import { BigSpiner, Spinner } from '../style/Spinner';
import SideBar from './layout/SideBar';
import { Container } from '../style/Container';

import mapUserIdentityUrl from '../utils/MapUserIndentityUrl';
import mainConfig from '../config/MainConfig';
import ToasterContainer from '../features/ErrorHandle/ToasterContainer';



function randn_bm(min: number, max: number) {
  let u = 0, v = 0;
  while(u === 0) u = Math.random() //Converting [0,1) to (0,1)
  while(v === 0) v = Math.random()
  let num = Math.sqrt( -2.0 * Math.log( u ) ) * Math.cos( 2.0 * Math.PI * v )
  
  num = num / 10.0 + 0.5 // Translate to 0 -> 1
  if (num > 1 || num < 0) 
    num = randn_bm(min, max) // resample between 0 and 1 if out of range
  
  else{
    // num = Math.pow(num, skew) // Skew
    num *= max - min // Stretch to fill range
    num += min // offset to min
  }
  return num
}
for (let i = 0; i<10; i++) {
 console.log(randn_bm(10, 9.8890));
}
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
