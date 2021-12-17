using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class CreateResultDateTrigger : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"CREATE TRIGGER createresultdateTrigger
             BEFORE INSERT
             ON ""SampleMethodAssigment""
            FOR EACH ROW
            EXECUTE PROCEDURE createresultdate();";
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
