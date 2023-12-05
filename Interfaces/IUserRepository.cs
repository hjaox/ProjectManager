using ProjectManager.Models;

namespace ProjectManager.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUser(int id);
        ICollection<User> GetAllUsers();
        bool CreateUser(User user);
        bool UserExists(int id);
        bool UpdateUser(User user);
        bool Save();
    }
}
