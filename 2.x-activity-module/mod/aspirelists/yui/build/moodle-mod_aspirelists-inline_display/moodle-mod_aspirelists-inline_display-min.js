YUI.add("moodle-mod_aspirelists-inline_display",function(e,t){M.mod_aspirelists=M.mod_aspirelists||{},NS=M.mod_aspirelists.inline_display={},NS.init_view=function(t,n){e.delegate("click",this.toggle_inline_list,e.config.doc,".aspirelists_inline_readings_toggle .activityinstance a",this),e.on("domready",this.resize_embedded_lists),this.accordionOpen=t,this.accordionClosed=n},NS.toggleAccordionIndicator=function(e,t){e.ancestor(".aspirelists").all("span.aspirelists_inline_accordion").each(function(e){e.setHTML(t)})},NS.toggle_inline_list=function(e){e.preventDefault();var t=e.target.ancestor(".aspirelists");t&&t.all(".aspirelists_inline_list").each(function(e){e.getStyle("display")==="none"?(e.show(),NS.toggleAccordionIndicator(e,NS.accordionOpen)):(e.hide(),NS.toggleAccordionIndicator(e,NS.accordionClosed))})},NS.resize_embedded_lists=function(t){e.all(".aspirelists_inline_list").each(function(e){var t=e.ancestor(".aspirelists").get("offsetWidth"),n=e.ancestor(".aspirelists").getComputedStyle("margin"),r=e.ancestor(".aspirelists").getComputedStyle("padding-left");n&&(t-=parseFloat(n,10)*2),r&&(t-=parseFloat(r,10)*2);var i=e.ancestor(".mod-indent-outer");if(i){var s=i.getComputedStyle("padding-left"),o=e.getComputedStyle("margin-left");o&&(t-=parseFloat(o,10)*2),s&&(t-=parseFloat(s,10)*2)}e.setAttribute("width",t)})}},"@VERSION@",{requires:["base","node","event","event-delegate"]});