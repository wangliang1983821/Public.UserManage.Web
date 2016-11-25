using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;

using System.Web;

namespace Utility
{
    public class DataAreaCommon
    {
        bool isAjax = false;
        Encoding encode = null;
        string message = "";
        string path = "";

        public DataAreaCommon()
        {

        }

        public DataAreaCommon(bool isAjax, string encode, string path,bool isMapPath=false)
        {
            this.isAjax = isAjax;
            this.encode = GetEncoding(encode);
           
            if (isMapPath)
            {
                this.path = System.Web.HttpContext.Current.Server.MapPath(path);
            }
            else
            {
                this.path = path;
            }
        }
        public DataAreaCommon(string path,bool isMapPath=false)
        {
            if(isMapPath)
            {
                this.path = System.Web.HttpContext.Current.Server.MapPath(path);
            }
            else
            {
                this.path = path;
            }
           
           

        }
        public void CreateShtml(string content)
        {
            StreamWriter sw = null;
            try
            {
                FileCreate(path);
                if (encode == null)
                {
                    sw = new StreamWriter(path, false);
                }
                else
                {
                    sw = new StreamWriter(path, false, encode);
                }
              
                sw.Write(content);
                sw.Flush();

            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (sw != null)
                    sw.Close();

            }
        }

        public string ReadShtml()
        {
            StreamReader sr = null;
            string content = "";
            try
            {
                if (encode == null)
                {
                    sr = new StreamReader(path);
                }
                else
                {
                    sr = new StreamReader(path, encode);
                }
                
                content = sr.ReadToEnd().ToString();

                return content;
            }
            catch (Exception ex)
            {
                throw ex;
            }
            finally
            {
                if (sr != null)
                    sr.Close();

            }
        }

        private Encoding GetEncoding(string codeName)
        {
            if (string.IsNullOrEmpty(codeName)) return Encoding.UTF8;//默认字符集
            switch (codeName.ToLower())
            {
                case "utf-8":
                    return new UTF8Encoding(true);
                case "utf-8 bom":
                    return new UTF8Encoding(true);
                case "gb2312":
                    return Encoding.GetEncoding(codeName);
                default:
                    return new UTF8Encoding(true);
            }
        }


        public static void FileCreate(string Path)
        {
            FileInfo CreateFile = new FileInfo(Path); //创建文件 
            CreateDirectory(CreateFile.DirectoryName);
        }

        /// <summary>
        /// 创建一个目录
        /// </summary>
        /// <param name="directoryPath">目录的绝对路径</param>
        public static void CreateDirectory(string directoryPath)
        {
            //如果目录不存在则创建该目录
            if (!IsExistDirectory(directoryPath))
            {
                Directory.CreateDirectory(directoryPath);
            }
        }


        public static bool IsExistDirectory(string directoryPath)
        {
            return Directory.Exists(directoryPath);
        }

        public static bool FileExists(string path)
        {

            return File.Exists(HttpContext.Current.Server.MapPath(path));
              
        }

    

        #region  文件大小检查



       

 

        //所给路径中所对应的文件大小
        public static long FileSize(string filePath)
        {

            //定义一个FileInfo对象，是指与filePath所指向的文件相关联，以获取其大小
            FileInfo fileInfo = new FileInfo(filePath);

            if (fileInfo.Exists)
            {
                return fileInfo.Length;
            }
            else
            {
                return 0;
            }
        }

 

        

     
     
        #endregion
    }
}
