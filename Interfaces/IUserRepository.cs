using ProjectManager.Models;

namespace ProjectManager.Interfaces
{
    public interface IUserRepository
    {
        ICollection<User> GetUser();
    }
}
