using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml;
using System.Xml.Serialization;
using System.Web;


namespace Public.UserManage.Web.Model
{
    [Serializable]
    [XmlRootAttribute("MenuList")]
    public class MenuModel
    {

        private string _name;

        /// <summary>Gets or sets CpId</summary>
        /// 
        [XmlAttribute("Name")]
        public string Name
        {
            get { return _name; }
            set { _name = value; }
        }


        private string _url;

        /// <summary>Gets or sets CpId</summary>
        [XmlAttribute("Url")]
        public string Url
        {
            get { return _url; }
            set { _url = value; }
        }


        private string _param;
        [XmlAttribute("Param")]
        public string Param
        {
            get { return _param; }
            set { _param = value; }
        }


        private string _resource;

        /// <summary>Gets or sets CpId</summary>
        [XmlAttribute("Resource")]
        public string Resource
        {
            get { return _resource; }
            set { _resource = value; }
        }
        private string _operation;
        [XmlAttribute("Operation")]
        public string Operation
        {
            get { return _operation; }
            set { _operation = value; }
        }

        private string _childAction;

        public string ChildAction
        {
            get { return _childAction; }
            set { _childAction = value; }
        }

        private List<MenuModel> _menuModel;
        public List<MenuModel> MenuList
        {
            get { return _menuModel; }
            set { _menuModel = value; }
        }

        private string _childs;
        [XmlAttribute("Childs")]
        public string Childs
        {
            set
            {
                _childs = value;
                if (value != null)
                {
                    ChildArray = value.Split(',');
                }

            }
            get { return _childs; }
        }

        public string[] ChildArray { set; get; }



    }

    public class TreeMenu
    {
       private string _name;

        /// <summary>Gets or sets CpId</summary>
        /// 
        [XmlAttribute("name")]
        public string name
        {
            get { return _name; }
            set { _name = value; }
        }

          private string _id;

        /// <summary>Gets or sets CpId</summary>
        /// 
        [XmlAttribute("id")]
        public string id
        {
            get { return _id; }
            set { _id = value; }
        }

          private List<TreeMenu> _children;
            [XmlAttribute("children")]
        public List<TreeMenu> children
        {
            get { return _children; }
            set { _children = value; }
        }

    }


    public class MenuModelOperation
    {


        static string filePath = @"~/Menu.Config";
        public MenuModelOperation()
        {

        }

        public static void CreateXml()
        {
            //List<MenuModel> Menu = new List<MenuModel>();
            //MenuModel NewsMenu = new MenuModel();
            //NewsMenu.Name = "新闻管理";
            //NewsMenu.Url = "";
            //NewsMenu.Operation = "";
            //NewsMenu.Resource = "News";
            //NewsMenu.Controller = "";
            //NewsMenu.Action = "";
            //NewsMenu.MenuList = new List<MenuModel>();
            //NewsMenu.MenuList.Add(new MenuModel { Name = "我的任务", Url = "", Operation = "", Resource = "", Controller="",Action=""});
            //NewsMenu.MenuList.Add(new MenuModel { Name = "内容管理", Url = "", Operation = "", Resource = "", Controller = "", Action = ""});
            //NewsMenu.MenuList.Add(new MenuModel { Name = "全部审核", Url = "", Operation = "", Resource = "", Controller = "", Action = "" });
            //NewsMenu.MenuList.Add(new MenuModel { Name = "驳回统计", Url = "", Operation = "", Resource = "", Controller = "", Action = "" });
            //Menu.Add(NewsMenu);

            //MenuModel PieceMenu = new MenuModel();
            //PieceMenu.Name = "块管理";
            //PieceMenu.Url = "";
            //PieceMenu.Operation = "";
            //PieceMenu.Resource = "Piece";
            //PieceMenu.Controller = "";
            //PieceMenu.Action = "";
            //PieceMenu.MenuList = new List<MenuModel>();
            //PieceMenu.MenuList.Add(new MenuModel { Name = "焦点图管理", Url = "", Operation = "", Resource = "", Controller = "", Action = ""  });
            //PieceMenu.MenuList.Add(new MenuModel { Name = "页面管理", Url = "", Operation = "", Resource = "", Controller = "", Action = "" });
            //PieceMenu.MenuList.Add(new MenuModel { Name = "数据源管理", Url = "", Operation = "", Resource = "", Controller = "", Action = "" });
            //Menu.Add(PieceMenu);
            //MenuModel TopicMenu = new MenuModel();
            //TopicMenu.Name = "专题管理";
            //TopicMenu.Url = "";
            //TopicMenu.Operation = "";
            //TopicMenu.Resource = "Topic";
            //TopicMenu.Controller = "";
            //TopicMenu.Action = "";
            //TopicMenu.MenuList = new List<MenuModel>();
            //TopicMenu.MenuList.Add(new MenuModel { Name = "专题管理", Url = "", Operation = "", Resource = "", Controller = "", Action = ""  });
            //Menu.Add(TopicMenu);
            //MenuModel ManageMenu = new MenuModel();
            //ManageMenu.Name = "控制面板";
            //ManageMenu.Url = "";
            //ManageMenu.Operation = "";
            //ManageMenu.Resource = "Manage";
            //ManageMenu.Controller = "";
            //ManageMenu.Action = "";
            //ManageMenu.MenuList = new List<MenuModel>();
            //ManageMenu.MenuList.Add(new MenuModel { Name = "模板管理", Url = "", Operation = "", Resource = "", Controller = "", Action = ""});
            //ManageMenu.MenuList.Add(new MenuModel { Name = "来源管理", Url = "", Operation = "", Resource = "", Controller = "", Action = ""  });
            //ManageMenu.MenuList.Add(new MenuModel { Name = "标签管理", Url = "", Operation = "", Resource = "", Controller = "", Action = ""});
            //ManageMenu.MenuList.Add(new MenuModel { Name = "用户管理", Url = "", Operation = "", Resource = "", Controller = "", Action = ""  });
            //Menu.Add(ManageMenu);


            //string _str = Utility.XmlUtil.XmlSerialize<List<MenuModel>>(Menu);

            //XmlDocument _xml = new XmlDocument();
            //_xml.LoadXml(_str);

            //string path = System.Web.HttpContext.Current.Server.MapPath(filePath);
            //_xml.Save(path);
        }
        /// <summary>
        /// 返回菜单实体
        /// </summary>
        /// <returns></returns>
        public static List<MenuModel> LoadMenu()
        {



            var lsMenu = (List<MenuModel>)HttpContext.Current.Session["cms.menu"];
            if (lsMenu != null)
            {
                return lsMenu;
            }
            XmlDocument _xml = new XmlDocument();


            //获取XML文件的绝对路径
            string path = System.Web.HttpContext.Current.Server.MapPath(filePath);
            _xml.Load(path);
            string str = _xml.OuterXml;
            List<MenuModel> model = Utility.XmlUtil.XmlDeserialize<List<MenuModel>>(str);
            var hctx = new HttpContextWrapper(HttpContext.Current);
            foreach (MenuModel m in model)
            {
                m.ChildAction = string.Join("|", m.MenuList.Select(r => r.Url).ToArray());
                //    m.Url = string.IsNullOrEmpty(m.Url) ? string.Empty : UrlHelper.GenerateContentUrl(m.Url, hctx);
            }
            return model;
        }

        public static bool IsCurrentModule(MenuModel m , string url)
        {
            if (m.ChildAction.IndexOf(url, StringComparison.InvariantCultureIgnoreCase) >= 0)
            {
                return true;
            }
            if (m.ChildArray != null && m.ChildArray.Length > 0)
            {
                foreach (var item in m.ChildArray)
                {
                    if (item.IndexOf(url, StringComparison.InvariantCultureIgnoreCase) >= 0)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        public static bool IsCurrent(MenuModel m, string url)
        {
            if (m.Url.IndexOf(url, StringComparison.InvariantCultureIgnoreCase) >= 0)
            {
                return true;
            }
            if (m.ChildArray != null && m.ChildArray.Length > 0)
            {
                foreach (var item in m.ChildArray)
                {
                    if (item.IndexOf(url, StringComparison.InvariantCultureIgnoreCase) >= 0)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

        public static bool IsCurrentChild(MenuModel m, string url)
        {
            if (m.ChildArray != null && m.ChildArray.Length > 0)
            {
                foreach (var item in m.ChildArray)
                {
                    if (item.IndexOf(url, StringComparison.InvariantCultureIgnoreCase) >= 0)
                    {
                        return true;
                    }
                }
            }
            return false;
        }

    }

}
