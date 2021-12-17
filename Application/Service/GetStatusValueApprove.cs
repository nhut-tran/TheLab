using System.Collections.Generic;
using Application.Interface;

namespace Application.Service
{
    public class GetStatusValueApprove : IGetValueToApprove<string, int>
    {
        public Dictionary<string, int> Accept { get; set; } = new Dictionary<string, int>(){
           { "SampleReceive", 0},
           {"Microbiology", 1},
            {"Manager", 3},
           {"Report", 4}
        };
        public Dictionary<string, int> Verify { get; set; } = new Dictionary<string, int>(){
            { "SampleReceive", 0},
           {"Microbiology", 2},
            {"Manager", 6},
              {"Report", 5}
        };

        public int GetStatusToApprove(string department)
        {
            return Accept[department];
        }
    }
}