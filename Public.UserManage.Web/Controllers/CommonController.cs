using System;
using System.Collections.Generic;
using System.Configuration;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Net;
using System.Text;
using System.Web.Mvc;
using System.Web.UI.WebControls;
using System.Xml;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using Public.UserManage.Web.Model;
using Utility;
using Formatting = Newtonsoft.Json.Formatting;

namespace Noah.CMS.Web.Controllers
{
    public class CommonController : Controller
    {
         
        private const String CITY_SOURCE_URL = "Public.City.Url";
    
        /// <summary>
        /// 获取城市信息,将数据转换为jQuery.selector.js的json数据
        /// </summary>
        /// <returns></returns>
        public string GetCityData()
        {
           
                var list = GetCityDataByUrl();
                var  obj = JsonConvert.SerializeObject(list);
                 return obj.ToString();
        }

        private List<SelectorObj> GetCityDataByUrl()
        {
            var url = ConfigurationManager.AppSettings[CITY_SOURCE_URL];
           

            DataAreaCommon dac = new DataAreaCommon(url);
            var data = dac.ReadShtml();

            var jsonObj = (JArray)JsonConvert.DeserializeObject(data);
            var result = new List<SelectorObj>();
            foreach (var j in jsonObj.ToList())
            {
                var obj = new SelectorObj()
                {
                    Id = j["regionId"].ToString(),
                    Text = j["cityName"].ToString(),
                    Children = new List<SelectorObj>()
                };
                foreach (var child in j["children"])
                {
                    obj.Children.Add(new SelectorObj()
                    {
                        Id = child["cityId"].ToString(),
                        Text = child["cityName"].ToString(),
                        ParentId = child["parentId"].ToString()
                    });
                }
                result.Add(obj);
            }
            return result;
        }

      
     
    }
}