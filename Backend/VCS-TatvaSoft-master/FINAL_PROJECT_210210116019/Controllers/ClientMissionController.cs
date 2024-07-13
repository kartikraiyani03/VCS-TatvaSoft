using Business_logic_Layer;
using Data_Access_Layer.Repository;
using Data_Access_Layer.Repository.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Reflection;

namespace Web_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

        public class ClientMissionController : ControllerBase
        {
            private readonly AppDbContext _context;
            public ClientMissionController(AppDbContext context)
            {
                _context = context;
            }

            // GET: api/Missions
            [HttpGet("ListMission")]
            public async Task<ActionResult<IEnumerable<Missions>>> GetMissions()
            {
                return await _context.Missions.ToListAsync();
            }

            // GET: api/Missions/5
            [HttpGet("getMissionById/{id}")]
            public async Task<ActionResult<Missions>> GetMission(int id)
            {
                var mission = await _context.Missions.FindAsync(id);

                if (mission == null)
                {
                    return NotFound();
                }

                return mission;
            }
        }
    }
