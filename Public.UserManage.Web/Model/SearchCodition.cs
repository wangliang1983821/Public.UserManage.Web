using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Public.UserManage.Web.Model
{
    public class SearchCodition
    {
        private Int32 _id = 0;
        public Int32 Id
        {
            get { return _id; }
            set { _id = value; }
        }

        private Int32 _pageIndex = 1;
        public Int32 PageIndex
        {
            get { return _pageIndex; }
            set { _pageIndex = value; }
        }

        private Int32 _pageSize = 20;

        public Int32 PageSize
        {
            get { return _pageSize; }
            set { _pageSize = value; }
        }

        private Int32 _pageIndex2 = 1;
        public Int32 PageIndex2
        {
            get { return _pageIndex2; }
            set { _pageIndex2 = value; }
        }

        private Int32 _pageSize2 = 10;

        public Int32 PageSize2
        {
            get { return _pageSize2; }
            set { _pageSize2 = value; }
        }

        private string _searchName = "";
        public string SearchName
        {
            get { return _searchName; }
            set { _searchName = value; }
        }

        private string _searchCategroy = "";
        public string SearchCategroy
        {
            get { return _searchCategroy; }
            set { _searchCategroy = value; }
        }

        private DateTime _begintime = DateTime.MinValue;
        public DateTime BeginTime
        {
            get { return _begintime; }
            set { _begintime = value; }
        }

        private DateTime _endtime = DateTime.MinValue;
        public DateTime EndTime
        {
            get { return _endtime; }
            set { _endtime = value; }
        }
    }
}