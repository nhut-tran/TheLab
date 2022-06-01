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
        private readonly WorkSheetInfo _wsInfo;
        private readonly SampleInfo _spInfo;
        public GenerateWorkSheet(WorkSheetInfo wsInfo, SampleInfo spInfo)
        {
            _spInfo = spInfo;
            _wsInfo = wsInfo;
        }


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
            _wsInfo.SetInfo(ws);
            var data = _wsInfo.GetInfo();

            var table = new Table();
            var tableProp = new TableProperties();
            var tableStyle = new TableStyle() { Val = "TableWorkSheetForm" };
            TableWidth tableWidth = new TableWidth() { Width = "5000", Type = TableWidthUnitValues.Pct };

            tableProp.Append(tableStyle, tableWidth);
            table.Append(tableProp);
            TableGrid tg = new TableGrid(new GridColumn(), new GridColumn());
            table.AppendChild(tg);

            foreach (KeyValuePair<string, string> entry in data)
            {
                TableRow r = new TableRow();
                TableCell c1 = new TableCell(new Paragraph(new Run(new Text(entry.Key))));
                TableCell c2 = new TableCell(new Paragraph(new Run(new Text(entry.Value))));
                r.Append(c1, c2);
                table.Append(r);
            }

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
            var tableProp = new TableProperties();
            var tableStyle = new TableStyle() { Val = "TableWorkSheetForm" };
            TableWidth tableWidth = new TableWidth() { Width = "5000", Type = TableWidthUnitValues.Pct };
            tableProp.Append(tableStyle, tableWidth);
            table.Append(tableProp);
            var headerData = _spInfo.Info;

            var headerRow = new TableRow();
            foreach (KeyValuePair<string, string> entry in headerData)
            {


                TableCell headerCell = new TableCell(new Paragraph(new Run(new Text(entry.Key))));
                if (entry.Key == "Method" || entry.Key == "Paramaters")
                {
                    headerCell.Append(new TableCellProperties() { TableCellWidth = new TableCellWidth() { Width = "800", Type = TableWidthUnitValues.Pct } });
                }
                headerRow.Append(headerCell);


            }
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
                    
                    var run = new Run();
                    run.AppendChild(new Text("Code: " + sample.SampleNo.ToString()));
                    run.AppendChild(new Break() { });
                    run.AppendChild(new Text("SEQ: " + sampleList.IndexOf(sample).ToString()));
                    run.AppendChild(new Break() { });
                    run.AppendChild(new Text("Description: " + sample.Description));
                    run.AppendChild(new Break() { });
                    run.AppendChild(new Text("Weight: " + sample.Weight.ToString()));
                    var tcs0 = new TableCell(new Paragraph(run));
               
                   
                   

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
                        var c = new TableCell(new Paragraph());
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

        private Style CreateTableStyle()
        {
            var newStyle = new Style()
            {
                StyleId = "TableWorkSheetForm",
                StyleName = new StyleName() { Val = "TableWorkSheetForm" },
                Type = StyleValues.Table,

                CustomStyle = true
            };
            // newStyle.Append(new TableStyleProperties() { Type = TableStyleOverrideValues.FirstRow });

            var styleTabelProp = new StyleTableProperties();
            TableStyleRowBandSize tableStyleRowBandSize = new TableStyleRowBandSize() { Val = 1 };
            TableStyleColumnBandSize tableStyleColumnBandSize = new TableStyleColumnBandSize() { Val = 1 };
            var topBorder = new TopBorder() { Val = BorderValues.Single, Size = 8 };
            var botBorder = new BottomBorder() { Val = BorderValues.Single, Size = 8 };
            var leftBorder = new LeftBorder() { Val = BorderValues.Single, Size = 8 };
            var rightBorder = new RightBorder() { Val = BorderValues.Single, Size = 8 };
            var horizontalBorder = new InsideHorizontalBorder() { Val = BorderValues.Single, Size = 5 };
            var verti = new InsideVerticalBorder() { Val = BorderValues.Single, Size = 5 };
            var tableBorder = new TableBorders()
            {
                TopBorder = topBorder,
                BottomBorder = botBorder,
                LeftBorder = leftBorder,
                RightBorder = rightBorder,
                InsideHorizontalBorder = horizontalBorder,
                InsideVerticalBorder = verti
            };

            styleTabelProp.Append(tableBorder, tableStyleRowBandSize, tableStyleColumnBandSize);
            var tableStyleProp = new TableStyleProperties()
            {
                Type = TableStyleOverrideValues.FirstRow,
            };
            var runBaseProp = new RunPropertiesBaseStyle() { Bold = new Bold() { Val = true } };
            tableStyleProp.Append(runBaseProp);
            var styleTableConditionProp = new TableStyleConditionalFormattingTableProperties();



            var tableStylePropStrip = new TableStyleProperties()
            {
                Type = TableStyleOverrideValues.FirstRow
            };
            var styleTableConditionProp2 = new TableStyleConditionalFormattingTableProperties()
            {

            };

            var styleCellConditionPropStrip = new TableStyleConditionalFormattingTableCellProperties();
            Shading shading55 = new Shading() { Val = ShadingPatternValues.Clear, Color = "auto", Fill = " #c3e4e8" };
            styleCellConditionPropStrip.Append(shading55);

            tableStyleProp.Append(styleTableConditionProp);
            tableStylePropStrip.Append(styleTableConditionProp2, styleCellConditionPropStrip);
            newStyle.Append(styleTabelProp);
            newStyle.Append(tableStyleProp, tableStylePropStrip);

            return newStyle;


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
                var tableStyle = CreateTableStyle();

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
                stylePart.Styles.Append(tableStyle);

                var inFotable = CreateGeneralInfoTable(ws);
                var sampleListTable = CreateSampleListTable(ws.Samples.ToList());

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