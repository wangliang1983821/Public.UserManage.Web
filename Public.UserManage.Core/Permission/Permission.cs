using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UserPermission.Permission
{
    [Serializable]
    public partial class Permission
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

        private String m_name;

        /// <summary>Gets or sets Name</summary>
        public String Name
        {
            get { return m_name; }
            set { m_name = value; }
        }

        #endregion

        #region Type

        private Int32 m_type;

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

        private Boolean m_isDelete;

        /// <summary>Gets or sets IsDelete</summary>
        public Boolean IsDelete
        {
            get { return m_isDelete; }
            set { m_isDelete = value; }
        }

        #endregion


    }

}
