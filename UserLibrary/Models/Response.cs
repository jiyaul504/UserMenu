using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;

namespace UserLibrary.Models
{
    public class Response
    {
        [JsonProperty("isSuccessful")]
        public bool IsSuccessful { get; set; }

        [JsonProperty("message")]
        public string Message { get; set; }

        public Response()
        {
            IsSuccessful = true;
        }

        public Response(bool isSuccessful, string message)
        {
            IsSuccessful = isSuccessful;
            Message = message;
        }
    }

    public class Response<T> : Response
    {
        [JsonProperty("value")]
        public T Value { get; set; }

        public Response(T value)
        {
            Value = value;
        }

        public Response(bool isSuccessful, string message)
            : base(isSuccessful, message)
        {
        }
    }
}
