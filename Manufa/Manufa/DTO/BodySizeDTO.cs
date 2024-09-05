namespace Manufa.DTO
{
    public class BodySizeDTO 
    {
        public int Id { get; set; }
        public string Name { get; set; }    
        public int TypeId { get; set; }
        public string Image {  get; set; }
        public int MinSize { get; set; }
        public int MaxSize { get; set; }
        public string VideoUrl { get; set; }
    }

     public class BodySizeResponeDTO 
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public int? Id { get; set; } = 0;
    }
    public class ComponentTypeDTOSelect
    {
        public string Value { get; set; }
        public string Label { get; set; }    
    }

}