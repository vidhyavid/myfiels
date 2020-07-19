function setWindowWH() {
  var HeaderHeight = $("#header-height").height(),
      SubmenuHeight = $("#submenu-height")&&isNaN($("#submenu-height").height())?0:$("#submenu-height").height(),
      FooterMenu = $("#footer-height").height();
      FooterHeight = FooterMenu + 1;

  var HeaderHT = 'calc(100vh - '+ HeaderHeight + 'px - ' + FooterHeight + 'px)';
  $("#maia-main-body").css('min-height', HeaderHT);

  var hd_sub_Height = SubmenuHeight + HeaderHeight;
  var min_height = 'calc(100vh - '+ hd_sub_Height + 'px)';
  $("#maia-body-inner").css('min-height', min_height);

   var pop_min_height = 'calc(100vh - '+ hd_sub_Height + 'px - ' + FooterHeight + 'px)';
   $("#pop-up-hd-sub-ft").css('min-height', pop_min_height);



  var sub_min_height = 'calc(100% - '+ SubmenuHeight +'px)';
  $("#inner-body-sub").css('min-height', sub_min_height);

}
$(window).on("load resize", function() {
  setWindowWH();
});


$(document).ready(function () {
$('.timepickers,.timepicker').timepicki({disableFocus: false});

$('.showfooter').click(function() {
  if($(".trackshow").hasClass("trackshow")){
  $(".trackshow").removeClass("trackshow");
  $(".closefooter").removeClass("d-none");
  $(".showfooter").addClass("d-none");
}
$( window ).resize(function() {
  $(".showfooter").removeClass("d-none");
  $(".closefooter").addClass("d-none");
    $(".showfoot").addClass("trackshow");
});

});
$('.closefooter').click(function() {
  $(".showfooter").removeClass("d-none");
  $(".closefooter").addClass("d-none");
    $(".showfoot").addClass("trackshow");
});

//datepicker code
  $(".datepicker").datepicker({
    minDate: new Date(),
    changeMonth: true,
    changeYear: true,
    yearRange: "-100:+0",
    dateFormat: "dd/mm/yy",
  });

});
//my health module bmi link
$( "#why-using-bmi" ).click(function() {
    $('.popup').css('display', 'flex');
});
$(".close-bmi").click(function(){
  $('.popup').css('display','none');
})


  function getYYYMMDD(d) {
    var splits = d.split('/');
    return splits[2]+'-'+splits[1]+'-'+splits[0];
  }




/*Scroll top*/

$(document).ready(function(){
    $(window).scroll(function(){
        if ($(this).scrollTop() > 100) {
            $('#scroll-top').fadeIn();
        } else {
            $('#scroll-top').fadeOut();
        }
    });
    $('#scroll-top').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});

/*Scroll top End*/
