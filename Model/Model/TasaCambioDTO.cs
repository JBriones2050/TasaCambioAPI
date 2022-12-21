
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Modelo.Model
{
    public class TasaCambioDTO
    {
        public DateTime fecha { get; set; }
        public decimal valor { get; set; }
        public int anyo { get; set; }
        public int mes { get; set; }
        public int dia { get; set; }
    }
}

