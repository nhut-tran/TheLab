using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class CreateWorkSheetNoTrigger : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"CREATE TRIGGER createWorkSheetNoTrigger
             BEFORE INSERT
             ON ""WorkSheet""
            FOR EACH ROW
			EXECUTE PROCEDURE createWorkSheetNo();";
            
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
