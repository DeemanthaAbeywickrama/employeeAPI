using EmployeAPI.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeAPI.Data
{
    public class UserDbContext:DbContext
    {
        public UserDbContext(DbContextOptions<UserDbContext>options):base(options)
        {

        }

        public DbSet<EmployeeModel> employeeModels { get; set; }

        public DbSet<CityModel> cityModels { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<EmployeeModel>().ToTable("EmployeeDetails");

            modelBuilder.Entity<CityModel>().ToTable("EmployeeCity");
        }

    }
}
