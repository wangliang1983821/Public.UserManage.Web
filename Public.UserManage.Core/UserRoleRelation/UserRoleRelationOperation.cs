using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Dapper;
using Utility;

namespace UserPermission.UserRoleRelation
{
    public  class UserRoleRelationOperation:UserRoleRelation
    {

        public int Insert(UserRoleRelation r = null)
        {
            int result = 0;
            string sqlCommandText = @"INSERT INTO [UserRoleRelation] (RoleId,UserId) VALUES (
    @RoleId,
  
    @UserId
)";
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {
                UserRoleRelation pu = r == null ? this : r;
                result = conn.Execute(sqlCommandText, pu);

            }
            return result;
        }


        public List<UserRoleRelation> GetList(int userid)
        {
            KeyValuePair<string, DynamicParameters> kvp = GetQuery(userid);
            string query = " select * from [Role] as r join [UserRoleRelation] as urr on r.Id=urr.RoleId where 1=1 " + kvp.Key;
            List<UserRoleRelation> list = null;
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {
                list = conn.Query<UserRoleRelation>(query, kvp.Value).ToList<UserRoleRelation>();

            }
            return list;
        }

        public KeyValuePair<string, DynamicParameters> GetQuery(int userid)
        {
            var query = new StringBuilder();

            var p = new DynamicParameters();

            
                query.Append(" and  urr.UserId=@UserId");

                p.Add("UserId", userid);
            



            return new KeyValuePair<string, DynamicParameters>(query.ToString(), p);
        }

        public int Delete(int userid,int roleid)
        {
            int result = 0;
            string sqlCommandText = @"delete from [UserRoleRelation] where RoleId=@RoleId and UserId=@UserId";
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {

                result = conn.Execute(sqlCommandText, new { RoleId = roleid, UserId = userid });

            }
            return result;
        }
    }
}
