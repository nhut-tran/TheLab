
using System.IO;
using Application.Core;

namespace Application.Service.EmailService
{
    public interface IEmailSender
    {
        void Send(CustomerDto customer, WorkSheetDto ws, EmailContentType sendPurpose, Stream st);
    }
}