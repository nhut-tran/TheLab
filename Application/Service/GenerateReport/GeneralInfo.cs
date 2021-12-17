using System.Collections.Generic;
using System.Reflection;
using Application.Core;
using Application.Service.GenerateReport;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Wordprocessing;

namespace Application.Service
{
    public class GeneralInfo
    {
        public GeneralInfo(string customer, string receiveDate, SampleDto sample)
        {
            Customer.Key += customer;
            SampleName.Key += sample.Description;
            SampleDescription.Key += sample.Description;
            SealNo.Key += sample.SealNumber ?? "No seal";
            SampleSource.Key += "From customer";
            ReceiveDate.Key += receiveDate;
            TestDate.Key += receiveDate;

        }

        public ReportTitle SectionTitle { get; set; } = new ReportTitle("Testing Report");
        public KeySampleDescription Customer { get; set; } = new KeySampleDescription("Applicant/ref : AAA");
        public KeySampleDescription SampleName { get; set; } = new KeySampleDescription("Sample infomation provide by customer : ");
        public KeySampleDescription SampleDescription { get; set; } = new KeySampleDescription("Sample desription : ");
        public KeySampleDescription SealNo { get; set; } = new KeySampleDescription("Seal NO : ");

        public KeySampleDescription SampleSource { get; set; } = new KeySampleDescription("Sample source : ");
        public KeySampleDescription ReceiveDate { get; set; } = new KeySampleDescription("Receive Date : ");

        public KeySampleDescription TestDate { get; set; } = new KeySampleDescription("Test Date : ");



        public List<Paragraph> CreateParagraph(GeneralInfo generalInfo)
        {



            var pList = new List<Paragraph>();

            foreach (var prop in generalInfo.GetType().GetProperties())
            {

                foreach (var key in prop.GetValue(generalInfo).GetType().GetProperties())
                {

                    var val = key.GetValue(prop.GetValue(generalInfo));
                    var p = new Paragraph();

                    var styleID = prop.GetValue(generalInfo) is ReportTitle ? "ReportTitle" : "KeyStyle";
                    var pPr = new ParagraphProperties() { ParagraphStyleId = new ParagraphStyleId() { Val = styleID } };

                    var valSplit = val.ToString().Split(":");
                    p.Append(pPr);
                    p.Append(new Run(new Text(valSplit[0])),
                    new Run(new Text(": ") { Space = SpaceProcessingModeValues.Preserve }));
                    if (valSplit.Length > 1)
                    {
                        p.Append(
                            new Run(new Text(valSplit[1]))
                            {
                                RunProperties = new RunProperties()
                                {
                                    Bold = new Bold() { Val = false }
                                }
                            }
                        );
                    }
                    pList.Add(p);

                }
            }

            return pList;
        }

    }
}