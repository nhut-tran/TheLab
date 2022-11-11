import { FieldArray } from "formik";
import { Button, CheckBox, Input } from "../App/structure/FormElement";
import { FormContainer, FormSection } from "../style/Form";


const SampleList = () => {
    return (
        <FieldArray name='workSheet'
            render={({ values }) => (
                <>
                    {
                        <FormSection className='form_section_detail' direction='column'>
                            {
                                <FieldArray name={`samples`} render={
                                    (h) => (
                                        <>
                                            {
                                                values.samples.map((s, ind) => (

                                                    <>
                                                        <h4>Sample {ind + 1} {s.description ? s.description : ''}</h4>


                                                        <FormContainer className='form_container_sample_info' direction='row'>
                                                            <FormContainer className='form_container_sample_detail' direction='row' width="50%">

                                                                <Input type='text' className='form_group' label='Description' name={`samples.${ind}.description`} />
                                                                <Input className='form_group' label='Weight' name={`samples.${ind}.weight`} />
                                                                <Input className='form_group' label='Seal Numer' name={`samples.${ind}.sealNumber`} />
                                                                <Input className='form_group' label='Note' name={`samples.${ind}.note`} />
                                                                <CheckBox className='form_group' label='Sampling' name={`samples.${ind}.sampling`} type='checkbox' display='' />
                                                                <CheckBox className='form_group' label='Urgent' name={`samples.${ind}.urgent`} type='checkbox' display='' />
                                                                <FieldArray name={`samples.${ind}.paramaters`}
                                                                    render={
                                                                        (helperPara) => (


                                                                            <FormContainer className="form_container_button_group" width="60%" justify="space-evenly">
                                                                                <Button className='form_button' position='relative' type='button' onClick={() => {
                                                                                    helperPara.push({ methodID: "00000000-0000-0000-0000-000000000000", method: "" })
                                                                                }}>+</Button>
                                                                                <Button className='form_button' position='relative' type='button' onClick={() => {
                                                                                    if (values.samples[ind].paramaters.length > 1) helperPara.pop();
                                                                                }}>-</Button>
                                                                            </FormContainer>


                                                                        )
                                                                    }
                                                                />
                                                            </FormContainer>
                                                            <FormContainer className='form_container_parameter' width="50%" justify="space-evenly">
                                                                <FieldArray name={`samples.${ind}.paramaters`}
                                                                    render={
                                                                        () => (


                                                                            {
                                                                                values.samples[ind].paramaters.map((p, indP) => {

                                                                                    return (
                                                                                        <div key={p.methodID + indP}>
                                                                                            <div>{getIn(errors, `samples.${ind}.paramaters`)}</div>

                                                                                            <Select className='form_group' key={`samples.${ind}.paramaters.${indP}.methodID`} name={`samples.${ind}.paramaters.${indP}.methodID`} >
                                                                                                <option hidden >---Select Method----</option>

                                                                                                {sortMethodByDept(department, refMethodList.current).map((med, i) => {
                                                                                                    if (p.methodID !== "00000000-0000-0000-0000-000000000000") {
                                                                                                        return <option key={p.methodID} value={p.methodID}>{refMethodList.current.find((m) => m.methodID === p.methodID)?.name}</option>
                                                                                                    }
                                                                                                    return <option key={med.methodID} value={med.methodID}>{med.name}</option>
                                                                                                })}

                                                                                            </Select>

                                                                                        </div>


                                                                                    )
                                                                                })
                                                                            }




                                                                        )
                                                                    }
                                                                />
                                                            </FormContainer>
                                                        </FormContainer>


                                                    </>
                                                    //  </div>
                                                ))
                                            }
                                        </>
                                    )
                                } />

                            }

                        </FormSection>

                    }

                </>
            )
            }

        />
    )
}

export default ListSample;