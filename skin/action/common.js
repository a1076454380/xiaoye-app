/**
 * Copyright lanru.cn
 */
var BROWSER = {};
var USERAGENT = navigator.userAgent.toLowerCase();
browserVersion({'ie':'msie','firefox':'','chrome':'','opera':'','safari':'','mozilla':'','webkit':'','maxthon':'','qq':'qqbrowser','rv':'rv'});
if(BROWSER.safari || BROWSER.rv) {
    BROWSER.firefox = true;
}
BROWSER.opera = BROWSER.opera ? opera.version() : 0;

function browserVersion(types) {
    var other = 1;
    for(i in types) {
        var v = types[i] ? types[i] : i;
        if(USERAGENT.indexOf(v) != -1) {
            var re = new RegExp(v + '(\\/|\\s|:)([\\d\\.]+)', 'ig');
            var matches = re.exec(USERAGENT);
            var ver = matches != null ? matches[2] : 0;
            other = ver !== 0 && v != 'mozilla' ? 0 : other;
        }else {
            var ver = 0;
        }
        eval('BROWSER.' + i + '= ver');
    }
    BROWSER.other = other;
}


function _attachEvent(obj, evt, func, eventobj) {
    eventobj = !eventobj ? obj : eventobj;
    if(obj.addEventListener) {
        obj.addEventListener(evt, func, false);
    } else if(eventobj.attachEvent) {
        obj.attachEvent('on' + evt, func);
    }
}
function $(id) {
    return !id ? null : document.getElementById(id);
}

function showTopLink() {
    var ft = $('page_header');
    if(ft){
        var scrolltop = $('page_bar');
        var viewPortHeight = parseInt(document.documentElement.clientHeight);
        var scrollHeight = parseInt(document.body.getBoundingClientRect().top);
        var basew = parseInt(ft.clientWidth);
        var sw = scrolltop.clientWidth;
        var winw=document.documentElement.clientWidth;

        if (basew < 1000) {
            var left = parseInt(fetchOffset(ft)['left']);
            left = left < sw ? left * 2 - sw : left;
            scrolltop.style.left = ( basew + left ) + 'px';
        } else {
            scrolltop.style.left = 'auto';
            var left = parseInt(fetchOffset(ft)['left']);

            scrolltop.style.right = (winw/2) - 630 - sw + 'px';
        }

        if (BROWSER.ie && BROWSER.ie < 7) {
            scrolltop.style.top = viewPortHeight - scrollHeight - 150 + 'px';
        }
        scrolltop.style.visibility = 'visible';
    }
}

function fetchOffset(obj, mode) {
    var left_offset = 0, top_offset = 0, mode = !mode ? 0 : mode;

    if(obj.getBoundingClientRect && !mode) {
        var rect = obj.getBoundingClientRect();
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        if(document.documentElement.dir == 'rtl') {
            scrollLeft = scrollLeft + document.documentElement.clientWidth - document.documentElement.scrollWidth;
        }
        left_offset = rect.left + scrollLeft - document.documentElement.clientLeft;
        top_offset = rect.top + scrollTop - document.documentElement.clientTop;
    }
    if(left_offset <= 0 || top_offset <= 0) {
        left_offset = obj.offsetLeft;
        top_offset = obj.offsetTop;
        while((obj = obj.offsetParent) != null) {
            position = getCurrentStyle(obj, 'position', 'position');
            if(position == 'relative') {
                continue;
            }
            left_offset += obj.offsetLeft;
            top_offset += obj.offsetTop;
        }
    }
    return {'left' : left_offset, 'top' : top_offset};
}

function getCurrentStyle(obj, cssproperty, csspropertyNS) {
    if(obj.style[cssproperty]){
        return obj.style[cssproperty];
    }
    if (obj.currentStyle) {
        return obj.currentStyle[cssproperty];
    } else if (document.defaultView.getComputedStyle(obj, null)) {
        var currentStyle = document.defaultView.getComputedStyle(obj, null);
        var value = currentStyle.getPropertyValue(csspropertyNS);
        if(!value){
            value = currentStyle[cssproperty];
        }
        return value;
    } else if (window.getComputedStyle) {
        var currentStyle = window.getComputedStyle(obj, "");
        return currentStyle.getPropertyValue(csspropertyNS);
    }
}

