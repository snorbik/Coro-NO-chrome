var AVCLUB_FEED_ELEMENTS_SELECTOR, BUZZFEED_ELEMENTS_SELECTOR, DATA_KEY, DEATH_NAMES, FACEBOOK_FEED_ELEMENTS_SELECTOR, FEEDLY_ELEMENTS_SELECTOR, GIZMODO_ELEMENTS_SELECTOR, GOOGLE_NEWS_FEED_ELEMENTS_SELECTOR, GOOGLE_PLUS_ELEMENTS_SELECTOR, SLACK_FEED_ELEMENTS_SELECTOR, SPOILER_WORDS_LIST, SPOILER_WORDS_REGEX, TUMBLR_ELEMENTS_SELECTOR, TWITTER_FEED_ELEMENTS_SELECTOR, YOUTUBE_ELEMENTS_SELECTOR;

DATA_KEY = 'no-corona';

AVCLUB_FEED_ELEMENTS_SELECTOR = '.item, article.short, article > .heading';

BUZZFEED_ELEMENTS_SELECTOR = '.card--article-featured, .card--article, .card--package, .card--video, .sidebar__link, .js-now-buzzing__list > li';

FACEBOOK_FEED_ELEMENTS_SELECTOR = 'div[data-testid="fbfeed_story"], div[role="article"], #pagelet_trending_tags_and_topics ul > li';

FEEDLY_ELEMENTS_SELECTOR = '.entry';

GIZMODO_ELEMENTS_SELECTOR = '.featured-item, article';

GOOGLE_NEWS_FEED_ELEMENTS_SELECTOR = 'a[target="_blank"]';

GOOGLE_PLUS_ELEMENTS_SELECTOR = 'div[id^="update-"], c-wiz div div c-wiz';

SLACK_FEED_ELEMENTS_SELECTOR = 'ts-message';

TUMBLR_ELEMENTS_SELECTOR = '.post_container, article';

TWITTER_FEED_ELEMENTS_SELECTOR = "[data-item-type='tweet'], .trend-item";

YOUTUBE_ELEMENTS_SELECTOR = '.yt-lockup, .related-list-item, .comment-renderer-text';

SPOILER_WORDS_LIST = ['corona', 'coronavirus', 'covid', 'covid-19', 'covid19', 'COVID', 'COVID-19', 'COVID19', 'desinfekce', 'desinfekci', 'desinfekcí', 'desinfekční', 'desinfekčního', 'desinfekčních', 'desinfekčním', 'desinfekčními', 'desinfekčnímu', 'dezinfekce', 'dezinfekci', 'dezinfekcí', 'dezinfekční', 'dezinfekčního', 'dezinfekčních', 'dezinfekčním', 'dezinfekčními', 'dezinfekčnímu', 'epidemic', 'epidemie', 'epidemiemi', 'epidemii', 'epidemií', 'epidemiích', 'epidemiím', 'epidemy', 'FFP2', 'FFP3', 'karanténa', 'karanténě', 'karanténní', 'karanténního', 'karanténních', 'karanténním', 'karanténními', 'karanténnímu', 'karanténo', 'karanténou', 'karanténová', 'karanténu', 'karantény', 'korona', 'koronavire', 'koronavirem', 'koronavirová', 'koronavirové', 'koronavirový', 'koronaviru', 'koronavirus', 'krize', 'krizi', 'krizí', 'nákaza', 'nákazy', 'nákaze', 'nákazu', 'nákazo', 'nákaze', 'nákazou', 'nakažená', 'nakažené', 'nakaženého', 'nakaženému', 'nakažení', 'nakaženou', 'nakažený', 'ošetřovné', 'pandemic', 'pandemie', 'pandemiemi', 'pandemii', 'pandemií', 'pandemiích', 'pandemiím', 'pandemy', 'pomůcek', 'pomůckách', 'pomůckám', 'pomůckami', 'pomůcky', 'Prymula', 'Prymulo', 'Prymulou', 'Prymulovi', 'Prymulu', 'Prymuly', 'quarantine', 'remdesivir', 'respirátor', 'respirátorem', 'respirátoru', 'respirátorů', 'respirátorům', 'respirátory', 'roušce', 'roušek', 'rouška', 'rouškách', 'rouškám', 'rouškami', 'rouško', 'rouškou', 'roušku', 'roušky', 'rúška', 'SARS', 'SARS-CoV', 'SARS-CoV-2','social distancing', 'vir', 'vire', 'virech', 'virem', 'virová', 'virové', 'virový ', 'viru', 'virů', 'virům', 'virus', 'viry'];

SPOILER_WORDS_REGEX = new RegExp(SPOILER_WORDS_LIST.join('|'), 'i');