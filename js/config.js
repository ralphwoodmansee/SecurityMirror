// for navigator language
//var lang = window.navigator.language;
// you can change the language
 var lang = 'en';

//change weather params here:
//units: metric or imperial
var weatherParams = {
    'q':'San Diego,US',
  //  'zip':'92131,US',
    'units':'imperial',
    'lang':lang
};
var currentParams = {
    'q':'San Diego,US',

};

//var feed = 'http://feeds.nos.nl/nosjournaal?format=rss';
//var feed = 'http://www.nu.nl/feeds/rss/achterklap.rss';
//var feed = 'http://www.nu.nl/feeds/rss/opmerkelijk.rss';
//var feed = 'http://www.nytimes.com/services/xml/rss/nyt/HomePage.xml';
var feed = 'https://threatpost.com/category/malware-2/feed';
//var feed = 'https://threatpost.com/category/data-breaches/feed';
//var feed = 'https://www.us-cert.gov/ncas/alerts.xml';
//var feed = 'http://feeds.feedburner.com/SansInstituteNewsbites';
var feed = 'http://krebsonsecurity.com/feed/';


// compliments:
var morning = [
            'Good morning, handsome!',
            'Enjoy your day!',
            'How was your sleep?'
        ];
        
var afternoon = [
            'Hello, beauty!',
            'You look sexy!',
            'Looking good today!'
        ];
       
var evening = [
            'How was your day?',
            'You look nice!',
            'Make sure you go to bed early!'
        ];