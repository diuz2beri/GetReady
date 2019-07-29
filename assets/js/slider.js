var slidesWrapper = $('.cd-hero-slider');

  //check if a .cd-hero-slider exists in the DOM
  if ( slidesWrapper.length > 0 ) {

    var sliderNav = $('.cd-slider-nav');
    var slidesNumber = slidesWrapper.children('li').length;
    var visibleSlidePosition = 0;
    var autoPlayId;
    var autoPlayDelay = 5000;

    // autoplay slider
    setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);

    // change visible slide
    sliderNav.on('click', 'a', function(event) {
      event.preventDefault();

      var selectedItem = $(this);

      if(!selectedItem.hasClass('selected')) {

        // if it's not already selected
        var selectedPosition = selectedItem.index();
        var activePosition = slidesWrapper.find('li.selected').index();

        if( activePosition < selectedPosition) {
          nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
        } else {
          prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, selectedPosition);
        }

        //this is used for the autoplay
        visibleSlidePosition = selectedPosition;

        updateSliderNavigation(sliderNav, selectedPosition);
        setAutoplay(slidesWrapper, slidesNumber, autoPlayDelay);
      }
    });
  }

  function nextSlide(visibleSlide, container, pagination, n){
    visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      visibleSlide.removeClass('is-moving');
    });

    container.children('li').eq(n).addClass('selected from-right').prevAll().addClass('move-left');
  }

  function prevSlide(visibleSlide, container, pagination, n){
    visibleSlide.removeClass('selected from-left from-right').addClass('is-moving').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function(){
      visibleSlide.removeClass('is-moving');
    });

    container.children('li').eq(n).addClass('selected from-left').removeClass('move-left').nextAll().removeClass('move-left');
  }

  function updateSliderNavigation(pagination, n) {
    var navigationDot = pagination.find('.selected');
    navigationDot.removeClass('selected');
    pagination.find('a').eq(n).addClass('selected');
  }

  // autoplay
   function setAutoplay(wrapper, length, delay) {
    if(wrapper.hasClass('autoplay')) {
      clearInterval(autoPlayId);
      autoPlayId = window.setInterval(function(){autoplaySlider(length)}, delay);
    }
   }

  function autoplaySlider(length) {
    if( visibleSlidePosition < length - 1) {
      nextSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, visibleSlidePosition + 1);
      visibleSlidePosition +=1;
    } else {
      prevSlide(slidesWrapper.find('.selected'), slidesWrapper, sliderNav, 0);
      visibleSlidePosition = 0;
    }
    updateSliderNavigation(sliderNav, visibleSlidePosition);
  }




  // Tabs

  function openPage(pageName, elmnt, color) {
  // Hide all elements with class="tabcontent" by default */
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Remove the background color of all tablinks/buttons
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  // Show the specific tab content
  document.getElementById(pageName).style.display = "block";

  // Add the specific color to the button used to open the tab content
  elmnt.style.backgroundColor = color;
}

// Get the element with id="defaultOpen" and click on it
document.getElementById("defaultOpen").click();
