using System;
using Microsoft.VisualStudio.TestTools.UnitTesting;

using System.Collections.Generic;
using UserPermission.User;

namespace UnitTestUserPermission
{
    [TestClass]
    public class UserTest
    {
        [TestMethod]
        
        public void TestInsertMethod()
        {
            UserOperation u = new UserOperation();
            //User u = new User();
            u.Name = "1";
            u.TrueName = "1";
            u.PassWord = "1";
            u.Type = 1;
            u.IsDelete = false;
            u.CreateTime = DateTime.Now;
            Console .WriteLine(u.Insert());
        }
        [TestMethod]
        public void TestUpdateMethod()
        {
            UserOperation ul = new UserOperation();

            User u = ul.Get(5);

            //User u = new User();
            u.Type += 1;
            Console.WriteLine(ul.Update(u));
        }
        [TestMethod]
        public void TestGetListMethod()
        {
            UserOperation ul = new UserOperation();
           
            Console.WriteLine(ul.GetList().Count);
        }

        
      
        [TestMethod]
        public void TestDeleteMethod()
        {
            UserOperation ul = new UserOperation();

            Console.WriteLine(ul.Delete(6));
        }
    }
}
