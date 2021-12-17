import React, { useEffect } from 'react';
import { useStore } from '../store/appStore';
import { observer } from 'mobx-react-lite';

import { Wrapper, WrapperForList } from '../style/Wrapper';
import { StyleLink } from '../style/List';

const Sample = observer(() => {
  const { sampleStore } = useStore();
  useEffect(() => {
    sampleStore.getSample();
  }, [sampleStore])

  return (
    <Wrapper>
      <WrapperForList width='40rem'>
        {
          sampleStore.SampleList.map((sam, ind) => {
            return (
              <div></div>
              //   <StyleLink strip={ind} key={sam.sampleID} to={`/Sample/${sam.sampleID}`} children={sam.description} />
            )
          })
        }
      </WrapperForList>
    </Wrapper >
  );
})

export default Sample;