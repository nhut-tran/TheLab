const EditSample = () => {
    return <div></div>
}

// import React, { useEffect } from "react";
// import { Input, Select, CheckBox, Button } from "../features/FormElement";
// import { FieldArray, Form, Formik, getIn } from "formik";
// import { Wrapper, WrapperForForm } from "../style/Wrapper";
// import * as Yup from 'yup';
// import { observer } from 'mobx-react-lite'
// import { useStore } from "../store/appStore";
// import { FormContainer, FormSection } from "../style/Form";
// import { useState } from "react";
// import { NewSample, WorkSheet, WorkSheetInput } from '../api/entity'
// import agent from "../api/agent";


// const EditSample = observer(() => {

//     // const getDate = () => {
//     //     const d = new Date();
//     //     return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`
//     // }
//     const { methodStore, commonStore, customerStore, sampleStore } = useStore();
//     const [localState, setLocal] = useState<WorkSheet>(commonStore.searchData)

//     useEffect(() => {

//         setLocal(commonStore.searchData)

//     }, [commonStore.searchData])

//     useEffect(() => {
//         methodStore.getMethod();

//     }, [methodStore.methodList.length])

//     useEffect(() => {
//         customerStore.getCustomer()
//     }, [customerStore.customerList.length])

//     return (
//         <Wrapper>
//             <WrapperForForm width='100%'>
//                 <Formik
//                     initialValues={localState}
//                     validationSchema={
//                         Yup.object().shape({
//                             // customer: Yup.string().required('Required'),
//                             workSheet:
//                                 Yup.object(
//                                     {
//                                         samples: Yup.array().of(Yup.object({
//                                             description: Yup.string().required('Required'),
//                                             weight: Yup.number().transform((val) => parseFloat(val))
//                                                 .typeError('Must be a positive number').required('Required'),
//                                             paramaters: Yup.array().of(Yup.object({
//                                                 methodID: Yup.string().required('Required')
//                                             })).min(1, 'at least one paramaters')
//                                         }))
//                                     }
//                                 )
//                         })
//                     }
//                     onSubmit={(val) => {
//                         console.log(val)
//                         sampleStore.UpdateSample(val)
//                     }}
//                 >
//                     {({ values, errors, touched }) => {
//                         console.log(errors)
//                         return (

//                             <Form>
//                                 <h1>New Sample</h1>
//                                 <FormSection direction='column' className='form_section'>

//                                     <h4 style={{ alignSelf: 'start' }}>General Information</h4>

//                                     <FormContainer className='form_container'>
//                                         <Input type='text' className='form_group' label='Receive Date' name={`workSheet.receiveDate`} />
//                                         <Select className='form_group' label='Customer' key={`customer`} name={`issueTo`} >
//                                             <option disabled value=''>---Select Customer----</option>
//                                             <option>{values.issueTo}</option>
//                                             {customerStore.customerList.map((cus) => {

//                                                 return (
//                                                     <>
//                                                         {
//                                                             values.issueTo !== cus.name && <option key={cus.customerId} value={cus.customerId}>{cus.name}</option>
//                                                         }
//                                                     </>

//                                                 )
//                                             })}

//                                         </Select>
//                                     </FormContainer>
//                                 </FormSection>
//                                 <FieldArray name='workSheet'
//                                     render={(helper) => (
//                                         <>
//                                             {


//                                                 <FormSection className='form_section-nhh' direction='column'>

//                                                     {
//                                                         <FieldArray name={`workSheet.samples`} render={
//                                                             (h) => (
//                                                                 <>
//                                                                     {
//                                                                         values.samples.map((s, ind) => (
//                                                                             <div className='form_container_sub' style={{ width: '100%' }} key={ind}>

//                                                                                 <h4>Sample {ind + 1} {s.description ? s.description : ''}</h4>

//                                                                                 <FormContainer className='form_container' >

//                                                                                     <Input type='text' className='form_group' label='Description' name={`workSheet.samples.${ind}.description`} />
//                                                                                     <Input className='form_group' label='Weight' name={`workSheet.samples.${ind}.weight`} />
//                                                                                     <Input className='form_group' label='Note' name={`workSheet.samples.${ind}.note`} />
//                                                                                     <Input className='form_group' label='Seal Numer' name={`workSheet.samples.${ind}.sealNumber`} />
//                                                                                     <CheckBox className='form_group' label='Sampling' name={`workSheet.samples.${ind}.sampling`} type='checkbox' display='' />
//                                                                                 </FormContainer>
//                                                                                 <FormContainer className='form_container' direction='column'>
//                                                                                     <FieldArray key={ind} name={`workSheet.samples.${ind}.paramaters`}
//                                                                                         render={
//                                                                                             (helperPara) => (
//                                                                                                 <>
//                                                                                                     <FormContainer className='form_container'>
//                                                                                                         {
//                                                                                                             values.samples[ind].paramaters.map((p, indP) => {

//                                                                                                                 return (
//                                                                                                                     <div key={indP}>
//                                                                                                                         {typeof getIn(errors, `workSheet.samples.${ind}.paramaters`) === 'string' && <div>{getIn(errors, `workSheet.samples.${ind}.paramaters`)}</div>}

//                                                                                                                         <Select className='form_group' label={`Paramaters ${indP + 1}`} key={`workSheet.samples.${ind}.paramaters.${indP}.methodId`} name={`workSheet.samples.${ind}.paramaters.${indP}.methodId`} >
//                                                                                                                             <option disabled value=''>---Select  Method----</option>
//                                                                                                                             <option>{p.method}</option>
//                                                                                                                             {methodStore.methodList.map((med) => {


//                                                                                                                                 return (
//                                                                                                                                     <>

//                                                                                                                                         {med.methodID !== p.methodID && <option key={med.methodID} value={med.methodID}>{med.name}</option>}
//                                                                                                                                     </>
//                                                                                                                                 )
//                                                                                                                             })}

//                                                                                                                         </Select>



//                                                                                                                     </div>
//                                                                                                                 )
//                                                                                                             })
//                                                                                                         }
//                                                                                                     </FormContainer>
//                                                                                                     <FormContainer borderBot='bot' className='form_container' width='30%'>

//                                                                                                         <Button className='form_button' position='relative' top='0' right='0' type='button' onClick={() => {
//                                                                                                             helperPara.push({
//                                                                                                                 methodId: ''
//                                                                                                             })
//                                                                                                         }}>+</Button>
//                                                                                                         <Button className='form_button' position='relative' top='0' right='10%' type='button' onClick={() => {
//                                                                                                             helperPara.pop();
//                                                                                                         }}>-</Button>

//                                                                                                     </FormContainer>


//                                                                                                 </>
//                                                                                             )
//                                                                                         }
//                                                                                     />

//                                                                                     {values.workSheet.samples.length === (ind + 1) &&
//                                                                                         <Button top='40%' left='80%' type='button' onClick={() => {
//                                                                                             h.push({


//                                                                                                 description: '',
//                                                                                                 weight: '',
//                                                                                                 note: '',
//                                                                                                 paramaters: [
//                                                                                                     {
//                                                                                                         methodId: ''
//                                                                                                     }
//                                                                                                 ]


//                                                                                             })
//                                                                                         }}>Add Sample</Button>}

//                                                                                 </FormContainer>
//                                                                             </div>
//                                                                         ))
//                                                                     }
//                                                                 </>
//                                                             )
//                                                         } />

//                                                     }

//                                                 </FormSection>

//                                             }

//                                             {<Button
//                                                 top='50%' left='80%'
//                                                 type="button"
//                                                 onClick={() => helper.push(
//                                                     {
//                                                         samples: [
//                                                             {
//                                                                 description: '',
//                                                                 weight: '',
//                                                                 note: '',
//                                                                 paramaters: [
//                                                                     {
//                                                                         methodId: ''
//                                                                     }
//                                                                 ]
//                                                             }
//                                                         ]
//                                                     }

//                                                 )}
//                                             >
//                                                 Add WorkSheet
//                                             </Button>}
//                                         </>
//                                     )}

//                                 />

//                                 {<Button className='form_button' top='60%' left='80%' type={"submit"}>Save</Button>}
//                             </Form>
//                         )
//                     }

//                     }


//                 </Formik>
//             </WrapperForForm>
//         </Wrapper >
//     )
// })

export default EditSample