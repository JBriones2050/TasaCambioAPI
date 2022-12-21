using Microsoft.AspNetCore.Mvc;
using Modelo.Model;
using Reference;
using Services.DataAccess;
using System.Data;
using System.Data.SqlTypes;
using System.Diagnostics;
using System.Reflection;
using System.Runtime.Serialization.Formatters.Soap;
using System.Text.Json;
using System.Xml;
using System.Xml.Linq;
using System.Xml.Serialization;
using TasaCambioAPI.Models;

namespace TasaCambioAPI.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        /// <summary>
        /// Vista de la interfaz de home
        /// </summary>
        /// <returns></returns>
        public IActionResult Index()
        {
            return View();
        }
        /// <summary>
        /// Vista de la interfaz de filtrado por dia
        /// </summary>
        /// <returns></returns>
        public IActionResult Daily()
        {
            return View();
        }
        /// <summary>
        /// Vista de la interfaz de filtrado por Mes
        /// </summary>
        /// <returns></returns>
        public IActionResult Month()
        {
            return View();
        }
      
        /// <summary>
        /// metodo que me retornara el resultado del filtrado de la tasa de cambio del dia
        /// </summary>
        /// <param name="dateFilter"></param>
        /// <returns></returns>
        public async Task<IActionResult> GetDailyExchangerate(TasaCambioDTO dateFilter)
        {

            try
            {
                int year = dateFilter.anyo;  int month = dateFilter.mes; int day=dateFilter.dia;

                RecuperaTC_MesResponse response = new RecuperaTC_MesResponse();
                TipoDeCambio tipoCambio = new TipoDeCambio();

                var resultDia = await tipoCambio.ObtenerTipoDeCambioDia(year, month, day);

                Response.StatusCode = 206;
                return Json(new { dataResut = resultDia, Success = true, Message = " data correcta" });
            }
            catch (Exception ex)
            {

                Response.StatusCode = 207;
                return Json(new { Success = false, Message = "error al obtener la informacion solicitada." + ex.Message });
            }


        }

        /// <summary>
        /// metodo que me retornara el resultado del filtrado de la tasa de cambio
        /// </summary>
        /// <param name="dateFilter"></param>
        /// <returns></returns>
        
        [HttpPost]
        public async Task<ActionResult> GetExchangeRateByMonth(TasaCambioDTO dateFilter)
        {
            int year = dateFilter.anyo; int month = dateFilter.mes;

            RecuperaTC_MesResponse response = new RecuperaTC_MesResponse();
            TipoDeCambio tipoCambio = new TipoDeCambio();
            List<TasaCambioDTO> tipoCambioList = new List<TasaCambioDTO>();
         
            try
            {

            var resultMes = await tipoCambio.ObtenerTipoDeCambioMes(year, month);

                 XmlElement dataResult = resultMes.Body.RecuperaTC_MesResult;

                tipoCambioList.AddRange(MappearPropiedades(dataResult));


            }
            catch (Exception ex)
            {

                Response.StatusCode = 207;
                return Json(new { Success = false, Message = "error al obtener la informacion solicitada." + ex.Message });
            }

            Response.StatusCode = 206;
            return View("Listado", tipoCambioList);

        }
         
        /// <summary>
        ///  mapeo de las propiedades con mi objeto para renderizar las lista de la tasa de cambio por mes
        /// </summary>
        /// <param name="resultMes"></param>
        /// <returns></returns>
        private List<TasaCambioDTO> MappearPropiedades(XmlElement resultMes)
        {
             List<TasaCambioDTO> tipoCambioList = new List<TasaCambioDTO>();


            foreach (XmlNode node in resultMes.ChildNodes)
            {
               var data = new TasaCambioDTO();
                if (node.HasChildNodes)
                {
                    for (int i = 0; i < node.ChildNodes.Count; i++)
                    {
                        if (node.ChildNodes[i].Name == "Fecha")
                        {
                            data.fecha = Convert.ToDateTime(node.ChildNodes[i].InnerText);
                        }
                       else if (node.ChildNodes[i].Name == "Valor")
                        {
                            data.valor = Convert.ToDecimal(node.ChildNodes[i].InnerText);
                        }
                       else if (node.ChildNodes[i].Name == "Ano")
                        {
                            data.anyo = Convert.ToInt32(node.ChildNodes[i].InnerText);
                        }
                       else if (node.ChildNodes[i].Name == "Mes")
                        {
                            data.mes = Convert.ToInt32(node.ChildNodes[i].InnerText);
                        }
                        else if (node.ChildNodes[i].Name == "Dia")
                        {
                            data.dia = Convert.ToInt32(node.ChildNodes[i].InnerText);
                        }
                    }
                }
               tipoCambioList.Add(data);
            }


            return tipoCambioList;
        }


        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}