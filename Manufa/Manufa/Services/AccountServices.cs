using Manufa.DTO;
using Manufa.Interface;
using Manufa.Models;
using Microsoft.AspNetCore.Http.Connections;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using static Microsoft.EntityFrameworkCore.DbLoggerCategory;

namespace Manufa.Services
{
    public class AccountServices : IAccountServices
    {
        private readonly MyDbContext _context;
        public AccountServices(MyDbContext context)
        {
            _context = context;
        }
        public AccountDTO GetUserByLogin (string username, string password)
        {
            var query = _context.Account.SingleOrDefault(x=>x.Username == username && x.Password == password);
            if (query != null)
            {
                var userAdmin = _context.Admin.SingleOrDefault(x => x.AccountId == query.Id);
                var userManager = _context.Manager.SingleOrDefault(x => x.AccountId == query.Id);
                var userStaff = _context.Staff.SingleOrDefault(x => x.AccountId == query.Id);
                if (userAdmin != null)
                {
                    return new AccountDTO
                    {
                        Role = userAdmin.Role,
                        Name = userAdmin.Name,
                        CheckPass = true
                    };
                }
                else if (userManager != null)
                {
                    return new AccountDTO
                    {
                        Role = userManager.Role,
                        Name = userManager.Name,
                        CheckPass = true
                    };
                }
                else if (userStaff != null)
                {
                    return new AccountDTO
                    {
                        Role = userStaff.Role,
                        Name = userStaff.Name,
                        CheckPass = true
                    };
                }
                else
                {
                    return new AccountDTO();
                }
            }
            else
            {
                return new AccountDTO();
            }
           
        }
        public AccountResponeDTO CreateUserStaff(AccountCreateDTO user)
        {
            // var query = _context.Users.SingleOrDefault(x => x.Email == user.Email);
            var query1 = _context.Account.SingleOrDefault(x => x.Username == user.Username);
            var query2 = _context.Staff.SingleOrDefault(x => x.Phone == user.Phone);
            if (query1 != null)
            {
                return new AccountResponeDTO
                {
                    Message = "Username này đã được đăng ký, vui lòng đăng ký Username khác"
                };
            }
            if (query2 != null)
            {
                return new AccountResponeDTO
                {
                    Message = "Số điện thoại này đã được đăng ký, vui lòng đăng ký bằng số điện thoại khác khác"
                };
            }
            var newAccount = new Account();
            var newStaff = new Staff();
            newAccount.Username = user.Username;
            newAccount.Password = user.Password;
            _context.Account.Add(newAccount);
            _context.SaveChanges();
            newStaff.AccountId = newAccount.Id;
            newStaff.AvatarUrl = user.AvatarUrl;
            newStaff.Address = user.Address;
            newStaff.Name = user.Name;
            newStaff.Phone = user.Phone;
            newStaff.Role = "staff";
            newStaff.IsActive = true;
            _context.Staff.Add(newStaff);
            _context.SaveChanges();

            return new AccountResponeDTO
            {
                Status = true,
                Id = newAccount.Id,
                Message = "Thêm thành công nhân viên"
            };

        }
        public AccountResponeDTO UpdateUserStaff(int accountId, AccountUpdateDTO user)
        {
            // Kiểm tra xem Account có tồn tại không
            var accountToUpdate = _context.Account.SingleOrDefault(x => x.Id == accountId);
            if (accountToUpdate == null)
            {
                return new AccountResponeDTO
                {
                    Message = "Tài khoản không tồn tại"
                };
            }

            // Kiểm tra trùng lặp Username (không kiểm tra với Username hiện tại)
            var existingAccount = _context.Account.SingleOrDefault(x => x.Username == user.Username && x.Id != accountId);
            if (existingAccount != null)
            {
                return new AccountResponeDTO
                {
                    Message = "Username này đã được đăng ký, vui lòng chọn Username khác"
                };
            }

            // Kiểm tra trùng lặp số điện thoại (không kiểm tra với số điện thoại hiện tại)
            var existingStaff = _context.Staff.SingleOrDefault(x => x.Phone == user.Phone && x.AccountId != accountId);
            if (existingStaff != null)
            {
                return new AccountResponeDTO
                {
                    Message = "Số điện thoại này đã được đăng ký, vui lòng chọn số điện thoại khác"
                };
            }

            // Cập nhật thông tin Account
            accountToUpdate.Username = user.Username;
            if (!string.IsNullOrWhiteSpace(user.Password))
            {
                accountToUpdate.Password = user.Password;
            }

            // Cập nhật thông tin Staff
            var staffToUpdate = _context.Staff.SingleOrDefault(x => x.AccountId == accountId);
            if (staffToUpdate != null)
            {
                staffToUpdate.AvatarUrl = user.AvatarUrl;
                staffToUpdate.Address = user.Address;
                staffToUpdate.Name = user.Name;
                staffToUpdate.Phone = user.Phone;
                staffToUpdate.IsActive = user.IsActive;
            }

            _context.SaveChanges();

            return new AccountResponeDTO
            {
                Status = true,
                Id = accountToUpdate.Id,
                Message = "Cập nhật thông tin nhân viên thành công"
            };
        }
        public AccountDetailDTO GetAccountStaffById(int Id)
        {
            var query = _context.Staff
                         .Join(_context.Account,
                               staff => staff.AccountId,
                               account => account.Id,
                               (staff, account) => new AccountDetailDTO
                               {
                                   Id = staff.Id,
                                   Username = account.Username, // Lấy từ bảng Account
                                   Name = staff.Name,
                                   Address = staff.Address,
                                   Phone = staff.Phone,
                                   IsActive = staff.IsActive,
                                   Role = staff.Role,
                                   AvatarUrl = staff.AvatarUrl,
                                   Password = account.Password,
                                   AccountId = staff.AccountId
                               })
                         .Where(x => x.Id == Id)
                         .FirstOrDefault();

            return query;
        }
        public List<AccountDetailDTO> GetAllAccountStaff()
        {
            var query = _context.Staff
                         .Join(_context.Account,
                               staff => staff.AccountId,
                               account => account.Id,
                               (staff, account) => new AccountDetailDTO
                               {
                                   Id = staff.Id,
                                   Username = account.Username, // Lấy từ bảng Account
                                   Name = staff.Name,
                                   Address = staff.Address,
                                   Phone = staff.Phone,
                                   IsActive = staff.IsActive,
                                   Role = staff.Role,
                                   AvatarUrl = staff.AvatarUrl
                               })
                         .Where(x => x.Role == "staff")
                         .ToList();

            return query;
        }
        public AccountResponeDTO ChangeStatusStaff(int id, bool status)
        {
            var query = _context.Staff.SingleOrDefault(x => x.Id == id);
            if (query == null)
            {
                return new AccountResponeDTO
                {
                    Message = "Không có tài khoản này trong hệ thống"
                };
            }
            else
            {
                query.IsActive = status;
                _context.SaveChanges();
                return new AccountResponeDTO
                {
                    Message = "Cập nhập thành công trạng thái của nhân viên"
                };
            }
        }
        public AccountResponeDTO DeletedStaffById(int id)
        {
            var query = _context.Staff.SingleOrDefault(x => x.Id == id);
            if (query == null)
            {
                return new AccountResponeDTO
                {
                    Message = "Không có tài khoản này trong hệ thống"
                };
            }
            else
            {
                var accDel = _context.Account.SingleOrDefault(x => x.Id == query.AccountId);
                _context.Staff.Remove(query);
                _context.Account.Remove(accDel);
                _context.SaveChanges();
                return new AccountResponeDTO
                {
                    Message = "Xóa thành công nhân viên"
                };
            }
        }
    }
    
}
