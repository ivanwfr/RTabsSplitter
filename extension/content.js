/* ┌────────────────────────────────────────────────────────────────────────┐ */
/* │ splitter_content.js ................................... CONTENT SCRIPT │ */
/* └────────────────────────────────────────────────────────────────────────┘ */
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/

/* globals console, chrome, setTimeout      */ /* eslint-disable-line no-redeclare */
/* globals dom_sentence, dom_sentence_event */

/* exported CONTENTSCRIPT_JS_TAG, splitter_content */

/* eslint-disable no-warning-comments */

const CONTENTSCRIPT_JS_ID               = "splitter_content_js";
const CONTENTSCRIPT_JS_TAG              =  CONTENTSCRIPT_JS_ID +" (230206:17h:43)";  /* eslint-disable-line no-unused-vars */
/*}}}*/
let splitter_content       = (function() {
"use strict";
let log_this =             false;
let tag_this = log_this || false;
/* log {{{*/
const LF               = String.fromCharCode(10);
const LOG_HEADER_STYLE = "border:2px solid #808; border-radius:0 1em 1em 0; background-color:#111;";
const LOG_HEADER_RESET = "border:none;";

let log = (arg1,...rest) => {
    if(arg1.startsWith("..."))
        console.log(arg1, ...rest);
    else
        console.log("%c "+CONTENTSCRIPT_JS_TAG+" %c "+arg1
                    ,LOG_HEADER_STYLE           ,LOG_HEADER_RESET, ...rest);
};
/*}}}*/

/* INIT */
/*➔ splitter_content_init .. (listeners) {{{*/
/*{{{*/

let activated = false;
/*}}}*/
let splitter_content_init = function(request={})
{
let caller = "splitter_content_init";
if( log_this) log(caller);
/*{{{
console.dir(request);
}}}*/
    dom_modules_IMPORT();

    /* QUERY CURRENT [activated] STATE FROM BACKGROUND SCRIPT {{{*/
    if(!request.activated )
    {
if(log_this) log("...QUERY CURRENT [activated] STATE FROM BACKGROUND SCRIPT");

        add_message_listener();
        send_message({ activated : "undefined" }, "extension {activated} 'state' query");
    }
    /*}}}*/
};
/*}}}*/

/* INIT DEPENDENCIES */
/*  dom_modules_IMPORT {{{*/
let dom_modules_IMPORT = function()
{
if(log_this) console.log("dom_modules_IMPORT");

/* eslint-disable no-undef */
if(typeof dom_details        != "undefined") dom_details       .t_details_IMPORT       (log_this, 1); /* script/dom_details.js     */
if(typeof dom_wot            != "undefined") dom_wot           .t_wot_IMPORT           (log_this, 2); /* script/dom_wot.js         */
//(typeof dom_scroll         != "undefined") dom_scroll        .t_scroll_IMPORT        (log_this, 3); /* script/stub/dom_scroll.js */
if(typeof dom_sentence       != "undefined") dom_sentence      .t_sentence_IMPORT      (log_this, 4); /* script/dom_sentence.js    */

/*{{{
if(typeof dom_sentence_event != "undefined") dom_sentence_event.t_SENTENCE_add_LISTENER(log_this);
}}}*/
/* eslint-ensable no-undef */

};
/*}}}*/

/* MESSAGE LISTENERS */
/*_ add_message_listener {{{*/
let add_message_listener = function()
{
/*{{{*/
let caller = "add_message_listener";

if( log_this) log(caller);
/*}}}*/
    /* [chrome.runtime.onMessage.addListener] {{{*/
    try {
        chrome.runtime.onMessage.addListener( onMessage_listener );
if( log_this) log("...LISTENING TO MESSAGE FROM BACKGROUND SCRIPT...");
    }
    catch(ex) {
        log(caller+":");
        log(             "...CANNOT LISTEN TO MESSAGE FROM BACKGROUND SCRIPT:");
        log("...%c"+ ex  , "color:red");
        console.trace();
    }
    /*}}}*/
};
/*}}}*/
/*_ onMessage_listener {{{*/
let onMessage_listener = function(request, sender, sendResponse) /* eslint-disable-line no-unused-vars */
{
/*{{{*/
let caller = "onMessage_listener";
if( log_this) log(caller+":%c RECEIVING MESSAGE FROM BACKGROUND SCRIPT...", "color:#AFA");
if( log_this) console.dir( request );

/*}}}*/
    /* [request.activated] {{{*/
    if(typeof request.activated != "undefined")
    {
        onMessage_activated(request, sendResponse);

        sendResponse({ ack: JSON.stringify( request ) });
    }
    /*}}}*/
    return true; /* .. async response expected */
};
/*}}}*/

/* MESSAGE HANDLERS */
/*_ onMessage_activated {{{*/
/*{{{*/
let dom_sentence_has_been_initialized;

/*}}}*/
let onMessage_activated = function(request,sendResponse) /* eslint-disable-line no-unused-vars */
{
/*{{{
if( log_this) log("%c➔ Extension %c activated "+activated+" %c .. "+CONTENTSCRIPT_JS_TAG+" ", "color:#AFA", "background-color:"+(request.activated ? "#0A0" : "#00A"), "background-color: black;");

}}}*/
    /* [dom_sentence] INIT {{{*/
    if(!dom_sentence_has_been_initialized)
    {
if(log_this) log("%c➔ INITIALZING dom_sentence..............................", "background-color:#606;");
        dom_sentence_has_been_initialized = true;

        dom_sentence      .t_sentence_IMPORT           (log_this);
    }
    /*}}}*/
    /* [set_activated] {{{*/
    if(     activated != request.activated)
        set_activated(   request );

    /*}}}*/
};
/*}}}*/
/*_ set_activated {{{*/
let set_activated = function(request)
{
/*{{{*/
let caller = "set_activated";

if( tag_this) log("%c "+caller+": ➔ %c activated "+request.activated, "color:#AFA", "background-color:"+(request.activated ? "#0A0" : "#00A"));
/*}}}*/
    /* [activated] STATE {{{*/
    activated = request.activated;

    /*}}}*/
    /* [dom_sentence] STOP {{{*/
    if(!activated) {
        dom_sentence      .t_SENTENCE_RESTORE_ALL (log_this, tag_this);
        dom_sentence_event.t_SENTENCE_del_LISTENER(log_this, tag_this);
        dom_sentence_event.set_mouseUP_display_state(false);
    }
    /*}}}*/
    /* [dom_sentence] START {{{*/
    else {
        dom_sentence_event.t_SENTENCE_add_LISTENER(log_this, tag_this);
        dom_sentence_event.set_mouseUP_display_state(true);

        if(typeof request.theme_dark != "undefined")
            dom_sentence.t_SENTENCE_set_theme_dark( request.theme_dark );
    }
    /*}}}*/
};
/*}}}*/

/* MESSAGES SEND-RECEIVE */
/*▲▲▲▲ send_message {{{*/
let send_message = function(message_object, _caller) /* eslint-disable-line no-unused-vars */
{
/*{{{*/
let caller = "send_message";

let  msg = (message_object.cmd || _caller);
if( log_this) log(caller+": ["+msg+"]");
/*}}}*/
    /* [chrome.runtime.sendMessage] {{{*/
    try {
        chrome.runtime.sendMessage(message_object , function(response) { read_response(response||{}, message_object); });
    }
    catch(ex) {
        log(caller+":");
        log("..."  + msg +": CANNOT SEND MESSAGE TO BACKGROUND SCRIPT:");
        log("...%c"+ ex  , "color:red");
        console.trace();
    }
    /*}}}*/
    return true; /* .. async response expected */
};
/*}}}*/
/*▼▼▼▼ read_response .. [async send_message callback] {{{*/
/*{{{*/
const EMPTY_OBJECT = "empty object";

/*}}}*/
let read_response = function(response,message_object) /* eslint-disable-line no-unused-vars */
{
/*{{{*/
let caller = "read_response";
if(log_this) log(caller+"...RECEIVING ANSWER FROM BACKGROUND SCRIPT:");

/*}}}*/
    /* !response {{{*/
    if(!response)
    {
if(log_this) log("NO RESPONSE");
        return;
    }
    /*}}}*/
/* [details] {{{*/
if( log_this )
{
    let details
        = response.cmd                 ?                response.cmd
        : response.SERVER_URL          ? "SERVER_URL "+ response.SERVER_URL
        : Object.keys(response).length ?      "keys: "+ Object.keys(response)
        :                                               EMPTY_OBJECT
    ;
    if(details != EMPTY_OBJECT) {
        log("...details=["+details+"]");
        log("...response:");
        console.dir(response );
    }
}
/*}}}*/
    /* [onerror] {{{*/
    if(JSON.stringify( response ).indexOf("onerror") >= 0)
    {
        log(caller+" ERROR:"+LF+LF+ response);

    }
    /*}}}*/
    /* response.activated {{{*/
    if(   (typeof       response.activated != "undefined")
       && (activated != response.activated))
    {
        onMessage_activated( response );
    }
    /*}}}*/
    /* HANDLE [response] {{{*/
    else if(response.cmd)
    {
        switch(response.cmd) {
        default: /* none supported as of yet */
        log("...cmd=["+response.cmd+"]");
        }
    }
    /*}}}*/
};
/*}}}*/

/* EXPORT */
/*{{{*/
return { name : CONTENTSCRIPT_JS_ID
    ,    splitter_content_init
};
/*}}}*/

}());

/* ONLOAD .. (with a delay for background script startup) */
setTimeout(splitter_content.splitter_content_init, 500);

/*{{{
"┌─────────────────────────────────────────────────────────────────────────────┐
"│                                                                             │
:e  $BROWSEEXT/SplitterExtension/manifest.json

:e  $BROWSEEXT/SplitterExtension/extension/background.js
"...$BROWSEEXT/SplitterExtension/extension/content.js
:e             $RPROFILES/script/dom_sentence.js
:e             $RPROFILES/script/stub/dom_sentence_event.js
:e             $RPROFILES/script/stub/dom_scroll.js
:e             $RPROFILES/script/stub/dom_sentence_util.js
:e             $RPROFILES/script/stub/dom_log.js
:e             $RPROFILES/stylesheet/dom_host.css

:e             $RPROFILES/script/dom_select.js
:e             $RPROFILES/script/dom_util.js
:e             $RPROFILES/script/dom_log.js

:e             $RPROFILES/script/splitter.js
:e             $RPROFILES/script/dom_load.js
"│                                                                             │
"└─────────────────────────────────────────────────────────────────────────────┘
}}}*/
