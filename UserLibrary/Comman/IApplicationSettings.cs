using System;
using System.Collections.Generic;
using System.Text;

namespace UserLibrary.Common
{
    public interface IApplicationSettings
    {
        ApplicationParameters ApplicationParameters { get; set; }

        ConnectionString ConnectionString { get; set; }

        AppSettings AppSettings { get; set; }

        //AzureKeyVault AzureKeyVault { get; set; }
    }
}
