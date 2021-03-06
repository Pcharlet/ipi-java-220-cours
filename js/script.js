var imp = impress();
imp.init();
hljs.initHighlightingOnLoad();
var nbSlides = $(".step.slide").length;
var showPopover = new URL(window.location).searchParams.get("showPopover");

var rootElement = document.getElementById( "impress" );

rootElement.addEventListener( "impress:stepenter", function(event) {

  var currentStep = event.target;
  var numeroSlide = $(currentStep).attr("data-nb");
  var percentageSlide = Math.round(numeroSlide * 100 / nbSlides);
  $("#progress").attr("style", "width: " + percentageSlide + "%;");
  $("#progress").attr("aria-valuenow", percentageSlide);

  if(showPopover === "true") {
  	setTimeout(function(){
	  	$('#' + currentStep.id + ' [data-toggle="popover"]').popover('show', {
		    container: 'body'
		  });
	}, 1000);
  } else {
  	$('#' + currentStep.id + ' [data-toggle="popover"]').popover({
	    container: 'body'
	  });
  }

  
});

rootElement.addEventListener( "impress:stepleave", function(event) {

  var currentStep = event.target;
  $('#' + currentStep.id + ' [data-toggle="popover"]').popover('dispose');
});

$(window).on('hashchange', function(e){
    //Gérer dropdown-toggle
    var origEvent = e.originalEvent;
    oldHash = origEvent.oldURL.substring(origEvent.oldURL.lastIndexOf("#")).replace("/","");
    newHash = origEvent.newURL.substring(origEvent.newURL.lastIndexOf("#")).replace("/","");
    $('#my-navbar li a').removeClass("active");
    $('#my-navbar li a[href="' + newHash.substring(0,newHash.indexOf("-")) + '"]').addClass("active");
    $('#my-navbar li a[href="' + newHash.substring(0,newHash.lastIndexOf("-")) + '"]').addClass("active");
    $('#my-navbar li a[href="' + newHash + '"]').addClass("active");
    
});

$(window).on('contextmenu', function(e){
  e.preventDefault();
  imp.prev();
});

$(window).on('click', function(e){
  if( (e.which == 2) ) {
      e.preventDefault();
      imp.next();
   }
});

//-------------------

$("#correctGeneric").click(function(event) {
  $(event.target).toggleClass('btn-primary').toggleClass('btn-success');
  $("#correctGeneric > i").toggleClass('fa-times-circle ');
  $("#correctGeneric > i").toggleClass('fa-check-circle');
  $("#genericCompareTo").toggleClass('text-danger').toggleClass('text-success');
  var html = $("#genericExtends").html();
  $("#genericExtends").html(html === "" ? " extends Comparable" : "");
});

$("#toggleClassIntern").click(function(event) {
  $(event.target).toggleClass('btn-primary').toggleClass('btn-success');
  $("#toggleClassIntern > i").toggleClass('fa-times-circle ');
  $("#toggleClassIntern > i").toggleClass('fa-check-circle');
  $("#interneNew").toggleClass('text-danger').toggleClass('text-success')
  var html = $("#internePrivate").html();
  $("#internePrivate").html(html === '<span class="hljs-keyword">private</span>' ? '<span class="hljs-keyword">public</span>' : '<span class="hljs-keyword">private</span>');
});