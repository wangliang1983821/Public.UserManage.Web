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
using System.Text;
namespace Public.UserManage.Web.Controllers
{
    public class FileManageController : Controller
    {
        //
        // GET: /FileManage/

        public ActionResult FileManage(string path)
        {
           
            ViewBag.Path = path;
            List<FileShowModel> list = FileOperate.GetFoldAllModel(HttpUtility.UrlDecode(path));
            return View(list);
        }

        public ActionResult FileDefaults(string path)
        {
            string str= FileOperate.GetFoldAll(HttpUtility.UrlDecode(path));
            return Content(str);
        }

        public ActionResult GetFiles(string path)
        {
            string[] str = DirFile.GetFileNames(path);

            StringBuilder sb = new StringBuilder();
            foreach (string s in str)
            {
                sb.Append(s + "<br></br>");
            }

            return Content(sb.ToString());
        }

    }
}
