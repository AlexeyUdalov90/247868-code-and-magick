'use strict';
var setupBlock = document.querySelector('.setup');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var similarListElement = document.querySelector('.setup-similar-list');
var fragment = document.createDocumentFragment();

var getRandomItem = function (array) {
  return array[Math.floor(Math.random() * array.length)];
};

var createWizads = function (number) {
  var names = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var surnames = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var colorsCoats = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var colorsEyes = ['black', 'red', 'blue', 'yellow', 'green'];
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

setupBlock.classList.remove('hidden');

createWizads(4).forEach(function (wizard) {
  fragment.appendChild(renderWizard(wizard));
});

similarListElement.appendChild(fragment);

setupBlock.querySelector('.setup-similar').classList.remove('hidden');
