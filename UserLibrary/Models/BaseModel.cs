using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace UserLibrary.Models
{
    public class BaseModel
    {
        public bool IsActive { get; set; }
        //public bool IsDelete { get; set; }

        [StringLength(250)]
        public string CreatedBy { get; set; }

        [StringLength(250)]
        public string CreatedByName { get; set; }

        public DateTimeOffset? CreatedOn { get; set; }

        [StringLength(250)]
        public string LastModifiedBy { get; set; }

        [StringLength(250)]
        public string LastModifiedByName { get; set; }

        public DateTimeOffset? LastModifiedOn { get; set; }
    }
}
