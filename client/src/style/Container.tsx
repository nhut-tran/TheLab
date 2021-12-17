import styled from "styled-components"

export const Container = styled.div`
height: 100%;
display: grid;
grid-template-columns: 10rem 1fr repeat(9, minmax(min-content, 124px)) 1fr;
grid-template-rows: 15vh minmax(max-content, 100vh) 20vh;
position: relative;
`