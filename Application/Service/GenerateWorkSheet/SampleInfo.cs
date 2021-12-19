using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using Application.Core;

namespace Application.Service.GenerateWorkSheet
{
    public class SampleInfo
    {
        public readonly Dictionary<string, string> Info = new Dictionary<string, string>();
        public SampleInfo()
        {
            Info["Sample NO"] = "SampleNO";
            Info["End Time"] = "ResultDate";
            Info["Paramaters"] = "Paramaters";
            Info["Method"] = "Method";
            Info["Unit"] = "Unit";
            Info["LOD"] = "LOD";
            Info["LOQ"] = "LOQ";
            Info["Result"] = "Result";

        }

    }
}