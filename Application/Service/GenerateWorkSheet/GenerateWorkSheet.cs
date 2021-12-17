using System.Collections.Generic;
using System.IO;
using System.Linq;
using Application.Core;
using DocumentFormat.OpenXml;
using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace Application.Service.GenerateWorkSheet
{
    public class GenerateWorkSheet
    {
        private Table CreateHeaderTable(WorkSheetDto ws)
        {

            var table = new Table();
            var tableProp = new TableProperties();

            var tableStyle = new TableStyle() { Val = "TableForm" };
            TableWidth tableWidth = new TableWidth() { Width = "5000", Type = TableWidthUnitValues.Pct };

            tableProp.Append(tableStyle, tableWidth);
            table.Append(tableProp);
            TableGrid tg = new TableGrid(new GridColumn(), new GridColumn());
            table.AppendChild(tg);
            TableRow headerRow = new TableRow();
            TableCell tc0 = new TableCell(new Paragraph(new Run(new Text("WorkSheet"))));
            TableCell tc1 = new TableCell(new Paragraph(new Run(new Text(ws.WorkSheetNo))));


            headerRow.Append(tc0, tc1);
            table.Append(headerRow);


            return table;

        }
        private Table CreateGeneralInfoTable(WorkSheetDto ws)
        {
            var table = new Table();
            var tableProp = new TableProperties();

            var tableStyle = new TableStyle() { Val = "TableForm" };
            TableWidth tableWidth = new TableWidth() { Width = "5000", Type = TableWidthUnitValues.Pct };

            tableProp.Append(tableStyle, tableWidth);
            table.Append(tableProp);
            TableGrid tg = new TableGrid(new GridColumn(), new GridColumn());
            table.AppendChild(tg);

            TableRow firstRow = new TableRow();
            TableCell tc0 = new TableCell(new Paragraph(new Run(new Text("ReceiveNo"))));
            TableCell tc1 = new TableCell(new Paragraph(new Run(new Text(ws.ReceiveNo))));

            TableRow secondRow = new TableRow();
            TableCell tc2 = new TableCell(new Paragraph(new Run(new Text("Number of samples"))));
            TableCell tc3 = new TableCell(new Paragraph(new Run(new Text(ws.Samples.Count().ToString()))));

            TableRow thirdRow = new TableRow();
            TableCell tc4 = new TableCell(new Paragraph(new Run(new Text("Testing department"))));
            TableCell tc5 = new TableCell(new Paragraph(new Run(new Text("Micro"))));

            TableRow fourRow = new TableRow();
            TableCell tc6 = new TableCell(new Paragraph(new Run(new Text("Receive Date"))));
            TableCell tc7 = new TableCell(new Paragraph(new Run(new Text(ws.ReceiveDate))));

            TableRow fiveRow = new TableRow();
            TableCell tc8 = new TableCell(new Paragraph(new Run(new Text("Result Date"))));
            TableCell tc9 = new TableCell(new Paragraph(new Run(new Text(ws.ResultDate))));

            TableRow sixRow = new TableRow();
            TableCell tc10 = new TableCell(new Paragraph(new Run(new Text("Report Date"))));
            TableCell tc11 = new TableCell(new Paragraph(new Run(new Text(ws.ResultDate))));

            TableRow sevenRow = new TableRow();
            TableCell tc12 = new TableCell(new Paragraph(new Run(new Text("Disposal Time"))));
            TableCell tc13 = new TableCell(new Paragraph(new Run(new Text(ws.DisposalDate))));



            firstRow.Append(tc0, tc1);
            secondRow.Append(tc2, tc3);
            thirdRow.Append(tc4, tc5);
            fourRow.Append(tc6, tc7);
            fiveRow.Append(tc8, tc9);
            sixRow.Append(tc10, tc11);
            sevenRow.Append(tc12, tc13);

            table.Append(firstRow, secondRow, thirdRow, fourRow, fiveRow, sixRow, sevenRow);
            return table;
        }
        private Table CreateSampleListTable(List<SampleDto> sampleList)
        {
            var table = new Table();
            var tableGrid = new TableGrid(
                new GridColumn(), new GridColumn(), new GridColumn(), new GridColumn(),
                new GridColumn(), new GridColumn(), new GridColumn(), new GridColumn(),
                new GridColumn(), new GridColumn()
                );
            var headerRow = new TableRow();
            var tc0 = new TableCell(new Paragraph(new Run(new Text("Sample NO"))));
            var tc1 = new TableCell(new Paragraph(new Run(new Text("End Time"))));
            var tc2 = new TableCell(new Paragraph(new Run(new Text("Paramaters"))));
            var tc3 = new TableCell(new Paragraph(new Run(new Text("Method"))));
            var tc4 = new TableCell(new Paragraph(new Run(new Text("Unit"))));
            var tc5 = new TableCell(new Paragraph(new Run(new Text("LOD"))));
            var tc6 = new TableCell(new Paragraph(new Run(new Text("LOQ"))));
            var tc7 = new TableCell(new Paragraph(new Run(new Text("Result"))));
            headerRow.Append(tc0, tc1, tc2, tc3, tc4, tc5, tc6, tc7);

            table.Append(headerRow);
            foreach (var sample in sampleList)
            {

                for (var i = 0; i < sample.Paramaters.Count(); i++)
                {
                    var paramater = sample.Paramaters.ToList()[i];
                    var tbPropS = new TableCellProperties()
                    {
                        VerticalMerge = new VerticalMerge() { Val = MergedCellValues.Restart }
                    };
                    var tbPropC = new TableCellProperties()
                    {
                        VerticalMerge = new VerticalMerge() { Val = MergedCellValues.Continue }
                    };
                    var tableRow = new TableRow();

                    var tcs0 = new TableCell(new Paragraph(new Run(new Text(sample.SampleNo.ToString()))));
                    tcs0.Append(new Paragraph(new Run(new Text("SEQ: " + sampleList.IndexOf(sample).ToString()))));
                    tcs0.Append(new Paragraph(new Run(new Text(sample.Description))));
                    tcs0.Append(new Paragraph(new Run(new Text(sample.Weight.ToString()))));

                    tcs0.TableCellProperties = tbPropS;
                    var tcs1 = new TableCell(new Paragraph(new Run(new Text(sample.ResultDate))));
                    var tcs2 = new TableCell();
                    var tcs3 = new TableCell();
                    var tcs4 = new TableCell();

                    var tcs5 = new TableCell(new Paragraph(new Run(new Text())));
                    var tcs6 = new TableCell(new Paragraph(new Run(new Text())));
                    var tcs7 = new TableCell(new Paragraph(new Run(new Text())));

                    tcs2.Append(new Paragraph(new Run(new Text(paramater.Tartget))));
                    tcs3.Append(new Paragraph(new Run(new Text(paramater.Method))));
                    tcs4.Append(new Paragraph(new Run(new Text(paramater.Unit))));
                    if (i > 0)
                    {
                        var c = new TableCell(new Paragraph(new Run(new Text())));
                        c.Append(tbPropC);
                        tableRow.Append(c, tcs1, tcs2, tcs3, tcs4, tcs5, tcs6, tcs7);
                    }
                    else 
                    {

                        tableRow.Append(tcs0, tcs1, tcs2, tcs3, tcs4, tcs5, tcs6, tcs7);
                    }

                    table.Append(tableRow);

                }

            }

            return table;
        }

        public Stream GenerateWS(WorkSheetDto ws)
        {
            var stream = new MemoryStream();
            using (DocumentFormat.OpenXml.Packaging.WordprocessingDocument doc = WordprocessingDocument.Create(stream, WordprocessingDocumentType.Document))
            {
                doc.AddMainDocumentPart();
                doc.MainDocumentPart.Document = new Document();
                doc.MainDocumentPart.Document.Body = doc.MainDocumentPart.Document.AppendChild(new Body());
                var stylePart = doc.MainDocumentPart.AddNewPart<StyleDefinitionsPart>();
                stylePart.Styles = new Styles();
                stylePart.Styles.DocDefaults = new DocDefaults()
                {
                    RunPropertiesDefault = new RunPropertiesDefault()
                    {
                        RunPropertiesBaseStyle = new RunPropertiesBaseStyle()
                        {
                            RunFonts = new RunFonts { Ascii = "Times New Roman" },
                            FontSize = new FontSize { Val = "26" }
                        }
                    }
                };
                var headerTable = CreateHeaderTable(ws);
                var inFotable = CreateGeneralInfoTable(ws);
                var sampleListTable = CreateSampleListTable(ws.Samples.ToList());
                doc.MainDocumentPart.Document.Body.Append(headerTable);
                doc.MainDocumentPart.Document.Body.Append(new Paragraph());
                doc.MainDocumentPart.Document.Body.Append(inFotable);
                doc.MainDocumentPart.Document.Body.Append(new Paragraph());
                doc.MainDocumentPart.Document.Body.Append(sampleListTable);

            }
            stream.Seek(0, SeekOrigin.Begin);
            return stream;
        }
    }
}