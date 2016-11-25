using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;

namespace Public.UserManage.Web.Model
{
    /// <summary>
    /// Selector 插件对象
    /// </summary>
    public class SelectorObj
    {
        [JsonProperty("id")]
        public String Id { get; set; }

        [JsonProperty("text")]
        public String Text { get; set; }

        [JsonProperty("parentId")]
        public String ParentId { get; set; }

        [JsonProperty("children")]
        public List<SelectorObj> Children { get; set; }

        [JsonProperty("checked")]
        public bool Checked { get; set; }

        /// <summary>
        /// 节点附加属性,建议用字符串
        /// </summary>
        [JsonProperty("data")]
        public Object Data { get; set; }
    }
    public   class UserSelectorObj : SelectorObj
    {
        public String EnName { get; set; }
    }

    public class UserIdentifyComparer : IEqualityComparer<UserSelectorObj>
    {
        
        public bool Equals(UserSelectorObj x, UserSelectorObj y)
        {
            //Check whether the compared objects reference the same data.  
            if (Object.ReferenceEquals(x, y)) return true;

            if (Object.ReferenceEquals(x, null) || Object.ReferenceEquals(y, null))
                return false;

            return x.EnName.Trim() == y.EnName.Trim();
        }
        public int GetHashCode(UserSelectorObj user)
        {
            //Check whether the object is null   
            if (Object.ReferenceEquals(user, null)) return 0;

            //Get hash code for the SellerTypeID field if it is not null.   
            int SellerTypeId = user.EnName == null ? 0 : user.EnName.GetHashCode();

            //Calculate the hash code for the SellerType.   
            return SellerTypeId;
        }
    }

}