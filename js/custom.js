/*
Author URI: http://webthemez.com/
Note: 
Licence under Creative Commons Attribution 3.0 
Do not remove the back-link in this web template 
-------------------------------------------------------*/

$(window).load(function() {
    jQuery('#all').click();
    return false;
});

$(document).ready(function() {
    
    
    
    $('#header_wrapper').scrollToFixed();
    $('.res-nav_click').click(function() {
        $('.main-nav').slideToggle();
        return false

    });
	
    function resizeText() {
        var preferredWidth = 767;
        var displayWidth = window.innerWidth;
        var percentage = displayWidth / preferredWidth;
        var fontsizetitle = 25;
        var newFontSizeTitle = Math.floor(fontsizetitle * percentage);
        $(".divclass").css("font-size", newFontSizeTitle)
    }
    if ($('#main-nav ul li:first-child').hasClass('active')) {
        $('#main-nav').css('background', 'none');
    }
    $('#mainNav').onePageNav({
        currentClass: 'active',
        changeHash: false,
        scrollSpeed: 950,
        scrollThreshold: 0.2,
        filter: '',
        easing: 'swing',
        begin: function() {
        },
        end: function() {
            if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
            } else {
                $('.header').removeClass('addBg');
            }

        },
        scrollChange: function($currentListItem) {
            if (!$('#main-nav ul li:first-child').hasClass('active')) {
                $('.header').addClass('addBg');
            } else {
                $('.header').removeClass('addBg');
            }
        }
    });

    var container = $('#portfolio_wrapper');


    container.isotope({
        animationEngine: 'best-available',
        animationOptions: {
            duration: 200,
            queue: false
        },
        layoutMode: 'fitRows'
    });

    $('#filters a').click(function() {
        $('#filters a').removeClass('active');
        $(this).addClass('active');
        var selector = $(this).attr('data-filter');
        container.isotope({
            filter: selector
        });
        setProjects();
        return false;
    });

    function splitColumns() {
        var winWidth = $(window).width(),
            columnNumb = 1;


        if (winWidth > 1024) {
            columnNumb = 4;
        } else if (winWidth > 900) {
            columnNumb = 2;
        } else if (winWidth > 479) {
            columnNumb = 2;
        } else if (winWidth < 479) {
            columnNumb = 1;
        }

        return columnNumb;
    }
	
    function setColumns() {
        var winWidth = $(window).width(),
            columnNumb = splitColumns(),
            postWidth = Math.floor(winWidth / columnNumb);

        container.find('.portfolio-item').each(function() {
            $(this).css({
                width: postWidth + 'px'
            });
        });
    }

    function setProjects() {
        setColumns();
        container.isotope('reLayout');
    }

    container.imagesLoaded(function() {
        setColumns();
    });


    $(window).bind('resize', function() {
        setProjects();
    });


});

wow = new WOW({
    animateClass: 'animated',
    offset: 100
});
wow.init();
/*document.getElementById('').onclick = function() {
    var section = document.createElement('section');
    section.className = 'wow fadeInDown';
    section.className = 'wow shake';
    section.className = 'wow zoomIn';
    section.className = 'wow lightSpeedIn';
    this.parentNode.insertBefore(section, this);
};*/




//image lightbox

$(document).ready(function(){
        // ACTIVITY INDICATOR

        var activityIndicatorOn = function ()
        {
            $('<div id="imagelightbox-loading"><div></div></div>').appendTo('body');
        },
        activityIndicatorOff = function ()
        {
            $('#imagelightbox-loading').remove();
        },
        // OVERLAY

        overlayOn = function ()
        {
            $('<div id="imagelightbox-overlay"></div>').appendTo('body');
        },
        overlayOff = function ()
        {
            $('#imagelightbox-overlay').remove();
        },
        // CLOSE BUTTON

        closeButtonOn = function (instance)
        {
            $('<button type="button" id="imagelightbox-close" title="Close"></button>').appendTo('body').on('click touchend', function () {
                $(this).remove();
                instance.quitImageLightbox();
                return false;
            });
        },
        closeButtonOff = function ()
        {
            $('#imagelightbox-close').remove();
        },
        // CAPTION

        captionOn = function ()
        {
            var description = $('a[href="' + $('#imagelightbox').attr('src') + '"] img').attr('alt');
            if (description.length > 0)
                $('<div id="imagelightbox-caption">' + description + '</div>').appendTo('body');
        },
        captionOff = function ()
        {
            $('#imagelightbox-caption').remove();
        },
        // NAVIGATION

        navigationOn = function (instance, selector)
        {
            var images = $(selector);
            if (images.length)
            {
                var nav = $('<div id="imagelightbox-nav"></div>');
                for (var i = 0; i < images.length; i++)
                    nav.append('<button type="button"></button>');

                nav.appendTo('body');
                nav.on('click touchend', function () {
                    return false;
                });

                var navItems = nav.find('button');
                navItems.on('click touchend', function ()
                {
                    var $this = $(this);
                    if (images.eq($this.index()).attr('href') != $('#imagelightbox').attr('src'))
                        instance.switchImageLightbox($this.index());

                    navItems.removeClass('active');
                    navItems.eq($this.index()).addClass('active');

                    return false;
                })
                        .on('touchend', function () {
                            return false;
                        });
            }
        },
        navigationUpdate = function (selector)
        {
            var items = $('#imagelightbox-nav button');
            items.removeClass('active');
            items.eq($(selector).filter('[href="' + $('#imagelightbox').attr('src') + '"]').index(selector)).addClass('active');
        },
        navigationOff = function ()
        {
            $('#imagelightbox-nav').remove();
        },
        // ARROWS

        arrowsOn = function (instance, selector)
        {
            var $arrows = $('<button type="button" class="imagelightbox-arrow imagelightbox-arrow-left"></button><button type="button" class="imagelightbox-arrow imagelightbox-arrow-right"></button>');

            $arrows.appendTo('body');

            $arrows.on('click touchend', function (e)
            {
                e.preventDefault();

                var $this = $(this),
                        $target = $(selector + '[href="' + $('#imagelightbox').attr('src') + '"]'),
                        index = $target.index(selector);

                if ($this.hasClass('imagelightbox-arrow-left'))
                {
                    index = index - 1;
                    if (!$(selector).eq(index).length)
                        index = $(selector).length;
                }
                else
                {
                    index = index + 1;
                    if (!$(selector).eq(index).length)
                        index = 0;
                }

                instance.switchImageLightbox(index);
                return false;
            });
        },
        arrowsOff = function ()
        {
            $('.imagelightbox-arrow').remove();
        };
        
        
        var selector = 'a[data-imagelightbox="true"]';
        var instance = $(selector).imageLightbox(
		{
			onStart:		function() { overlayOn(); closeButtonOn(instance); arrowsOn( instance, selector ); },
			onEnd:			function() { overlayOff(); captionOff(); closeButtonOff(); arrowsOff(); activityIndicatorOff(); },
			onLoadStart:            function() { captionOff(); activityIndicatorOn(); },
			onLoadEnd:	 	function() { captionOn(); activityIndicatorOff(); $( '.imagelightbox-arrow' ).css( 'display', 'block' ); }
		});
} );