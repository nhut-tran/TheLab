
using System;
using System.Collections.Generic;
using System.Linq;
using Application.Core;

namespace Application.Service.GenerateWorkSheet
{
    public class WorkSheetInfo
    {

        private readonly Dictionary<string, string> _info = new Dictionary<string, string>();

        public void SetInfo(WorkSheetDto ws)
        {
            _info["WorkSheetNo"] = ws.WorkSheetNo;
            _info["ReceiveNo"] = ws.ReceiveNo;
            _info["Number of samples"] = ws.Samples.Count.ToString();
            _info["Testing department"] = getDepartmentList(ws);
            _info["Receive Date"] = ws.ReceiveDate;
            _info["Result Date"] = ws.ResultDate;
            _info["Report Date"] = ws.ResultDate;
            _info["Disposal Time"] = ws.DisposalDate;
        }
        public Dictionary<string, string> GetInfo()
        {
            return _info;
        }
        private string getDepartmentList(WorkSheetDto ws) {

            return string.Join(", ", ws.Samples.SelectMany(s => s.Paramaters).Select(p => p.Department).Distinct().ToList());
        }


    }
}