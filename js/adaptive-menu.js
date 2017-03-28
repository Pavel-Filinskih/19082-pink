;(function() {
  'use strict';

  var navToggler = document.getElementById('navToggler');
  if (!navToggler) { return };

  var mainNav = document.querySelector('.main-nav'),
    mainNavList = document.getElementById('mainNav'),
    pageHeader = document.querySelector('.page-header');

  mainNav.classList.remove('main-nav--no-js');

  navToggler.addEventListener('click', function() {
    this.classList.toggle('main-nav__toggler--close');
    mainNavList.classList.toggle('main-nav__list--opened');
    mainNavList.parentElement.classList.toggle('main-nav--opened');
    pageHeader.classList.toggle('page-header--bg-position');
  });
})();
