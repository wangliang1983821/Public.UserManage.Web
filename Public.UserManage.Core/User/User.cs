using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UserPermission.User
{
    [Serializable]
    public partial class User
    {

        #region Id

        private Int32 m_id;

        /// <summary>Gets or sets Id</summary>
        public Int32 Id
        {
            get { return m_id; }
            set { m_id = value; }
        }

        #endregion

        #region Name

        private String m_name="";

        /// <summary>Gets or sets Name</summary>
        public String Name
        {
            get { return m_name; }
            set { m_name = value; }
        }

        private String m_password;

        /// <summary>Gets or sets Name</summary>
        public String PassWord
        {
            get { return m_password; }
            set { m_password = value; }
        }

        #endregion

        #region TrueName

        private String m_trueName="";

        /// <summary>Gets or sets TureName</summary>
        public String TrueName
        {
            get { return m_trueName; }
            set { m_trueName = value; }
        }

        #endregion

        #region Type

        private Int32 m_type=0;

        /// <summary>Gets or sets Type</summary>
        public Int32 Type
        {
            get { return m_type; }
            set { m_type = value; }
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

        #region IsDelete

        private Boolean m_isDelete=false;

        /// <summary>Gets or sets IsDelete</summary>
        public Boolean IsDelete
        {
            get { return m_isDelete; }
            set { m_isDelete = value; }


        }

        private Boolean m_isLock=false;

        /// <summary>Gets or sets IsDelete</summary>
        public Boolean IsLock
        {
            get { return m_isLock; }
            set { m_isLock = value; }
        }
        private int cityid = 0;
         public int CityId
         {
               get { return cityid; }
            set { cityid = value; }
         }
         private string cityname="";
         public string CityName
         {
             get { return cityname; }
             set { cityname = value; }
         }

        #endregion


    }
}
