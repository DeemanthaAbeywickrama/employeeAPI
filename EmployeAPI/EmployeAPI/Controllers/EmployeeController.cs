using EmployeAPI.Data;
using EmployeAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmployeeController : ControllerBase
    {
        private readonly UserDbContext _context;
        
        public EmployeeController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }

        [HttpPost("add_employee")]
        public IActionResult AddEmployee([FromBody] EmployeeModel employeeObj)
        {
            if(employeeObj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.employeeModels.Add(employeeObj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Employee added Success"
                });

            }
        }

        [HttpPut("update_employee")]
        public IActionResult UpdateEmployee([FromBody] EmployeeModel employeeObj)
        {
            if(employeeObj == null)
            {
                return BadRequest();
            }
            var user = _context.employeeModels.AsNoTracking().FirstOrDefault(x => x.Id == employeeObj.Id);
            if(user == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User not found"
                });
            }
            else
            {
                _context.Entry(employeeObj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Updated Success"
                });
            }
        }

        [HttpDelete("delete_employee/{id}")]
        public IActionResult DeleteEmploye(int id)
        {
            var user = _context.employeeModels.Find(id);
            if(user == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "User not found"
                });
            }
            else
            {
                _context.Remove(user);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Employee deleted"
                });
            }
        }

        [HttpGet("get_all_employees")]
        public IActionResult GetAllEmployees()
        {
            var employees = _context.employeeModels.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                EmployeeDetails = employees

            });
        }

        [HttpGet("get_employee/id")]
        public IActionResult GetEmployee(int id)
        {
            var employee = _context.employeeModels.Find(id);
            if(employee == null)
            {
                return NotFound(new 
                {
                    StatusCode = 404,
                    Message = "User not Found"
                });

            }
            else
            {
                return Ok(new
                {
                    StatusCode = 200,
                    Employeedetail = employee
                });
            }
        }

        [HttpGet("get_all_city")]
        public IActionResult GetAllCity()
        {
            var city = _context.cityModels.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                EmployeeCity = city
            });
        }

    }
}
