'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var colorsCoats = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var colorsEyes = ['black', 'red', 'blue', 'yellow', 'green'];
var colorsFireballs = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var setupBlock = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();
var setupOpen = document.querySelector('.setup-open');
var setupClose = setupBlock.querySelector('.setup-close');
var wizardCoat = setupBlock.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setupBlock.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = setupBlock.querySelector('.setup-fireball-wrap');
var setupButtonSubmit = setupBlock.querySelector('.setup-submit');

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createWizads = function (number) {
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var wizards = [];
  for (var i = 0; i < number; i++) {
    wizards[i] = {};
    wizards[i].name = getRandomItem(names) + ' ' + getRandomItem(surnames);
    wizards[i].coatColor = getRandomItem(colorsCoats);
    wizards[i].eyesColor = getRandomItem(colorsEyes);
  }
  return wizards;
};

var renderWizard = function (wizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);

  wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

  return wizardElement;
};

createWizads(4).forEach(function (wizard) {
  fragment.appendChild(renderWizard(wizard));
});

similarListElement.appendChild(fragment);

setupBlock.querySelector('.setup-similar').classList.remove('hidden');

var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function () {
  setupBlock.classList.remove('hidden');
  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  setupBlock.classList.add('hidden');
  document.removeEventListener('keydown', onPopupEscPress);
};

setupOpen.addEventListener('click', function () {
  openPopup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup();
  }
});

setupClose.addEventListener('click', function () {
  closePopup();
});

setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup();
  }
});

setupButtonSubmit.addEventListener('click', function () {
  setupButtonSubmit.type = 'submit';
  closePopup();
});

wizardCoat.addEventListener('click', function () {
  wizardCoat.style.fill = getRandomItem(colorsCoats);
});

wizardEyes.addEventListener('click', function () {
  wizardEyes.style.fill = getRandomItem(colorsCoats);
});

wizardFireball.addEventListener('click', function () {
  wizardFireball.style.backgroundColor = getRandomItem(colorsFireballs);
});
