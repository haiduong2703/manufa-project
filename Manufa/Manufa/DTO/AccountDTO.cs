namespace Manufa.DTO
{
    public class AccountDTO
    {
        public string Role { get; set; } = "";
        // public string Username { get; set; }
        public string Name { get; set; } = "";
        public bool CheckPass { get; set; } = false;
    }
    public class AccountDetailDTO
    {
        public int? Id { get; set; }
        public string Username { get; set; }    
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; }
        public string Role { get; set; }
        public string AvatarUrl { get; set; }
        public string Password { get; set; }
        public int AccountId { get; set; }
    }
    public class AccountCreateDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string AvatarUrl { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }

    }
    public class AccountUpdateDTO
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public string AvatarUrl { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string Phone { get; set; }
        public bool IsActive { get; set; } = true;
    }
    public class AccountResponeDTO
    {
        public bool Status { get; set; } = false;
        public string Message { get; set; } = "";
        public int? Id { get; set; } = 0;
    }
}
