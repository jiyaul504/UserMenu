using System;
using System.Collections.Generic;
using System.Text;

namespace UserLibrary.Models
{
    public class ErrorLog
    {
        public int ID { get; set; }

        public string ErrorSource { get; set; }

        public string PageName { get; set; }

        public string EventName { get; set; }

        public string ErrorMessage { get; set; }

        public string UserID { get; set; }

        public string ClientIPAddress { get; set; }

        public string UserAgent { get; set; }

        public string StackTrace { get; set; }

        public DateTimeOffset? ErrorLoggedTime { get; set; }
    }
}
