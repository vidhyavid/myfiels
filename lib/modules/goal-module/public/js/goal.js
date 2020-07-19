$(document).ready(function() {
    $('.success-msg').click(function() {
      $("#pop-up-ht").removeClass("d-none");
      $(".d-table-col").addClass("d-none");
    });
  });
  $(document).ready(function() {
    $(".datepicker").datepicker({
    // maxDate: new Date(),
    changeMonth: true,
    changeYear: true,
    yearRange: "-100:+0",
    dateFormat: 'dd/mm/yy',
  });
    $('.dateTime').click(function() {
      $(".datepicker").focus();
    });
  });
