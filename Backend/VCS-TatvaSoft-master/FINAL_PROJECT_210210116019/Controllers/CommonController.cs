using Business_logic_Layer;
using Data_Access_Layer;
using Data_Access_Layer.Common;
using Data_Access_Layer.Repository;
using Data_Access_Layer.Repository.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Net.Http.Headers;
using Data_Access_Layer.Repository.Entities;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommonController : ControllerBase
    {
        private readonly AppDbContext _cIDbContext;

        public CommonController(AppDbContext cIDbContext)
        {
            _cIDbContext = cIDbContext;
        }

        [HttpGet("CountryList")]
        public async Task<ActionResult<List<DropDown>>> CountryListAsync()
        {
            var result = await _cIDbContext.Country
                .OrderBy(c => c.CountryName)
                .Select(c => new DropDown { Value = c.Id, Text = c.CountryName })
                .ToListAsync();
            return Ok(result);
        }

        [HttpGet("CityList")]
        public async Task<ActionResult<List<DropDown>>> CityListAsync()
        {
            var result = await _cIDbContext.City
                .OrderBy(c => c.CityName)
                .Select(c => new DropDown { Value = c.Id, Text = c.CityName })
                .ToListAsync();
            return Ok(result);
        }


        [HttpGet("MissionCountryList")]
        public async Task<ActionResult<List<DropDown>>> MissionCountryListAsync()
        {
            var result = await _cIDbContext.Missions.Select(m => new DropDown { Value = m.CountryId, Text = m.CountryName })
                .Distinct()
                .ToListAsync();
            return Ok(result);
        }

        [HttpGet("MissionCityList")]
        public async Task<ActionResult<List<DropDown>>> MissionCityListAsync()
        {
            var result = await _cIDbContext.Missions
                .Select(m => new DropDown { Value = m.CityId, Text = m.CityName })
                .Distinct()
                .ToListAsync();
            return Ok(result);
        }

        [HttpGet("MissionThemeList")]
        public async Task<ActionResult<List<DropDown>>> MissionThemeListAsync()
        {
            var result = await _cIDbContext.MissionTheme
                .Select(mt => new DropDown { Value = mt.Id, Text = mt.ThemeName })
                .Distinct()
                .ToListAsync();
            return Ok(result);
        }

        [HttpGet("MissionSkillList")]
        public async Task<ActionResult<List<DropDown>>> MissionSkillListAsync()
        {
            var result = await _cIDbContext.MissionSkill
                .Select(ms => new DropDown { Value = ms.Id, Text = ms.SkillName })
                .Distinct()
                .ToListAsync();
            return Ok(result);
        }

        [HttpGet("MissionTitleList")]
        public async Task<ActionResult<List<DropDown>>> MissionTitleListAsync()
        {
            var result = await _cIDbContext.Missions
                .Select(m => new DropDown { Value = m.Id, Text = m.MissionTitle })
                .ToListAsync();
            return Ok(result);
        }

        [HttpPost("ContactUs")]
        public async Task<ActionResult<string>> ContactUsAsync([FromBody] ContactUs contactUs)
        {
            try
            {
                _cIDbContext.ContactUs.Add(contactUs);
                await _cIDbContext.SaveChangesAsync();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                // Optionally log the exception or return a more detailed error message
                return StatusCode(500, "An error occurred");
            }
        }

        [HttpPost("AddUserSkill")]
        public async Task<ActionResult<string>> AddUserSkillAsync([FromBody] UserSkills userSkills)
        {
            try
            {
                _cIDbContext.UserSkills.Add(userSkills);
                await _cIDbContext.SaveChangesAsync();
                return Ok("Success");
            }
            catch (Exception ex)
            {
                // Optionally log the exception or return a more detailed error message
                return StatusCode(500, "An error occurred");
            }
        }

        [HttpGet("GetUserSkill/{userId}")]
        public async Task<ActionResult<List<DropDown>>> GetUserSkillAsync(int userId)
        {
            var result = await _cIDbContext.UserSkills
                .Where(us => us.UserId == userId)
                .Select(us => new DropDown { Value = us.Id, Text = us.Skill })
                .ToListAsync();
            return Ok(result);
        }
    }
}
