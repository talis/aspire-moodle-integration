M.mod_aspirelists = M.mod_aspirelists || {};
NS = M.mod_aspirelists.inline_display = {};

NS.init_view = function(accordionOpen, accordionClosed) {
    Y.delegate('click', this.toggle_inline_list, Y.config.doc, '.aspirelists_inline_readings_toggle .activityinstance a', this);
    Y.on('domready', this.resize_embedded_lists);
    Y.on('domready', this.queueExpandedInlineIFrames.init());
    this.accordionOpen = accordionOpen;
    this.accordionClosed = accordionClosed;
};

NS.toggleAccordionIndicator = function(elem, indicatorText)
{
    elem.ancestor('.aspirelists').all('span.aspirelists_inline_accordion').each(function(n){
        n.setHTML(indicatorText);
    });
};

NS.toggle_inline_list = function(e)
{
    e.preventDefault();
    var courseSection = e.target.ancestor('.aspirelists');
    if(courseSection)
    {
        courseSection.all('.aspirelists_inline_list').each(function(n)
        {
            if(n.getStyle('display') === 'none')
            {
                n.show();
                if(n.getAttribute('src') === ''){
                    // if the iFrame's src has not yet been set then time to set it
                    var src = n.getData('intended-src');
                    n.setAttribute('src', src);
                }
                NS.toggleAccordionIndicator(n, NS.accordionOpen);
            } else {
                n.hide();
                NS.toggleAccordionIndicator(n, NS.accordionClosed);
            }
        });
    }
};

NS.resize_embedded_lists = function(e)
{
    Y.all('.aspirelists_inline_list').each(function(o){
        var width = o.ancestor('.aspirelists').get("offsetWidth");

        var margin = o.ancestor('.aspirelists').getComputedStyle("margin");
        var padding = o.ancestor('.aspirelists').getComputedStyle("padding-left");
        if(margin) { width = width - (parseFloat(margin, 10) * 2);}
        if(padding) { width = width - (parseFloat(padding, 10) * 2);}

        var indent = o.ancestor('.mod-indent-outer');
        if(indent)
        {
            var iPadding = indent.getComputedStyle("padding-left");
            var iMargin = o.getComputedStyle("margin-left");
            if(iMargin) { width = width - (parseFloat(iMargin, 10) * 2);}
            if(iPadding) { width = width - (parseFloat(iPadding, 10) * 2);}
        }

        o.setAttribute('width', width);
    });
};

/**
 * Queue all expanded inline IFrames
 *
 * This will ignore any inline iframes which are
 * currently collapsed.  These will be
 * loaded when the user interacts with them.
 *
 * Call .init() to start the process
 */
NS.queueExpandedInlineIFrames = {
    iframeQueue: [],
    inline_display_delay: 1000,
    add_to_iframe_load_queue: function(src, element){
        this.iframeQueue.push({'src':src, 'element': element});
    },
    populateIFrame: function(src, element){
        element.setAttribute('src', src);
    },
    processNextInQueue: function() {
        // Process the first launch call
        var iFrameData = this.iframeQueue.shift();
        if(iFrameData === undefined){
            // In this case we have called all elements to load and can complete
            return;
        }
        this.populateIFrame(iFrameData.src, iFrameData.element);
        // Set up a timeout to continue iterating over the calls
        var queueIframeScope = this;
        window.setTimeout(function(){
            queueIframeScope.processNextInQueue();
        }, this.inline_display_delay);
    },
    init: function(){
        var queueIframeScope = this;
        // Add all inline elements to the queue;
        Y.all('.aspirelists_inline_list').each(function (o) {
            var src = o.getData('intended-src');
            if(o.getStyle('display') !== 'none') {
                // Only queue expanded resources
                queueIframeScope.add_to_iframe_load_queue(src, o);
            }
        });
        this.processNextInQueue();
    }
};