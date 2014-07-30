var webpage = require('webpage'),
    system = require('system'),
    fs = require('fs'),
    address, output, size;

var pageTitle;
var sourcePage = webpage.create(),
    targetPage = webpage.create();

if (system.args.length < 2 || system.args.length > 4) {
    console.log('Usage: rasterize.js URL filename [paperwidth*paperheight|paperformat] [zoom]');
    console.log('  paper (pdf output) examples: "5in*7.5in", "10cm*20cm", "A4", "Letter"');
    console.log('  image (png/jpg output) examples: "1920px" entire page, window width 1920px');
    console.log('                                   "800px*600px" window, clipped to 800x600');
    phantom.exit(1);
} else {
    address = system.args[1];
    output = 'screenshot_without_chrome.png'//system.args[2];
    sourcePage.viewportSize = { width: 600, height: 600 };
    if (system.args.length > 3 && system.args[2].substr(-4) === ".pdf") {
        size = system.args[3].split('*');
        sourcePage.paperSize = size.length === 2 ? { width: size[0], height: size[1], margin: '0px' }
                                           : { format: system.args[3], orientation: 'portrait', margin: '1cm' };
    } else if (system.args.length > 3 && system.args[3].substr(-2) === "px") {
        size = system.args[3].split('*');
        if (size.length === 2) {
            pageWidth = parseInt(size[0], 10);
            pageHeight = parseInt(size[1], 10);
            sourcePage.viewportSize = { width: pageWidth, height: pageHeight };
            sourcePage.clipRect = { top: 0, left: 0, width: pageWidth, height: pageHeight };
        } else {
            console.log("size:", system.args[3]);
            pageWidth = parseInt(system.args[3], 10);
            pageHeight = parseInt(pageWidth * 3/4, 10); // it's as good an assumption as any
            console.log ("pageHeight:",pageHeight);
            sourcePage.viewportSize = { width: pageWidth, height: pageHeight };
        }
    }
    if (system.args.length > 4) {
        sourcePage.zoomFactor = system.args[4];
    }
    sourcePage.open(address, function (status) {
        if (status !== 'success') {
            console.log('Unable to load the sourcePage address' + address + '!');
            phantom.exit();
        } else {
            window.setTimeout(function () {
                sourcePage.render(output);
                pageTitle = sourcePage.evaluate(function(course) {
                    return document.title;
                });
                targetPage.open("index.html", function(status) {
                    if (status === 'success') {
                        window.setTimeout(function () {
                            var context = {
                                address: address,
                                title: pageTitle
                            }
                            targetPage.evaluate(function(context) {
                                var e = document.getElementById('windowtitle');
                                e.innerText = context.title;
                                e = document.getElementById('address');
                                e.innerText = context.address;
                                e = document.getElementById('tabtitle');
                                e.innerText = context.title;
                            }, context);
                            targetPage.render(system.args[2]);
                            phantom.exit();
                        }, 200)
                    } else {
                        console.log('Unable to load the targetPage address!');
                        phantom.exit();
                    }
                });
            }, 200);
        }
    });
}
