
using System.IO;
using Application.Core;

namespace Application.Service.EmailService
{
    public interface IEmailSender
    {
        void Send(string email, string name, WorkSheetDto ws, EmailContentType sendPurpose, Stream st);
    }
}