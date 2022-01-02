using System.Collections.Generic;
using Application.Interface;

namespace Application.Service
{
    public class GetStatusValueApprove : IGetValueToApprove<string, int>
    {
        public Dictionary<string, int> Accept { get; set; } = new Dictionary<string, int>(){
           { "SampleReceive", 0}, //create worksheet
           {"Microbiology", 2}, // lab accept
            { "CustomerService", 1}, //send receipt
            {"Manager", 3}, // manager verify result
           {"Report", 4} //
        };
        public Dictionary<string, int> Verify { get; set; } = new Dictionary<string, int>(){
            { "SampleReceive", 0}, // header verify worksheet
            { "CustomerService", 1},  // send email receipt
           {"Microbiology", 3}, // lab sup verify result
            {"Manager", 4},
              {"Report", 5} // send email => 6
        };

        public int GetStatusToApprove(string department)
        {
            return Accept[department];
        }
    }
}



//{1 : ["Micro"]}