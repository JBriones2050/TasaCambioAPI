using Reference;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.DataAccess
{
    public class TipoDeCambio
    {
        public async Task<double> ObtenerTipoDeCambioDia(int year, int month, int day)
        {
            Tipo_Cambio_BCNSoapClient tipoCambio = new Tipo_Cambio_BCNSoapClient(Tipo_Cambio_BCNSoapClient.EndpointConfiguration.Tipo_Cambio_BCNSoap);
            RecuperaTC_MesResponse response = new RecuperaTC_MesResponse();

            var result = await tipoCambio.RecuperaTC_DiaAsync(year, month, day);

            return result;
        }

        public async Task<RecuperaTC_MesResponse> ObtenerTipoDeCambioMes(int year, int month)
        {
            Tipo_Cambio_BCNSoapClient tipoCambio = new Tipo_Cambio_BCNSoapClient(Tipo_Cambio_BCNSoapClient.EndpointConfiguration.Tipo_Cambio_BCNSoap);
            RecuperaTC_MesResponse response = new RecuperaTC_MesResponse();

            response = await tipoCambio.RecuperaTC_MesAsync(year, month);
            return response;
        }
    }
}
