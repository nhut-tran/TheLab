import React, { useEffect } from 'react';
import { useStore } from '../../store/appStore';
import { observer } from 'mobx-react-lite';
import { Wrapper, WrapperForList } from '../../style/Wrapper';
import { StyleLink } from '../../style/List';

const Method = observer(() => {
  const { methodStore } = useStore();
  useEffect(() => {
    methodStore.getMethod();
  }, [methodStore])

  return (
    <Wrapper>
      <WrapperForList width='50rem'>
        {
          methodStore.methodList.map((med, index) => {
            return (
              <StyleLink onClick={() => { }} key={med.methodID} to={`/method/${med.methodID}`} children={med.name} />
            )
          })
        }
      </WrapperForList>
    </Wrapper >
  );
})

export default Method;