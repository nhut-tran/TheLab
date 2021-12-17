using System.Linq;
using FluentValidation;

namespace Application.Validator
{
    public class WorkSheetValidator : AbstractValidator<Domain.WorkSheet>
    {
        public WorkSheetValidator()
        {
            RuleFor(w => w.IssueTo).NotNull().WithMessage("Must select customer");
            RuleFor(w => w.Samples).NotNull().Must(ss => ss.Count > 0);
            RuleFor(w => w.Samples).ForEach(s => s.SetValidator(new SampleValidator()));
            RuleFor(w => w.WorkSheetNo).NotEmpty().WithMessage("Something went wrong");
            RuleFor(w => w.ReceiveDate).NotNull().WithMessage("Something went wrong");
        }
    }
}