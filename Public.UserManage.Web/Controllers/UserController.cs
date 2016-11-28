using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Public.UserManage.Web.Model;
using UserPermission.Role;
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

            RoleOperation rolebll = new RoleOperation();

            SysUserSearchCodition searchCoditon = new SysUserSearchCodition() { PageSize = 20 };

            List<User> list = uo.GetList();
            int count = uo.GetCount();
            ViewBag.list = new PagedList<User>(list, searchCoditon.PageIndex, searchCoditon.PageSize,
               count);
            ViewBag.roles = rolebll.GetList("", 1, 100);
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

        public ActionResult DeleteSysUser(int id)
        {
            if (id == null) return RedirectToAction("SysUserList");



            UserOperation uo = new UserOperation();
           

            return Content( uo.Delete(id));

        }

        public ActionResult GetUserRoleRelations(int id)
        {
            UserPermission.UserRoleRelation.UserRoleRelationOperation uro = new UserPermission.UserRoleRelation.UserRoleRelationOperation();

            List<UserPermission.UserRoleRelation.UserRoleRelation> list= uro.GetList(id);

            return Json(list,JsonRequestBehavior.AllowGet);
        }

        public ActionResult AddUserRoleRelations(int id,string roles)
        {
            string result = "";
            try
            {
                UserPermission.UserRoleRelation.UserRoleRelationOperation uro = new UserPermission.UserRoleRelation.UserRoleRelationOperation();
                List<UserPermission.UserRoleRelation.UserRoleRelation> list = uro.GetList(id);
                List<int> plist = new List<int>();
                string[] rolestr = roles.Split(",".ToCharArray());
                foreach (string str in rolestr)
                {
                    if (!string.IsNullOrEmpty(str))
                    {
                        plist.Add(int.Parse(str));
                    }
                }
                List<int> dlist = list.Select(r => r.RoleId).ToList<int>();
                List<int> insertlist = plist.Except(dlist).ToList<int>();
                List<int> deletelist = dlist.Except(plist).ToList<int>();

                foreach (int i in deletelist)
                {
                    uro.Delete(id, i);

                }
                foreach (int i in insertlist)
                {
                    uro.Insert(new UserPermission.UserRoleRelation.UserRoleRelation { UserId = id, RoleId = i });

                }
                result = "设置成功";
            }
            catch(Exception ex)
            {
                result = ex.Message;
            }

            return Content(result);
            
        }

     

    }
}
