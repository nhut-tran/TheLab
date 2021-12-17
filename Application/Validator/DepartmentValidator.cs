using FluentValidation;

namespace Application.Validator
{
    public class DepartmentValidator : AbstractValidator<Domain.Department>
    {
        public DepartmentValidator()
        {
            RuleFor(d => d.Name).NotEmpty();
            RuleFor(d => d.DepartmentID).NotEmpty();
            RuleFor(d => d.HeaderName).NotEmpty();
        }
    }
}