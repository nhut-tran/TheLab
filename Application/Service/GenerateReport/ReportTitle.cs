using DocumentFormat.OpenXml.Wordprocessing;

namespace Application.Service.GenerateReport
{
    public class ReportTitle
    {
        public ReportTitle(string title)
        {
            Title = title;
        }
        public static Style CreateTitleStyle()
        {
            var titleStyle = new Style() { Type = StyleValues.Paragraph, CustomStyle = true, StyleId = "ReportTitle" };
            var styleName = new StyleName() { Val = "Report Title" };
            titleStyle.StyleName = styleName;
            var styleParagraphProp = new StyleParagraphProperties();
            StyleRunProperties styleRunProperties = new StyleRunProperties() { FontSize = new FontSize() { Val = "60" } };
            var justify = new Justification() { Val = JustificationValues.Center };
            var runBaseProp = new RunPropertiesBaseStyle()
            {
                Bold = new Bold() { Val = true },

            };
            styleParagraphProp.Append(justify, runBaseProp, styleRunProperties);
            titleStyle.Append(styleParagraphProp);
            return titleStyle;
        }

        public string Title { get; set; }
    }
}