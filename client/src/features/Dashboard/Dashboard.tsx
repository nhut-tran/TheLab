import { Wrapper } from "../../style/Wrapper";
import styled from 'styled-components';

import ParamaterByDate from "../Chart/ParamaterByDate";
import ParamaterByDepartment from "../Chart/ParamaterByDepartment";



const ChartContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    width: 100%;
`

const DashBoard = () => {

    return (
        <Wrapper>
            <h2>Total paramaters</h2>
            <ChartContainer>
                <ParamaterByDate />
                <ParamaterByDepartment />

            </ChartContainer>
        </Wrapper >
    )

}

export default DashBoard;