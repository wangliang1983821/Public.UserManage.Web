using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Public.Model.WebSite
{
    public   class WebSiteModel
    {

        #region Id

        private Int32 m_id;

        /// <summary>Gets or sets Id</summary>
        public Int32 Id
        {
            get { return m_id; }
            set { m_id = value; }
        }

        private string m_url;

        /// <summary>Gets or sets Id</summary>
        public string Url
        {
            get { return m_url; }
            set { m_url = value; }
        }

        private string m_path;

        /// <summary>Gets or sets Id</summary>
        public string Path
        {
            get { return m_path; }
            set { m_path = value; }
        }

    

        #endregion

        #region Name

        private String m_name;

        /// <summary>Gets or sets Name</summary>
        public String Name
        {
            get { return m_name; }
            set { m_name = value; }
        }

        #endregion



        #region CreateTime

        private DateTime m_createTime;

        /// <summary>Gets or sets CreateTime</summary>
        public DateTime CreateTime
        {
            get { return m_createTime; }
            set { m_createTime = value; }
        }

        #endregion

        #region _englishName

        private string _englishName;

        /// <summary>Gets or sets IsDelete</summary>
        public string EnglishName
        {
            get { return _englishName; }
            set { _englishName = value; }
        }

        #endregion
    }
}
