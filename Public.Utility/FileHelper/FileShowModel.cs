using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Xml.Serialization;

namespace DotNet.Utilities
{
    public class FileShowModel
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

        private List<FileShowModel> _children;
        [XmlAttribute("children")]
        public List<FileShowModel> children
        {
            get { return _children; }
            set { _children = value; }
        }

    }
}
