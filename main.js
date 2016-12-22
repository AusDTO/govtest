(function(document) {
// Data

var experiments = {};

// Profile
var lsKey = "govtest";

document.onreadystatechange = function () {
  if (document.readyState == "interactive") {

    var experimentEls = document.querySelectorAll('[experiment]');

    if(experimentEls.length) {
      addStyles("[variant=default]{display:none}[variant].active {display:block}");

      Array.prototype.slice.call(experimentEls).map(function(item){
        experiments[item.getAttribute('experiment')] = makeExperiment(item);
      });
    }
    
    window[lsKey] = {
      activeExperiments: experiments,
      profile: updateUserProfile(getUserProfile())
    };
  }
};

function activateExperiment(experiment, variant) {
  experiment[variant].el.className += 'active';
  experiment.active = experiment[variant].name || variant;
}

function addStyles(css) {
  var style = document.createElement('style');
  style.appendChild(document.createTextNode(css));

  document.head.appendChild(style);
}

function getUserProfile() {
  return JSON.parse(localStorage.getItem(lsKey));
}

function makeExperiment(experiment) {
  var items = experiment.querySelectorAll('[variant]');
  
  return Array.prototype.slice.call(items).map(makeVariant);
}

function makeVariant(item) {
  var name = item.getAttribute('variant');
  
  return {
    "name": name,
    "el": item
  };
}

function updateUserProfile(profile){
  profile = profile || {};

  for(var exp in experiments)
    if(experiments.hasOwnProperty(exp)){
      if (!profile.hasOwnProperty(exp)) profile[exp] = Math.floor(
          getRandomArbitrary(0, experiments[exp].length)
        );
      activateExperiment(experiments[exp], profile[exp]);
    }

  localStorage.setItem(lsKey, JSON.stringify(profile));
  
  return profile;
}

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
})(document);