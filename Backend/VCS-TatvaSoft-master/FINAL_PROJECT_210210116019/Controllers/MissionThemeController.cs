using BackEnd.BAL;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Data_Access_Layer.Repository.Entities;
using Microsoft.EntityFrameworkCore;
using Data_Access_Layer.Repository;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionThemeController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MissionThemeController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/MissionThemes
        [HttpGet("getMissionTheme")]
        public async Task<ActionResult<IEnumerable<MissionTheme>>> GetMissionThemes()
        {
            return await _context.MissionTheme.ToListAsync();
        }

        // GET: api/MissionThemes/5
        [HttpGet("getMissionThemeById/{id}")]
        public async Task<ActionResult<MissionTheme>> GetMissionTheme(int id)
        {
            var missionTheme = await _context.MissionTheme.FindAsync(id);

            if (missionTheme == null)
            {
                return NotFound();
            }

            return missionTheme;
        }

        // POST: api/MissionThemes
        [HttpPost("addMissionTheme")]
        public async Task<ActionResult<MissionTheme>> PostMissionTheme(MissionTheme missionTheme)
        {
            _context.MissionTheme.Add(missionTheme);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMissionTheme), new { id = missionTheme.Id }, missionTheme);
        }

        // PUT: api/MissionThemes/5
        [HttpPut("updateMissionTheme/{id}")]
        public async Task<IActionResult> PutMissionTheme(int id, MissionTheme missionTheme)
        {
            if (id != missionTheme.Id)
            {
                return BadRequest();
            }

            _context.Entry(missionTheme).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MissionThemeExists(id))
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

        // DELETE: api/MissionThemes/5
        [HttpDelete("deleteMissionTheme/{id}")]
        public async Task<IActionResult> DeleteMissionTheme(int id)
        {
            var missionTheme = await _context.MissionTheme.FindAsync(id);
            if (missionTheme == null)
            {
                return NotFound();
            }

            _context.MissionTheme.Remove(missionTheme);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MissionThemeExists(int id)
        {
            return _context.MissionTheme.Any(e => e.Id == id);
        }
    }
}
