using System;
using System.Collections.Generic;
using Dapper;
using System.Linq;
using System.Text;
using Utility;
using System.Data;
using System.Data.SqlClient;


namespace UserPermission.User
{
    public   class UserOperation :User
    {
      

        public int Insert()
        {
            int result = 0;
            string sqlCommandText = @"INSERT INTO [User] (Name,Password,TureName,Type,CreateTime,IsDelete) VALUES (
    @Name,
    @Password,
    @TureName,
    @Type,
    @CreateTime,
    @IsDelete
)";
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {
               
                 result = conn.Execute(sqlCommandText, this);
               
            }
            return result;
        }
        
        public int Update(User u)
        {
            if (u.CityName == null)
                u.CityName = "";
            int result = 0;
            string sqlCommandText = @"UPDATE [User] set Name=@Name,IsLock=@IsLock,CityId=@CityId,CityName=@CityName,TrueName=@TrueName,IsDelete=@IsDelete WHERE Id=@Id ";
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {

                result = conn.Execute(sqlCommandText, u);

            }
            return result;
        }

        public User Get(int id)
        {
            string query = "SELECT * FROM [User]  WHERE Id = @Id";
            
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {
                User  user = conn.Query<User>(query, new { Id = id }).SingleOrDefault();
                return user;
            }
            return null;
        }



        public List<User> GetList(string trueName = "", string name = "", int isLock = -1, string cityids = "", int pageIndex = 1, int pageSize = 10)
        {
            KeyValuePair<string, DynamicParameters> kvp = GetQuery(trueName, name, isLock, cityids);
            string query = " select * from  (select *,ROW_NUMBER() OVER (ORDER BY Id DESC) as rank from [User]  where IsDelete=0 "+kvp.Key+" ) as t where t.rank between  " + ((pageIndex - 1) * pageSize + 1) + "  and  " + pageIndex * pageSize;
            List<User> list = null;
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {
                list = conn.Query<User>(query, kvp.Value).ToList<User>();
                
            }
            return list;
        }

        public KeyValuePair<string ,DynamicParameters> GetQuery(string trueName="", string name="", int isLock=-1, string cityids="")
        {
            var query = new StringBuilder();

            var p = new DynamicParameters();
            if (!string.IsNullOrEmpty(trueName))
            {
                query.Append(" and  [User].[TrueName] like @TrueName");

                p.Add("TrueName", "%" + trueName.Trim() + "%");

            }
            if (!string.IsNullOrEmpty(name))
            {
                query.Append(" and  [User].[Name] like @Name");
             
                p.Add("Name",  "%" + name.Trim() + "%");
            }
            if (isLock != -1)
            {
                query.Append(" and  [User].[IsLock] = @IsLock");
                  p.Add("IsLock" , isLock);
            }

            //if (model.s_UserType != -1)
            //{
            //    query.Append(" and  [SysUser].[UserType] = @uType");
            //    listp.Add(new SqlParameter("@uType", model.s_UserType));
            //}

            if (!string.IsNullOrEmpty(cityids))
            {
                query.Append(" and  [User].[CityId] in ( " + cityids + " ) ");

                p.Add("CityId", cityids);
            }
            return new KeyValuePair<string ,DynamicParameters>(query.ToString(),p);
        }


        public int GetCount(string trueName = "", string name = "", int isLock = -1, string cityids = "")
        {
            KeyValuePair<string, DynamicParameters> kvp = GetQuery(trueName, name, isLock, cityids);
            string sqlCommandText = " select count(*) from  [User] where IsDelete=0 " + kvp.Key;
           int result=0;
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {
                 result = Convert .ToInt32( conn.ExecuteScalar(sqlCommandText,kvp.Value));

            }
            return result;
        }

        public int Delete(int id)
        {
            int result = 0;
            string sqlCommandText = @"delete from [user] where Id=@Id";
            using (IDbConnection conn = new SqlConnection(Config.GetConnectionString("UserPermission")))
            {

                result = conn.Execute(sqlCommandText, new { Id = id });

            }
            return result;
        }
    }
}
