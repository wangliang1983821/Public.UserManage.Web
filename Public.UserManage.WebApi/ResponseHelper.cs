using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Net.Http;
using System.Net.Http.Formatting;
using System.Net;
using System.Web.Http;
using System.Text;

namespace Public.UserManage.WebApi
{
    public class ResponseHelper
    {
        public static HttpResponseMessage ReturnMessage(ApiController api, object target,bool isArray=false)
        {
            //var negotiator = api.Configuration.Services.GetContentNegotiator();
            //var type = target.GetType();
            //ContentNegotiationResult result = negotiator.Negotiate(type, api.Request, api.Configuration.Formatters);
            //if (result == null)
            //{
            //    var response = new HttpResponseMessage(HttpStatusCode.NotAcceptable);
            //    throw new HttpResponseException(response);
            //}

            var namePair = api.Request.GetQueryNameValuePairs();
            KeyValuePair<string, string> callback = namePair.FirstOrDefault(p => p.Key.Equals("callback"));
            string returnVal = string.Empty;
            Newtonsoft.Json.Converters.IsoDateTimeConverter isoDateTimeConverter = new Newtonsoft.Json.Converters.IsoDateTimeConverter
            {
                DateTimeFormat = "yyyy-MM-dd HH:mm:ss"
            };
            if (callback.Key == null || string.IsNullOrEmpty(callback.Value))
            {
                if (target == null) returnVal = isArray ? "[]" : "{}";
                else {
                    returnVal = target is string ? target.ToString() : Newtonsoft.Json.JsonConvert.SerializeObject(target, isoDateTimeConverter);
                }
            }
            else
            {
                if (target == null) returnVal = isArray?"[]":"{}";
                else {
                    returnVal = string.Format("{0}({1})", callback.Value, target is string ? target.ToString() : Newtonsoft.Json.JsonConvert.SerializeObject(target, isoDateTimeConverter));
                }
            }
            var msg = new HttpResponseMessage()
            {
                //Content = new ObjectContent<T>(
                //    target,		        // What we are serializing 
                //    result.Formatter,           // The media formatter
                //    result.MediaType.MediaType  // The MIME type
                //)
                Content = new StringContent(returnVal, Encoding.UTF8),
            };
            
            //msg.Headers.Add("Content-Type","application/json");
            return msg;
        }
    }
}