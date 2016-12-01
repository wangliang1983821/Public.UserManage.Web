using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;


namespace Utility
{
   

    public class Config
    {
       

        #region GetSettings
        public static string GetAppSetting(string key)
        {    
            return System.Configuration.ConfigurationManager.AppSettings[key];
        }

        public static string GetAppSetting(string key, string defaultValue)
        {
            if (string.IsNullOrEmpty(System.Configuration.ConfigurationManager.AppSettings[key]))
                return defaultValue;
            return System.Configuration.ConfigurationManager.AppSettings[key];
        }

        public static string GetConnectionString(string key)
        {
            return System.Configuration.ConfigurationManager.ConnectionStrings[key].ConnectionString;
        }
        #endregion

     


     
    }
}
