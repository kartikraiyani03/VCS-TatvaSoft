using Data_Access_Layer.Repository;
using Microsoft.AspNetCore.Mvc;
using BackEnd.BAL;
using Microsoft.AspNetCore.Authorization;
using Data_Access_Layer.Repository.Entities;
using Microsoft.EntityFrameworkCore;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MissionApplicationController : ControllerBase
    {
        private readonly AppDbContext _context;

        public MissionApplicationController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/MissionApplications
        [HttpGet("getMissionApplication")]
        public async Task<ActionResult<IEnumerable<MissionApplication>>> GetMissionApplications()
        {
            return await _context.MissionApplication.ToListAsync();
        }

        // GET: api/MissionApplications/5
        [HttpGet("getMissionApplicationById/{id}")]
        public async Task<ActionResult<MissionApplication>> GetMissionApplication(int id)
        {
            var missionApplication = await _context.MissionApplication.FindAsync(id);

            if (missionApplication == null)
            {
                return NotFound();
            }

            return missionApplication;
        }

        // POST: api/MissionApplications
        [HttpPost("addMissionApplication")]
        public async Task<ActionResult<MissionApplication>> PostMissionApplication(MissionApplication missionApplication)
        {
            _context.MissionApplication.Add(missionApplication);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetMissionApplication), new { id = missionApplication.Id }, missionApplication);
        }

        // PUT: api/MissionApplications/5
        [HttpPut("updateMissionApplication/{id}")]
        public async Task<IActionResult> PutMissionApplication(int id, MissionApplication missionApplication)
        {
            if (id != missionApplication.Id)
            {
                return BadRequest();
            }

            _context.Entry(missionApplication).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MissionApplicationExists(id))
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

        // DELETE: api/MissionApplications/5
        [HttpDelete("deleteMissionApplication/{id}")]
        public async Task<IActionResult> DeleteMissionApplication(int id)
        {
            var missionApplication = await _context.MissionApplication.FindAsync(id);
            if (missionApplication == null)
            {
                return NotFound();
            }

            _context.MissionApplication.Remove(missionApplication);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool MissionApplicationExists(int id)
        {
            return _context.MissionApplication.Any(e => e.Id == id);
        }
    }
}
