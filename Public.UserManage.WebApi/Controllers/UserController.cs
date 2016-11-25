using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using UserPermission.User;
using Newtonsoft.Json;
namespace Public.UserManage.WebApi.Controllers
{
    public class UserController : ApiController
    {
        // GET api/user
        public HttpResponseMessage Get()
        {
            UserOperation ul = new UserOperation();
            return Public.UserManage.WebApi.ResponseHelper.ReturnMessage(this, ul.GetList());
        }

        // GET api/user/5
        public HttpResponseMessage Get(int id)
        {
            UserOperation ul = new UserOperation();
           
            User u = ul.Get(id);
            return Public.UserManage.WebApi.ResponseHelper.ReturnMessage(this, u);
        }

        // POST api/user
        public void Post([FromBody]string value)
        {

        }

        // PUT api/user/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/user/5
        public void Delete(int id)
        {

        }
    }
}
