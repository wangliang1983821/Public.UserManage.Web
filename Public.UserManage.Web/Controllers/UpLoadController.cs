using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using DotNet.Utilities;
namespace Public.UserManage.Web.Controllers
{
    public class UpLoadController : Controller
    {
        //
        // GET: /UpLoad/

        public ActionResult UpFile(string p)
        {
            HttpPostedFileBase PostedFile = Request.Files["file"];

            string  file=Path.Combine(p,PostedFile.FileName);

            PostedFile.SaveAs(file);
            return Content("");
        }

    }
}
