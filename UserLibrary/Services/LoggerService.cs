using Dapper;
using Microsoft.Data.SqlClient;
using UserLibrary.Models;
using UserLibrary.ServiceContracts;
using Microsoft.AspNetCore.Http;
using NLog;
using System;
using System.Linq;
using System.Security.Claims;
using UserLibrary.Common;
using System.Web;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using UserLibrary.DataContract;

namespace UserLibrary.Services
{
    public class LoggerService : ILoggerService
    {
        private readonly NLog.Logger _logger;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly ILoggerDataService _loggerDataService;

        public LoggerService(ILoggerDataService loggerDataService ,IHttpContextAccessor httpContextAccessor)
        {
            //_logger = LogManager.GetLogger("log");
            _httpContextAccessor = httpContextAccessor;
            _loggerDataService = loggerDataService;
        }

        public void LogError(Exception exception, string message = "")
        {
            SaveErrorLog("", exception);
            string clean = HttpUtility.HtmlEncode(message.Replace('\n', '_').Replace('\r', '_'));
            _logger.Error(exception, HttpUtility.UrlEncode(clean));
        }
        public void LogDebug(string message)
        {
            SaveErrorLog(message);
            string clean = HttpUtility.HtmlEncode(message.Replace('\n', '_').Replace('\r', '_'));
            _logger.Debug(HttpUtility.UrlEncode(clean));
        }

        public void LogInfo(string message)
        {
            SaveErrorLog(message);
            string clean = HttpUtility.HtmlEncode(message.Replace('\n', '_').Replace('\r', '_'));
            _logger.Info(HttpUtility.UrlEncode(clean));
        }
        public void LogWarn(string message)
        {
            SaveErrorLog(message);
            string clean = HttpUtility.HtmlEncode(message.Replace('\n', '_').Replace('\r', '_'));
            _logger.Warn(HttpUtility.UrlEncode(clean));
        }
        public void LogMessage(string message)
        {
            SaveErrorLog(message);
            string clean = HttpUtility.HtmlEncode(message.Replace('\n', '_').Replace('\r', '_'));
            _logger.Trace(HttpUtility.UrlEncode(clean));
        }


        private void SaveErrorLog(string message, Exception exc = null)
        {
            #region Save Error Log to database

            //Get the current claims principal
            var identity = (ClaimsPrincipal)_httpContextAccessor?.HttpContext?.User;

            // Get the claims values
            string EmployeeName = identity != null ? GetClaimValue(identity, "_employeeName") : "";

            string strIPAddr = Convert.ToString(_httpContextAccessor?.HttpContext?.Connection?.RemoteIpAddress);
            string userAgent = Convert.ToString(_httpContextAccessor?.HttpContext?.Request?.Headers?.FirstOrDefault(s => s.Key.ToLower() == "user-agent").Value);
            string pageName = Convert.ToString(_httpContextAccessor?.HttpContext?.Request?.RouteValues?.Values?.ToList()[0]);
            string eventName = Convert.ToString(_httpContextAccessor?.HttpContext?.Request?.RouteValues?.Values?.ToList()[1]);

            ErrorLog objErrorLog = new ErrorLog();
            objErrorLog.ErrorSource = "Application";
            objErrorLog.PageName = pageName;
            objErrorLog.EventName = eventName;
            objErrorLog.UserID = EmployeeName;
            objErrorLog.ClientIPAddress = strIPAddr;
            objErrorLog.UserAgent = userAgent;
            objErrorLog.ErrorLoggedTime = Convert.ToDateTime(TimeZoneInfo.ConvertTimeFromUtc(DateTime.UtcNow, TimeZoneInfo.FindSystemTimeZoneById("India Standard Time")));
            if (exc != null)
            {
                objErrorLog.ErrorMessage = exc.Message;
                objErrorLog.StackTrace = String.Format("{0}", exc.StackTrace);
            }
            else
            {
                objErrorLog.ErrorMessage = message;
                objErrorLog.StackTrace = String.Format("{0}", message);
            }

            _loggerDataService.SaveErrorLog(objErrorLog);

            #endregion            
        }

        private static string GetClaimValue(ClaimsPrincipal claimsPrincipal, string claimName)
        {
            string claimValue = string.Empty;

            foreach (var identity in claimsPrincipal.Identities)
            {
                foreach (var claim in identity.Claims)
                {
                    if (claim.Type.Equals(claimName, StringComparison.InvariantCultureIgnoreCase))
                    {
                        claimValue = claim.Value;
                        break;
                    }
                }
            }

            return claimValue;
        }

        internal static Claim GetClaim(ClaimsPrincipal claimsPrincipal, string claimName)
        {
            foreach (var identity in claimsPrincipal.Identities)
            {
                foreach (var claim in identity.Claims)
                {
                    if (claim.Type.Equals(claimName, StringComparison.InvariantCultureIgnoreCase))
                    {
                        return claim;
                    }
                }
            }

            return null;
        }


    }

}
