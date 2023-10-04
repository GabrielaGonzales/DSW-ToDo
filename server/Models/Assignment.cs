using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ToDoList.Models;

public class Assignment {
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string? Id { get; set; }

  [BsonElement("Name")]
  public string TaskName { get; set; } = null!;

  [BsonElement("State")]
  public bool State { get; set; }

  [BsonElement("Description")]
  public string Description { get; set; } = null!;

  [BsonElement("Priority")]
  public string Priority { get; set; } = null!;

  [BsonElement("DueDate")]
  public DateTime DueDate { get; set; }
}