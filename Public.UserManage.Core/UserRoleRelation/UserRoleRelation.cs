using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace UserPermission.UserRoleRelation
{
    [Serializable]
    public partial class UserRoleRelation
    {

        #region UserId

        private Int32 m_userId;

        /// <summary>Gets or sets UserId</summary>
        public Int32 UserId
        {
            get { return m_userId; }
            set { m_userId = value; }
        }

        #endregion

        #region RoleId

        private Int32 m_roleId;

        /// <summary>Gets or sets RoleId</summary>
        public Int32 RoleId
        {
            get { return m_roleId; }
            set { m_roleId = value; }
        }

        #endregion


    }
}
