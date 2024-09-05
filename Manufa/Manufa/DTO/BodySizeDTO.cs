namespace Manufa.DTO
{
    public class BodySizeDTO 
    {
        public int Id { get; set; }
        public string Name { get; set; }    
        public string TypeId { get; set; }
        public string Image {  get; set; }
    }

     public class BodySizeResponeDTO 
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public int? Id { get; set; } = 0;
    }

}