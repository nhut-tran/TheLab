using System.Collections.Generic;
using System.IO;
using System.Linq;
using Application.Core;
using Application.Interface;
using Application.Service.GenerateReport;
using DocumentFormat.OpenXml;

using DocumentFormat.OpenXml.Packaging;
using DocumentFormat.OpenXml.Wordprocessing;

namespace Application.Service
{
    public class Report : IGenerateReport<Table, Style, Paragraph>

    {
        public Table CreateTable(SampleDto samples)
        {
            var table = new Table();
            var tableProp = new TableProperties();

            var tableStyle = new TableStyle() { Val = "TableForm" };
            TableWidth tableWidth = new TableWidth() { Width = "5000", Type = TableWidthUnitValues.Pct };

            tableProp.Append(tableStyle, tableWidth);
            table.Append(tableProp);
            TableGrid tg = new TableGrid(new GridColumn(), new GridColumn(), new GridColumn());
            table.AppendChild(tg);
            TableRow headerRow = new TableRow();
            TableCell tc0 = new TableCell(new Paragraph(new Run(new Text("STT"))));
            TableCell tc1 = new TableCell(new Paragraph(new Run(new Text("Paramater"))));
            TableCell tc2 = new TableCell(new Paragraph(new Run(new Text("Method"))));
            TableCell tc3 = new TableCell(new Paragraph(new Run(new Text("Unit"))));
            TableCell tc4 = new TableCell(new Paragraph(new Run(new Text("Result"))));

            headerRow.Append(tc0, tc1, tc2, tc3, tc4);
            table.Append(headerRow);
            foreach (var param in samples.Paramaters)
            {
                TableRow tr = new TableRow();
                TableCell tc5 = new TableCell(new Paragraph(new Run(new Text((samples.Paramaters.ToList().IndexOf(param) + 1).ToString()))));
                TableCell tc6 = new TableCell(new Paragraph(new Run(new Text(param.Tartget))));
                TableCell tc7 = new TableCell(new Paragraph(new Run(new Text(param.Method))));
                TableCell tc8 = new TableCell(new Paragraph(new Run(new Text(param.Unit))));
                TableCell tc9 = new TableCell(new Paragraph(new Run(new Text(param.Result))));
                tr.Append(tc5, tc6, tc7, tc8, tc9);
                table.Append(tr);
            }

            return table;

        }

        public List<Paragraph> CreateGeneralInfo(string customer, string receiveDate, SampleDto sample)
        {
            var generalInfo = new GeneralInfo(customer, receiveDate, sample);
            return generalInfo.CreateParagraph(generalInfo);

        }
        public Style CreateTableStyle()
        {
            var newStyle = new Style()
            {
                StyleId = "TableForm",
                StyleName = new StyleName() { Val = "TableForm" },
                Type = StyleValues.Table,

                CustomStyle = true
            };
            // newStyle.Append(new TableStyleProperties() { Type = TableStyleOverrideValues.FirstRow });

            var styleTabelProp = new StyleTableProperties();
            TableStyleRowBandSize tableStyleRowBandSize = new TableStyleRowBandSize() { Val = 1 };
            TableStyleColumnBandSize tableStyleColumnBandSize = new TableStyleColumnBandSize() { Val = 1 };
            var topBorder = new TopBorder() { Val = BorderValues.Single, Size = 8 };
            var botBorder = new BottomBorder() { Val = BorderValues.Single, Size = 8 };
            // var leftBorder = new LeftBorder() { Val = BorderValues.Single, Size = 8 };
            // var rightBorder = new RightBorder() { Val = BorderValues.Single, Size = 8 };
            // var horizontalBorder = new InsideHorizontalBorder() { Val = BorderValues.Single, Size = 5 };
            // var verti = new InsideVerticalBorder() { Val = BorderValues.Single, Size = 5 };
            var tableBorder = new TableBorders()
            {
                TopBorder = topBorder,
                BottomBorder = botBorder,
                // LeftBorder = leftBorder,
                // RightBorder = rightBorder,
                // InsideHorizontalBorder = horizontalBorder,
                // InsideVerticalBorder = verti
            };

            styleTabelProp.Append(tableBorder, tableStyleRowBandSize, tableStyleColumnBandSize);
            var tableStyleProp = new TableStyleProperties()
            {
                Type = TableStyleOverrideValues.FirstRow,
            };
            var runBaseProp = new RunPropertiesBaseStyle() { Bold = new Bold() { Val = true } };
            tableStyleProp.Append(runBaseProp);
            var styleTableConditionProp = new TableStyleConditionalFormattingTableProperties();

            var styleCellConditionProp = new TableStyleConditionalFormattingTableCellProperties();

            TableCellBorders tableCellBorders = new TableCellBorders();
            TopBorder topBorderCell = new TopBorder() { Val = BorderValues.Single, Color = "000000", Size = 8U, Space = 0U };
            LeftBorder leftBorderCell = new LeftBorder() { Val = BorderValues.Nil };
            BottomBorder bottomBorderCell = new BottomBorder() { Val = BorderValues.Single, Color = "000000", Size = (UInt32Value)8U, Space = (UInt32Value)0U };
            RightBorder rightBorderCell = new RightBorder() { Val = BorderValues.Nil };
            InsideHorizontalBorder insideHorizontalBorderCell = new InsideHorizontalBorder() { Val = BorderValues.Nil };
            InsideVerticalBorder insideVerticalBorderCell = new InsideVerticalBorder() { Val = BorderValues.Nil };


            tableCellBorders.Append(topBorderCell);
            tableCellBorders.Append(leftBorderCell);
            tableCellBorders.Append(bottomBorderCell);
            tableCellBorders.Append(rightBorderCell);
            tableCellBorders.Append(insideHorizontalBorderCell);
            tableCellBorders.Append(insideVerticalBorderCell);
            styleCellConditionProp.Append(tableCellBorders);

            var tableStylePropStrip = new TableStyleProperties()
            {
                Type = TableStyleOverrideValues.Band1Horizontal
            };
            var styleTableConditionProp2 = new TableStyleConditionalFormattingTableProperties()
            {

            };

            var styleCellConditionPropStrip = new TableStyleConditionalFormattingTableCellProperties();
            Shading shading55 = new Shading() { Val = ShadingPatternValues.Clear, Color = "auto", Fill = " #c3e4e8" };
            styleCellConditionPropStrip.Append(shading55);

            tableStyleProp.Append(styleTableConditionProp, styleCellConditionProp);
            tableStylePropStrip.Append(styleTableConditionProp2, styleCellConditionPropStrip);
            newStyle.Append(styleTabelProp);
            newStyle.Append(tableStyleProp, tableStylePropStrip);

            return newStyle;


        }
        public Stream GenerateReport(WorkSheetDto ws)
        {
            var stream = new MemoryStream();
            using (WordprocessingDocument doc = WordprocessingDocument.Create(stream, WordprocessingDocumentType.Document))
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
                var newStyle = CreateTableStyle();
                var titleStyle = ReportTitle.CreateTitleStyle();
                var descriptionStyle = KeySampleDescription.CreateDescriptionStyle();
                stylePart.Styles.Append(newStyle, titleStyle, descriptionStyle);



                foreach (var sample in ws.Samples)
                {
                    var table = CreateTable(sample);
                    doc.MainDocumentPart.Document.Body.Append(CreateGeneralInfo(ws.IssueTo, ws.ReceiveDate, sample));
                    doc.MainDocumentPart.Document.Body.Append(table);
                    if (ws.Samples.ToList().IndexOf(sample) + 1 != ws.Samples.Count)
                        doc.MainDocumentPart.Document.Body.Append(new Paragraph(new Run(new Break() { Type = BreakValues.Page })));
                }

            }
            stream.Seek(0, SeekOrigin.Begin);
            return stream;



        }
    }

}

