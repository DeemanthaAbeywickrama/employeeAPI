using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeAPI.Models
{
    public class CityModel
    {
        [Key]
        public int Id { get; set; }

        public string City { get; set; }
    }
}
