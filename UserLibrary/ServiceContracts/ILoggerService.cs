using System;

namespace UserLibrary.ServiceContracts
{
    public interface ILoggerService
    {

        void LogError(Exception exception, string message = "");

        void LogDebug(string message);

        void LogInfo(string message);

        void LogWarn(string message);

        void LogMessage(string message);

    }
}
