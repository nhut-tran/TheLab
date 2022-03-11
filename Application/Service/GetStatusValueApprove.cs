using System.Collections.Generic;
using Application.Interface;

namespace Application.Service
{
    public class GetStatusValueApprove : IGetValueToApprove<string, int>
    {
        public Dictionary<string, int> Accept { get; set; } = new Dictionary<string, int>(){
           { "SampleReceive", 0}, //create worksheet
           {"MicrobiologyLab", 1}, // lab accept
            {"InorganicLab", 1}, // lab accept
             {"OrganicLab", 1}, // lab accept
            {"ManagerLab", 3}, // manager verify result
           {"Report", 4} //
        };
        public Dictionary<string, int> Process { get; set; } = new Dictionary<string, int>(){

           {"MicrobiologyLab", 2}, // lab process
            {"InorganicLab", 2}, // lab process
             {"OrganicLab", 2}, // lab process
           
        };
        public Dictionary<string, int> Verify { get; set; } = new Dictionary<string, int>(){
            { "SampleReceive", 1}, // header verify worksheet
            {"MicrobiologyLab", 3}, // lab sup verify result
              {"InorganicLab", 3},
             {"OrganicLab", 3},
            {"ManagerLab", 4},
              {"Report", 5}
        };

        public int GetStatusToApprove(string department)
        {
            return Accept[department];
        }
    }
}



//{1 : ["Micro"]}