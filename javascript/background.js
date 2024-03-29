/* ┌────────────────────────────────────────────────────────────────────────┐ */
/* │ splitter_background.js ............................. BACKGROUND SCRIPT │ */
/* └────────────────────────────────────────────────────────────────────────┘ */
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/

/* globals console, chrome, setTimeout */ /* eslint-disable-line no-redeclare */


/* exported SPLITTER_BACKGROUND_SCRIPT_TAG */

/* eslint-disable no-warning-comments */

const SPLITTER_BACKGROUND_SCRIPT_ID     = "splitter_background_js";
const SPLITTER_BACKGROUND_SCRIPT_TAG    =  SPLITTER_BACKGROUND_SCRIPT_ID  +" (230320:14h:13)";

/*}}}*/
let splitter_background = (function() {
"use strict";
let log_this =              false;
let tag_this = log_this ||  true;
/* log {{{*/
const CSS_LOG_HEAD = "border:2px solid #606; background-color:#111; border-radius:0 1em 1em 0;";
const CSS_LOG_ARG1 = "border:2px solid #660; background-color:#222;";
const CSS_LOG_REST = "border:none;";

let log = (arg1,...rest) => {
    if(String(arg1).startsWith("..."))
        console.log(arg1, ...rest);
    else
        console.log("%c "+SPLITTER_BACKGROUND_SCRIPT_TAG+" %c"+arg1    +"%c"
                    ,CSS_LOG_HEAD                         ,CSS_LOG_ARG1,CSS_LOG_REST, ...rest);
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ IMAGES .............................................................. │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/

const IMG_ACTIVATE  = "/images/rtabs16_6_b.png";
const IMG_UNLOADED  = "/images/rtabs16_6_b_square.png";

/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ EXTENSION ICON ......................... chrome.action .. chrome.tabs │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
let browser_action_click_active_tab_ID;

/*}}}*/
/*➔ add_browser_action_click_listener {{{*/
let add_browser_action_click_listener = function()
{
/*{{{*/
log("%c LISTENING TO BROWSER ACTION CLICK ON EXTENSION ICON...", "color:#FF0");

/*}}}*/
    chrome.action.onClicked.addListener( browser_action_click_listener );
};
/*}}}*/
/*_ browser_action_click_listener {{{*/
let browser_action_click_listener = function(active_tab)
{
    browser_action_click_active_tab_ID = active_tab.id;

    options_toggle_activated();
};
/*}}}*/
/* ICON {{{*/
/*_ set_icon_activate {{{*/
let set_icon_activate = function(tabId) // eslint-disable-line no-unused-vars
{
    chrome.action.setIcon ({  path : IMG_ACTIVATE});
    chrome.action.setTitle({ title : "SPLITTER ACTIVATED" });
};
let set_icon_unloaded = function(tabId) // eslint-disable-line no-unused-vars
{
    chrome.action.setIcon ({  path : IMG_UNLOADED});
    chrome.action.setTitle({ title : "SPLITTER UNLOADED"  });
};
/*}}}*/



/*}}}*/
/* TABS {{{*/
/*… propagate_activated_state_to_all_tabs {{{*/
/*{{{*/
const TABS_MESSAGE_INTERVAL = 50;

/*}}}*/
let propagate_activated_state_to_all_tabs = function(tabs)
{
/*{{{*/
let   caller = "propagate_activated_state_to_all_tabs";

//log("propagate_activated_state_to_all_tabs(tabs)")
//log(tabs)
//console.dir(tabs)
/*}}}*/
    if(!tabs) return; /* tabs aee volatile while transitionning */

if(log_this) log(caller);
if(log_this) log(    "...options:");
if(log_this) console.dir(options);

    for(let i=0; i<tabs.length; ++i)
    {
        if( is_a_browser_tool_url(   tabs[i].url) ) {
if(log_this) log("…SKIPPING..TAB [id "+   tabs[i].id +"] .. [url "+tabs[i].url+"]");

        }
        else {
if(log_this) log("MESSAGING TAB [id "+    tabs[i].id +"] .. [url "+tabs[i].url+"]");

            options.is_active_tab = (tabs[i].id == browser_action_click_active_tab_ID);
            let request = options;
if(log_this) log( request );

            /* TIME INTERVAL ALLOWS TO ASSOCIATE [chrome.runtime.lastError] WITH [last_messaged_tab_ID] */
            setTimeout(function() { send_and_check_message(tabs[i].id, request); }, i*TABS_MESSAGE_INTERVAL);
        }
    }
};
/*}}}*/
/*… send_and_check_message {{{*/
/*{{{*/
let last_messaged_tab_ID;

/*}}}*/
let send_and_check_message = function(tab_ID, request)
{
/*{{{*/

if(log_this) log("send_and_check_message("+tab_ID+")");
if(log_this) log(    "...request:");
if(log_this) console.dir(request);
/*}}}*/

    last_messaged_tab_ID = tab_ID;
    chrome.tabs.sendMessage(tab_ID, request, on_message_response);
};
/*}}}*/
/*… on_message_response {{{*/
let on_message_response = function(response)
{
/*{{{*/

/*}}}*/
    let response_from_last_messaged_tab = (browser_action_click_active_tab_ID == last_messaged_tab_ID);
    if(!check_lastError(response_from_last_messaged_tab) )
        return;

    if(response)
    {
if(log_this) log("RESPONSE FROM CONTENT SCRIPT:");
if(log_this) console.dir( { browser_action_click_active_tab_ID
             ,              last_messaged_tab_ID
             ,              response_from_last_messaged_tab
             ,              response
});

        if( response.div_tools_xy)
            options .div_tools_xy
                =   { x: response.div_tools_xy.x
                    , y: response.div_tools_xy.y };
    }
};
/*}}}*/
/*… is_a_browser_tool_url {{{*/
let is_a_browser_tool_url = function(url)
{
    return (url.startsWith("chrome://") ) ? true
        :  (url.startsWith("about:"   ) ) ? true
        :                                  false
    ;
};
/*}}}*/
/*_ check_lastError {{{*/
/*{{{*/

const RELOAD_MESSAGE
    = "┌──────────────────────────────┐\n"
    + "│  You MUST reload ALL TABS    │\n"
    + "│ that were ALREADY OPENED     │\n"
    + "│ when STARTING THE EXTENSION  │\n"
    + "└──────────────────────────────┘\n";

const LAST_WARN_DELAY_MS = 500;
let   last_warn_time_MS;
/*}}}*/
let check_lastError = function(response_from_last_messaged_tab)
{
/*{{{*/

    /* Note:
     * .. accessing [chrome.runtime.lastError]
     * .. is all it takes to clear the
     * .. "Unchecked runtime.lastError" warning
     */
/*}}}*/
    if(!chrome.runtime.lastError )
        return true; // i.e. checked
/*{{{*/
if(log_this) log("CHECKED %c some tabs to reload ? %c"+chrome.runtime.lastError.message
                    ,       "background-color:#600",  "background-color:#600");
/*}}}*/
    /* handle RELOAD_MESSAGE {{{*/
    if(   response_from_last_messaged_tab
       && chrome.runtime.lastError.message.includes("Receiving end does not exist")
      ) {
        let time_MS = new Date().getTime();
        if((time_MS - last_warn_time_MS) < LAST_WARN_DELAY_MS) return true; // No sweat, same bunch, already warned about
        last_warn_time_MS = time_MS;

        /* USER ALERT */
        check_RELOAD_MESSAGE();

        options_toggle_activated( false );
    }
    /*}}}*/
    return    false; // i.e. not checked
};
/*}}}*/
/*_ check_RELOAD_MESSAGE {{{*/
let RELOAD_MESSAGE_formatted;

let check_RELOAD_MESSAGE = async function()
{
    /* manifest V2 {{{*/
    if(typeof chrome.tabs.executeScript != "undefined")
    {
/*{{{*/
        log( "check_RELOAD_MESSAGE:\n"
            +       RELOAD_MESSAGE);
/*}}}*/
        chrome.tabs.executeScript({ code : "alert('"+ RELOAD_MESSAGE.replace(/│*\n/g,"\\n")+"')" });
        return;
    }
    /*}}}*/
    /* manifest V3 {{{*/
    else {
        let [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
/*{{{*/
        log( "check_RELOAD_MESSAGE: "+tab.title+" "+tab.url+"\n"
            +       RELOAD_MESSAGE);
/*}}}*/

        if(!RELOAD_MESSAGE_formatted)
            RELOAD_MESSAGE_formatted = RELOAD_MESSAGE.replace(/│/g," ");

        let user_alert               = function(msg) { alert(msg); }; /* eslint-disable-line no-alert */

        chrome.scripting
            .executeScript({ target : { tabId: tab.id }
                           , func   :   user_alert
                           , args   : [ RELOAD_MESSAGE_formatted ]
            })
/*{{{
        .then         (() => { console.log(    "tab.id:", tab.id); })
}}}*/
        ;
    }
    /*}}}*/
};
/*}}}*/
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ MESSAGE FROM CONTENT-SCRIPT .......................... chrome.runtime │
    // └───────────────────────────────────────────────────────────────────────┘
/*➔ add_message_listener {{{*/
let add_message_listener = function()
{
/*{{{*/

if(log_this) log("%c LISTENING TO MESSAGE FROM CONTENT SCRIPT...", "color:#AFA");
/*}}}*/

    chrome.runtime.onMessage.addListener( onMessage_listener );
};
let onMessage_listener = function(request, sender, sendResponse)
{
/*{{{*/
if(tag_this) log("%c RECEIVING MESSAGE FROM CONTENT SCRIPT: "+Object.keys(request), "color:#0FF;");
if(log_this) log(     "...request:");
if(log_this) console.dir( request  );
/*}}}*/
    /* 1. PAGE-LOAD-TIME ACTIVATED QUERY {{{*/
    if( request.activated && (request.activated == "undefined"))
    {
        let response = options;

if(tag_this) log("➔ SENDING response.activated=["+response.activated+"]");
if(log_this) log(       "...response:");
if(log_this) console.dir(   response  );
        sendResponse(       response  );
    }
    /*}}}*/
    /* 2. DOM_EVENT THEME SET {{{*/
    if( request.theme_dark && (request.theme_dark != "undefined"))
    {
        options.theme_dark = request.theme_dark;

        let response = options;

if(tag_this) log("➔ SENDING response.theme_dark=["+response.theme_dark+"]");
if(log_this) log(       "...response:");
if(log_this) console.dir(   response  );
        sendResponse(       response  );
    }
    /*}}}*/
    /* 3. RELOAD EXTENSION {{{*/
    if(   request.cmd && request.cmd == "reload")
    {
log("%c RELOADING EXTENSION: ("+SPLITTER_BACKGROUND_SCRIPT_TAG+")", "background-color:red; border:1px; border-radius:1em; padding:0.5em;");

        setTimeout(function() { chrome.runtime.reload(); }, 1000);
    }
    /*}}}*/
    return sendResponse ? true : false; // i.e. ASYNC / SYNC usage of sendResponse
};
/*}}}*/

    // ┌───────────────────────────────────────────────────────────────────────┐
    // │ OPTIONS [LOAD] [APPLY] [SAVE] ....................................... │
    // └───────────────────────────────────────────────────────────────────────┘
/*{{{*/
let options = { activated: false };

/*}}}*/
/*_ options_toggle_activated {{{*/
let options_toggle_activated = function(state) // set or toggle
{
/*{{{*/
let   caller = "options_toggle_activated";

/*}}}*/
    options.activated = state || !options.activated;
log(caller+" ➔ %c BROWSER ACTION %c activated "+options.activated, "color:#FF0", options.activated ? "color:#0F0" : "color:#F00");

    if( options.activated ) set_icon_activate();
    else                    set_icon_unloaded();

    chrome.tabs.query({}, propagate_activated_state_to_all_tabs);
};
/*}}}*/

    return { add_browser_action_click_listener
        ,    add_message_listener

        /* DEBUG-ONLY */
        , options_toggle_activated
    };
})();
    /* from manifest V2 to V3 */
    if(typeof chrome.action == "undefined") chrome.action = chrome.browserAction;
    splitter_background.add_browser_action_click_listener();
    splitter_background.add_message_listener();
//  splitter_background.options_toggle_activated(true);//FIXME

/*{{{
"┌─────────────────────────────────────────────────────────────────────────────┐
"│                                                                             │
:e  $BROWSEEXT/SplitterExtension/manifest.json

"...$BROWSEEXT/SplitterExtension/javascript/background.js
:e  $BROWSEEXT/SplitterExtension/javascript/content.js
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
