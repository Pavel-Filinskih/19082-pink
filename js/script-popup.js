;(function() {
  'use strict';

  var sendFormBtn = document.getElementById('sendFormBtn');
  var storyFormInputs = document.querySelectorAll('.form input:not([type="checkbox"]):not([type="radio"])');
  var popupSuccess = document.getElementById('success');
  var popupFailure = document.getElementById('failure');
  var closeBtns = document.querySelectorAll('.btn--submit');

  function validate() {
    for(var i = 0; i < storyFormInputs.length; i++) {
      if(!storyFormInputs[i].value) {
        popupFailure.classList.add('pop-up--show');
        return false;
      }
    }
  }

  if(popupSuccess) {
    popupSuccess.classList.add('pop-up--show');
    for(var i = 0; i < closeBtns.length; i++) {
      closeBtns[i].addEventListener('click', function() {
        popupSuccess.classList.remove('pop-up--show');
        popupFailure.classList.remove('pop-up--show');
      });
    }
  }
})();