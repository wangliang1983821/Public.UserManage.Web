using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Public.UserManage.Web.Model;
using UserPermission.User;
using Webdiyer.WebControls.Mvc;

namespace Public.UserManage.Web.Controllers
{
    public class UserController : Controller
    {
        //
        // GET: /User/

        public ActionResult SysUserList()
        {

            UserOperation uo = new UserOperation();

            SysUserSearchCodition searchCoditon = new SysUserSearchCodition() { PageSize = 20 };

            List<User> list = uo.GetList();
            int count = uo.GetCount();
            ViewBag.list = new PagedList<User>(list, searchCoditon.PageIndex, searchCoditon.PageSize,
               count);
          
            return View(searchCoditon);

        }

        [HttpPost]
        
        public ActionResult SysUserList(SysUserSearchCodition searchCoditon)
        {
          
            if (!string.IsNullOrEmpty(searchCoditon.s_CityId))
            {
                searchCoditon.s_CityId = searchCoditon.s_CityId.Replace(";", ",");
            }
            TempData["searchCoditon"] = searchCoditon;
            UserOperation uo = new UserOperation();
            List<User> list = uo.GetList(searchCoditon.SearchName, searchCoditon.s_Name, searchCoditon.s_IsLock, searchCoditon.s_CityId, searchCoditon.PageIndex, searchCoditon.PageSize);
            int count = uo.GetCount();
            if (Request.IsAjaxRequest())
                return PartialView("SysUserTable", new PagedList<User>(list, searchCoditon.PageIndex, searchCoditon.PageSize,
                count));
            return PartialView(new SysUserSearchCodition());
        }


        public ActionResult UpdateSysUser(int id)
        {
            UserOperation uo = new UserOperation();
            User u= uo.Get(id);
         
            return View(u);
        }


        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateInput(false)]
      
        public ActionResult UpdateSysUserSub(User model)
        {


            UserOperation uo = new UserOperation();
            uo.Update(model);
            return JavaScript("pagesub();");

        }

        public ActionResult InsertSysUser()
        {
            User u=new User ();
            return View(u);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateInput(false)]
        public ActionResult InsertSysUserSub(User u)
        {
            UserOperation uo = new UserOperation();
            u.CreateTime = DateTime.Now;
            u.IsDelete = false;
            u.Type = 1;
            uo.Insert(u);
            return JavaScript("pagesub();");
        }


        public ActionResult LockSysUser(int id)
        {
            if (id == null) return RedirectToAction("SysUserList");



            UserOperation uo = new UserOperation();
            User u = uo.Get(id);
            u.IsLock = !u.IsLock;
            uo.Update(u);
          
            return Content("修改成功");

        }

    }
}
