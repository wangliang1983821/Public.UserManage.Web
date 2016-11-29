using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Public.Model.Category
{
    public  class ContentCategoryModel
    {
        #region Id

        private Int32 m_id;

        /// <summary>Gets or sets Id</summary>
        public Int32 Id
        {
            get { return m_id; }
            set { m_id = value; }
        }

        private Int32 m_parentid;

        /// <summary>Gets or sets Id</summary>
        public Int32 ParentId
        {
            get { return m_parentid; }
            set { m_parentid = value; }
        }

        private Int32 m_parentsid;

        /// <summary>Gets or sets Id</summary>
        public Int32 ParentsId
        {
            get { return m_parentsid; }
            set { m_parentsid = value; }
        }

        private Int32 mcategoryLevel;

        /// <summary>Gets or sets Id</summary>
        public Int32 CategoryLevel
        {
            get { return mcategoryLevel; }
            set { mcategoryLevel = value; }
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
