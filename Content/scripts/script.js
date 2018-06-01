var isFilterOn = false;
var selectedCity = '';
const maxScreenWidth = 1100;

$('.element').hover(function () {
    var startupName = ($(this).find('.name').text());
    var startupDescription = ($(this).find('.description').text());
    var selectedCityName = selectedCity.replace('.', '')

    // Show description text if filter is not on 
    // if filter is on, and the element has class with selected city, then show description
    if (!isFilterOn || (isFilterOn && $(this).hasClass(selectedCityName))) {
        showStartupDescription({ startupName, startupDescription })
    }
});

$('.state-filter').click(function () {
    var city = $(this).attr('class').split(' ').pop();
    var startups = document.getElementsByClassName(city);
    var cityClassName = '.' + city;

    // selectedCity (previously set) is the same as the currently selected city, clear the filter
    if (selectedCity == cityClassName) {
        // deselect by remove related classes
        selectedCity = ''
        isFilterOn = false

        // remove all filter based classes
        $('.element').removeClass('filtered-element')
        $('.element').removeClass('non-filtered-element')
    } else {
        isFilterOn = true

        // add non-filtered-element class to all other 'elements' that does not contain the city class
        $('.element').filter(`:not(${cityClassName})`).addClass('non-filtered-element').removeClass('filtered-element')

        // add filtered-element class to all elements that has the city in its class
        $('.element').filter(cityClassName).addClass('filtered-element').removeClass('non-filtered-element')

        // set the selected city
        selectedCity = cityClassName
    }
});

// sticky the header when scrolling
$(window).scroll(function () {

    // only sticky if below certain width as set by css media queries to break the css grid
    if ($(window).scrollTop() >= 147 && ($(window).width() < maxScreenWidth)) {
        $('.selected-description').addClass('fixed-position')
    } else {
        $('.selected-description').removeClass('fixed-position')
    }
})

function showStartupDescription(startupInformation) {
    var { startupName, startupDescription } = startupInformation
    $('.startup-name').text(startupName)
    $('.startup-description').text(startupDescription)
}