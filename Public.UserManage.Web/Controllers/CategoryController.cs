using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Public.Model.Category;
using Public.SiteContent.Core.Category;

namespace Public.UserManage.Web.Controllers
{
    public class CategoryController : Controller
    {
        //
        // GET: /Category/

        public ActionResult ContentCategory()
        {
          
            return View();
        }

        public ActionResult ContentCategoryList()
        {
            CategoryOperation co = new CategoryOperation();

            List<ContentCategoryModel> list = co.GetList("", 1, 1000);

            List<ContentCategoryModel> resultList = new List<ContentCategoryModel>();

            var l1 = list.FindAll(r => r.ParentId ==0);

            RecursionCategory(resultList, l1, list);

            return View(resultList);
        }

        public void RecursionCategory(List<ContentCategoryModel> resultList, List<ContentCategoryModel> list,List<ContentCategoryModel> ylist)
        {



            foreach (ContentCategoryModel m in list)
            {
                resultList.Add(m);
                var l = ylist.FindAll(r => r.ParentId == m.Id);
                if (l != null && l.Count > 0)
                {
                    RecursionCategory(resultList, l,ylist);
                }

            }

        }

        public ActionResult UpdateContentCategory(int id)
        {
            CategoryOperation co = new CategoryOperation();
            ContentCategoryModel u = co.Get(id);


            return View(u);
        }


        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateInput(false)]

        public ActionResult UpdateContentCategorySub(ContentCategoryModel model)
        {


            CategoryOperation co = new CategoryOperation();
            co.Update(model);
            return JavaScript("pagesub();");

        }

        public ActionResult InsertContentCategory(int id)
        {
            ContentCategoryModel u = new ContentCategoryModel();

            u.ParentId = id;

            return View(u);
        }
        [AcceptVerbs(HttpVerbs.Post)]
        [ValidateInput(false)]
        public ActionResult InsertContentCategorySub(ContentCategoryModel u)
        {
            CategoryOperation co = new CategoryOperation();
            if (u.ParentId == 0)
            {
                u.ParentsId = 0;
                u.CategoryLevel = 0;
            }
            else
            {
                ContentCategoryModel o = co.Get(u.ParentId);

                if (o.ParentsId == 0)
                {
                    u.ParentsId = o.Id;
                }
                else
                {

                    u.ParentsId = o.ParentsId;
                }
                u.CategoryLevel = o.CategoryLevel + 1;
            }
          

           
            co.Insert(u);
            return JavaScript("pagesub();");
        }


        public ActionResult DeleteContentCategory(int id)
        {


            CategoryOperation co = new CategoryOperation();


            return Content(co.Delete(id));

        }

    }
}
