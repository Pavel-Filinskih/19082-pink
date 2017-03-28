;(function() {
  'use strict';

  var reviewsSlider = document.getElementById('reviewsSlider');
  if (!reviewsSlider) { return };

  var sliders = document.querySelectorAll('.slider');
  for (var i=0; i < sliders.length; i++) {
    sliders[i].classList.remove('slider--no-js');
  };

  var sliderContent = reviewsSlider.getElementsByClassName('reviews__item'),
    controlBlock = reviewsSlider.querySelector('.slider__toggles'),
    sliderControls = controlBlock.getElementsByTagName('i'),
    prevSlide = reviewsSlider.querySelector('.reviews__item--active'),
    activeControl,
    prevArrow = reviewsSlider.querySelector('.slider__control--prev'),
    nextArrow = reviewsSlider.querySelector('.slider__control--next');

  function changeSliderByControls(e) {
    var targetElem = e.target;
    if (targetElem.tagName != 'I')  {
      return;
    } else {
      activeControl = targetElem.getAttribute('data-toggler');
      activeControl = Number(activeControl);
      changeSlideControl(activeControl);
    }
  }

  function changeSlideControl(activeControl) {
    controlBlock.querySelector('.slider__toggle--active').classList.remove('slider__toggle--active');
    sliderControls[activeControl].classList.add('slider__toggle--active');

    changePrevSlide();
    sliderContent[activeControl].classList.add('reviews__item--active');
  }

  function changePrevSlide() {
    if (prevSlide !== null) {
      prevSlide.style.zIndex = '';
    }
    prevSlide = reviewsSlider.querySelector('.reviews__item--active');
    prevSlide.classList.remove('reviews__item--active');
    if ( prevSlide.classList.contains('left') ) {
      prevSlide.classList.remove('left');
    }
  }

  function changeSliderByArrows(direction) {
    switch (direction) {
      case 'right' :
        ++activeControl;
        if (activeControl === sliderContent.length) {
          activeControl = 0;
        }
        changeSlideControl(activeControl);
        break;

      case 'left' :
        --activeControl;
        if (activeControl < 0) {
          activeControl = sliderContent.length - 1;
        }
        sliderContent[activeControl].classList.add('left');
        changeSlideControl(activeControl);
        break;

      default:
        alert( 'Я таких значений не знаю' );
    }
  }


  /******************************************************/

  while (sliderControls.length < sliderContent.length) {
    var newControl = document.createElement('i');
    controlBlock.appendChild(newControl);
  }

  for (var i = 0; i < sliderControls.length; i++) {
    sliderControls[i].setAttribute('data-toggler', i);
  }

  activeControl = controlBlock.querySelector('.slider__toggle--active').getAttribute('data-toggler');

  controlBlock.addEventListener('click', changeSliderByControls);

  nextArrow.addEventListener('click', function() {changeSliderByArrows('right')}, false);

  prevArrow.addEventListener('click', function() {changeSliderByArrows('left')}, false);
})();
