using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeAPI.Models
{
    public class EmployeeModel
    {
        [Key]
        public int Id { get; set; }
       
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public DateTime DOB { get; set; }

        public string TPNo { get; set; }

        public string Email { get; set; }

        public string MaritalStatus { get; set; }

        public string City { get; set; }

        public string Remark { get; set; }
    }
}
