


let _btnFilterByday = $('.btnfilterbyday');
let _fechaDiario = $('.datetimepicker');
let _btnFilterByMonth = $('.btnfilterbymonth');

    initEvent();

    /***
     * 
     * 
     * *****/
    function initEvent() {
        _btnFilterByday.on('click', getEchangeRateByDay);
        _btnFilterByMonth.on('click', getEchangeRateByMonth);
        
    }

    

    /***
     * 
     * 
     * */ 
    function getEchangeRateByDay()
    {

        if (_fechaDiario.val() == "") {
            $('.lbl-datepicker').addClass('inValid').css('background-color', '#efa1a1');
            return;
        }
        else { $('.lbl-datepicker').removeClass('inValid').css('background-color', '#94e294'); }

        let _fechaVal = _fechaDiario.datepicker('getDate');

        let objData = {
            anyo: _fechaVal.getFullYear(),
            mes: (_fechaVal.getMonth() + 1), // Considerando que Enero = 0 (donde inicia)
            dia: _fechaVal.getDate()
        } 
         //console.info('data   ', objData);
     
        requestDailyExchangeRateByDay(objData);
    }


    function getEchangeRateByMonth() {


        if (_fechaDiario.val() == "") {
            $('.lbl-datepicker').addClass('inValid').css('background-color', '#efa1a1');
            return;
        }
        else { $('.lbl-datepicker').removeClass('inValid').css('background-color', '#94e294'); }

        let _fechaVal = _fechaDiario.datepicker('getDate');

        let objectDataByMonth = {
            anyo: _fechaVal.getFullYear(),
            mes: (_fechaVal.getMonth() + 1)   // Considerando que Enero = 0 (donde inicia)
        } 

        requestDailyExchangeRateByMonth(objectDataByMonth);
    }


    /*
     * 
     ********/
    function requestDailyExchangeRateByDay(objData) { 

        var ajaxResult = $.ajax({
            url: urlContent + 'Home/GetDailyExchangerate',
            type: "POST",
            data: objData  
            });

            ajaxResult.fail(function (jqXHR, exception, errorThrown) {
                var msg = '';
                console.info("Error: request data...");
           

            });

            ajaxResult.done(function (data, textStatus, jqXHR) {
            
                let result = data;
                if (jqXHR.status === 207) {
                    console.info("Error: request data...");
                }
                if (jqXHR.status === 208) {
                    console.info("Error: request data...");
                }
                if (jqXHR.status === 206) {

                    $('.tasacambio').val(result.dataResut);
                    console.info("Success: request data...");
                }
           
            });
            ajaxResult.always(function (jqXHR, textStatus) {


            });

    } 
 

    /*
     * 
     * **** */
    function requestDailyExchangeRateByMonth(objectRequest) {

        var ajaxResult = $.ajax({
            url: urlContent + 'Home/GetExchangeRateByMonth',
            type: "POST",
            data: objectRequest 
        });

        ajaxResult.fail(function (jqXHR, exception, errorThrown) {
            var msg = '';
            console.info("Error: request data...");


        });

        ajaxResult.done(function (data, textStatus, jqXHR) {

            let result = data;
            if (jqXHR.status === 207) {
                console.info("Error: request data...");
            }
            if (jqXHR.status === 208) {
                console.info("Error: request data...");
            }
            if (jqXHR.status == 206 && textStatus == "success") {

                $('.content-data-exchangerate').html(jqXHR.responseText);

            }

        });
        ajaxResult.always(function (jqXHR, textStatus) {


        });

    } 


