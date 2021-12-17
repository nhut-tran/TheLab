// namespace Application.Service
// {
//     public class Ref
//     {
//         var table = new Table();
//         TableProperties tableProp = new TableProperties();


//         var newStyle = new Style()
//         {
//             StyleId = "nhut2",
//             StyleName = new StyleName() { Val = "nhut2" },
//             Type = StyleValues.Table,
//             CustomStyle = true
//         };
//         var styleTabeProp = new StyleTableProperties();
//         var shad = new Shading()
//         {
//             Color = "Auto",
//             Fill = "FF0000",
//             ThemeFill = ThemeColorValues.Accent6,
//             ThemeFillTint = "99",
//             Val = ShadingPatternValues.Clear
//         };

//         var shad2 = new Shading()
//         {
//             Color = "Auto",
//             Fill = "FF0000",

//             Val = ShadingPatternValues.Clear
//         };
//         var tableLook = new TableLook()
//         {
//             FirstRow = true,
//             Val = "07C0"
//         };
//         var topBorder = new TopBorder() { Val = BorderValues.Single, Size = 12 };
//         var botBorder = new BottomBorder() { Val = BorderValues.Single, Size = 12 };
//         var leftBorder = new LeftBorder() { Val = BorderValues.Single, Size = 12 };
//         var rightBorder = new RightBorder() { Val = BorderValues.Single, Size = 12 };
//         var horizontalBorder = new InsideHorizontalBorder() { Val = BorderValues.Single, Size = 5 };
//         var verti = new InsideVerticalBorder() { Val = BorderValues.Single, Size = 5 };
//         var tableBorder = new TableBorders()
//         {
//             TopBorder = topBorder,
//             BottomBorder = botBorder,
//             LeftBorder = leftBorder,
//             RightBorder = rightBorder,
//             InsideHorizontalBorder = horizontalBorder,
//             InsideVerticalBorder = verti
//         };


//         styleTabeProp.Append(tableBorder);

//             var tableCellProp = new StyleTableCellProperties();
//         var cellAli = new TableCellVerticalAlignment() { Val = TableVerticalAlignmentValues.Center };
//         tableCellProp.Append(cellAli);
//             // tableCellProp.Append(new TableCellMargin() { TopMargin = new TopMargin() { Width = "23" } });

//             newStyle.Append(styleTabeProp, tableCellProp);
//             styles.Styles.Append(newStyle);

//             var tableStyle = new TableStyle() { Val = "nhut2" };
//         TableWidth tableWidth = new TableWidth() { Width = "5000", Type = TableWidthUnitValues.Pct };

//         tableProp.Append(tableStyle, tableWidth, tableLook);

//             table.Append(tableProp);

//             TableGrid tg = new TableGrid(new GridColumn(), new GridColumn(), new GridColumn());
//         table.AppendChild(tg);

//             // Create 1 row to the table.
//             TableRow tr1 = new TableRow();

//         TableRow tr2 = new TableRow();

//         // Add a cell to each column in the row.
//         TableCell tc1 = new TableCell(new Paragraph(new Run(new Text("1"))));
//         TableCell tc2 = new TableCell(new Paragraph(new Run(new Text("2"))));
//         TableCell tc3 = new TableCell(new Paragraph(new Run(new Text("3"))));
//         TableCell tc4 = new TableCell(new Paragraph(new Run(new Text("1"))));
//         TableCell tc5 = new TableCell(new Paragraph(new Run(new Text("2"))));
//         TableCell tc6 = new TableCell(new Paragraph(new Run(new Text("3"))));
//         tc1.Append(new TableCellProperties() { Shading = shad });
//             tr1.Append(tc1, tc2, tc3);
//             tr2.Append(tc4, tc5, tc6);

//             table.Append(tr1, tr2);

//             return table;
//     }
// }