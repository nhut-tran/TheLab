using FluentValidation;

namespace Application.Validator
{
    public class SampleValidator : AbstractValidator<Domain.Sample>
    {
        public SampleValidator()
        {
            RuleFor(s => s.Description).NotEmpty().WithMessage("{PropertyName} cannot empty");
            RuleFor(s => s.Weight).NotEmpty().WithMessage("{PropertyName} cannot empty"); ;
            RuleFor(s => s.Paramaters).Must(p => p.Count > 0).WithMessage("{PropertyName} cannot empty");
            RuleFor(s => s.Paramaters).ForEach(p => p.SetValidator(new SampleMethodAssigmentValidator()));
        }
    }
}