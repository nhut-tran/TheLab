import { Wrapper } from "../../style/Wrapper"

const Intro = () => {
    return (
        <Wrapper>
            <article>
                <h1>How to use</h1>
                <h3>There are four departments:</h3>
                <ul>
                    <li>Receive: Receive sample</li>
                    <li>Lab include Microbiology, Inorganic, Organic: Perform sample testing</li>
                    <li>Manager: Approve testing result</li>
                    <li>Report: Export and send result to client</li>
                </ul>
                <h3>Process</h3>
                <ol>
                    <li>Receive department issue worksheet base on sample and customer info. Header is responsible for verify worksheet.</li>
                    <li>Worksheet after verified by Receiving department can be see Lab. Lab header is responsible for verifying worksheet and decide to accept or reject back to receiving deparment</li>
                    <li>Lab input result. Lab header verify result</li>
                    <li>Lab manager approve</li>
                    <li>Report export the result and send email automatically to client</li>
                </ol>
                <h3>Test Account</h3>
                <p>Receive: receive@email.com</p>
                <p>Microbioloy lab: mi@email.com</p>
                <p>Inorganic lab: ig@email.com</p>
                <p>Organic lab: og@email.com</p>
                <p>Report: re@email.com</p>
                <p>Managger: ma@email.com</p>
                <p>Password for all department: Nhut@P2</p>
            </article>
        </Wrapper>
    )
}

export default Intro;