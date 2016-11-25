// --------------------------------------------------------------------------------------------------------------------
// <copyright file="XmlUtil.cs" company="">
//   
// </copyright>
// <summary>
//   TODO: Update summary.
// </summary>
// --------------------------------------------------------------------------------------------------------------------
namespace Utility
{
    using System;
    using System.IO;
    using System.Text;
    using System.Text.RegularExpressions;
    using System.Xml;
    using System.Xml.Serialization;

    /// <summary>
    ///     TODO: Update summary.
    /// </summary>
    public class XmlUtil
    {
        #region Public Methods and Operators

        /// <summary>
        /// The xml deserialize.
        /// </summary>
        /// <param name="s">
        /// The s.
        /// </param>
        /// <typeparam name="T">
        /// </typeparam>
        /// <returns>
        /// The <see cref="T"/>.
        /// </returns>
        public static T XmlDeserialize<T>(string s) where T : class
        {
            try
            {
                s = RemoveInvalidCharacters(s);
                var reader = new StringReader(s);
                var ser = new XmlSerializer(typeof(T));
                var t = ser.Deserialize(reader) as T;
                return t;
            }
            catch(Exception ex)
            {
               
                throw ex;
            }
        }

        /// <summary>
        /// 去除xml无效字符
        /// </summary>
        /// <param name="xml"></param>
        /// <returns></returns>
        public static string RemoveInvalidCharacters(string xml)
        {
            return Regex.Replace(xml, @"([\x00-\x08\x0b-\x0c\x0e-\x1f]|&#x[0-9a-zA-Z]+;)+", string.Empty, RegexOptions.IgnoreCase);
        }

        /// <summary>
        /// The xml serialize.
        /// </summary>
        /// <param name="t">
        /// The t.
        /// </param>
        /// <typeparam name="T">
        /// </typeparam>
        /// <returns>
        /// The <see cref="string"/>.
        /// </returns>
        public static string XmlSerialize<T>(T t) where T : class
        {
            try
            {
                using (var ms = new MemoryStream())
                {
                    using (var writer = new XmlTextWriter(ms, Encoding.UTF8))
                    {
                        writer.Formatting = Formatting.Indented;

                        // 去除默认命名空间xmlns:xsd和xmlns:xsi
                        var ns = new XmlSerializerNamespaces();
                        ns.Add(string.Empty, string.Empty);

                        var ser = new XmlSerializer(typeof(T));
                        ser.Serialize(writer, t, ns);

                        ms.Seek(0, SeekOrigin.Begin);
                        using (var sr = new StreamReader(ms))
                        {
                            return RemoveInvalidCharacters(sr.ReadToEnd());
                        }
                    }
                }
            }
            catch(Exception ex)
            {
              
                throw ex;
            }
        }

        #endregion
    }
}