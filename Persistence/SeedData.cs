using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Persistence
{
    public class SeedData
    {
        private readonly DataContext _db;
        private readonly UserManager<AppUser> _userManager;

        public SeedData(DataContext db, UserManager<AppUser> userManager)
        {
            _userManager = userManager;
            _db = db;
        }

        // private async Task SeedUser()
        // {
        //     if (_userManager.Users.Any()) return;

        //     var users = new List<AppUser>(){
        //         new AppUser() {
        //             UserName = "Nhut",
        //             Email = "Nhut@email.com",
        //            // PasswordHash = "nhut$$Pass2"
        //         },

        //         new AppUser() {
        //             UserName = "Nhut2",
        //             Email = "Nhut2@email.com",
        //           //  PasswordHash = "nhut$$Pass2"
        //         },

        //         new AppUser() {
        //             UserName = "Nhut3",
        //             Email = "Nhut3@email.com",
        //           //  PasswordHash = "nhut$$Pass2"
        //         }
        //     };

        //     foreach (var user in users)
        //     {
        //         await _userManager.CreateAsync(user, "Nhut@Pass2");
        //     }
        // }
        // private void SeedSample()
        // {
        //     if (_db.Sample.Any()) return;
        //     // var method = _db.Method.ToList();
        //     var sp = new List<Sample>() {
        //         new Sample {
        //           //  SampleID = 1,
        //             Sampling = false,
        //             Description = "Raw meat",
        //             Weight = 30,

        //         },

        //          new Sample {
        //          //   SampleID = 2,
        //             Sampling = false,
        //             Description = "Cooked meat",
        //             Weight = 500,

        //         }
        //     };

        //     _db.Sample.AddRange(sp);
        // }
        // private void SeedCustomer()
        // {
        //     if (_db.Customer.Any()) return;

        //     var cus = new List<Customer>() {
        //          new Customer {
        //              CustomerId = "AAA",
        //              Name="AAA Company",
        //              Address="123, cc street, LA",
        //              PhoneNumber= "090290290321",
        //              Email="AAA@email"
        //          },
        //          new Customer {
        //              CustomerId = "BBB",
        //              Name="BBB Company",
        //              Address="2321, cc street, Df",
        //              PhoneNumber= "845847853",
        //              Email="BBB@email"
        //          }
        //      };

        //     _db.Customer.AddRange(cus);
        // }

        private void SeeMedthod()
        {
            var blankMethod = _db.Method.FirstOrDefault(m => m.MethodID == default && m.Name == "blank" && m.Description == "blank" && m.Unit == "blank");
            var dept = _db.Department.FirstOrDefault(m => m.DepartmentID == "Re");
            if (dept == null)
            {


                var sqlDep = @"
                INSERT INTO ""Department"" (
                            ""DepartmentID"",
                            ""Name"",
                            ""HeaderName""
                            )
                        VALUES(
                            'Re',
                            'Receive',
                            'AAA'
                        );
                ";

                _db.Database.ExecuteSqlRaw(sqlDep);
            }
            if (blankMethod == null)
            {
                var sql = @"
                INSERT INTO ""Method"" (
                            ""MethodID"",
                            ""Name"",
                            ""Unit"",
                            ""Description"",
                            ""TurnArroundDay"",
                            ""DepartmentID""
                            )
                        VALUES(
                            '00000000-0000-0000-0000-000000000000',
                            'blank',
                            'blank',
                            'blank',
                            0,
                            'Re'
                        );
                ";

                _db.Database.ExecuteSqlRaw(sql);


            }


        }
        // public void SeedDeparment()
        // {

        //     if (_db.Department.Any()) return;
        //     var def = new List<Department>() {
        //         new Department {
        //             DepartmentID = "MI",
        //             HeaderName = "AAA",
        //             Name = "Microbiology",
        //             Methods = new List<Method>()
        //         },

        //         new Department {
        //             DepartmentID = "OR",
        //             HeaderName = "BB",
        //             Name = "Organic",
        //             Methods = new List<Method>()
        //         },

        //         new Department {
        //             DepartmentID = "IO",
        //             HeaderName = "CC",
        //             Name = "Inorganic",
        //             Methods = new List<Method>()
        //         }
        //     };

        //     _db.Department.AddRange(def);

        // }

        public void Seed()
        {

            //   SeedCustomer();
            // SeedDeparment();
            SeeMedthod();
            //  SeedSample();
            //     await SeedUser();
            _db.SaveChanges();
        }
    }
}