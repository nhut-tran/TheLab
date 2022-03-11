using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class CreateResultDateFunc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"
            CREATE OR REPLACE FUNCTION createresultdate() returns trigger
	    LANGUAGE plpgsql
	    AS $$
		declare
		result_query record;
		 day_add text;
		begin
			select ""Method"".""MethodID"", ""TurnArroundDay"" from ""Method""
			where ""Method"".""MethodID"" = NEW.""MethodID""
			into result_query;
			if found then
			day_add := result_query.""TurnArroundDay""::text || 'days';
			
			NEW.""ResultDate"" = Current_timestamp +  day_add::interval;
			else
			 raise exception 'Cannot create result date';
			end if;
			return NEW;
		end; $$";
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
