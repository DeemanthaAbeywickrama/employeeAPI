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
    public class CityController : ControllerBase
    {
        private readonly UserDbContext _context;

        public CityController(UserDbContext userDbContext)
        {
            _context = userDbContext;
        }
        [HttpGet("get_city")]
        public IActionResult GetAllCity()
        {
            var city = _context.cityModels.AsQueryable();
            return Ok(new
            {
                StatusCode = 200,
                EmployeeCity = city
            });
        }

        [HttpPost("add_city")]
        public IActionResult AddCity([FromBody] CityModel cityobj)
        {
            if(cityobj == null)
            {
                return BadRequest();
            }
            else
            {
                _context.cityModels.Add(cityobj);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "City added success"
             
                });
            }
        }
        
        [HttpDelete("delete_city/{id}")]
        public IActionResult DeleteCity(int id)
        {
            var city = _context.cityModels.Find(id);
            if(city == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "City not found"
                });
            }
            else
            {
                _context.Remove(city);
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "City deleted"
                });
            }

        }

        [HttpPut("update_city")]
        public IActionResult UpdateCity([FromBody] CityModel cityobj)
        {
            if(cityobj == null)
            {
                return BadRequest();
            }
            var city = _context.cityModels.AsNoTracking().FirstOrDefault(x => x.Id == cityobj.Id);
            if(city == null)
            {
                return NotFound(new
                {
                    StatusCode = 404,
                    Message = "City not found"
                });
            }
            else
            {
                _context.Entry(cityobj).State = EntityState.Modified;
                _context.SaveChanges();
                return Ok(new
                {
                    StatusCode = 200,
                    Message = "Updated Success"
                });
            }
        }
    }
}
