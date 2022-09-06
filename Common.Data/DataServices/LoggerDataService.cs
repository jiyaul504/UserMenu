using UserLibrary.Common;
using UserLibrary.DataContract;
using UserLibrary.Models;
using Dapper;
using Microsoft.Data.SqlClient;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Data.DataServices
{
    public class LoggerDataService : ILoggerDataService
    {
        public IApplicationSettings appSettings;

        public LoggerDataService(IApplicationSettings appSettings)
        {
            this.appSettings = appSettings;
        }

        public async Task<int> SaveErrorLog(ErrorLog objErrorLog)
        {
            IEnumerable<int> val = null;
            try
            {
                using (var connection = new SqlConnection(appSettings.ConnectionString.DB))
                {
                    if (objErrorLog != null)
                    {
                        var parameters = new
                        {
                            ErrorSource = objErrorLog.ErrorSource,
                            PageName = objErrorLog.PageName,
                            EventName = objErrorLog.EventName,
                            UserID = objErrorLog.UserID,
                            ClientIPAddress = objErrorLog.ClientIPAddress,
                            UserAgent = objErrorLog.UserAgent,
                            ErrorLoggedTime = objErrorLog.ErrorLoggedTime,
                            ErrorMessage = objErrorLog.ErrorMessage,
                            StackTrace = objErrorLog.StackTrace
                        };
                        val = await connection.QueryAsync<int>("uspSaveErrorLog", parameters, commandType: CommandType.StoredProcedure);
                    }
                }
            }
            catch (Exception exc)
            {
                string msg = exc.Message;
            }
            return val.FirstOrDefault();
        }
    }
}
