import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import { useRouteMatch } from "react-router-dom";
import { Button } from "../../App/structure/FormElement";
import { useStore } from "../../store/appStore";
import LinksS, { ButtonLink } from "../../style/Link";
import { StyleLink } from "../../style/List";
import { Table } from "../../style/Table";
import { Wrapper } from "../../style/Wrapper";

const ManageMethod = observer(() => {
    const { methodStore, commonStore } = useStore()

    useEffect(() => {
        methodStore.getMethod()
    }, [])

    const { url } = useRouteMatch()

    return (
        <Wrapper>
            <h1>Manage method</h1>
            <ButtonLink to={`${url}/new-method`} className={"new-method"}>New Method</ButtonLink>
            <Table className="methodTable">

                <tr>
                    <th>Name</th>
                    <th>Desription</th>
                    <th>Target</th>
                    <th>Turn Around day</th>
                    <th>Unit</th>
                    <th>Department</th>
                </tr>
                {

                    methodStore.methodList.map(m => {
                        return (
                            <tr>
                                <td><StyleLink
                                    to={`${url}/${m.methodID}`}
                                    onClick={() => { }}
                                >{m.name}</StyleLink></td>
                                <td>{m.description}</td>
                                <td>{m.target}</td>
                                <td>{m.turnArroundDay}</td>
                                <td>{m.unit}</td>
                                <td>{m.departmentID}</td>
                            </tr>
                        )
                    })

                }
            </Table>
        </Wrapper>
    )


})

export default ManageMethod