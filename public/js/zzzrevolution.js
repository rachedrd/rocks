jQuery(document).ready(function() {
      jQuery('.tp-banner').revolution({
        delay:9000,
        startwidth:1060,
        startheight:610,
        hideThumbs:10,
        navigationType:"off",
        fullWidth:"on",
        forceFullWidth:"on"
      });
      jQuery("#event1").countdown({
        date: "31 December 2013 23:59:59",
        format: "on"
      });
    });