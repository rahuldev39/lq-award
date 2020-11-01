(function($,document,window,undefined){$.fn.jCounter=function(options,callback){var jCounterDirection='down';var customRangeDownCount;var days,hours,minutes,seconds;var endCounter=!1;var eventDate;var pausedTime;var thisEl=this;var thisLength=this.length;var pluralLabels=new Array('DAYS','HOURS','MINUTES','SECONDS');var singularLabels=new Array('DAY','HOUR','MINUTE','SECOND');this.options=options;this.version='0.1.4';var settings={animation:null,callback:null,customDuration:null,customRange:null,date:null,debugLog:!1,serverDateSource:'dateandtime.php',format:'dd:hh:mm:ss',timezone:'Europe/London',twoDigits:'on'};if(typeof options==='object'){$.extend(settings,options);thisEl.data("userOptions",settings)}
if(thisEl.data('userOptions').debugLog==!0&&window.console!==undefined){var consoleLog=!0}
var jC_methods={init:function(){thisEl.each(function(i,el){initCounter(el)})},pause:function(){if(consoleLog){console.log("(jC) Activity: Counter paused.")}
endCounter=!0;return thisEl.each(function(i,el){clearInterval($(el).data("jC_interval"))})},stop:function(){if(consoleLog){console.log("(jC) Activity: Counter stopped.")}
endCounter=!0;return thisEl.each(function(i,el){clearInterval($(el).data("jC_interval"));$(el).removeData("jC_pausedTime");resetHTMLCounter(el)})},reset:function(){if(consoleLog){console.log("(jC) Activity: Counter reset.")}
return thisEl.each(function(i,el){clearInterval($(el).data("jC_interval"));resetHTMLCounter(el);initCounter(el)})},start:function(){if(consoleLog){console.log("(jC) Activity: Counter started.")}
return thisEl.each(function(i,el){pausedTime=$(el).data("jC_pausedTime");endCounter=!1;clearInterval($(el).data("jC_interval"));initCounter(el)})}}
if(thisEl.data("userOptions").customDuration){if(!isNaN(thisEl.data("userOptions").customDuration)){var customDuration=!0}else{var customDuration=!1;if(consoleLog){console.log("(jC) Error: The customDuration value is not a number! NOTE: 'customDuration' accepts a number of seconds.")}}}
if(thisEl.data("userOptions").customRange){var customRangeValues=thisEl.data("userOptions").customRange.split(":");var rangeVal0=parseInt(customRangeValues[0]);var rangeVal1=parseInt(customRangeValues[1]);if(!isNaN(rangeVal0)&&!isNaN(rangeVal1)){var customRange=!0;if(rangeVal0>rangeVal1){var customRangeDownCount=!0}else{var customRangeDownCount=!1;jCounterDirection='up'}}else{var customRange=!1;if(consoleLog){console.log("(jC) Error: The customRange value is not a valid range! Example: customRange: '0:30' or '30:0'")}}}
if(thisEl.data("userOptions").animation=='slide'){thisEl.data("jCanimation","slide")}
function initCounter(el){if(customDuration){if(pausedTime){if(!isNaN(pausedTime)){eventDate=Math.round(pausedTime)}}else{eventDate=Math.round($(el).data("userOptions").customDuration)}
currentTime=0;countdown_proc(currentTime,el);$(el).data("jC_interval",setInterval(function(){if(endCounter==!1){currentTime=parseInt(currentTime)+1;countdown_proc(currentTime,el)}},1000))}else if(customRange){eventDate=Math.round(customRangeValues[1]);if(pausedTime){if(!isNaN(pausedTime)){var currentTime=eventDate-pausedTime}}else{var currentTime=Math.round(customRangeValues[0])}
countdown_proc(currentTime,el);$(el).data("jC_interval",setInterval(function(){if(endCounter==!1){var ifRangeDownCount=(customRangeDownCount)?currentTime=parseInt(currentTime)-1:currentTime=parseInt(currentTime)+1;countdown_proc(currentTime,el)}},1000))}else{eventDate=Date.parse($(el).data("userOptions").date)/1000;dateSource=thisEl.data("userOptions").serverDateSource+'?timezone='+thisEl.data("userOptions").timezone+'&callback=?';$.ajax({url:dateSource,dataType:'json',data:{},success:function(data,textStatus){var currentDate=Date.parse(data.currentDate)/1000;startCounter(currentDate,el)},error:function(){if(consoleLog){console.log("(jC) Error: Couldn't find dateandtime.php from serverDateSource: "+thisEl.data('userOptions').serverDateSource+"\n(jC) - Make sure the path is correct! \n(jC) - Now using the client-side time (not recommended).")}
var currentDate=Math.floor($.now()/1000);startCounter(currentDate,el)}})}}
function startCounter(currentDate,el){countdown_proc(currentDate,el);if(eventDate>currentDate){$(el).data("jC_interval",setInterval(function(){if(endCounter==!1){currentDate=parseInt(currentDate)+1;countdown_proc(currentDate,el)}},1000))}else{resetHTMLCounter(el)}}
function jCslider(el,unitClass,timeUnit,eventDate,duration){$(el).find(unitClass+" u").each(function(i,el){var twoDigits=(thisEl.data("userOptions").twoDigits=='on')?'0':'';var newIndex=(jCounterDirection=='up')?newIndex=-i:newIndex=i;currNo=parseInt(timeUnit,10)+(newIndex);if(String(parseInt(timeUnit,10)).length>=2){$(el).text(parseInt(timeUnit,10)+(newIndex))}else if(String(parseInt(timeUnit,10)).length==1&&currNo==10){$(el).text(parseInt(timeUnit,10)+(newIndex))}else{$(el).text(twoDigits+(parseInt(timeUnit,10)+(newIndex)))}})
$(el).find(unitClass).animate({top:'0.15em'},200,function(){$(el).find(unitClass+" u:eq(1)").remove();$(el).find(unitClass).prepend('<u></u>');$(el).find(unitClass).css({'top':'-1.24em'})})}
function resetHTMLCounter(el){if(thisEl.data("userOptions").twoDigits=='on'){$(el).find(".days,.hours,.minutes,.seconds").text('00')}else if(thisEl.data("userOptions").twoDigits=='off'){$(el).find(".days,.hours,.minutes,.seconds").text('0')}
if(thisEl.data("jCanimation")=='slide'){$(el).find(".daysSlider u,.hoursSlider u,.minutesSlider u,.secondsSlider u").text('00')}}
function countdown_proc(duration,el){if(customRangeDownCount){if(eventDate>=duration){clearInterval($(el).data("jC_interval"));if(thisEl.data("userOptions").callback){thisEl.data("userOptions").callback.call(this)}}}else{if(eventDate<=duration){clearInterval($(el).data("jC_interval"));if(thisEl.data("userOptions").callback){thisEl.data("userOptions").callback.call(this)}}}
var seconds=(customRange)?duration:eventDate-duration;var thisInstanceFormat=thisEl.data("userOptions").format;if(thisInstanceFormat.indexOf('dd')!=-1){var days=Math.floor(seconds/(60*60*24));seconds-=days*60*60*24}
if(thisInstanceFormat.indexOf('hh')!=-1){var hours=Math.floor(seconds/(60*60));seconds-=hours*60*60}
if(thisInstanceFormat.indexOf('mm')!=-1){var minutes=Math.floor(seconds/60);seconds-=minutes*60}
if(thisInstanceFormat.indexOf('ss')==-1){seconds-=seconds}
if(days==1){$(el).find(".textDays").text(singularLabels[0])}else{$(el).find(".textDays").text(pluralLabels[0])}
if(hours==1){$(el).find(".textHours").text(singularLabels[1])}else{$(el).find(".textHours").text(pluralLabels[1])}
if(minutes==1){$(el).find(".textMinutes").text(singularLabels[2])}else{$(el).find(".textMinutes").text(pluralLabels[2])}
if(seconds==1){$(el).find(".textSeconds").text(singularLabels[3])}else{$(el).find(".textSeconds").text(pluralLabels[3])}
if(thisEl.data("userOptions").twoDigits=='on'){days=(String(days).length>=2)?days:"0"+days;hours=(String(hours).length>=2)?hours:"0"+hours;minutes=(String(minutes).length>=2)?minutes:"0"+minutes;seconds=(String(seconds).length>=2)?seconds:"0"+seconds}
if(!isNaN(eventDate)){$(el).find(".days").text(days);$(el).find(".hours").text(hours);$(el).find(".minutes").text(minutes);$(el).find(".seconds").text(seconds);if(thisEl.data("jCanimation")=='slide'){$(el).find(".daysSlider u:eq(1)").text(days);$(el).find(".hoursSlider u:eq(1)").text(hours);$(el).find(".minutesSlider u:eq(1)").text(minutes);$(el).find(".secondsSlider u:eq(1)").text(seconds);jCslider(el,'.secondsSlider',seconds,eventDate,duration);if(parseInt(seconds,10)==59){jCslider(el,'.minutesSlider',minutes,eventDate,duration)
if(parseInt(minutes,10)==59){jCslider(el,'.hoursSlider',hours,eventDate,duration)
if(parseInt(hours,10)==23){jCslider(el,'.daysSlider',days,eventDate,duration)}}}}}else{if(consoleLog){console.log("(jC) Error: Invalid date! Here's an example: 01 January 1970 12:00:00")}
clearInterval($(el).data("jC_interval"))}
$(el).data("jC_pausedTime",eventDate-duration)}
if(jC_methods[this.options]){return jC_methods[this.options].apply(this,Array.prototype.slice.call(arguments,1))}else if(typeof this.options==='object'||!this.options){return jC_methods.init.apply(this,arguments)}else{console.log('(jC) Error: Method >>> '+this.options+' <<< does not exist.')}}})(jQuery,document,window)