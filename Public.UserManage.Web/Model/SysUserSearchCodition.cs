using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Public.UserManage.Web.Model
{
    public class SysUserSearchCodition : SearchCodition
    {
        Int16 _IsLock = 0;
        public Int16 s_IsLock
        {
            get { return _IsLock; }
            set { _IsLock = value; }
        }
        string _name = "";
        public string s_Name
        {
            get { return _name; }
            set { _name = value; }
        }


        int _UserType = -1;
        public int UserType
        {
            get { return _UserType; }
            set { _UserType = value; }
        }

        string _CityId = "";
        public string s_CityId
        {
            get { return _CityId; }
            set { _CityId = value; }
        }


        string _CityName = "";
        public string s_CityName
        {
            get { return _CityName; }
            set { _CityName = value; }
        }
      
    }
}