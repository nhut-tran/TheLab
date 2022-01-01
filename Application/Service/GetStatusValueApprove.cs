using System.Collections.Generic;
using Application.Interface;

namespace Application.Service
{
    public class GetStatusValueApprove : IGetValueToApprove<string, int>
    {
        public Dictionary<string, int> Accept { get; set; } = new Dictionary<string, int>(){
           { "SampleReceive", 0}, //create worksheet
           {"Microbiology", 1}, // lab accept
            { "CustomerService", 2},
            {"Manager", 4}, // manager verify result
           {"Report", 5} //
        };
        public Dictionary<string, int> Verify { get; set; } = new Dictionary<string, int>(){
            { "SampleReceive", 0}, // header verify worksheet
            { "CustomerService", 2},  // send email receipt
           {"Microbiology", 3}, // lab sup verify result
              {"Report", 6} //send email report
        };

        public int GetStatusToApprove(string department)
        {
            return Accept[department];
        }
    }
}