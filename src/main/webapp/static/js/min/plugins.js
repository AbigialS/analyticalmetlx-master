var Plugins=function(){var t=function(f,g,b,l,h){var e=!0,d=!1,c=!1,q=function(b,a,n){};return{style:g,load:function(d,a,n){q=n;return b(d,a)},initialize:function(){var b=l();q(e,d,c);Progress.call("onLayoutUpdated");h(e,d,c);return b},changeVisualState:function(b,a,n){void 0!==b&&(e=b);(d=void 0!==a?a:!d)||(c=!1);void 0!==n&&(c=n);q(e,d,c);Progress.call("onLayoutUpdated");h(e,d,c)},getIsEnabled:function(){return e},getIsCollapsed:function(){return d},getDesiresAttention:function(){return c},getName:function(){return f}}};
return{chat:function(){var f={},g={},b={},l={},h=sprintf("chatbox_%s",_.uniqueId()),e=$("<div />",{id:h}),d=function(a,b,m,d){d=l.clone();UserSettings.getUsername();var c=d.find(".chatMessageAuthor");c.text(a.author);d.find(".chatMessageTimestamp").text((new Date(a.timestamp)).toISOString());var p=d.find(".chatMessageContent");switch(a.contentType){case "text":p.text(a.content);break;case "html":p.html(a.content)}if(b&&m)switch(b){case "whisperTo":p.addClass("whisper");c.text(sprintf("to %s",m));
break;case "whisperFrom":p.addClass("whisper");c.text(sprintf("from %s",m));break;case "groupChatTo":p.addClass("groupChat");c.text(sprintf("to %s",m));break;case "groupChatFrom":p.addClass("groupChat"),c.text(sprintf("from %s",m))}return d},c=function(a){if(a&&"type"in a&&"chatMessage"==a.type&&"identity"in a&&!(a.identity in f)){f[a.identity]=a;var c=UserSettings.getUsername(),m=_.flatten(_.flatten(_.map(Conversations.getCurrentConversation().slides,function(a){return _.map(a.groupSets,function(a){return a.groups})})));
boardContent.chatMessages.push(a);if(a.audiences.length){var k=_.find(a.audiences,function(a){return"user"==a.type||"group"==a.type});a.author==c?k&&"user"==k.type?(b.append(d(a,"whisperTo",k.name)),b.scrollTop(b[0].scrollHeight)):k&&"group"==k.type&&(b.append(d(a,"groupChatTo",k.name)),b.scrollTop(b[0].scrollHeight)):k&&"user"==k.type&&k.name==c?(b.append(d(a,"whisperFrom",a.author)),b.scrollTop(b[0].scrollHeight)):k&&"group"==k.type&&_.some(m,function(a){return a.name==k.name&&_.some(a.members,
function(a){return a.name==c})})&&(b.append(d(a,"groupChatFrom",a.author,k.name)),b.scrollTop(b[0].scrollHeight))}else b.append(d(a)),b.scrollTop(b[0].scrollHeight);a=Plugins.chat;void 0!==a&&a.getIsCollapsed()&&a.changeVisualState(a.getIsEnabled(),a.getIsCollapsed(),!0)}},q=function(a){_.forEach(a.chatMessages,c)},r=function(a){if(a&&a.length){var b=[],c;if(_.startsWith(a,"/w"))if(c=a.split(" "),c.length&&2<=c.length)b.push({domain:"metl",name:c[1],type:"user",action:"read"}),c=_.drop(c,2).join(" ");
else return a;else if(_.startsWith(a,"/g"))if(c=a.split(" "),c.length&&2<=c.length)b.push({domain:"metl",name:c[1],type:"group",action:"read"}),c=_.drop(c,2).join(" ");else return a;else c=a;a=sendStanza;var d=UserSettings.getUsername(),e=Conversations.getCurrentSlideJid(),p=(new Date).getTime(),g=sprintf("%s_%s_%s",d,e,p);a({type:"chatMessage",author:d,timestamp:p,identity:g,contentType:"text",content:c,context:e,audiences:b||[]});return""}return a};return chatPlugin=t("Chat",".chatMessageContainer {overflow-y:auto; flex-grow:1;}.chatContainer {margin-left:1em;width:320px;height:140px;display:flex;flex-direction:column;}.chatMessageAuthor {color:slategray;margin-right:1em;}.chatMessageTimestamp {color:red;font-size:small;display:none;}.chatboxContainer {display:flex;flex-direction:row;width:100%;flex-shrink:0;}.chatboxContainer input{flex-grow:1;}.chatbox {background-color:white;display:inline-block; padding:0px; margin:0px;}.chatboxSend {display:inline-block; background:white;padding:0px; margin:0px;}.groupChat {color:darkorange}.whisper {color:darkblue}",
function(a,b){a.stanzaReceived.Chatbox=c;a.historyReceived.Chatbox=q;e.append('<div class="chatContainer" ><div class="chatMessageContainer" ><div class="chatMessage" ><span class="chatMessageTimestamp" ></span><span class="chatMessageAuthor" ></span><span class="chatMessageContent"></span></div></div><div class="chatboxContainer"><input type="text" class="chatbox"></input><button class="chatboxSend">Send</button></div></div>');return e},function(){g=$("#"+h);b=g.find(".chatMessageContainer");l=b.find(".chatMessage").clone();
b.empty();var a=g.find(".chatboxContainer .chatbox").on("keydown",function(a){13==a.keyCode&&(a=$(this),a.val(r(a.val())))});g.find(".chatboxContainer .chatboxSend").on("click",function(){a.val(r(a.val()))})},function(){})}(),streaming:function(){return t("Face to face"," #videoConfSessionsContainer {display:none;} .videoConfSessionContainer, .videoConfStartButtonContainer, .videoConfContainer {} .publishedStream {background:#fbcd4b;} .subscribedStream {background:#fbcd4b;} .videoConfStartButtonContainer, .videoConfPermitStudentBroadcastContainer{flex-direction:row;} .videoConfStartButton, .videoConfSubscribeButton{padding-top:0;margin-top:0;} .videoConfPermitStudentBroadcastButton {background:white;margin:1px 0;} .videoConfPermitStudentBroadcastContainer{display:flex;} .videoConfStartButton{padding-top:0;margin-top:0;}, .videoConfPermitStudentBroadcastButton{padding:0 1em;font-size:1rem;} .videoContainer{display:flex;} .context, .publisherName{font-size:1rem;} .thumbWide{width:160px;} .broadcastContainer{display:none;}",
function(f,g){var b=$("<div />");b.append('<span id="videoConfSessionsContainer"><div class="videoConfSessionContainer"><div><div class="videoConfStartButtonContainer" style="margin-bottom:-0.3em"><button class="videoConfStartButton"><span class="videoConfStartButtonLabel">Start sending </span><span class="context"></span></button><span style="display:none;" class="teacherControls mr"><input type="checkbox" id="canBroadcast"><label for="canBroadcast" class="checkbox-sim"><span class="icon-txt">Students can stream</span></label></span></div><div class="viewscreen"></div></div><div class="broadcastContainer"><a class="floatingToolbar btn-menu fa fa-television btn-icon broadcastLink"><div class="icon-txt">Watch class</div></a></div><div class="videoSubscriptionsContainer"></div><div class="videoConfContainer"><span class="videoContainer thumbWide"><button class="videoConfSubscribeButton"><span>Toggle</span></button>&nbsp;<span class="publisherName"></span></span></div></div></span>');
return b},TokBox.initialize,function(){})}(),groups:function(){var f=$("<div />"),g=function(b,g,e){b=$("<button />",{"class":sprintf("%s btn-icon fa",b),click:e});$("<div />",{"class":"icon-txt",text:g}).appendTo(b);return b},b=t("Groups",".groupsPluginMember{margin-left:0.5em;display:flex;} .groupsPluginGroupContainer{display:flex;margin-right:1em;} .groupsPluginGroup{display:inline-block;text-align:center;vertical-align:top;} .groupsPluginGroupGrade button, .groupsPluginGroupGrade .icon-txt{padding:0;margin-top:0;} .groupsPluginGroupControls button, .groupsPluginGroupControls .icon-txt{padding:0;margin-top:0;} .isolateGroup label{margin-top:1px;} .isolateGroup{margin-top:0.8em;} .rowT{display:table;width:100%;} .rowC{display:table-row;} .rowC *{display:table-cell;} .rowC label{text-align:left;vertical-align:middle;font-weight:bold;} .memberCurrentGrade{background-color:white;margin-right:0.5em;padding:0 .5em;} .groupsPluginGroupControls{display:flex;} .groupsPluginGroupGrade{background-color:white;margin:2px;padding:0 0.3em;height:3em;display:inline;} .groupsPluginAllGroupsControls{margin-bottom:0.5em;border-bottom:0.5px solid white;padding-left:1em;display:flex;}",
function(l,h){var e=function(){var d=!1;try{f.empty();var c=Conversations.getCurrentGroups();if(Conversations.shouldModifyConversation()){var e=Conversations.getCurrentSlide();if(e&&c.length){var l=sprintf("groupWork_%s",e.id),a=_.find(Grades.getGrades(),function(a){return a.location==l});if(a)var n=Grades.getGradeValues()[a.id];var m=0;$("<div />",{"class":"groupsPluginAllGroupsControls"}).on("mousedown",function(){m=$("#masterFooter").scrollLeft()}).append($("<input />",{type:"radio",name:"groupView",
id:"showAll"}).prop("checked",!0).click(function(){_.each(c,function(a){ContentFilter.setFilter(a.id,!0)});ContentFilter.clearAudiences();blit();$("#masterFooter").scrollLeft(m)})).append($("<label />",{"for":"showAll"}).css({"flex-grow":0}).append($("<span />",{"class":"icon-txt",text:"Show all"}))).append(g("fa-share-square","Share all",function(){var a=_.map(ContentFilter.getFilters(),function(a){return _.cloneDeep(a)}),b=ContentFilter.getAudiences();_.forEach(c,function(a){ContentFilter.setFilter(a.id,
!1)});Progress.call("deisolated");blit();var d=function(a,b){var e=a[0];e?(ContentFilter.setFilter(e.id,!0),ContentFilter.setAudience(e.id),blit(),_.defer(function(){Submissions.sendSubmission(function(c){c?(ContentFilter.setFilter(e.id,!1),blit(),_.defer(function(){d(_.drop(a,1),b)})):errorAlert("Submission failed","Storing this submission failed.")})})):(successAlert("Submissions sent",sprintf("%s group submissions stored.  You can check them in the submissions tab.",_.size(c))),b())};_.defer(function(){d(c,
function(){_.forEach(a,function(a){ContentFilter.setFilter(a.id,a.enabled)});b.length?ContentFilter.setAudience(b[0]):ContentFilter.clearAudiences();blit()})})}).css({"margin-top":0})).appendTo(f);var k=$("<div />").css({display:"flex"}).appendTo(f);_.each(c,function(b){var d=$("<div />",{"class":"groupsPluginGroupContainer"}).appendTo(k),e=$("<div />").appendTo(d),f=$("<div />",{"class":"groupsPluginGroupControls"}).appendTo(e);g("fa-book","Assess",function(){a=_.find(Grades.getGrades(),function(a){return a.location==
l});if(void 0!==a){var c=sprintf("assessGroupDialog_%s",_.uniqueId()),d=$("<div/>",{id:c}),e=$.jAlert({title:"Assess group",width:"80%",content:d[0].outerHTML,btns:[{text:"Save",theme:"green",closeAlert:!0,onClick:function(){a=_.find(Grades.getGrades(),function(a){return a.location==l});void 0!=k?(_.each(b.members,function(b){b={type:sprintf("%sGradeValue",a.gradeType),gradeId:a.id,gradeValue:k,gradedUser:b,author:UserSettings.getUsername(),gradeComment:m,gradePrivateComment:n,timestamp:0,audiences:[]};
sendStanza(b)}),e.closeAlert()):alert("you cannot submit without a gradeValue")}}]}),c=$("#"+c),g=$("<div />",{"class":"groupsPluginGroup rowT"}),k=void 0,f=sprintf("gradeValueInput_%s",_.uniqueId()),d=function(){return $("<div />",{"class":"rowC"}).appendTo(g)},h=d();switch(a.gradeType){case "numeric":$("<label/>",{text:"Score","for":f}).appendTo(h);$("<input/>",{id:f,type:"number",max:a.numericMaximum,min:a.numericMinimum}).on("change",function(a){k=parseFloat($(this).val())}).appendTo(h);break;
case "text":$("<label/>",{text:"Score","for":f}).appendTo(h);$("<input/>",{id:f,type:"text"}).on("change",function(a){k=$(this).val()}).appendTo(h);break;case "boolean":k=!1,$("<input/>",{type:"checkbox",id:f}).on("change",function(a){k=$(this).prop("checked")}).appendTo(h),$("<label/>",{text:"Score","for":f}).appendTo(h)}var f=d(),h=sprintf("gradeValueComment_%s",_.uniqueId()),m="";$("<label/>",{"for":h,text:"Comment"}).appendTo(f);$("<input />",{id:h,type:"text"}).on("change",function(a){m=$(this).val()}).appendTo(f);
var d=d(),f=sprintf("gradeValuePrivateComment_%s",_.uniqueId()),n="";$("<label/>",{"for":f,text:"Private comment"}).appendTo(d);$("<input/>",{id:f,type:"text"}).on("change",function(a){n=$(this).val()}).appendTo(d);g.appendTo(c)}else alert("no linked grade")}).appendTo(f);$("<span />",{text:sprintf("Group %s",b.title),"class":"ml"}).appendTo(e);g("fa-share-square","Share",function(){h.find("input").prop("checked",!0).change();_.defer(Submissions.sendSubmission)}).appendTo(f);var e=sprintf("isolateGroup_%s",
b.title),h=$("<div />",{"class":"isolateGroup"}).on("mousedown",function(){m=$("#masterFooter").scrollLeft()}).append($("<input />",{type:"radio",name:"groupView",id:e}).change(function(){Progress.call("beforeChangingAudience",[b.id]);_.each(c,function(a){ContentFilter.setFilter(a.id,!1)});ContentFilter.setFilter(b.id,!0);ContentFilter.setAudience(b.id);Progress.call("isolated",[b.id]);Modes.select.activate();blit();$("#masterFooter").scrollLeft(m)})).append($("<label />",{"for":e}).append($("<span />",
{"class":"icon-txt",text:"Isolate"}).css({"margin-top":"2px"}))).appendTo(f),q=$("<div />",{"class":"groupsPluginGroup"}).prependTo(d);_.each(b.members,function(a){var b=$("<div />",{text:a,"class":"groupsPluginMember"}).appendTo(q);n&&a in n&&$("<span />",{"class":"memberCurrentGrade",text:n[a].gradeValue}).prependTo(b)})});d=!0}}else{var h=$("<div />").css({display:"flex"}).appendTo(f);_.each(c,function(a){if(_.find(Conversations.getCurrentGroup(),a)){var b=$("<div />",{"class":"groupsPluginGroupContainer"}).appendTo(h);
sprintf("isolateGroup_%s",a.title);var c=$("<div />").appendTo(b);_.each(a.members,function(a){$("<div />",{text:a}).appendTo(c)});$("<div />",{text:sprintf("Group %s",a.title)}).prependTo(c);d=!0}})}}catch(p){console.log("Groups plugin render e",p)}b.changeVisualState(d,b.getIsCollapsed(),b.getDesiresAttention())};l.gradeValueReceived["Groups plugin"]=function(b){var c=sprintf("groupWork_%s",Conversations.getCurrentSlideJid()),f=_.find(Grades.getGrades(),function(b){return b.location==c});f&&b.gradeId==
f.id&&e()};l.currentSlideJidReceived["Groups plugin"]=e;l.conversationDetailsReceived["Groups plugin"]=e;return f},function(){},function(){});return b}()}}();
$(function(){var t=$("#pluginBar"),f=$("<style></style>").appendTo($("body"));f.append(".pluginHidden {display:none} .collapserOpen{background:#fbcd4b;border-width:1px;border-style:solid} .collapserClosed{background:#ffffff;border-width:1px;border-style:solid} .collapseButtonSymbol, .attentionRequestor{text-decoration:none} .attentionRequestor{color:#cc66ff}");_.each(Plugins,function(g,b){var l=$("<div />",{"class":"plugin"}),h=g.load(Progress,{},function(b,c,d){a(b,c,d)}),e=$("<div />",{"class":"pluginCollapsable"}).append(h);
h.appendTo(e);var h=$("<div />",{"class":"collapserContainer"}),d=$("<button/>",{"class":"collapseButton"}).on("click",function(){g.changeVisualState()}),c=$("<span/>",{"class":"collapseButtonSymbol fa fa-fw"}),q=$("<span/>",{text:g.getName()}),r=$("<span/>",{"class":"attentionRequestor fa fa-fw"});d.append(c).append(q).append(r);h.append(d);var a=function(a,b,f){a?(d.show(),b?(e.addClass("pluginHidden"),d.removeClass("collapserOpen").addClass("collapserClosed"),c.removeClass("fa-check").addClass("fa-square-o"),
f&&r.addClass("fa-envelope")):(e.removeClass("pluginHidden"),d.removeClass("collapserClosed").addClass("collapserOpen"),c.removeClass("fa-square-o").addClass("fa-check"),r.removeClass("fa-envelope"))):d.hide()};a();g.changeVisualState(g.getIsEnabled(),!0);h.appendTo(l);f.append(g.style);l.append(e);l.appendTo(t);g.initialize()})});