!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("Clappr")):"function"==typeof define&&define.amd?define(["Clappr"],e):"object"==typeof exports?exports.ClapprThumbnailsPlugin=e(require("Clappr")):t.ClapprThumbnailsPlugin=e(t.Clappr)}(this,function(t){return function(t){function e(o){if(n[o])return n[o].exports;var i=n[o]={exports:{},id:o,loaded:!1};return t[o].call(i.exports,i,i.exports,e),i.loaded=!0,i.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){"use strict";function o(t){return t&&t.__esModule?t:{"default":t}}function i(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function r(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function u(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var s=function(){function t(t,e){for(var n=0;n<e.length;n++){var o=e[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(t,o.key,o)}}return function(e,n,o){return n&&t(e.prototype,n),o&&t(e,o),e}}(),a=n(7),c=n(3),l=n(6),h=o(l),f=n(5),d=o(f),p=function(t){function e(t){i(this,e);var n=r(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n._thumbsLoaded=!1,n._show=!1,n._hoverPosition=0,n._oldContainer=null,n._thumbs=[],n._onThumbsLoaded=new c.Promise(function(t){n._onThumbsLoadedResolve=t}),n._buildThumbsFromOptions().then(function(){n._thumbsLoaded=!0,n._onThumbsLoadedResolve(),n._init()})["catch"](function(t){throw t}),n}return u(e,t),s(e,[{key:"name",get:function(){return"scrub-thumbnails"}},{key:"attributes",get:function(){return{"class":this.name}}},{key:"template",get:function(){return(0,a.template)(h["default"])}}],[{key:"buildSpriteConfig",value:function(t,e,n,o,i,r,u){u=u||0;for(var s=[],a=0;a<e;a++)s.push({url:t,time:u+a*r,w:n,h:o,x:a%i*n,y:Math.floor(a/i)*o});return s}}]),s(e,[{key:"bindEvents",value:function(){this.listenTo(this.core.mediaControl,a.Events.MEDIACONTROL_MOUSEMOVE_SEEKBAR,this._onMouseMove),this.listenTo(this.core.mediaControl,a.Events.MEDIACONTROL_MOUSELEAVE_SEEKBAR,this._onMouseLeave),this.listenTo(this.core.mediaControl,a.Events.MEDIACONTROL_RENDERED,this._init),this.listenTo(this.core.mediaControl,a.Events.MEDIACONTROL_CONTAINERCHANGED,this._onMediaControlContainerChanged)}},{key:"_bindContainerEvents",value:function(){this._oldContainer&&this.stopListening(this._oldContainer,a.Events.CONTAINER_TIMEUPDATE,this._renderPlugin),this._oldContainer=this.core.mediaControl.container,this.listenTo(this.core.mediaControl.container,a.Events.CONTAINER_TIMEUPDATE,this._renderPlugin)}},{key:"_onMediaControlContainerChanged",value:function(){this._bindContainerEvents()}},{key:"addThumbnail",value:function(t){var e=this,n=t.constructor===Array?t:[t];return this._onThumbsLoaded.then(function(){var t=n.map(function(t){return e._addThumbFromSrc(t).then(function(t){if(e._getOptions().backdropHeight){var n=e._thumbs.indexOf(t),o=e._buildImg(t,e._getOptions().backdropHeight);e._$backdropCarouselImgs.splice(n,0,o),1===e._$backdropCarouselImgs.length?e._$carousel.append(o):0===n?e._$backdropCarouselImgs[1].before(o):e._$backdropCarouselImgs[n-1].after(o)}})});return c.Promise.all(t).then(function(){t.length>0&&e._renderPlugin()})})}},{key:"removeThumbnail",value:function(t){var e=this,n=t.constructor===Array?t:[t];return this._onThumbsLoaded.then(function(){var t=!0,o=!1;return n.forEach(function(n){var i=e._thumbs.some(function(t,o){return t.src===n&&(e._thumbs.splice(o,1),e._getOptions().backdropHeight&&(e._$backdropCarouselImgs[o].remove(),e._$backdropCarouselImgs.splice(o,1)),!0)});i?o=!0:t=!1}),o&&e._renderPlugin(),c.Promise.resolve(t)})}},{key:"_init",value:function(){this._thumbsLoaded&&(this._$backdropCarouselImgs=[],this._createElements(),this._loadBackdrop(),this._renderPlugin())}},{key:"_getOptions",value:function(){if(!("scrubThumbnails"in this.core.options))throw"'scrubThumbnails property missing from options object.";return this.core.options.scrubThumbnails}},{key:"_appendElToMediaControl",value:function(){this.core.mediaControl.$el.find(".media-control-background").first().after(this.el)}},{key:"_onMouseMove",value:function(t){this._calculateHoverPosition(t),this._show=!0,this._renderPlugin()}},{key:"_onMouseLeave",value:function(){this._show=!1,this._renderPlugin()}},{key:"_calculateHoverPosition",value:function(t){var e=t.pageX-this.core.mediaControl.$seekBarContainer.offset().left;this._hoverPosition=Math.min(1,Math.max(e/this.core.mediaControl.$seekBarContainer.width(),0))}},{key:"_buildThumbsFromOptions",value:function(){var t=this,e=this._getOptions().thumbs,n=e.map(function(e){return t._addThumbFromSrc(e)});return c.Promise.all(n)}},{key:"_addThumbFromSrc",value:function(t){var e=this;return new c.Promise(function(e,n){var o=new Image;o.onload=function(){e(o)},o.onerror=n,o.src=t.url}).then(function(n){var o=t.time,i=null;e._thumbs.some(function(t,e){return o<t.time&&(i=e,!0)}),null===i&&(i=e._thumbs.length);var r=i<e._thumbs.length?e._thumbs[i]:null,u=i>0?e._thumbs[i-1]:null;u&&(u.duration=o-u.time);var s=r?r.time-t.time:null,a=n.width,c=n.height,l={imageW:a,imageH:c,x:t.x||0,y:t.y||0,w:t.w||a,h:t.h||c,url:t.url,time:o,duration:s,src:t};return e._thumbs.splice(i,0,l),l})}},{key:"_buildImg",value:function(t,e){var n=e/t.h,o=(0,a.$)("<img />").addClass("thumbnail-img").attr("src",t.url),i=(0,a.$)("<div />").addClass("thumbnail-container");return i.css("width",t.w*n),i.css("height",e),o.css({height:t.imageH*n,left:-1*t.x*n,top:-1*t.y*n}),i.append(o),i}},{key:"_loadBackdrop",value:function(){if(this._getOptions().backdropHeight)for(var t=this._$carousel,e=0;e<this._thumbs.length;e++){var n=this._buildImg(this._thumbs[e],this._getOptions().backdropHeight);this._$backdropCarouselImgs.push(n),t.append(n)}}},{key:"_updateCarousel",value:function(){if(this._getOptions().backdropHeight){var t=this._hoverPosition,e=this.core.mediaControl.container.getDuration(),n=this.core.mediaControl.container.getStartTimeOffset(),o=n+e*t,i=this._$backdrop.width(),r=this._$carousel,u=r.width(),s=this._thumbs,a=u/s.length,c=this._getThumbIndexForTime(o),l=s[c],h=l.duration;null===h&&(h=Math.max(e+n-l.time,0));var f=o-l.time,d=f/h,p=a*d,m=c*a+p,b=m-t*i;r.css("left",-b);for(var _=this._getOptions().backdropMaxOpacity||.6,v=this._getOptions().backdropMinOpacity||.08,g=0;g<s.length;g++){var y=a*g,T=y-m;T<0&&(T=Math.min(0,T+a));var w=Math.max(_-Math.abs(T)/(2*a),v);this._$backdropCarouselImgs[g].css("opacity",w)}}}},{key:"_updateSpotlightThumb",value:function(){if(this._getOptions().spotlightHeight){var t=this._hoverPosition,e=this.core.mediaControl.container.getDuration(),n=this.core.mediaControl.container.getStartTimeOffset(),o=n+e*t,i=this._getThumbIndexForTime(o),r=this._thumbs[i],u=this._$spotlight;u.empty(),u.append(this._buildImg(r,this._getOptions().spotlightHeight));var s=this.$el.width(),a=u.width(),c=s*t-a/2;c=Math.max(Math.min(c,s-a),0),u.css("left",c)}}},{key:"_getThumbIndexForTime",value:function(t){for(var e=this._thumbs,n=e.length-1;n>=0;n--){var o=e[n];if(o.time<=t)return n}return 0}},{key:"_renderPlugin",value:function(){this._thumbsLoaded&&(this._show&&this._thumbs.length>0?(this.$el.removeClass("hidden"),this._updateCarousel(),this._updateSpotlightThumb()):this.$el.addClass("hidden"))}},{key:"_createElements",value:function(){this.$el.html(this.template({backdropHeight:this._getOptions().backdropHeight,spotlightHeight:this._getOptions().spotlightHeight})),this.$el.append(a.Styler.getStyleFor(d["default"])),this._$spotlight=this.$el.find(".spotlight"),this._$backdrop=this.$el.find(".backdrop"),this._$carousel=this._$backdrop.find(".carousel"),this.$el.addClass("hidden"),this._appendElToMediaControl()}}]),e}(a.UICorePlugin);e["default"]=p,t.exports=e["default"]},function(t,e,n){(function(t,o){"use strict";function i(t,e){this._id=t,this._clearFn=e}var r=n(4).nextTick,u=Function.prototype.apply,s=Array.prototype.slice,a={},c=0;e.setTimeout=function(){return new i(u.call(setTimeout,window,arguments),clearTimeout)},e.setInterval=function(){return new i(u.call(setInterval,window,arguments),clearInterval)},e.clearTimeout=e.clearInterval=function(t){t.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(window,this._id)},e.enroll=function(t,e){clearTimeout(t._idleTimeoutId),t._idleTimeout=e},e.unenroll=function(t){clearTimeout(t._idleTimeoutId),t._idleTimeout=-1},e._unrefActive=e.active=function(t){clearTimeout(t._idleTimeoutId);var e=t._idleTimeout;e>=0&&(t._idleTimeoutId=setTimeout(function(){t._onTimeout&&t._onTimeout()},e))},e.setImmediate="function"==typeof t?t:function(t){var n=c++,o=!(arguments.length<2)&&s.call(arguments,1);return a[n]=!0,r(function(){a[n]&&(o?t.apply(null,o):t.call(null),e.clearImmediate(n))}),n},e.clearImmediate="function"==typeof o?o:function(t){delete a[t]}}).call(e,n(1).setImmediate,n(1).clearImmediate)},function(t,e){"use strict";t.exports=function(){var t=[];return t.toString=function(){for(var t=[],e=0;e<this.length;e++){var n=this[e];n[2]?t.push("@media "+n[2]+"{"+n[1]+"}"):t.push(n[1])}return t.join("")},t.i=function(e,n){"string"==typeof e&&(e=[[null,e,""]]);for(var o={},i=0;i<this.length;i++){var r=this[i][0];"number"==typeof r&&(o[r]=!0)}for(i=0;i<e.length;i++){var u=e[i];"number"==typeof u[0]&&o[u[0]]||(n&&!u[2]?u[2]=n:n&&(u[2]="("+u[2]+") and ("+n+")"),t.push(u))}},t}},function(t,e,n){var o;(function(i,r){"use strict";var u="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol?"symbol":typeof t};!function(i){function s(t){return"[object Array]"===Object.prototype.toString.call(t)}function a(){for(var t=0;t<x.length;t++)x[t][0](x[t][1]);x=[],w=!1}function c(t,e){x.push([t,e]),w||(w=!0,P(a,0))}function l(t,e){function n(t){d(e,t)}function o(t){m(e,t)}try{t(n,o)}catch(i){o(i)}}function h(t){var e=t.owner,n=e.state_,o=e.data_,i=t[n],r=t.then;if("function"==typeof i){n=E;try{o=i(o)}catch(u){m(r,u)}}f(r,o)||(n===E&&d(r,o),n===O&&m(r,o))}function f(t,e){var n;try{if(t===e)throw new TypeError("A promises callback cannot return that same promise.");if(e&&("function"==typeof e||"object"===("undefined"==typeof e?"undefined":u(e)))){var o=e.then;if("function"==typeof o)return o.call(e,function(o){n||(n=!0,e!==o?d(t,o):p(t,o))},function(e){n||(n=!0,m(t,e))}),!0}}catch(i){return n||m(t,i),!0}return!1}function d(t,e){t!==e&&f(t,e)||p(t,e)}function p(t,e){t.state_===k&&(t.state_=C,t.data_=e,c(_,t))}function m(t,e){t.state_===k&&(t.state_=C,t.data_=e,c(v,t))}function b(t){var e=t.then_;t.then_=void 0;for(var n=0;n<e.length;n++)h(e[n])}function _(t){t.state_=E,b(t)}function v(t){t.state_=O,b(t)}function g(t){if("function"!=typeof t)throw new TypeError("Promise constructor takes a function argument");if(this instanceof g==!1)throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this.then_=[],l(t,this)}var y=i.Promise,T=y&&"resolve"in y&&"reject"in y&&"all"in y&&"race"in y&&function(){var t;return new y(function(e){t=e}),"function"==typeof t}();"undefined"!=typeof e&&e?(e.Promise=T?y:g,e.Polyfill=g):(o=function(){return T?y:g}.call(e,n,e,t),!(void 0!==o&&(t.exports=o)));var w,k="pending",C="sealed",E="fulfilled",O="rejected",I=function(){},P="undefined"!=typeof r?r:setTimeout,x=[];g.prototype={constructor:g,state_:k,then_:null,data_:void 0,then:function(t,e){var n={owner:this,then:new this.constructor(I),fulfilled:t,rejected:e};return this.state_===E||this.state_===O?c(h,n):this.then_.push(n),n.then},"catch":function(t){return this.then(null,t)}},g.all=function(t){var e=this;if(!s(t))throw new TypeError("You must pass an array to Promise.all().");return new e(function(e,n){function o(t){return u++,function(n){r[t]=n,--u||e(r)}}for(var i,r=[],u=0,s=0;s<t.length;s++)i=t[s],i&&"function"==typeof i.then?i.then(o(s),n):r[s]=i;u||e(r)})},g.race=function(t){var e=this;if(!s(t))throw new TypeError("You must pass an array to Promise.race().");return new e(function(e,n){for(var o,i=0;i<t.length;i++)o=t[i],o&&"function"==typeof o.then?o.then(e,n):e(o)})},g.resolve=function(t){var e=this;return t&&"object"===("undefined"==typeof t?"undefined":u(t))&&t.constructor===e?t:new e(function(e){e(t)})},g.reject=function(t){var e=this;return new e(function(e,n){n(t)})}}("undefined"!=typeof window?window:"undefined"!=typeof i?i:"undefined"!=typeof self?self:void 0)}).call(e,function(){return this}(),n(1).setImmediate)},function(t,e){"use strict";function n(){throw new Error("setTimeout has not been defined")}function o(){throw new Error("clearTimeout has not been defined")}function i(t){if(l===setTimeout)return setTimeout(t,0);if((l===n||!l)&&setTimeout)return l=setTimeout,setTimeout(t,0);try{return l(t,0)}catch(e){try{return l.call(null,t,0)}catch(e){return l.call(this,t,0)}}}function r(t){if(h===clearTimeout)return clearTimeout(t);if((h===o||!h)&&clearTimeout)return h=clearTimeout,clearTimeout(t);try{return h(t)}catch(e){try{return h.call(null,t)}catch(e){return h.call(this,t)}}}function u(){m&&d&&(m=!1,d.length?p=d.concat(p):b=-1,p.length&&s())}function s(){if(!m){var t=i(u);m=!0;for(var e=p.length;e;){for(d=p,p=[];++b<e;)d&&d[b].run();b=-1,e=p.length}d=null,m=!1,r(t)}}function a(t,e){this.fun=t,this.array=e}function c(){}var l,h,f=t.exports={};!function(){try{l="function"==typeof setTimeout?setTimeout:n}catch(t){l=n}try{h="function"==typeof clearTimeout?clearTimeout:o}catch(t){h=o}}();var d,p=[],m=!1,b=-1;f.nextTick=function(t){var e=new Array(arguments.length-1);if(arguments.length>1)for(var n=1;n<arguments.length;n++)e[n-1]=arguments[n];p.push(new a(t,e)),1!==p.length||m||i(s)},a.prototype.run=function(){this.fun.apply(null,this.array)},f.title="browser",f.browser=!0,f.env={},f.argv=[],f.version="",f.versions={},f.on=c,f.addListener=c,f.once=c,f.off=c,f.removeListener=c,f.removeAllListeners=c,f.emit=c,f.binding=function(t){throw new Error("process.binding is not supported")},f.cwd=function(){return"/"},f.chdir=function(t){throw new Error("process.chdir is not supported")},f.umask=function(){return 0}},function(t,e,n){e=t.exports=n(2)(),e.push([t.id,".scrub-thumbnails{position:absolute;bottom:55px;width:100%;-webkit-transition:opacity .3s ease;transition:opacity .3s ease}.scrub-thumbnails.hidden{opacity:0}.scrub-thumbnails .thumbnail-container{display:inline-block;position:relative;overflow:hidden;background-color:#000}.scrub-thumbnails .thumbnail-container .thumbnail-img{position:absolute;width:auto}.scrub-thumbnails .spotlight{background-color:#000;overflow:hidden;position:absolute;bottom:0;left:0;border:2px solid #fff}.scrub-thumbnails .spotlight img{width:auto}.scrub-thumbnails .backdrop{position:absolute;left:0;bottom:0;right:0;background-color:#000;overflow:hidden}.scrub-thumbnails .backdrop .carousel{position:absolute;top:0;left:0;height:100%;white-space:nowrap}.scrub-thumbnails .backdrop .carousel img{width:auto}",""])},function(t,e){t.exports='<% if (backdropHeight) { %>\r\n<div class="backdrop" style="height: <%= backdropHeight%>px;">\r\n\t<div class="carousel"></div>\r\n</div>\r\n<% }; %>\r\n<% if (spotlightHeight) { %>\r\n<div class="spotlight" style="height: <%= spotlightHeight%>px;"></div>\r\n<% }; %>\r\n'},function(e,n){e.exports=t}])});