using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using Dapper;
using Utility;

namespace UserPermission.Role
{
    public   class RoleOperation :Role
    {
        public int Insert(Role r = null)
        {
            int result = 0;
            string sqlCommandText = @"INSERT INTO [Role] (Name,Type,CreateTime,IsDelete) VALUES (
    @Name,
  
    @Type,
    getdate(),
    @IsDelete
)";
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {
                Role pu = r == null ? this : r;
                result = conn.Execute(sqlCommandText, pu);

            }
            return result;
        }

        public int Update(Role u)
        {
           
            int result = 0;
            string sqlCommandText = @"UPDATE [Role] set Name=@Name,IsDelete=@IsDelete WHERE Id=@Id ";
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {

                result = conn.Execute(sqlCommandText, u);

            }
            return result;
        }

        public Role Get(int id)
        {
            string query = "SELECT * FROM [Role]  WHERE Id = @Id";

            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {
                Role user = conn.Query<Role>(query, new { Id = id }).SingleOrDefault();
                return user;
            }
            return null;
        }



        public List<Role> GetList(string name = "", int pageIndex = 1, int pageSize = 20)
        {
            KeyValuePair<string, DynamicParameters> kvp = GetQuery( name);
            string query = " select * from  (select *,ROW_NUMBER() OVER (ORDER BY Id DESC) as rank from [Role]  where IsDelete=0 " + kvp.Key + " ) as t where t.rank between  " + ((pageIndex - 1) * pageSize + 1) + "  and  " + pageIndex * pageSize;
            List<Role> list = null;
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {
                list = conn.Query<Role>(query, kvp.Value).ToList<Role>();

            }
            return list;
        }

        public KeyValuePair<string, DynamicParameters> GetQuery( string name = "")
        {
            var query = new StringBuilder();

            var p = new DynamicParameters();
           
            if (!string.IsNullOrEmpty(name))
            {
                query.Append(" and  [Role].[Name] like @Name");

                p.Add("Name", "%" + name.Trim() + "%");
            }
          

         
            return new KeyValuePair<string, DynamicParameters>(query.ToString(), p);
        }


        public int GetCount( string name = "")
        {
            KeyValuePair<string, DynamicParameters> kvp = GetQuery( name);
            string sqlCommandText = " select count(*) from  [Role] where IsDelete=0 " + kvp.Key;
            int result = 0;
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {
                result = Convert.ToInt32(conn.ExecuteScalar(sqlCommandText, kvp.Value));

            }
            return result;
        }

        public string Delete(int id)
        {
            string result = "";
            string sqlCommandText = @"delete from [Role] where Id=@Id";

            string sqlCommandText2 = @"delete from [UserRoleRelation] where RoleId=@RoleId";
         
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {
                conn.Open();
                IDbTransaction transaction = conn.BeginTransaction();
                try
                {
                    conn.Execute(sqlCommandText, new { Id = id }, transaction);

                    conn.Execute(sqlCommandText2, new { RoleId = id }, transaction);

                    transaction.Commit();

                    result = "删除成功";

                }
                catch (Exception e)
                {

                    transaction.Rollback();
                    result = e.Message;

                }


            }
            return result;
        }
    }
}
