using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class AddStatusToParamater : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "WorkSheet");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "Sample");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "SampleMethodAssigment",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "SampleMethodAssigment");

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "WorkSheet",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Status",
                table: "Sample",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
