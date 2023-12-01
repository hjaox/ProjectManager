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

        public ICollection<User> GetUser(int Id)
        {
            return _context.Users.Where(user => user.Id == Id).ToList();
        }

        public ICollection<User> GetAllUsers() 
        {
            return _context.Users.OrderBy(user => user.Id).ToList();
        }

        public bool CreateUser(User user)
        {
            _context.Add(user);

            return Save();
        }

        public bool Save()
        {
            var saved = _context.SaveChanges();
            return saved > 0 ? true : false;
        }
    }
}
