var carotaTest=function(){var e=function(){var e={bounds:[100,100,2100,600],identity:"sim1",privacy:"PUBLIC",slide:1001,target:"presentationSpace",requestedWidth:2E3,width:2E3,height:500,x:100,y:100,type:"multiWordText",author:UserSettings.getUsername(),words:_.map(_.range(0,5E3),function(c){return{text:sprintf("primo %s secundo %s tertius %s quaternius %s quintum %s ",c,c,c,c,c),italic:0==c%2,bold:0==c%5,underline:0==c%20,color:["#00ff00",255],size:25}})};boardContent.multiWordTexts[e.identity]=
e;prerenderMultiwordText(e);boardContent.multiWordTexts[e.identity].doc.invalidateBounds()},l=0;return{paint:function(){l++},getPaintCount:function(){return l},prime:e,run:function(){e();carotaTest.sample=function(){for(var e=sprintf("Textbox sample render width %s words",5E4),c=blit,h=[],f=0;1>f;f++){var b=new Date;c();h.push(new Date-b)}c=_.sum(h);h=_.mean(h);console.log(sprintf("//Average %s millis over %s runs of %s in %s milis",h,1,e,c));console.log(sprintf("Paint called %s times",carotaTest.getPaintCount()))};
carotaTest.sample()}}}();
(function(){(function(e){var l,g,c,h,f,b={".js":[],".json":[],".css":[],".html":[]},d="function"===typeof require?require:null;h=function(a){a=Error("Could not find module '"+a+"'");a.code="MODULE_NOT_FOUND";return a};f=function(a,n,p){var d,f;if("function"===typeof a[n+p])return n+p;for(d=0;f=b[p][d];++d)if("function"===typeof a[n+f])return n+f;return null};l=function(a,n,b,d,c,k){var e,q;b=b.split(/[\\/]/);e=b.pop();if("."===e||".."===e)b.push(e),e="";for(;null!=(q=b.shift());)if(q&&"."!==q&&(".."===
q?(a=n.pop(),k=k.slice(0,k.lastIndexOf("/"))):(n.push(a),a=a[q],k+="/"+q),!a))throw h(d);e&&"function"!==typeof a[e]&&((b=f(a,e,".js"))||(b=f(a,e,".json")),b||(b=f(a,e,".css")),b||(b=f(a,e,".html")),b?e=b:2!==c&&"object"===typeof a[e]&&(n.push(a),a=a[e],k+="/"+e,e=""));if(!e)return 1!==c&&a[":mainpath:"]?l(a,n,a[":mainpath:"],d,1,k):l(a,n,"index",d,2,k);c=a[e];if(!c)throw h(d);if(c.hasOwnProperty("module"))return c.module.exports;d={};c.module=e={exports:d,id:k+"/"+e};c.call(d,d,e,g(a,n,k));return e.exports};
c=function(a,b,p,f){var c,k=p;c=p.charAt(0);var g=0;if("/"===c){k=k.slice(1);a=e["/"];if(!a){if(d)return d(p);throw h(p);}f="/";b=[]}else if("."!==c){c=k.split("/",1)[0];a=e[c];if(!a){if(d)return d(p);throw h(p);}f=c;b=[];k=k.slice(c.length+1);k||((k=a[":mainpath:"])?g=1:(k="index",g=2))}return l(a,b,k,p,g,f)};g=function(a,b,d){return function(f){return c(a,[].concat(b),f,d)}};return g(e,[],"")})({carota:{src:{"carota.js":function(e,l,g){e=g("./node");var c=g("./editor"),h=g("./doc"),f=g("./dom"),
b=g("./runs"),d=g("./html"),a=g("./frame"),n=g("./text");g=g("./rect");g={node:e,editor:c,document:h,dom:f,runs:b,html:d,frame:a,text:n,rect:g};l.exports=g;if("undefined"!==typeof window&&window.document){if(window.carota)throw Error("Something else is called carota!");window.carota=g}},"characters.js":function(e,l,g){function c(a,b,p){return Object.create(d,{_runs:{value:a},_run:{value:b},_offset:{value:p},"char":{value:b>=a.length?null:f.getTextChar(a[b].text,p)}})}function h(a,b){for(;b<a.length;b++)if(0!=
f.getTextLength(a[b].text))return c(a,b,0);return c(a,a.length,0)}var f=g("./runs"),b=function(a,b){if(a._runs!==b._runs)throw Error("Characters for different documents");},d={equals:function(a){b(this,a);return this._run===a._run&&this._offset===a._offset},cut:function(a){b(this,a);var d=this;return function(b){for(var c=d._run;c<=a._run;c++){var e=d._runs[c];if(e){var k=c===d._run?d._offset:0,h=c===a._run?a._offset:f.getTextLength(e.text);k<h&&f.getSubText(function(a){var d=Object.create(e);d.text=
a;b(d)},e.text,k,h-k)}}}}};l.exports=function(a){return function(b){for(var d=h(a,0);!b(d)&&null!==d["char"];)d=d._offset+1<f.getTextLength(a[d._run].text)?c(a,d._run,d._offset+1):h(a,d._run+1)}}},"codes.js":function(e,l,g){var c=g("./text"),h=g("./frame"),f=g("./node"),b=g("./rect"),d=g("./util"),a=f.derive({parent:function(){return this._parent},draw:function(a){this.inline.draw(a,this.left,this.baseline,this.measured.width,this.measured.ascent,this.measured.descent,this.formatting)},position:function(a,
b,d){this.left=a;this.baseline=b;d&&(this._bounds=d)},bounds:function(){return this._bounds||b(this.left,this.baseline-this.measured.ascent,this.measured.width,this.measured.ascent+this.measured.descent)},byCoordinate:function(a,b){return a<=this.bounds().center().x?this:this.next()}}),n={number:function(a,b){var d=b+1+".";return{measure:function(a){return c.measure(d,a)},draw:function(a,b,f,n,r,m,x){c.draw(a,d,x,b,f,n,r,m)}}}};n.listNext=n.listEnd=function(a){return d.derive(a,{eof:!0,measure:function(a){return{width:18,
ascent:0,descent:0}},draw:function(a,b,d){}})};n.listStart=function(c,n,e){return d.derive(c,{block:function(d,n,z,g,r,m){var x=f.generic("list",r,d,n),v,y,l,A=function(m,b){v=f.generic("item",x);var c=e(m.marker||{$:"number"},x.children().length);if(!c.draw||!c.measure)throw Error();l=Object.create(a,{inline:{value:c},_parent:{value:v},ordinal:{value:g},length:{value:1},formatting:{value:b},measured:{value:c.measure(b)}});l.block=!0;y=h(d+50,n,z-50,g+1,v,function(a){return"listEnd"===a.$},l.measured.ascent)};
A(c,m);return function(a){y?y(function(a){g=a.ordinal+a.length;var m=a.bounds(),c=a.first(),r=d+50-10-l.measured.width,f=b(d,n,50,m.h);"baseline"in c?l.position(r,c.baseline,f):l.position(r,n+l.measured.ascent,f);n=m.t+m.h;v.children().push(l);v.children().push(a);v.finalize();x.children().push(v);v=y=l=null},a):g++;if(!y){var m=a.code();if(m){if("listEnd"==m.$)return x.finalize(),x;"listNext"==m.$&&A(m,a.codeFormatting())}}}}})};l.exports=e=function(a,b,d){var c=n[a.$];return c&&c(a,b,d)};e.editFilter=
function(a){var b=0;if(!a.words.some(function(c,n){var f=c.code();if(f)switch(f.$){case "listStart":b++;break;case "listNext":if(0===b)return a.spliceWordsWithRuns(n,1,[d.derive(c.codeFormatting(),{text:{$:"listStart",marker:f.marker}})]),!0;break;case "listEnd":0===b&&a.spliceWordsWithRuns(n,1,[]),b--}})&&0<b){for(var c=[];0<b;)b--,c.push({text:{$:"listEnd"}});a.spliceWordsWithRuns(a.words.length-1,0,c)}}},"doc.js":function(e,l,g){var c=g("per"),h=g("./characters"),f=g("./split"),b=g("./word");e=
g("./node");var d=g("./runs"),a=g("./range"),n=g("./util"),p=g("./frame"),z=g("./codes"),t=g("./rect"),k=function(a,m,b,d){var c=a.selection.start,f=a.selection.end;return function(n){a._wordOrdinals=[];var e=Array.prototype.splice.apply(a.words,[m,b].concat(d));n(k(a,m,d.length,e));a._nextSelection={start:c,end:f}}},w=function(a){var m=[],b=function(a){m.push(a);b.length=m.length};a(b);return function(a){a(w(function(a){for(;m.length;)m.pop()(a)}))}},q=function(a){if(a.isNewLine())return!0;a=a.code();
return!(!a||!a.block&&!a.eof)},u=e.derive({invalidateBounds:function(){var a=this.frame.bounds(),m=this.position;this.bounds=[m.x+a.l,m.y+a.t,m.x+this.frame.actualWidth(),m.y+a.h];this.stanza.bounds=this.bounds;Progress.call("textBoundsChanged",[this.identity,this.bounds])},load:function(a){var m=this;this.undo=[];this.redo=[];this._wordOrdinals=[];this.words=c(h(a)).per(f(m.codes)).map(function(a){return b(a,m.codes)}).all();this.words.push(b());this.layout()},layout:function(){this.frame=null;try{this.frame=
c(this.words).per(p(0,0,this._width,0,this)).first(),this.invalidateBounds()}catch(a){console.error("layout exception",a)}if(!this.frame)console.error("A bug somewhere has produced an invalid state - rolling back"),this.performUndo();else if(this._nextSelection){var b=this._nextSelection;delete this._nextSelection;this.select(b.start,b.end,!0)}},range:function(b,m){return a(this,b,m)},documentRange:function(){return this.range(0,this.frame.length-1)},selectedRange:function(){return this.range(this.selection.start,
this.selection.end)},save:function(){return this.documentRange().save()},paragraphRange:function(a,m){var b;b=this.wordContainingOrdinal(a);a=0;if(b&&!q(b.word))for(b=b.index;0<b;b--)if(q(this.words[b-1])){a=this.wordOrdinal(b);break}b=this.wordContainingOrdinal(m);m=this.frame.length-1;if(b&&!q(b.word))for(b=b.index;b<this.words.length;b++)if(q(this.words[b])){m=this.wordOrdinal(b);break}return this.range(a,m)},insert:function(a,b){var d=this.selectedRange().setText(a);this.select(this.selection.end+
d,null,b)},modifyInsertFormatting:function(a,b){carota.runs.nextInsertFormatting=carota.runs.nextInsertFormatting||{};carota.runs.nextInsertFormatting[a]=b},applyInsertFormatting:function(a){var b=carota.runs.nextInsertFormatting,d=Object.keys(b);d.length&&a.forEach(function(a){d.forEach(function(d){a[d]=b[d]})})},wordOrdinal:function(a){if(a<this.words.length){var b=this._wordOrdinals.length;if(b<a+1)for(var d=0<b?this._wordOrdinals[b-1]:0;b<=a;b++)this._wordOrdinals[b]=d,d+=this.words[b].length;
return this._wordOrdinals[a]}},wordContainingOrdinal:function(a){var b,d=0;this.words.some(function(c,f){if(a>=d&&a<d+c.length)return b={word:c,ordinal:d,index:f,offset:a-d},!0;d+=c.length});return b},runs:function(a,b){var d=this.wordContainingOrdinal(Math.max(0,b.start)),c=this.wordContainingOrdinal(Math.min(b.end,this.frame.length-1))||d;if(!d||!c)throw new Exception("range miss");if(d.index===c.index)d.word.runs(a,{start:d.offset,end:c.offset});else{d.word.runs(a,{start:d.offset});for(d=d.index+
1;d<c.index;d++)this.words[d].runs(a);c.word.runs(a,{end:c.offset})}},spliceWordsWithRuns:function(a,d,n){var e=this,p=c(h(n)).per(f(e.codes)).truthy().map(function(a){return b(a,e.codes)}).all(),g=!1;if("_filtersRunning"in e)e._filtersRunning++;else{for(n=0;n<d;n++)this.words[a+n].code()&&(g=!0);g||(g=p.some(function(a){return!!a.code()}))}this.transaction(function(b){k(e,a,d,p)(b);if(g){e._filtersRunning=0;try{for(;;){var c=e._filtersRunning;if(!e.editFilters.some(function(a){a(e);return c!==e._filtersRunning}))break}}finally{delete e._filtersRunning}}})},
splice:function(a,b,n){if("string"===typeof n){var f=Math.max(0,a-1),f=c({start:f,end:f+1}).per(this.runs,this).first();n=[f?Object.create(f,{text:{value:n}}):{text:n}]}else Array.isArray(n)||(n=[{text:n}]);this.applyInsertFormatting(n);var f=this.wordContainingOrdinal(a),e=this.wordContainingOrdinal(b);e||(e=f);a===f.ordinal?0<f.index&&!q(this.words[f.index-1])?(f.index--,a=this.words[f.index],a=c({}).per(a.runs,a).all()):a=[]:a=c({end:f.offset}).per(f.word.runs,f.word).all();b===e.ordinal?b===this.frame.length-
1||q(e.word)?(b=[],e.index--):b=c({}).per(e.word.runs,e.word).all():b=c({start:e.offset}).per(e.word.runs,e.word).all();var k=this.frame.length;this.spliceWordsWithRuns(f.index,e.index-f.index+1,c(a).concat(n).concat(b).per(d.consolidate()).all());return this.frame?this.frame.length-k:0},registerEditFilter:function(a){this.editFilters.push(a)},width:function(a){if(0===arguments.length)return this._width;this._width=a;this.layout();return a},children:function(){return[this.frame]},toggleCaret:function(){var a=
this.caretVisible;if(this.selection.start===this.selection.end){if(this.selectionJustChanged)return this.selectionJustChanged=!1,this.caretVisible=!0;this.caretVisible=!this.caretVisible}return this.caretVisible!==a},getCaretCoords:function(a){var b=this.byOrdinal(a);if(b)return b.block&&0<a?(b=this.byOrdinal(a-1),b.newLine?(a=b.bounds,b=b.parent().parent().bounds,a=t(b.l,b.b,1,a.h)):(a=b.bounds,a=t(a.r,a.t,1,a.h))):(a=b.bounds(),a=a.h?t(a.l,a.t,1,a.h):t(a.l,a.t,a.w,1)),a},byCoordinate:function(a,
b){for(var d=this.frame.byCoordinate(a,b).ordinal,c=this.getCaretCoords(d);c.b<=b&&d<this.frame.length-1;)d++,c=this.getCaretCoords(d);for(;c.t>=b&&0<d;)d--,c=this.getCaretCoords(d);return this.byOrdinal(d)},drawSelection:function(a,b){this.selection.end!==this.selection.start&&(a.save(),a.fillStyle=b?"rgba(0, 100, 200, 0.3)":"rgba(160, 160, 160, 0.3)",this.selectedRange().parts(function(b){b.bounds(!0).fill(a)}),a.restore())},notifySelectionChanged:function(a){var b=this;this.selectionChanged.fire(function(){return b.selectedRange().getFormatting()},
a)},select:function(a,b,d){this.frame?(this.selection.start=Math.max(0,a),this.selection.end=Math.min("number"===typeof b?b:this.selection.start,this.frame.length-1),carota.runs.nextInsertFormatting={},this.selectionJustChanged=!0):console.log("Something has gone terribly wrong - doc.transaction will rollback soon")},performUndo:function(a){var b=a?this.undo:this.redo;if(a=(a?this.redo:this.undo).pop())a(function(a){b.push(a)}),this.layout(),this.updateCanvas(),this.contentChanged.fire()},canUndo:function(a){return a?
!!this.redo.length:!!this.undo.length},transaction:function(a){if(this._currentTransaction)a(this._currentTransaction);else{for(var b=this;50<this.undo.length;)b.undo.shift();this.redo.length=0;var d=!1;this.undo.push(w(function(c){b._currentTransaction=c;try{a(c)}catch(f){console.log("Transaction e",f)}finally{d=0<c.length,b._currentTransaction=null}}));d&&(b.layout(),b.updateCanvas(),b.contentChanged.fire())}},type:"document"});l.exports=function(a){var b=Object.create(u);b.stanza=a;b.position=
{x:a.x,y:a.y};b.privacy=a.privacy;b.identity=a.identity;b.slide=Conversations.getCurrentSlideJid();b._width=0;b.selection={start:0,end:0};b.caretVisible=!0;b.customCodes=function(a,b,d){};b.codes=function(a,d){return z(a,d,b.codes)||b.customCodes(a,d,b.codes)};b.selectionChanged=n.event();b.contentChanged=n.event();b.editFilters=[z.editFilter];b.load([]);return b}},"dom.js":function(e,l,g){e.clear=function(c){for(;c.firstChild;)c.removeChild(c.firstChild)};e.setText=function(c,h){e.clear(c);c.appendChild(document.createTextNode(h))};
e.handleEvent=function(c,e,f){c.addEventListener(e,function(b){!1===f(b)&&b.preventDefault()})}},"editor.js":function(e,l,g){g("per");var c=g("./doc"),h=g("./dom"),f=g("./rect"),b=null;Date.now();var d=e.paint=function(a,d,c){a=a.getContext("2d");var e=d.bounds,e=f(0,0,e[2]-e[0],e[3]-e[1]);"PRIVATE"==d.privacy&&(a.fillStyle="red",a.globalAlpha=.1,a.fillRect(0,0,d.frame.actualWidth(),d.frame.height),a.globalAlpha=1);d.draw(a,e);d.isActive&&Modes.currentMode==Modes.text&&d.drawSelection(a,b||c)},a=
function(a){var b=a.selectionJustChanged||a.caretVisible,d=boardContext,c=a.getCaretCoords(a.selection.start);if(c){d.save();a=worldToScreen(a.position.x,a.position.y);var f=scale();d.translate(a.x,a.y);d.scale(f,f);d.globalAlpha=1;d.fillStyle=b?"black":"white";c.fill(d);d.restore()}};e.create=function(f,e,g){f.innerHTML='<div class="carotaTextArea" style="overflow: hidden; position: absolute; height: 0;"><textarea autocorrect="off" autocapitalize="off" spellcheck="false" tabindex="0" style="position: absolute; padding: 0px; width: 1000px; height: 1em; top: -10000px; left:-10000px; outline: none; font-size: 4px;"></textarea></div>';
f.querySelector(".carotaTextArea");var t=f.querySelector("textarea"),k=c(g),l=0,q=null,u=null,r=null,m="",x=null,v=null;k.claimFocus=function(){$(t).focus()};determineCanvasConstants();k.updateCanvas=function(){delete k.stanza.mipMap;k.canvas||(k.canvas=$("<canvas/>")[0]);var a=k.canvas,b=determineScaling(k.bounds[2]-k.bounds[0],k.bounds[3]-k.bounds[1]),c=a.getContext("2d");a.width=b.width;a.height=b.height;c.setTransform(b.scaleX,0,0,b.scaleY,0,0);d(a,k,document.focussedElement==t)};var y={66:"bold",
73:"italic",85:"underline",83:"strikeout"},C=function(a,b){var d=k.getCaretCoords(a),c;for(u=null!==q?q:d.l;!(0>b?0>=a:a>=k.frame.length-1)&&!(a+=b,c=k.getCaretCoords(a),c.b<=d.t||d.b<=c.t););for(d=c;!((0>b?0>=a:a>=k.frame.length-1)||0<b&&c.l>=u||0>b&&c.l<=u);)if(a+=b,c=k.getCaretCoords(a),c.b<=d.t||d.b<=c.t){a-=b;break}return a},A=function(a,b){for(var d=k.getCaretCoords(a),c;!(0>b?0>=a:a>=k.frame.length-1);)if(a+=b,c=k.getCaretCoords(a),c.b<=d.t||d.b<=c.t){a-=b;break}return a},D=function(a,b,d){var c=
k.selection.start,f=k.selection.end,e=k.frame.length-1,n=!1;u=null;if(!b)l=0;else if(!l)switch(a){case 37:case 38:case 36:case 33:l=-1;break;case 39:case 40:case 35:case 34:l=1}var m=1===l?f:c,p=!1;switch(a){case 37:b||c==f?0<m&&(d?(p=k.wordContainingOrdinal(m),m=p.ordinal===m?0<p.index?k.wordOrdinal(p.index-1):0:p.ordinal):m--):m=c;p=!0;break;case 39:b||c==f?m<e&&(d?(p=k.wordContainingOrdinal(m),m=p.ordinal+p.word.length):m++):m=f;p=!0;break;case 40:m=C(m,1);p=!0;break;case 38:m=C(m,-1);p=!0;break;
case 36:m=A(m,-1);p=!0;break;case 35:m=A(m,1);p=!0;break;case 33:m=0;p=!0;break;case 34:m=e;p=!0;break;case 8:c===f&&0<c&&(k.range(c-1,c).clear(),r=c-1,k.select(r,r,!0),k.notifySelectionChanged(!0),n=!0);break;case 46:c===f&&c<e&&(k.range(c,c+1).clear(),n=!0);break;case 90:d&&(n=!0,k.performUndo());break;case 89:d&&(n=!0,k.performUndo(!0));break;case 65:d&&(n=!0,k.select(0,e,!0));break;case 67:case 88:d&&(x=k.selectedRange().save(),v=k.selectedRange().plainText())}a=y[a];d&&a&&(d=k.selectedRange(),
d.setFormatting(a,!0!==d.getFormatting()[a]),n=!0);if(p){switch(l){case 0:c=f=m;break;case -1:c=m;break;case 1:f=m}c===f?l=0:c>f&&(l=-l,d=f,f=c,c=d);r=m;k.select(c,f,!0);k.notifySelectionChanged(!0);n=!0}q=u;return n};h.handleEvent(t,"keydown",function(a){if(D(a.keyCode,a.shiftKey,a.ctrlKey))return!1});h.handleEvent(t,"input",function(){var a=t.value;m!=a&&(m="",t.value="",a===v&&(a=x),k.insert(a,!0))});var E=function(){r=null===r?k.selection.end:r;m=k.selectedRange().plainText();t.value=m;t.select();
t.focus()};k.dblclickHandler=function(a){q=null;k.isActive=!0;(a=a.parent())&&k.select(a.ordinal,a.ordinal+(a.word?a.word.text.length:a.length));b=null;E();k.updateCanvas();blit()};k.mousedownHandler=function(a){b=a.ordinal;k.select(a.ordinal,a.ordinal,!1);q=null};k.mousemoveHandler=function(a){null!==b&&a&&(r=a.ordinal,b>a.ordinal?k.select(a.ordinal,b,!1):k.select(b,a.ordinal,!1))};k.mouseupHandler=function(d){try{q=null,k.isActive=!0,E(),b=null,k.selectionJustChanged=!0,B=0,k.updateCanvas(),k.update(),
k.notifySelectionChanged(),a(k),blit()}catch(c){console.log("mouseUp e",c)}};var B=(new Date).getTime();k.update=function(){if(Conversations.getCurrentSlideJid()==k.slide&&k.isActive){var b=(new Date).getTime();b>B&&(B=b+500,k.toggleCaret()&&a(k));setTimeout(k.update,500)}};k.sendKey=D;return k}},"frame.js":function(e,l,g){e=g("./node");var c=g("./wrap"),h=g("./rect"),f=e.derive({bounds:function(){var b=this._bounds;if(!b||!_.every(["l","t","w","h"],function(a){return a in b})){var d=0,a=0,c=0,f=
0;this.lines&&this.lines.length&&(a=this.lines[0].bounds(),d=a.l,a=a.t,this.lines.forEach(function(a,b){var d=a.bounds();c=Math.max(c,d.l+d.w);f=Math.max(f,d.t+d.h)}));this._bounds=h(d,a,Math.max(c-d,scaleWorldToScreen(Modes.text.minimumWidth)),Math.max(this.height?this.height:f-a,scaleWorldToScreen(Modes.text.minimumHeight())))}return this._bounds},actualWidth:function(){if(!this._actualWidth){var b=0;this.lines&&this.lines.forEach(function(d){"number"===typeof d.actualWidth&&(b=Math.max(b,d.actualWidth))});
this._actualWidth=Math.max(scaleWorldToScreen(Modes.text.minimumWidth),b)}return this._actualWidth},children:function(){return this.lines},parent:function(){return this._parent},draw:function(b,d){this.lines&&this.lines.some(function(a){a.draw(b,d)})},type:"frame"});l.exports=function(b,d,a,e,p,h,g,k){var l=[],q=Object.create(f,{lines:{value:l},_parent:{value:p},ordinal:{value:e}}),u=c(b,d,a,e,q,h,g,k),r=0,m=0;return function(a,b){if(u(function(a){"number"===typeof a?m=a:(r=a.ordinal+a.length-e,l.push(a))},
b))return Object.defineProperty(q,"length",{value:r}),Object.defineProperty(q,"height",{value:m}),a(q),!0}}},"html.js":function(e,l,g){var c=g("./runs"),h=g("per");l=function(a,b){return function(d,c){d.nodeName===a&&(c[b]=!0)}};var f=function(a,b,d,c){return function(f,e){var n=f[a]&&f[a][b];n&&(c&&(n=c(n)),e[d]=n)}};g=function(a,b,d){return f("attributes",a,b,d)};var b=function(a,b,d){return f("style",a,b,d)},d=function(a,b,d){return function(c,f){c.style&&c.style[a]===b&&(f[d]=!0)}},a=[6,7,9,10,
12,16,20,30],n={left:!0,center:!0,right:!0,justify:!0},p=function(a){return n[a]?a:"left"},z=function(a){var b=a.split(/\s*,\s*/g);if(0==b.length)return a;a=b[0];return(b=a.match(/^"(.*)"$/))?b[1].trim():(b=a.match(/^'(.*)'$/))?b[1].trim():a},t={H1:30,H2:20,H3:16,H4:14,H5:12},k=[l("B","bold"),l("STRONG","bold"),l("I","italic"),l("EM","italic"),l("U","underline"),l("S","strikeout"),l("STRIKE","strikeout"),l("DEL","strikeout"),d("fontWeight","bold","bold"),d("fontStyle","italic","italic"),d("textDecoration",
"underline","underline"),d("textDecoration","line-through","strikeout"),b("color","color"),b("fontFamily","font",z),b("fontSize","size",function(a){return(a=a.match(/^([\d\.]+)pt$/))?parseFloat(a[1]):10}),b("textAlign","align",p),function(a,b){"SUB"===a.nodeName&&(b.script="sub")},function(a,b){"SUPER"===a.nodeName&&(b.script="super")},function(a,b){"CODE"===a.nodeName&&(b.font="monospace")},function(a,b){var d=t[a.nodeName];d&&(b.size=d)},g("color","color"),g("face","font",z),g("align","align",p),
g("size","size",function(b){return a[b]||10})],w={};"BR P H1 H2 H3 H4 H5".split(" ").forEach(function(a){w[a]=!0});e.parse=function(a,b){function d(a,c){if(3==a.nodeType)g(a.nodeValue,c);else if(void 0!=a){c=Object.create(c);var f=a.attributes["class"];f&&f.value.split(" ").forEach(function(a){(a=b[a])&&Object.keys(a).forEach(function(b){c[b]=a[b]})});k.forEach(function(b){b(a,c)});if(a.childNodes)for(f=0;f<a.childNodes.length;f++)d(a.childNodes[f],c);w[a.nodeName]&&(p.submit(Object.create(c,{text:{value:"\n"}})),
n=!0)}}var f=a;"string"===typeof f&&(f=document.createElement("div"),f.innerHTML=a);var e=[],n=!0,p=h(c.consolidate()).into(e),g=function(a,b){a=a.replace(/\n+\s*/g," ");var d=a.length;a=a.replace(/^\s+/,"");n?n=!1:d!==a.length&&(a=" "+a);d=a.length;a=a.replace(/\s+$/,"");d!==a.length&&(n=!0,a+=" ");p.submit(Object.create(b,{text:{value:a}}))};d(f,{});return e}},"line.js":function(e,l,g){var c=g("./positionedword"),h=g("./rect");e=g("./node");g("./runs");var f=e.derive({bounds:function(b){if(b){b=
this.first().bounds();var d=this.last().bounds();return h(b.l,this.baseline-this.ascent,d.l+d.w-b.l,this.ascent+this.descent)}return h(this.left,this.baseline-this.ascent,this.width,this.ascent+this.descent)},parent:function(){return this.doc},children:function(){return this.positionedWords},type:"line"});l.exports=function(b,d,a,e,p,g,h,k){var l=h[0].align(),q=Object.create(f,{doc:{value:b},left:{value:d},width:{value:a},baseline:{value:e},ascent:{value:p},descent:{value:g},ordinal:{value:k},align:{value:l}}),
u=0;h.forEach(function(a){u+=a.width});var u=u-h[h.length-1].space.width,r=0,m=0;if(u<a)switch(l){case "right":r=a-u;break;case "center":r=(a-u)/2;break;case "justify":1<h.length&&!h[h.length-1].isNewLine()&&(m=(a-u)/(h.length-1))}Object.defineProperty(q,"positionedWords",{value:h.map(function(a){var b=r;r+=a.width+m;var d=k;k+=a.text.length+a.space.length;return c(a,q,b,d,a.width+m)})});Object.defineProperty(q,"actualWidth",{value:u});Object.defineProperty(q,"length",{value:k-q.ordinal});return q}},
"node.js":function(e,l,g){g("per");g("./runs");var c=g("./rect"),h=g("./util");e.prototype={children:function(){return[]},parent:function(){return null},first:function(){return this.children()[0]},last:function(){return this.children()[this.children().length-1]},next:function(){for(var b=this;;){var d=b.parent();if(!d)return null;var a=d.children();if(b=a[a.indexOf(b)+1]){for(;;){d=b.first();if(!d)break;b=d}return b}b=d}},previous:function(){var b=this.parent();if(!b)return null;var d=b.children();
return(d=d[d.indexOf(this)-1])?d:(b=b.previous())?b.last():null},byOrdinal:function(b){var d=null;return this.children().some(function(a){if(b>=a.ordinal&&b<a.ordinal+a.length&&(d=a.byOrdinal(b)))return!0})?d:this},byCoordinate:function(b,d){var a;this.children().some(function(c){if(c.bounds().contains(b,d)&&(a=c.byCoordinate(b,d)))return!0});if(!a){for(a=this.last();a;){var c=a.last();if(!c)break;a=c}(c=a.next())&&c.block&&(a=c)}return a},draw:function(b,d){this.children().forEach(function(a){a.draw(b,
d)})},parentOfType:function(b){var d=this.parent();return d&&(d.type===b?d:d.parentOfType(b))},bounds:function(){var b=this._left,d=this._top,a=0,f=0,e=function(a,b){return isNaN(a)?b:Math.min(a,b)},h=function(a,b){return isNaN(a)?b:Math.max(a,b)};this.children().forEach(function(c){c=c.bounds();b=e(b,c.l);d=e(d,c.t);a=h(a,c.l+c.w);f=h(f,c.t+c.h)});return c(b,d,a-b,f-d)}};e.derive=function(b){return h.derive(e.prototype,b)};var f=e.derive({children:function(){return this._children},parent:function(){return this._parent},
finalize:function(b,d){var a=Number.MAX_VALUE,c=0;this._children.forEach(function(b){a=Math.min(a,b.ordinal);c=Math.max(c,b.ordinal+b.length)});Object.defineProperty(this,"ordinal",{value:a-(b||0)});Object.defineProperty(this,"length",{value:(d||0)+c-a})}});e.generic=function(b,d,a,c){return Object.create(f,{type:{value:b},_children:{value:[]},_parent:{value:d},_left:{value:"number"===typeof a?a:Number.MAX_VALUE},_top:{value:"number"===typeof c?c:Number.MAX_VALUE}})}},"part.js":function(e,l,g){var c=
g("./text"),h={measure:function(b){var d=d.measure("?",b);return{width:d.width+4,ascent:d.width+2,descent:d.width+2}},draw:function(b,d,a,c,f,e){b.fillStyle="silver";b.fillRect(d,a-f,c,f+e);b.strokeRect(d,a-f,c,f+e);b.fillStyle="black";b.fillText("?",d+2,a)}},f={draw:function(b,d,a){"string"===typeof this.run.text?c.draw(b,this.run.text,this.run,d,a,this.width,this.ascent,this.descent):this.code&&this.code.draw&&(b.save(),this.code.draw(b,d,a,this.width,this.ascent,this.descent,this.run),b.restore())}};
l.exports=function(b,d){var a,e,p;"string"===typeof b.text?(e=1===b.text.length&&"\n"===b.text[0],a=c.measure(e?c.nbsp:b.text,b)):(p=d(b.text)||h,a=p.measure?p.measure(b):{width:0,ascent:0,descent:0});a=Object.create(f,{run:{value:b},isNewLine:{value:e},width:{value:e?0:a.width},ascent:{value:a.ascent},descent:{value:a.descent}});p&&Object.defineProperty(a,"code",{value:p});return a}},"positionedword.js":function(e,l,g){var c=g("./rect"),h=g("./part"),f=g("./text");e=g("./node");g("./word");var b=
g("./runs"),d=e.derive({bounds:function(){var a=this.word.bounds(),b=this.word.word.isNewLine()?f.measure(f.enter,this.word.word.run).width:this.width||this.part.width;return c(a.l+this.left,a.t,b,a.h)},parent:function(){return this.word},byOrdinal:function(){return this},byCoordinate:function(a,b){return a<=this.bounds().center().x?this:this.next()},type:"character"}),a=e.derive({draw:function(a){this.word.draw(a,this.line.left+this.left,this.line.baseline)},bounds:function(){return c(this.line.left+
this.left,this.line.baseline-this.line.ascent,this.word.isNewLine()?f.measure(f.enter,this.word.run).width:this.width,this.line.ascent+this.line.descent)},parts:function(a){this.word.text.parts.some(a)||this.word.space.parts.some(a)},realiseCharacters:function(){if(!this._characters){var a=[],c=0,f=this,e=this.ordinal,k=this.parentOfType("document").codes;this.parts(function(g){b.pieceCharacters(function(b){var l=Object.create(g.run);l.text=b;b=h(l,k);a.push(Object.create(d,{left:{value:c},part:{value:b},
word:{value:f},ordinal:{value:e},length:{value:1}}));c+=b.width;e++},g.run.text)});var g=a[a.length-1];g&&(Object.defineProperty(g,"width",{value:this.width-g.left}),(this.word.isNewLine()||this.word.code()&&this.word.code().eof)&&Object.defineProperty(g,"newLine",{value:!0}));this._characters=a}},children:function(){this.realiseCharacters();return this._characters},parent:function(){return this.line},type:"word"});l.exports=function(b,d,c,f,e){return Object.create(a,{word:{value:b},line:{value:d},
left:{value:c},width:{value:e},ordinal:{value:f},length:{value:b.text.length+b.space.length}})}},"range.js":function(e,l,g){function c(b,d,a){this.doc=b;this.start=d;this.end=a;d>a&&(this.start=a,this.end=d)}var h=g("per"),f=g("./runs");c.prototype.parts=function(b,d){d=d||this.doc.children();var a=this;d.some(function(d){if(d.ordinal+d.length<=a.start)return!1;if(d.ordinal>=a.end)return!0;d.ordinal>=a.start&&d.ordinal+d.length<=a.end?b(d):a.parts(b,d.children())})};c.prototype.clear=function(){return this.setText([])};
c.prototype.setText=function(b){return this.doc.splice(this.start,this.end,b)};c.prototype.runs=function(b){this.doc.runs(b,this)};c.prototype.plainText=function(){return h(this.runs,this).map(f.getPlainText).all().join("")};c.prototype.save=function(){return h(this.runs,this).per(f.consolidate()).all()};c.prototype.getFormatting=function(){if(this.start===this.end){var b=this.start;0<b&&b--;this.start=b;this.end=b+1}return h(this.runs,this).reduce(f.merge).last()||f.defaultFormatting};c.prototype.setFormatting=
function(b,d){var a=this;"align"===b&&(a=a.doc.paragraphRange(a.start,a.end));"color"===b&&"string"==typeof d&&(d=[d,255]);if(a.start===a.end)a.doc.modifyInsertFormatting(b,d);else{var c=a.save(),e={};e[b]=d;f.format(c,e);a.setText(c)}};l.exports=function(b,d,a){return new c(b,d,a)}},"rect.js":function(e,l,g){var c={contains:function(c,b){return c>=this.l&&c<this.l+this.w&&b>=this.t&&b<this.t+this.h},stroke:function(c){c.strokeRect(this.l,this.t,this.w,this.h)},fill:function(c){c.fillRect(this.l,
this.t,this.w,this.h)},offset:function(c,b){return h(this.l+c,this.t+b,this.w,this.h)},equals:function(c){return this.l===c.l&&this.t===c.t&&this.w===c.w&&this.h===c.h},center:function(){return{x:this.l+this.w/2,y:this.t+this.h/2}}},h=l.exports=function(f,b,d,a){return Object.create(c,{l:{value:f},t:{value:b},w:{value:d},h:{value:a},r:{value:f+d},b:{value:b+a}})}},"runs.js":function(e,l,g){e.formattingKeys="bold italic underline strikeout color font size align script".split(" ");e.defaultFormatting=
{size:14,newBoxSize:14,font:"sans-serif",color:["#000000",255],bold:!1,italic:!1,underline:!1,strikeout:!1,align:"left",script:"normal"};e.resolveKey=function(c,h){return h in c?c[h]:e.defaultFormatting[h]};e.sameFormatting=function(c,h){return e.formattingKeys.every(function(f){return _.isEqual(e.resolveKey(c,f),e.resolveKey(h,f))})};e.clone=function(c){var h={text:c.text};e.formattingKeys.forEach(function(f){var b=c[f];b&&b!=e.defaultFormatting[f]&&(h[f]=b)});return h};e.multipleValues={};e.merge=
function(c,h){if(1===arguments.length)return Array.isArray(c)?c.reduce(e.merge):c;if(2<arguments.length)return e.merge(Array.prototype.slice.call(arguments,0));var f={};e.formattingKeys.forEach(function(b){if(b in c||b in h)f[b]=c[b]===h[b]?c[b]:e.multipleValues});return f};e.format=function(c,h){Array.isArray(c)?c.forEach(function(c){e.format(c,h)}):Object.keys(h).forEach(function(f){h[f]!==e.multipleValues&&(c[f]=h[f])})};e.consolidate=function(){var c;return function(h,f){c&&e.sameFormatting(c,
f)&&"string"==typeof c.text&&"string"==typeof f.text?c.text+=f.text:(c=e.clone(f),h(c))}};e.getPlainText=function(c){if("string"===typeof c.text)return c.text;if(Array.isArray(c.text)){var h=[];c.text.forEach(function(c){h.push(e.getPiecePlainText(c))});return h.join("")}return"_"};e.getPieceLength=function(c){return c.length||1};e.getPiecePlainText=function(c){return c.length?c:"_"};e.getTextLength=function(c){if("string"===typeof c)return c.length;if(Array.isArray(c)){var h=0;c.forEach(function(c){h+=
e.getPieceLength(c)});return h}return 1};e.getSubText=function(c,h,f,b){if(0!==b)if("string"===typeof h)c(h.substr(f,b));else if(Array.isArray(h)){var d=0;h.some(function(a){if(0>=b)return!0;var h=e.getPieceLength(a);d+h>f&&(1===h?(c(a),--b):(a=a.substr(Math.max(0,f-d),b),c(a),b-=a.length));d+=h})}else c(h)};e.getTextChar=function(c,h){var f;e.getSubText(function(b){f=b},c,h,1);return f};e.pieceCharacters=function(c,e){if("string"===typeof e)for(var f=0;f<e.length;f++)c(e[f]);else c(e)}},"split.js":function(e,
l,g){l.exports=function(c){var e=null,f=null,b=!0;return function(d,a){var g;if(null===a["char"])g=!0;else if(b&&(g=!0,b=!1),"string"===typeof a["char"])switch(a["char"]){case " ":f||(f=a);break;case "\n":b=g=!0;break;default:f&&(g=!0)}else{var p=c(a["char"]);if(p.block||p.eof)b=g=!0}if(g){if(e&&!e.equals(a)){if(!1===d({text:e,spaces:f||a,end:a}))return!1;f=null}null===a["char"]&&d(null);e=a}}}},"text.js":function(e,l,g){var c=g("./runs"),h=e.getFontString=function(b){var a=b&&b.size||c.defaultFormatting.size;
if(b)switch(b.script){case "super":case "sub":a*=.8}return(b&&b.italic?"italic ":"")+(b&&b.bold?"bold ":"")+" "+a+"pt "+(b&&b.font||c.defaultFormatting.font)};e.applyRunStyle=function(b,a){b.fillStyle=a&&a.color&&a.color[0]||c.defaultFormatting.color[0];b.font=h(a)};e.prepareContext=function(b){b.textAlign="left";b.textBaseline="alphabetic"};e.getRunStyle=function(b){var a=["font: ",h(b),"; color: ",b&&b.color&&b.color[0]||c.defaultFormatting.color[0]];if(b)switch(b.script){case "super":a.push("; vertical-align: super");
break;case "sub":a.push("; vertical-align: sub")}return a.join("")};var f=e.nbsp=String.fromCharCode(160);e.enter=f;var b=e.measureText=function(b,a){var c,e,g;c=document.createElement("span");e=document.createElement("div");g=document.createElement("div");e.style.display="inline-block";e.style.width="1px";e.style.height="0";g.style.visibility="hidden";g.style.position="absolute";g.style.top="0";g.style.left="-10000px";g.style.width="10000px";g.style.height="200px";g.appendChild(c);g.appendChild(e);
document.body.appendChild(g);try{c.setAttribute("style",a);c.innerHTML="";c.appendChild(document.createTextNode(b.replace(/\s/g,f)));var h={};e.style.verticalAlign="baseline";h.ascent=e.offsetTop-c.offsetTop;e.style.verticalAlign="bottom";h.height=e.offsetTop-c.offsetTop;h.descent=h.height-h.ascent;h.width=c.offsetWidth}finally{g.parentNode.removeChild(g)}return h};l=e.createCachedMeasureText=function(){var c={};return function(a,e){var f=e+"<>!&%"+a,g=c[f];g||(c[f]=g=b(a,e));return g}};e.cachedMeasureText=
l();e.measure=function(b,a){return e.cachedMeasureText(b,e.getRunStyle(a))};e.draw=function(b,a,c,f,g,h,k,l){e.prepareContext(b);e.applyRunStyle(b,c);switch(c.script){case "super":g-=1/3*k;break;case "sub":g+=l/2}b.fillText("\n"===a?e.enter:a,f,g);c.underline&&b.fillRect(f,1+g,h,1);c.strikeout&&b.fillRect(f,1+g-k/2,h,1)}},"util.js":function(e,l,g){e.event=function(){var c=[],e=function(e){c.push(e)};e.fire=function(){var e=Array.prototype.slice.call(arguments,0);c.forEach(function(b){b.apply(null,
e)})};return e};e.derive=function(c,e){var f={};Object.keys(e).forEach(function(b){f[b]={value:e[b]}});return Object.create(c,f)}},"word.js":function(e,l,g){var c=g("per"),h=g("./part"),f=g("./runs"),b={isNewLine:function(){return 1==this.text.parts.length&&this.text.parts[0].isNewLine},code:function(){return 1==this.text.parts.length&&this.text.parts[0].code},codeFormatting:function(){return 1==this.text.parts.length&&this.text.parts[0].run},draw:function(a,b,d){c(this.text.parts).concat(this.space.parts).forEach(function(c){c.draw(a,
b,d);b+=c.width})},plainText:function(){return this.text.plainText+this.space.plainText},align:function(){var a=this.text.parts[0];return a?a.run.align:"left"},runs:function(a,b){var c=b&&b.start||0,d=b&&b.end;"number"!==typeof d&&(d=Number.MAX_VALUE);[this.text,this.space].forEach(function(b){b.parts.some(function(b){if(c>=d||0>=d)return!0;var e=b.run;b=e.text;if("string"===typeof b){if(0>=c&&d>=b.length)a(e);else if(c<b.length){var e=Object.create(e),f=Math.max(0,c);e.text=b.substr(f,Math.min(b.length,
d-f));a(e)}c-=b.length;d-=b.length}else 0>=c&&1<=d&&a(e),c--,d--})})}},d=function(a,b){var d={parts:c(a).map(function(a){return h(a,b)}).all(),ascent:0,descent:0,width:0,length:0,plainText:""};d.parts.forEach(function(a){d.ascent=Math.max(d.ascent,a.ascent);d.descent=Math.max(d.descent,a.descent);d.width+=a.width;d.length+=f.getPieceLength(a.run.text);d.plainText+=f.getPiecePlainText(a.run.text)});return d};l.exports=function(a,c){var e,f;a?(e=a.text.cut(a.spaces),f=a.spaces.cut(a.end)):(e=[{text:"\n"}],
f=[]);e=d(e,c);f=d(f,c);e=Object.create(b,{text:{value:e},space:{value:f},ascent:{value:Math.max(e.ascent,f.ascent)},descent:{value:Math.max(e.descent,f.descent)},width:{value:e.width+f.width,configurable:!0},length:{value:e.length+f.length}});a||Object.defineProperty(e,"eof",{value:!0});return e}},"wrap.js":function(e,l,g){var c=g("./line");l.exports=function(e,f,b,d,a,g,l,z){var t=[],k=0,w=l||0,q=z||0,u,r=0,m=f,x=function(a,b){t.push(a);k+=a.width;w=Math.max(w,a.ascent);q=Math.max(q,a.descent);
a.isNewLine()&&(v(b),r=a.ascent+a.descent)},v=function(f){if(!u&&0!==t.length){var g=c(a,e,b,m+w,w,q,t,d);d+=g.length;u=f(g);m+=w+q;k=w=q=t.length=0}},y=null;return function(c,l){if(y){r=0;var p=y(l);p&&(y=null,d+=p.length,m+=p.bounds().h,Object.defineProperty(p,"block",{value:!0}),c(p))}else(p=l.code())&&p.block?(t.length?v(c):m+=r,y=p.block(e,m,b,d,a,l.codeFormatting()),r=0):p&&p.eof||l.eof?((!p||g&&g(p))&&x(l,c),t.length?(v(c),c(m-f)):c(m+r-f),u=!0):(r=0,t.length&&k+l.text.width>b&&v(c),x(l,c));
return u}}}}},per:{":mainpath:":"per.js","per.js":function(e,l,g){(function(c){function e(a,b){return"function"!==typeof a?Array.isArray(a)?function(b){return a.some(b)}:function(b){return b(a)}:b?function(c,d){a.call(b,c,d)}:a}function f(a,b){this.forEach=e(a,b)}function b(a,b){a(b)}function d(a,c){return 0===arguments.length?new f(b):a&&a instanceof f?a:new f(a,c)}function a(a){return"string"===typeof a?new Function("x","return "+a):a}function g(a,b){var c=a[b];return"function"===typeof c?c:function(c){a[b]=
c}}function l(){}function z(a){return!!a}function t(a,b){return Math.min(a,b)}function k(a,b){return Math.max(a,b)}function w(a,b){return a+b}function q(a,b){return!(!a||!b)}function u(a,b){return!(!a&&!b)}function r(a){return!a}f.prototype.per=function(a,b){var c=this.forEach,f=e(a&&a.forEach||a,b);return d(function(a,b){return c(function(b){return f(a,b)},b)})};f.prototype.map=function(b){b=a(b);return this.per(function(a,c){return a(b(c))})};f.prototype.filter=function(b){b=a(b);return this.per(function(a,
c){if(b(c))return a(c)})};f.prototype.concat=function(a,b){a=a instanceof f?a.forEach:e(a,b);var c=this.forEach;return d(function(b,d){c(b,d);a(b,d)})};f.prototype.skip=function(a){return this.per(function(b,c){return 0<a?(a--,!1):b(c)})};f.prototype.take=function(a){return this.per(function(b,c){if(0>=a)return!0;a--;return b(c)})};f.prototype.listen=function(a){return this.per(function(b,c){return a(c)?!0:b(c)})};f.prototype.flatten=function(){return this.per(function(a,b){return Array.isArray(b)?
b.some(function(b){return a(b)}):a(b)})};f.prototype.reduce=function(a,b){var c=b,d=2==arguments.length;return this.per(function(b,e){c=d?a(c,e):e;b(c);d=!0})};f.prototype.multicast=function(a){1!==arguments.length&&(a=Array.prototype.slice.call(arguments,0));a=a.map(function(a){return"function"===typeof a?a:a instanceof f?a.forEach:l});return this.listen(function(b){var c=!0;a.forEach(function(a){a(l,b)||(c=!1)});return c})};f.prototype.into=function(a,b){if(!Array.isArray(a))throw Error("into expects an array");
b="number"!=typeof b?Number.MAX_VALUE:b;return this.listen(function(c){if(0>=b)return!0;a.push(c);b--})};f.prototype.monitor=function(a){var b=0,c=g(a,"count"),d=g(a,"first"),e=g(a,"last"),f=a.limit;"number"!=typeof f&&(f=Number.MAX_VALUE);return 1>f?this:this.listen(function(a){0===b&&d(a);b++;c(b);e(a);if(b>=f)return!0})};f.prototype.submit=function(a){return this.forEach(l,a)};f.prototype.all=function(){var a=[];this.into(a).submit();return a};f.prototype.first=function(){var a={limit:1};this.monitor(a).submit();
return 0<a.count?a.first:void 0};f.prototype.last=function(){var a={};this.monitor(a).submit();return 0<a.count?a.last:void 0};f.prototype.truthy=function(){return this.filter(z)};f.prototype.min=function(){return this.reduce(t,Number.MAX_VALUE)};f.prototype.max=function(){return this.reduce(k,Number.MIN_VALUE)};f.prototype.sum=function(){return this.reduce(w,0)};f.prototype.and=function(){return this.reduce(q,!0)};f.prototype.or=function(){return this.reduce(u,!1)};f.prototype.not=function(){return this.map(r)};
d.pulse=function(a){var b=0;return d(function(c){function d(){!0!==c(b++)&&setTimeout(d,a)}d()})};c(d)})(function(c){"undefined"===typeof e?this.per=c:l.exports=c})}}})("carota/src/carota")})();