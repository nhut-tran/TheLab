using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class CreateRestartReceiveNoFunc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
           CREATE OR REPLACE FUNCTION restartreceiveno() returns trigger
	        LANGUAGE plpgsql
            AS $$
		    declare
		    lr record;
		    Begin
		    select * from ""WorkSheet"" order by ""WorkSheet"".""ReceiveDate""  desc limit 1
            into lr;
            if Extract(Day from NEW.""ReceiveDate"") <> Extract(Day from lr.""ReceiveDate"") then
                Alter sequence ""ReceiveNO"" restart with 1;
            end if;
            NEW.""ReceiveNo"" = 'RCN' ||  EXTRACT(year FROM CURRENT_DATE)::text
                || EXTRACT(month FROM CURRENT_DATE)::text ||
                EXTRACT(day FROM CURRENT_DATE)::text
                || nextval('""ReceiveNO""')::text;
                RETURN NEW;
            end; $$ ";
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
