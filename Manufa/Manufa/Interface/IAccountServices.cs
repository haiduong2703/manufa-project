using Manufa.DTO;
using System.Collections.Generic;

namespace Manufa.Interface
{
    public interface IAccountServices
    {
        AccountDTO GetUserByLogin(string username,string password);
        AccountResponeDTO CreateUserStaff(AccountCreateDTO user);
        AccountResponeDTO UpdateUserStaff(int accountId, AccountUpdateDTO user);
        List<AccountDetailDTO> GetAllAccountStaff();
        AccountDetailDTO GetAccountStaffById(int Id);
        AccountResponeDTO ChangeStatusStaff(int id, bool status);
        AccountResponeDTO DeletedStaffById(int id);
    }
}
