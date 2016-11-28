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
    public class RoleController : Controller
    {
        //
        // GET: /Role/

        public ActionResult SysRoleList()
        {

            RoleOperation uo = new RoleOperation();

            SearchCodition searchCoditon = new SearchCodition() { PageSize = 20 };

            List<Role> list = uo.GetList();
            int count = uo.GetCount();
            ViewBag.list = new PagedList<Role>(list, searchCoditon.PageIndex, searchCoditon.PageSize,
               count);

            return View(searchCoditon);

        }

        [HttpPost]

        public ActionResult SysRoleList(SearchCodition searchCoditon)
        {

          
            TempData["searchCoditon"] = searchCoditon;
            RoleOperation uo = new RoleOperation();
            List<Role> list = uo.GetList(searchCoditon.SearchName,searchCoditon.PageIndex, searchCoditon.PageSize);
            int count = uo.GetCount();
            if (Request.IsAjaxRequest())
                return PartialView("SysRoleTable", new PagedList<Role>(list, searchCoditon.PageIndex, searchCoditon.PageSize,
                count));
            return PartialView(new SearchCodition());
        }


        public ActionResult UpdateSysRole(int id)
        {
            RoleOperation uo = new RoleOperation();
            Role u = uo.Get(id);

            return View(u);
        }


        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateInput(false)]

        public ActionResult UpdateSysRoleSub(Role model)
        {


            RoleOperation uo = new RoleOperation();
            uo.Update(model);
            return JavaScript("pagesub();");

        }

        public ActionResult InsertSysRole()
        {
            Role u = new Role();
            return View(u);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateInput(false)]
        public ActionResult InsertSysRoleSub(Role u)
        {
            RoleOperation uo = new RoleOperation();
            u.CreateTime = DateTime.Now;
            u.IsDelete = false;
            u.Type = 1;
            uo.Insert(u);
            return JavaScript("pagesub();");
        }


        public ActionResult DeleteSysRole(int id)
        {
        

            RoleOperation uo = new RoleOperation();


            return Content(uo.Delete(id));

        }

     
    }
}
