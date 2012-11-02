var kojax = function($, History) {
    console.log("$", $);
    console.log("History", History);
}

if (typeof define === 'function' && define.amd) {
    define(['jquery', 'history', 'history.html4'], kojax);
} else if (
    typeof jQuery === 'function'
        && jQuery.fn.jquery
        && typeof History == 'function') {
    kojax(jQuery, History);
} else {
    console.log("Error: Dependencies not loaded.");
}