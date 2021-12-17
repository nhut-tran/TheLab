using Domain;
using FluentValidation;

namespace Application.Validator
{
    public class SampleMethodAssigmentValidator : AbstractValidator<SampleMethodAssigment>
    {
        public SampleMethodAssigmentValidator()
        {

            RuleFor(s => s.MethodID).NotEmpty();

        }
    }
}