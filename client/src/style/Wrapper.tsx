import styled from "styled-components"

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    flex-direction: column;
    grid-column: 3 / 12;
    grid-row: 2 / 3;
    height: 100%;
    margin-left: auto;
    margin-right: auto;
   
    width: 100%;
   & > button {
    @media(max-width: 1200px) {
        margin-top: 2rem;
        position: static;
    }
   }
`

export const WrapperForList = styled.div<{ width: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 1rem;
    margin-left: auto;
    margin-right: auto;
    border-radius: 0 0 0.5rem 0.5rem;
    box-shadow: 0.1rem  0.2rem #e6e3e3cc;;
    width: ${props => props.width ? props.width : '500rem'};
`


export const WrapperForForm = styled.div<{ width: string }>`
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 0 0 3rem 3rem;
    width: ${props => props.width ? props.width : '500rem'};
    
    position: relative;

    & form {
        width: 100%;
        display: flex;
        flex-direction: column ;
        margin: auto;
        align-items: center;
    }

    & form {
        
        .form_section {
            display: flex;
            align-items: center;
            .form_container {
            display: flex;
            align-items: center;
            }
        }
        & > button {
    @media(max-width: 1200px) {
        margin-top: 2rem;
        position: static;
    }
    }
   
   }
           
`

export const GridCenter = styled.div<{ top?: string }>`
    display: flex;
    margin-top: ${props => props.top ? props.top : '0px'};
    justify-content: center;
`
