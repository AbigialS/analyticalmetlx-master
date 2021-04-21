var TokBox=function(){var c=!1,a=!1,n=!1,e={},h=void 0,v=void 0,k=void 0,r=void 0,w=!1,u=function(a){a&&(w="permissions"in a&&a.permissions.studentsMayBroadcast&&!Conversations.getIsBanned(a),k&&(Conversations.shouldModifyConversation(a)?(k.show(),r.prop("checked",w).unbind("click").on("click",function(){var a=$(this).prop("checked");if("Conversations"in window){var c=Conversations.getCurrentConversation(),e=c.permissions;e.studentsMayBroadcast=a;changePermissionsOfConversation(c.jid.toString(),e)}})):
(r.unbind("click"),k.hide())));_.forEach(e,function(a){a.refreshVisualState()})};Progress.conversationDetailsReceived.TokBox=u;Progress.userBanned.TokBox=u;Progress.userUnbanned.TokBox=u;return{getSessions:function(){return e},initialize:function(){h=$("#videoConfSessionsContainer");k=h.find(".teacherControls").clone();r=k.find("#canBroadcast");v=h.find(".videoConfSessionContainer").clone();h.empty();h.append(k);u(Conversations.getCurrentConversation());n=!0},receiveTokBoxSession:function(p){if(n)if(h.css({display:"flex"}),
window.OT)if(0==OT.checkSystemRequirements())c||(errorAlert("Video conferencing disabled","Video conferencing is disabled because your browser does not support it.  You could try recent versions of Chrome or Firefox."),c=!0);else{if(a&&!(p.sessionId in e)){var f=v.clone();h.append(f);p=TokBoxSession(p,f);e[p.id]=p;p.refreshVisualState()}}else errorAlert("Could not connect video","Please check your network connection")},getTokBoxEnabledState:function(){return a},setTokBoxEnabledState:function(c){a=
c;Plugins.streaming.changeVisualState(a,!0,!1)},removeSessions:function(a){_.forEach(e,function(c){_.some(a,function(a){return a==c.id})&&(c.shutdown(),delete e[c.id])})},canPublish:function(){return Conversations.shouldModifyConversation()||w}}}(),TokBoxSession=function(c,a){var n=160,e=120,h=15,v=[320,640,1280],k=[240,480,720],r=[1,7,15,30],w=function(b){var a=_.reverse(_.filter(r,function(a){return a<=b}))[0];void 0==a&&(a=r[0]);return a},u=function(b){var a=_.reverse(_.filter(v,function(a){return a<=
b}))[0];void 0==a&&(a=v[0]);return a},p=function(b){var a=_.reverse(_.filter(k,function(a){return a<=b}))[0];void 0==a&&(a=k[0]);return a},f=function(){return"isConnected"in d&&d.isConnected()},z={},m=a.find(".videoConfStartButton"),x=a.find(".videoConfContainer"),A=a.find(".videoConfStartButtonContainer"),D=a.find(".videoSubscriptionsContainer"),E=a.find(".videoContainer").clone(),B=a.find(".broadcastContainer"),F=a.find(".broadcastLink");D.empty();B.empty();x.empty();var q={},l=void 0,g=function(){m.unbind("click");
f()&&TokBox.canPublish()&&!d.studentsMayBroadcast?(x.show(),"capabilities"in d&&"publish"in d.capabilities&&1==d.capabilities.publish?(A.show(),m.show(),m.on("click",function(){f()&&(void 0==l?C():y())})):(f()&&y(!0),A.hide(),m.hide(),x.hide())):(f()&&y(!0),A.hide(),m.hide(),x.hide());a.find(".subscribedStream").removeClass("subscribedStream");if(d.connection){var b=d.connection.data.match(/description=(.+)$/)[1],c=b;if(b==Conversations.getCurrentConversationJid())c="everyone";else{var e=_.flatMap(Conversations.getCurrentSlide().groupSets,
function(a){return _.find(a.groups,function(a){return a.id==b})});e.length&&(c=sprintf("group %s",e[0].title))}m.find(".context").text(c)}void 0!=l?m.addClass("publishedStream").find(".videoConfStartButtonLabel").text("Hide from "):m.removeClass("publishedStream").find(".videoConfStartButtonLabel").text("Stream to ");_.forEach(q,function(b){"refreshVisual"in b&&b.refreshVisual()});DeviceConfiguration.applyFit()},C=function(){g();if(f()&&void 0==l){var b=sprintf("tokBoxVideoElemPublisher_%s",_.uniqueId()),
c=$("<span />",{id:b,"class":"publisherVideoElem"});a.find(".viewscreen").append(c);sprintf("%sx%s",u(n),p(e));l=b=OT.initPublisher(b,{name:UserSettings.getUsername(),width:n,height:e,resolution:"320x240",frameRate:w(h),insertMode:"append"},function(b){b&&console.log("tokbox error:",b)});b.element.style.width=n;b.element.style.height=e;d.publish(b);a.find(".videoConfStartButton").addClass("publishedStream")}g()},y=function(b){b||g();f()&&void 0!=l&&(a.find(".publisherVideoElem").remove(),d.unpublish(l),
l=void 0,a.find(".videoConfStartButton").removeClass("publishedStream"));b||g()};Progress.afterWorkQueuePause.videoStreaming=function(){_.forEach(q,function(b){"subscriber"in b&&null!=b.subscriber&&"restrictFramerate"in b.subscriber&&b.subscriber.restrictFramerate(!0)})};Progress.beforeWorkQueueResume.videoStreaming=function(){_.forEach(q,function(b){"subscriber"in b&&null!=b.subscriber&&"restrictFramerate"in b.subscriber&&b.subscriber.restrictFramerate(!1)})};Progress.conversationDetailsReceived.videoStreaming=
function(b){"jid"in b&&"Conversations"in window&&"permissions"in b&&"studentsMayBroadcast"in b.permissions&&g()};var d=OT.initSession(c.apiKey,c.sessionId);d.on({streamDestroyed:function(b){b.stream.id in q&&(q[b.stream.id].elem.remove(),delete q[b.stream.id],g())},streamCreated:function(b){if("capabilities"in d&&"subscribe"in d.capabilities&&1==d.capabilities.subscribe){var a=b.stream,c=q[a.id];if(void 0==c){c={stream:a,subscribed:!1,refreshVisual:function(){}};q[a.id]=c;var h=sprintf("tokBoxVideoElemSubscriber_%s",
_.uniqueId()),f=$(E.clone()),k=$("<span />",{id:h,"class":"subscriberVideoElem"});f.find(".publisherName").text(b.stream.name);var p=f.find(".videoConfSubscribeButton"),m=function(){p.toggleClass("subscribedStream",c.subscribed)};m();var t=q[a.id],l=a.name,r=function(){t.subscribed=!0;z[l]=!0;var a=d.subscribe(t.stream,h,{insertMode:"append",width:n,height:e},function(a){a&&(f.remove(),console.log("error when subscribing to stream",a,t.stream.name,t.stream.id))});a.element.style.width=n;a.element.style.height=
e;a.on("videoDimensionsChanged",function(b){a.element.style.width=b.newValue.width+"px";a.element.style.height=b.newValue.height+"px"});t.subscriber=a;t.refreshVisual=m};f.find(".videoConfSubscribeButton").on("click",function(){t.subscribed?(t.subscribed=!1,d.unsubscribe(t.subscriber),delete z[l]):r();g()});k.prepend(f);x.append(k);c.videoSelectorId=h;c.elem=f;l in z&&r();g()}else c.stream=a}},sessionConnected:function(a){g()},sessionDisconnected:function(a){g()},sessionReconnected:function(a){g()},
sessionReconnecting:function(a){g()}});d.connect(c.token,function(a){a&&console.log("error when connecting to tokBox",a,c);g()});return{startPublish:C,receiveBroadcast:function(a){if(null!=a&&"broadcastUrls"in a&&"hls"in a.broadcastUrls){var c=F.clone();c.attr("href",a.broadcastUrls.hls);B.append(c)}else B.empty()},getIsConnected:f,id:d.id,getSession:function(){return d},refreshVisualState:g,shutdown:function(){d.disconnect();a.remove()},resizeVideo:function(a,c,d){void 0!=a&&(n=a);void 0!=c&&(e=
c);void 0!=d&&(h=d);void 0!=l&&(y(),startPublisherFunc());_.forEach(q,function(a){"subscriber"in a&&null!=a.subscriber&&(a.subscriber.setPreferredResolution({width:n,height:e}),"refreshVisual"in a&&a.refreshVisual())});g()}}};function receiveTokBoxSessionToken(c){"token"in c&&TokBox.receiveTokBoxSession(c)}function removeTokBoxSessions(c){TokBox.removeSessions(c)}function receiveTokBoxEnabled(c){console.log("TokBox enabled",c);TokBox.setTokBoxEnabledState(c)}function receiveTokBoxArchives(c){}
function receiveTokBoxBroadcast(c){};