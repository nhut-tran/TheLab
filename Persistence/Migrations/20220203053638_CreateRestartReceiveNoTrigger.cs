using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class CreateRestartReceiveNoTrigger : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
            CREATE TRIGGER restartreceivenoTrigger
             BEFORE INSERT
             ON ""WorkSheet""
            FOR EACH ROW
            EXECUTE PROCEDURE restartreceiveno();";

            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
