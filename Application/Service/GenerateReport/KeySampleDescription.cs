using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DocumentFormat.OpenXml.Wordprocessing;

namespace Application.Service.GenerateReport
{
    public class KeySampleDescription
    {
        public KeySampleDescription(string key)
        {
            Key = key;
        }
        public KeySampleDescription()
        {

        }
        public string Key { get; set; }
        public static Style CreateDescriptionStyle()
        {
            var titleStyle = new Style() { Type = StyleValues.Paragraph, CustomStyle = true, StyleId = "KeyStyle" };
            var styleName = new StyleName() { Val = "Key Style" };
            titleStyle.StyleName = styleName;
            var styleParagraphProp = new StyleParagraphProperties();
            var styleRunProperties = new StyleRunProperties() { FontSize = new FontSize() { Val = "28" } };
            var justify = new Justification() { Val = JustificationValues.Left };
            var runBaseProp = new RunPropertiesBaseStyle()
            {
                Bold = new Bold() { Val = true },

            };
            styleParagraphProp.Append(justify, runBaseProp, styleRunProperties);
            titleStyle.Append(styleParagraphProp);
            return titleStyle;
        }
    }
}