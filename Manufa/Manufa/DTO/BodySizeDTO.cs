namespace Manufa.DTO
{
    public class BodySizeDTO
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public int TypeId { get; set; }
    }
    public class ComponentType
    {
        public int? Id { get; set; }
        public string Name { get; set; }
    }
    public class ProductComponent
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        public int TypeId { get; set; }
    }
    public class BodySizeResponeDTO
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public int? Id { get; set; } = 0;
    }
}
