using System;
using System.Collections.Generic;
using System.Text;

namespace UserLibrary.BusinessModel
{
    public class MasterErrorMessage
    {
        public int Id { get; set; }
        public int PageId { get; set; }
        public string PageName { get; set; }
        public string Type { get; set; }
        public string Code { get; set; }
        public string Message { get; set; }
        public bool IsActive { get; set; }
        public string CreatedBy { get; set; }
        public DateTimeOffset? CreatedOn { get; set; }
        public string CreatedByName { get; set; }
    }
}
