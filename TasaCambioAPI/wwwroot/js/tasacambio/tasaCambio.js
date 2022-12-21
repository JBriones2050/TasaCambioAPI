


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
            _fechaDiario.addClass('alert-danger');
            $('.em-msg-day').css('display', 'block');
            return;
        }
        else {
            $('.lbl-datepicker').removeClass('inValid').css('background-color', '#94e294');
            $('.em-msg-day').css('display', 'none');
            _fechaDiario.removeClass('alert-danger').addClass('alert-success');
        }

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

        let _fechaMonth = $('#datepickermonth');

        if (_fechaMonth.val() == "") {
            $('.lbl-datepicker-month').addClass('inValid').css('background-color', '#efa1a1');
            _fechaMonth.addClass('alert-danger');
            $('.em-msg-month').css('display','block');
            return;
        }
        else {
            $('.lbl-datepicker-month').removeClass('inValid').css('background-color', '#94e294');
            $('.em-msg-month').css('display', 'none');
            _fechaMonth.removeClass('alert-danger').addClass('alert-success');
        }

        let _fechaVal = _fechaMonth.datepicker('getDate');

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


