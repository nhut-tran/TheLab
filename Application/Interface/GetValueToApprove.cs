using System.Collections.Generic;

namespace Application.Interface
{
    public interface IGetValueToApprove<Tkey, Tvalue>
    {


        Dictionary<Tkey, Tvalue> Accept { get; set; }
        Dictionary<Tkey, Tvalue> Verify { get; set; }

        Tvalue GetStatusToApprove(Tkey department);
    }
}