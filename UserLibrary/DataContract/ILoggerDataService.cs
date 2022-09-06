using UserLibrary.Models;
using System.Threading.Tasks;

namespace UserLibrary.DataContract
{
    public interface ILoggerDataService
    {
        public Task<int> SaveErrorLog(ErrorLog objErrorLog);
    }
}
