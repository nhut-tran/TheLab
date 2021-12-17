using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class CreateWorkSheetNoFunc : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            var sql = @"CREATE OR REPLACE FUNCTION createWorkSheetNo() returns trigger
            LANGUAGE plpgsql
            AS $$
            BEGIN
                NEW.""WorkSheetNo"" = 'WSN' || EXTRACT(YEAR FROM CURRENT_DATE)::text
                || nextval('""WorkSheetNO""')::text;
                RETURN NEW;
            END;
            $$
            ";
            
            migrationBuilder.Sql(sql);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}