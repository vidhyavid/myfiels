function printError(id, msg) {
    let errVal= ($(`.errmsg${id}`).data(`errdata-${id}`) == undefined) ? 0 : $(`.errmsg${id}`).data(`errdata-${id}`);
      if(errVal != id){
      if ($('#'+id).length) {
            $('#'+id).after(`<label class="error errmsg${id}" data-errdata-${id}="${id}">${msg}</label>`);
      }
    }
      return;
    }
    
    function checkPayloadOK(payload) {
      var meds = payload.medications;
      var isOk = true;
      for (var i=0; i<meds.length; i++) {
        var m = meds[i];
        let keys = (meds.length == 1) ? 0 : meds.length - 1;
        if(i == keys){
        if (!m['name']) {
          isOk = false;
          printError('name__'+(i+1), 'Medication cannot be empty')
        }
        if (!m['dose']) {
          isOk = false;
          printError('dose__'+(i+1), 'Dose cannot be empty')
        }
    
      }
    }
      return isOk;
    }
    
    function cleanErrorAfterChange() {
      $('input').unbind().on('keyup', function() {
        $('.error').remove()
      })
    }