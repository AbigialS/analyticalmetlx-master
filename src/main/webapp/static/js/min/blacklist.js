var Blacklist=function(){var g={},n={},d={},p={},k=[],f=[],t={};$(function(){d=$("#blacklistDatagrid");p=d.find(".blacklistRecord").clone();d.empty();g=$("#currentBlacklistAuthorList");n=g.find(".blacklistAuthorContainer").clone();g.empty();m();var a=function(a){jsGrid.Field.call(this,a)};a.prototype=new jsGrid.Field({sorter:function(a,b){return new Date(a)-new Date(b)},itemTemplate:function(a){return moment(a).format("MMM Do YYYY, h:mm a")},insertTemplate:function(a){return""},editTemplate:function(a){return""},
insertValue:function(){return""},editValue:function(){return""}});jsGrid.fields.dateField=a;d.jsGrid({width:"100%",height:"auto",inserting:!1,editing:!1,sorting:!0,paging:!0,noDataContent:"No ban records",controller:{loadData:function(a){var b=_.map(k,function(a){a.userCount=a.blacklist.length;return a});"sortField"in a&&(b=_.sortBy(b,function(b){return b[a.sortField]}),"sortOrder"in a&&"desc"==a.sortOrder&&(b=_.reverse(b)));return b}},pageLoading:!1,fields:[{name:"url",type:"text",title:"Preview",
readOnly:!0,sorting:!1,itemTemplate:function(a,b){var d=sprintf("/submissionProxy/%s/%s/%s",Conversations.getCurrentConversationJid(),b.author,b.identity);return $("<img/>",{src:d,"class":"submissionThumbnail",style:"width:100%;height:160px;cursor:zoom-in"}).on("click",function(){var a=sprintf("/submissionProxy/%s/%s/%s",Conversations.getCurrentConversationJid(),b.author,b.identity),c=sprintf("Ban record at %s on page %s",new Date(b.timestamp),b.slide),d=p.clone(),h=d.find(".blacklistLegend"),e=h.find(".blacklistAuthor").clone();
h.empty();"blacklist"in b&&_.each(b.blacklist,function(a){if("username"in a&&"highlight"in a){var b=e.clone();b.find(".blacklistAuthorName").text(a.username);var c=a.highlight[0];a=a.highlight[1];b.find(".blacklistAuthorColor").css({"background-color":c,opacity:a});h.append(b)}});d.find(".blacklistImage").attr("src",a).css({"max-width":"100%"});$.jAlert({title:c,closeOnClick:!0,width:"90%",content:d[0].outerHTML})})}},{name:"slide",type:"number",title:"Page",readOnly:!0},{name:"timestamp",type:"dateField",
title:"When",readOnly:!0},{name:"userCount",type:"number",title:"Who",readOnly:!0,itemTemplate:function(a,b){return _.map(b.blacklist,"username").join(", ")}}]});d.jsGrid("sort",{field:"timestamp",order:"desc"});l()});var u=function(a){return Conversations.shouldModifyConversation()},w=function(){void 0!=WorkQueue&&WorkQueue.enqueue(function(){g.empty();var a=$("#unbanAll");0<f.length?(a.show(),a.unbind("click"),a.on("click",function(){changeBlacklistOfConversation(Conversations.getCurrentConversationJid(),
[])})):(a.unbind("click"),a.hide());f.map(function(a){var b=n.clone();b.find(".blacklistAuthorName").text(a);b.find(".blacklistAuthorUnbanButton").on("click",function(){f=_.filter(f,function(b){return b!=a});changeBlacklistOfConversation(Conversations.getCurrentConversationJid(),f)});g.append(b)})})},m=function(a){void 0!=WorkQueue&&WorkQueue.enqueue(function(){Conversations.shouldModifyConversation(a)?($("#ban").show(),$("#administerContent").show(),$("#menuBlacklist").show()):($("#ban").hide(),
$("#administerContent").hide(),$("#menuBlacklist").hide(),$("#blacklistPopup").hide())})},v=function(a){m(a);k=[];t={}},l=function(){void 0!=WorkQueue&&WorkQueue.enqueue(function(){d.jsGrid("loadData");var a=d.jsGrid("getSorting");"field"in a&&d.jsGrid("sort",a)})},r=function(a,c){try{"target"in a&&"bannedcontent"==a.target&&u(a)&&(k.push(a),c||l())}catch(b){console.log("Blacklists.stanzaReceivedFunction",b)}};Progress.conversationDetailsReceived.blacklist=function(a){"blacklist"in a&&"jid"in a&&
Conversations.getCurrentConversationJid()==a.jid&&(f=a.blacklist,w(),m(a))};Progress.onConversationJoin.blacklist=v;Progress.historyReceived.blacklist=function(a){try{"type"in a&&"history"==a.type&&(v(),_.forEach(a.submissions,function(a){r(a,!0)}),l())}catch(c){console.log("Blacklists.historyReceivedFunction",c)}};Progress.stanzaReceived.blacklist=r;return{getAllBlacklists:function(){return Conversations.shouldModifyConversation()?_.filter(k,u):[]},getCurrentBlacklist:function(){return Conversations.shouldModifyConversation()?
t:{}},processBlacklist:r,getBlacklistedAuthors:function(){return Conversations.shouldModifyConversation()?f:[]},banSelection:function(a,c,b,d,f,g){WorkQueue.pause();var k=_.uniq(_.map(_.flatMap([b,d,f,g],_.values),"author"));a=Conversations.getCurrentConversation();changeBlacklistOfConversation(a.jid.toString(),_.uniq(_.flatten([a.blacklist,k])));a=$("<canvas />");c=board[0].width;var h=board[0].height;a.width=c;a.height=h;a.attr("width",c);a.attr("height",h);a.css({width:c,height:h});var e=a[0].getContext("2d");
e.fillStyle="white";e.fillRect(0,0,c,h);e.drawImage(board[0],0,0,c,h);var q=_.map(k,function(a){return{username:a,highlight:[Colors.getColorForSeed(a)[0],128]}});_.forEach(_.values(b),function(a){var b=_.cloneDeep(a);b.thickness*=3;a=_.find(q,{username:a.author});b.color=a?a.highlight:"red";b.isHighlighter=!0;b.identity+="_banning";prerenderInk(b);drawInk(b,e)});_.forEach(g,function(a){var b=screenBounds(a.bounds);1<=b.screenHeight&&1<=b.screenWidth&&(e.strokeStyle=_.find(q,{username:a.author}).highlight,
a=b.screenPos,e.lineWidth=4,e.rect(a.x-2,a.y-2,b.screenWidth+4,b.screenHeight+4),e.stroke())});_.forEach(f,function(a){var b=screenBounds(a.bounds);1<=b.screenHeight&&1<=b.screenWidth&&(e.strokeStyle=_.find(q,{username:a.author}).highlight,a=b.screenPos,e.lineWidth=4,e.rect(a.x-2,a.y-2,b.screenWidth+4,b.screenHeight+4),e.stroke())});_.forEach(d,function(a){var b=screenBounds(a.bounds);1<=b.screenHeight&&1<=b.screenWidth&&(e.strokeStyle=_.find(q,{username:a.author}).highlight,a=b.screenPos,e.lineWidth=
4,e.rect(a.x-2,a.y-2,b.screenWidth+4,b.screenHeight+4),e.stroke())});a=a[0].toDataURL("image/jpeg",.4);var l=(new Date).getTime(),m=UserSettings.getUsername(),r=Conversations.getCurrentSlide().id;c=Conversations.getCurrentConversation().jid;var n=sprintf("submission%s%s.jpg",m,l.toString()),p=sprintf("%s:%s:%s",c,n,l);c=sprintf("/uploadDataUri?jid=%s&filename=%s",c.toString(),encodeURI(p));$.ajax({url:c,type:"POST",success:function(a){a=$(a).find("resourceUrl").text();sendStanza({audiences:[],author:m,
blacklist:q,identity:p,privacy:"PUBLIC",slide:r,target:"bannedcontent",timestamp:l,title:n,type:"submission",url:a});a=batchTransform();a.inkIds=_.map(_.values(b),"identity");a.textIds=_.map(_.values(d),"identity");a.multiWordTextIds=_.map(_.values(f),"identity");a.imageIds=_.map(_.values(g),"identity");a.newPrivacy="private";sendStanza(a);WorkQueue.gracefullyResume();successAlert("Banned content",sprintf("You have banned: %s",k.join(", ")))},error:function(a){console.log(a);errorAlert("Banning failed",
"This image cannot be processed, either because of image protocol issues or because it exceeds the maximum image size.");WorkQueue.gracefullyResume()},data:a,cache:!1,contentType:!1,processData:!1})},reRender:l}}();