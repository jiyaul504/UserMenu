using System;
using System.Collections.Generic;
using System.Text;
using Newtonsoft.Json;
using PagedList;

namespace UserLibrary.Models
{
    public class PagedResponse<T> : Response<IPagedList<T>>
    {
        public PagedResponse(IPagedList<T> pagedList)
            : base(pagedList)
        {
            TotalItemCount = pagedList.TotalItemCount;
        }

        public PagedResponse(bool isSuccessful, string message)
            : base(isSuccessful, message)
        {
        }

        [JsonProperty("totalItemCount")]
        public int TotalItemCount { get; set; }
    }
}
