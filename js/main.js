


$(document).ready(function() {

    updateSlideSize();
    //preloadAllImages(storyManager.pages).awaitAll(function () {
    //
    //});
});


$( window ).resize(function() {
    updateSlideSize();
});

var updateSlideSize = function () {

    var docWidth = $( window ).width(),
        docHeight = $( window ).height();

    console.log(docWidth);

    var slidePage = $('#slide-page');
    var proportion = 16/9;

    var width,height,horizontalMargins,verticalMargins;

    if(docWidth/docHeight > proportion){
        //side margin
        width =  docHeight * proportion;
        height = docHeight;
        horizontalMargins = docWidth - width;
        verticalMargins = 0;

    } else {
        //top bottom margins
        width = docWidth;
        height = docWidth * (1/proportion);
        horizontalMargins = 0;
        verticalMargins = docHeight - height;
    }

    slidePage.width(width + 'px');
    slidePage.height(height + 'px');
    slidePage.css('margin-top', verticalMargins/2 + 'px');
    slidePage.css('margin-bottom', verticalMargins/2 + 'px');
    slidePage.css('margin-right', horizontalMargins/2 + 'px');
    slidePage.css('margin-left', horizontalMargins/2 + 'px');

};


var preloadAllImages = function(pages) {

    var loadingBar = d3.select('#title-page').append('div')
        .classed('loading-bar', true)
        .style('width', 0);


    var imagesQueue = queue();

    var arrayOfImages = [];

    pages.forEach(function (page) {
        if(page.image){
            arrayOfImages.push(page.image);
        }

        if(page.images){
            arrayOfImages.push(page.images[QUESTIONNAIRE_TYPE]);
        }
    });

    var completed = 0;

    $(arrayOfImages).each(function () {
        var imageSrc = this;
        imagesQueue.defer(function (callback) {
            $('<img />').attr('src',"res/"+ imageSrc)
                .appendTo('body').css('display','none')
                .error(function(e){
                    console.warn('error loading ' + e.target.currentSrc);
                })
                .load(function () {
                    console.log("loaded: " + imageSrc);
                    completed += 1;

                    loadingBar.style('width',parseInt(100*(completed/arrayOfImages.length)) + '%');

                    callback(null,null);
                });
        });
    });

    return imagesQueue;
};




function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}