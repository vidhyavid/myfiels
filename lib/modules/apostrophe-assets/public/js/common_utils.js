function addLoadingToPage() {
  var html = '<div class="maia-loading">'+
                '<div id="LoadingPages" class="loading-icon">'+
                '<i class="fa fa-spinner fa-spin fa-5x fa-fw"></i></div>'+
              '</div>';
  $('body').append(html);
  return;
}

function removeLoadingFromPage() {
  $('.maia-loading').remove();
}

