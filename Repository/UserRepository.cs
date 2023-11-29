using ProjectManager.Data;
using ProjectManager.Interfaces;
using ProjectManager.Models;

namespace ProjectManager.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context)
        {
            _context = context;
        }

        public ICollection<User> GetUser()
        {
            return _context.Users.OrderBy(user => user.Id).ToList();
        }
    }
}
