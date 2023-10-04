using Microsoft.AspNetCore.Mvc;
using ToDoList.Models;
using ToDoList.Services;

namespace ToDoList.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AssignmentController : ControllerBase {
  private readonly AssignmentService _assignmentService;

  public AssignmentController(AssignmentService assignmentService) =>
    _assignmentService = assignmentService;

  [HttpGet]
  public async Task<List<Assignment>> Get() =>
    await _assignmentService.GetAsync();

  [HttpGet("{id:length(24)}")]
  public async Task<ActionResult<Assignment>> Get(string id)
  {
    var assignment = await _assignmentService.GetAsync(id);

    if (assignment is null)
    {
      return NotFound();
    }

    return assignment;
  }

  [HttpPost]
  public async Task<IActionResult> Post(Assignment newAssignment)
  {
    await _assignmentService.CreateAsync(newAssignment);

    return CreatedAtAction(nameof(Get), new { id = newAssignment.Id }, newAssignment);
  }

  [HttpPut("{id:length(24)}")]
  public async Task<IActionResult> Update(string id, Assignment updatedAssignment)
  {
    var assignment = await _assignmentService.GetAsync(id);

    if (assignment is null)
    {
      return NotFound();
    }

    updatedAssignment.Id = assignment.Id;

    await _assignmentService.UpdateAsync(id, updatedAssignment);

    return NoContent();
  }

  [HttpDelete("{id:length(24)}")]
  public async Task<IActionResult> Delete(string id)
  {
    var assignment = await _assignmentService.GetAsync(id);

    if (assignment is null)
    {
      return NotFound();
    }

    await _assignmentService.RemoveAsync(id);

    return NoContent();
  }
}
