using MailKit.Net.Smtp;
using Microsoft.Extensions.Options;
using MimeKit;
using MimeKit.Text;
using Application.Core;
using System.IO;
using System.Net.Mime;

namespace Application.Service.EmailService
{
    public class EmailSender : IEmailSender
    {

        public EmailSConfigure Configure { get; set; }
        public EmailSender(IOptions<EmailSConfigure> op)
        {
            Configure = op.Value;
        }


        public void Send(CustomerDto customer, WorkSheetDto ws, EmailContentType sendPurpose, Stream stream)
        {
            var message = new MimeMessage();
            message.From.Add(new MailboxAddress("The Lab", "TheLab@email.com"));
            message.To.Add(new MailboxAddress("Customer", customer.Email));
            var multipart = new Multipart();

            if (EmailContentType.SendReceipt == sendPurpose)
            {
                message.Subject = "Sample Receipt";
                var text = string.Format(@"
                    <h3>Dear {0},<h3>
                    <div>
                        <p style=""color:black; font-size:13.5px"">The Lab received your samples. We would like to inform the Recive No
                        of your sample is <b>{1}</b> 
                        The Result of your samples will be send your email in {2}</p>
                    </div>
                    <div style=""color:red; font-size:13.5px"">
                        <p style=""color:black"">Thansk & Best Regards</p>
                        <p>The Lab</p>
                        <p>Phone number: 30932829
                        Email: receive@email.com</p>
                    </div>", customer.Name, ws.ReceiveNo, ws.ResultDate);
                multipart.Add(new TextPart(TextFormat.Html) { Text = text });
            }
            else
            {
                message.Subject = "Result";
                var text = string.Format(@"
                 <h3>Dear {0},<h3>
                    <div>
                        <p style=""color:black; font-size:13.5px"">The Lab analyzed your samples. We would like to inform the result of sample
                        with the Recive No {1}
                        of your sample is <b>{1}</b> 
                        Please open attached file(s) for details.
                        </p>
                    </div>
                    <div style=""color:red; font-size:13.5px"">
                        <p style=""color:black"">Thansk & Best Regards</p>
                        <p>The Lab</p>
                        <p>Phone number: 30932829
                        Email: receive@email.com</p>
                <p>", customer.Name, ws.ReceiveNo);
                multipart.Add(new TextPart(TextFormat.Html) { Text = text });
                var attachmentPart = new MimePart(MediaTypeNames.Application.Octet)
                {
                    Content = new MimeContent(stream),
                    ContentTransferEncoding = ContentEncoding.Base64,
                    FileName = $"{ws.ReceiveNo}-report.docx"
                };
                multipart.Add(attachmentPart);
            }
            message.Body = multipart;
            using (var client = new SmtpClient())
            {
                client.Connect(Configure.Host, Configure.Port, false);
                client.Authenticate(Configure.Email, Configure.Password);
                client.Send(message);
                client.Disconnect(true);
            }


        }
    }
}