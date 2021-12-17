using System;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using Domain;
using FluentValidation;

namespace Application.Validator
{
    public class MethodValidator : AbstractValidator<Domain.Method>
    {

        public MethodValidator()
        {
            RuleFor(m => m.TurnArroundDay).NotEmpty();
            RuleFor(m => m.Description).NotEmpty();
            RuleFor(m => m.DepartmentID).NotEmpty();
            RuleFor(m => m.Name).NotEmpty();
            RuleFor(m => m.Target).NotEmpty();
            RuleFor(m => m.Unit).NotEmpty();

        }
    }


}