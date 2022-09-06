using System;
using System.Collections.Generic;
using System.Text;

namespace UserLibrary.Common
{

    public class ApplicationSettings : IApplicationSettings
    {
        public ApplicationSettings()
        {
            ApplicationParameters = new ApplicationParameters();
            ConnectionString = new ConnectionString();
            AppSettings = new AppSettings();
            //AzureKeyVault = new AzureKeyVault();
        }

        public ApplicationParameters ApplicationParameters { get; set; }

        public ConnectionString ConnectionString { get; set; }

        public AppSettings AppSettings { get; set; }

        //public AzureKeyVault AzureKeyVault { get; set; }
    }

    public class ApplicationParameters
    {
        public string ApplicationName { get; set; }

        public string ApplicationEncryptionKey { get; set; }

        //public string SessionOutInSeconds { get; set; }
    }

    public class ConnectionString
    {
        public string DB { get; set; }
    }

    public class AppSettings
    {
        //public string EnableOpenAMLogin { get; set; }
        //public string IsAzureKeyVault { get; set; }

        //public string AllowLoginScreen { get; set; }

        //public string secretValue { get; set; }
    }

    //public class IdentitySettings
    //{
    //    public string EnableOpenAMLogin { get; set; }
    //    public string IsAzureKeyVault { get; set; }

    //    //public string secretValue { get; set; }
    //}

    //public class AzureKeyVault
    //{
    //    public string KeyVaultURI { get; set; }

    //    public string KeyVaultSecret { get; set; }

    //    public string KeyVaultConnectionSecret { get; set; }

    //    public string KeyVaultOpenAMClientId { get; set; }

    //    public string KeyVaultOpenAMClientSecret { get; set; }

    //    public string KeyVaultOpenAMAuthorizationUrl { get; set; }

    //    public string KeyVaultOpenAMMetadataUrl { get; set; }

    //    public string KeyVaultOpenAMLogoutUrl { get; set; }

    //    public string KeyVaultOpenAMPostLogoutUrl { get; set; }

    //    public string KeyVaultOpenAMClaim { get; set; }

    //    public string KeyVaultOpenAMCallbackUrl { get; set; }

    //    public string KeyVaultOpenAMScope { get; set; }

    //}
}
