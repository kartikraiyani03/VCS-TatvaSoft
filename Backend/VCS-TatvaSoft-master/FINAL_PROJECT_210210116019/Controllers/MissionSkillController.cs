using BackEnd.BAL;
using Data_Access_Layer.Repository;
using Data_Access_Layer.Repository.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionSkillController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MissionSkillController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/MissionSkills
        [HttpGet("getMissionSkill")]
        public async Task<ActionResult<IEnumerable<MissionSkill>>> GetMissionSkills()
        {
            return await _context.MissionSkill.ToListAsync();
        }

        // GET: api/MissionSkills/5
        [HttpGet("getMissionSkillById/{id}")]
        public async Task<ActionResult<MissionSkill>> GetMissionSkill(int id)
        {
            var missionSkill = await _context.MissionSkill.FindAsync(id);

            if (missionSkill == null)
            {
                return NotFound();
            }

            return missionSkill;
        }

        // POST: api/MissionSkills
        [HttpPost("addMissionSkill")]
        public async Task<ActionResult<MissionSkill>> PostMissionSkill(MissionSkill missionSkill)
        {
            _context.MissionSkill.Add(missionSkill);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMissionSkill), new { id = missionSkill.Id }, missionSkill);
        }

        // PUT: api/MissionSkills/5
        [HttpPut("updateMissionSkill/{id}")]
        public async Task<IActionResult> PutMissionSkill(int id, MissionSkill missionSkill)
        {
            if (id != missionSkill.Id)
            {
                return BadRequest();
            }

            _context.Entry(missionSkill).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MissionSkillExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/MissionSkills/5
        [HttpDelete("deleteMissionSkill/{id}")]
        public async Task<IActionResult> DeleteMissionSkill(int id)
        {
            var missionSkill = await _context.MissionSkill.FindAsync(id);
            if (missionSkill == null)
            {
                return NotFound();
            }

            _context.MissionSkill.Remove(missionSkill);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MissionSkillExists(int id)
        {
            return _context.MissionSkill.Any(e => e.Id == id);
        }
    }
}
