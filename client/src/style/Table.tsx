import { ReactNode } from "react"
import styled from "styled-components"

interface Prop {
    className: string
    children: ReactNode
}
const TableC = ({ className, children }: Prop) => {
    return <table className={className}>
        {children}
    </table>
}
export const Table = styled(TableC)`
    margin-top: 50px;
    border-collapse: collapse;
    width: 100% ;
    & td {
        border: 1px solid #ddd;
        padding: 15px 8px;
       
    }
    & th {
        padding-top: 12px;
        padding-bottom: 12px;
        text-align: center;
        color: white;
        border: 1px solid #34c03b;
        border-right: 1px solid #ddd;
        background-color: #34c03b
    }
    & th:last-child {
        border-right: 1px solid #34c03b;
    }
    
   & tr:nth-child(even){background-color: #f2f2f2;}

   & tr:hover {background-color: #ddd;}
`