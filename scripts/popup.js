var loadUserPreferencesAndUpdate, sessionSpoilersBlocked, storeUserPreferences, updateSessionSpoilersBlocked;

sessionSpoilersBlocked = 0;

document.addEventListener('DOMContentLoaded', (function(_this) {
  return function() {
    var lang = navigator.language;
    if (lang == "cs"){
      document.getElementById('nadpis').innerHTML = "Blokovat příspěvky související s&nbsp;onemocněním&nbsp;COVID-19";
      document.getElementById('hide-text').innerHTML = "Skrýt příspěvky automaticky";
      document.getElementById('add-text').innerHTML = "Přidat vlastní fráze k blokování";
      document.getElementById('idea-text').innerHTML = "Původní nápad od";
      document.getElementById('update-text').innerHTML = "Coro-NO aktualizace";
    } else {
      document.getElementById('nadpis').innerHTML = "Block coronavirus-related posts";
      document.getElementById('hide-text').innerHTML = "Hide instead of block";
      document.getElementById('add-text').innerHTML = "Add extra phrases to block";
      document.getElementById('idea-text').innerHTML = "Original idea by";
      document.getElementById('update-text').innerHTML = "Corona update by";
    }

    _this.blockingEnabledToggle = document.getElementById('blocking-enabled-toggle');
    // _this.showSpecificWordToggle = document.getElementById('show-specific-word-toggle');
    _this.destroySpoilersToggle = document.getElementById('destroy-spoilers-toggle');
    _this.extraWordsHolder = document.getElementById('extra-words-to-block');
    _this.blockingEnabledToggle.addEventListener('change', storeUserPreferences);
    // _this.showSpecificWordToggle.addEventListener('change', storeUserPreferences);
    _this.destroySpoilersToggle.addEventListener('change', storeUserPreferences);
    _this.extraWordsHolder.addEventListener('keyup', storeUserPreferences);
    loadUserPreferencesAndUpdate();
    return setTimeout((function() {
      return chrome.runtime.sendMessage({
        fetchPopupTotal: true
      }, function(response) {
        if (response.newTotal) {
          sessionSpoilersBlocked = response.newTotal;
          return updateSessionSpoilersBlocked();
        }
      });
    }), 1);
  };
})(this));

loadUserPreferencesAndUpdate = (function(_this) {
  return function() {
    return loadUserPreferences(function() {
      _this.blockingEnabledToggle.checked = _this.userPreferences.blockingEnabled;
      // _this.showSpecificWordToggle.checked = _this.userPreferences.showSpecificWordEnabled;
      _this.destroySpoilersToggle.checked = _this.userPreferences.destroySpoilers;
      return _this.extraWordsHolder.value = _this.userPreferences.extraWordsToBlock;
    });
  };
})(this);

storeUserPreferences = (function(_this) {
  return function() {
    var data;
    data = {};
    data[DATA_KEY] = JSON.stringify({
      blockingEnabled: _this.blockingEnabledToggle.checked,
      // showSpecificWordEnabled: _this.showSpecificWordToggle.checked,
      destroySpoilers: _this.destroySpoilersToggle.checked,
      extraWordsToBlock: _this.extraWordsHolder.value
    });
    cl("Storing user preferences: " + data);
    return chrome.storage.sync.set(data, function(response) {
      return chrome.runtime.sendMessage({
        userPreferencesUpdated: true
      }, (function() {}));
    });
  };
})(this);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.newSpoilerBlocked) {
    sessionSpoilersBlocked += 1;
    return updateSessionSpoilersBlocked();
  }
});

updateSessionSpoilersBlocked = function() {
  var _gaq, newText;
  var lang = navigator.language;
    if (lang == "cs"){
      newText = sessionSpoilersBlocked + " příspěvků bylo zablokováno";

    } else {
      newText = sessionSpoilersBlocked + " posts blocked in this session";
    }
  document.getElementById('num-spoilers-prevented').textContent = newText;
  _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-161416421-1']);
  _gaq.push(['_trackPageview']);
  return (function() {
    var ga, s;
    ga = document.createElement('script');
    ga.type = 'text/javascript';
    ga.async = true;
    ga.src = 'https://ssl.google-analytics.com/ga.js';
    s = document.getElementsByTagName('script')[0];
    return s.parentNode.insertBefore(ga, s);
  })();
};
