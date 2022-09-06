using System;
using System.Collections.Generic;
using System.Text;

namespace UserLibrary.Models
{
    public class MenuList
    {
        [System.ComponentModel.DataAnnotations.Key]
        public int Id { get; set; }

        public string? Name { get; set; }
        public int Role_ID { get; set; }
        public int ParentId { get; set; }

        public string? ParentName { get; set; }
        //public bool IsActive { get; set; }

        //public bool IsDeleted { get; set; }
    }
}
