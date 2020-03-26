var $document, exileTraitorousSpoiler, first_feed_elem_text, incrementBadgeNumber, initialize, initiateSpoilerBlocking, num_feed_elems, searchForAndBlockSpoilers, settings;

first_feed_elem_text = null;

num_feed_elems = null;

this.smaller_font_mode = false;

this.reddit_mode = false;

settings = {
  // show_specific_words: true,
  spoiler_words_regex: null,
  execute_trailors: false
};

// langugage
var lang, headlineText, buttonText, rememberText, infoText = '';
lang = navigator.language;
if (lang = 'cs'){
  headlineText = "Tento příspěvěk je pravděpodobně infikován&nbsp;koronavirem."
  buttonText = "Přesto zobrazit";
  rememberText = "Pamatujte: "
  infoText = "Čtení méně novinek spojených s onemoncněním COVID-19 může prospět vaší duševní pohodě."
} else {
  headlineText = "This post is probably infected with Coronavirus."
  buttonText = "Read it anyway";
  rememberText = "Remember: "
  infoText = "Reading fewer news related to COVID-19 might improve your wellbeing."
} 


// images
var headerImgURL = chrome.extension.getURL("assets/images/header.jpg");
var virusImgURL = chrome.extension.getURL("assets/images/virus.png");

$document = $(document);

$document.ready(function() {
  return chrome.runtime.sendMessage({
    userPreferencesRequested: true
  }, (function(_this) {
    return function(response) {
      var extra_words_to_block;
      // settings.show_specific_words = response.showSpecificWordEnabled;
      settings.execute_trailors = response.destroySpoilers;
      extra_words_to_block = response.extraWordsToBlock.split(',').map(function(word) {
        return word.trim().escapeRegex();
      }).filter(function(word) {
        return !!word;
      });
      settings.spoiler_words_regex = new RegExp(SPOILER_WORDS_LIST.concat(extra_words_to_block).join('|'), 'i');
      if (response.blockingEnabled) {
        return initialize();
      }
    };
  })(this));
});

incrementBadgeNumber = function() {
  return chrome.runtime.sendMessage({
    incrementBadge: true
  }, (function() {}));
};

initiateSpoilerBlocking = function(selector_string, remove_parent) {
  searchForAndBlockSpoilers(selector_string, true, remove_parent);
  return $document.mousemove(function() {
    return debounce(function() {
      return searchForAndBlockSpoilers(selector_string, false, remove_parent);
    });
  });
};

searchForAndBlockSpoilers = (function(_this) {
  return function(feed_elements_selector, force_update, remove_parent) {
    var $new_feed_elems, last_feed_elem_text, new_last_text, new_length;
    $new_feed_elems = $(feed_elements_selector);
    if (remove_parent) {
      $new_feed_elems = $new_feed_elems.parent();
    }
    if ($new_feed_elems.length === 0) {
      return;
    }
    new_length = $new_feed_elems.length;
    new_last_text = $new_feed_elems.last()[0].textContent;
    if (force_update || (new_length !== num_feed_elems) || (new_last_text !== last_feed_elem_text)) {
      cl("Updating potential spoilers, previously '" + num_feed_elems + "', now '" + new_length + "'.");
      last_feed_elem_text = new_last_text;
      num_feed_elems = new_length;
      return $new_feed_elems.each(function() {
        var matchedSpoiler;
        if (this.className.search(/glamoured/) > -1) {
          return;
        }
        matchedSpoiler = this.textContent.match(settings.spoiler_words_regex);
        if (matchedSpoiler !== null) {
          return exileTraitorousSpoiler($(this), matchedSpoiler[0]);
        }
      });
    }
  };
})(this);

exileTraitorousSpoiler = function($traitor, dark_words_of_spoilage) {
  var $glamour, capitalized_spoiler_words, glamour_string, specific_words;
  incrementBadgeNumber();
  if (settings.execute_trailors) {
    $traitor.remove();
    return;
  }
  capitalized_spoiler_words = dark_words_of_spoilage.capitalizeFirstLetter();
  cl("A bespoiling traitor in our midst! the forbidden words hath been spake: '" + capitalized_spoiler_words + "'.");
  $traitor.addClass('glamoured');
  // specific_words = settings.show_specific_words ? ", because it dared mention the phrase '" + capitalized_spoiler_words + "'" : "";
  glamour_string = "<div class='spoiler-glamour' style='background-image: url(" + headerImgURL + ");'><img class='ilustrace' src='"+ virusImgURL +"'><h3 class='spoiler-obituary'>" + headlineText +"</h3><div class='dovetek'><strong>" + rememberText +"</strong>" + infoText +"</div><h3 class='click-to-view-spoiler' >" + buttonText +"</h3></div>";
  $(glamour_string).appendTo($traitor);
  $glamour = $traitor.find('.spoiler-glamour');
  return $glamour.on('click', function(ev) {
    // var specific_words_for_confirm;
    ev.stopPropagation();
    ev.preventDefault();
    $glamour.addClass('revealed');
    return setTimeout((function() {
      return $glamour.remove();
    }), 3500);
  });
};

initialize = (function(_this) {
  return function() {
    var url;
    url = window.location.href.toLowerCase();
    if (url.indexOf('facebook') > -1) {
      return initiateSpoilerBlocking(FACEBOOK_FEED_ELEMENTS_SELECTOR);
    }
  };
})(this);
