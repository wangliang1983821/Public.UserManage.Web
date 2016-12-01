using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Public.Model.Category;
using Public.Model.WebSite;
using Public.SiteContent.Core.WebSite;
using Public.UserManage.Web.Model;
using Webdiyer.WebControls.Mvc;
using DotNet.Utilities;
namespace Public.UserManage.Web.Controllers
{
    public class WebSiteController : Controller
    {
        //
        // GET: /WebSite/

        public ActionResult WebSiteList()
        {
            WebSiteOperation uo = new WebSiteOperation();

            SearchCodition searchCoditon = new SearchCodition() { PageSize = 20 };

            List<WebSiteModel> list = uo.GetList();
            int count = uo.GetCount();
            ViewBag.list = new PagedList<WebSiteModel>(list, searchCoditon.PageIndex, searchCoditon.PageSize,
               count);

            return View(searchCoditon);
        }

      

        [HttpPost]

        public ActionResult WebSiteList(SearchCodition searchCoditon)
        {


            TempData["searchCoditon"] = searchCoditon;
             WebSiteOperation uo = new WebSiteOperation();
            List<WebSiteModel> list = uo.GetList(searchCoditon.SearchName, searchCoditon.PageIndex, searchCoditon.PageSize);
            int count = uo.GetCount();
            if (Request.IsAjaxRequest())
                return PartialView("WebSiteTable", new PagedList<WebSiteModel>(list, searchCoditon.PageIndex, searchCoditon.PageSize,
                count));
            return PartialView(new SearchCodition());
        }


        public ActionResult UpdateWebSite(int id)
        {
            WebSiteOperation uo = new WebSiteOperation();
            WebSiteModel u = uo.Get(id);

            return View(u);
        }


        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateInput(false)]

        public ActionResult UpdateWebSiteSub(WebSiteModel model)
        {


           WebSiteOperation uo = new WebSiteOperation();
            uo.Update(model);
            DirFile.CreateDirectory(model.Path);
            return JavaScript("pagesub();");

        }

        public ActionResult InsertWebSite()
        {
            WebSiteModel u = new WebSiteModel();
            return View(u);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateInput(false)]
        public ActionResult InsertWebSiteSub(WebSiteModel u)
        {
             WebSiteOperation uo = new WebSiteOperation();
            u.CreateTime = DateTime.Now;
           
            uo.Insert(u);

            DirFile.CreateDirectory(u.Path);

            return JavaScript("pagesub();");
        }


        public ActionResult DeleteWebSite(int id)
        {


              WebSiteOperation uo = new WebSiteOperation();


            return Content(uo.Delete(id));

        }

    }
}
