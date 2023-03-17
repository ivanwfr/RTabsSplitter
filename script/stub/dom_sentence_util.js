/*┌──────────────────────────────────────────────────────────────────────────┐*/
/*│ dom_sentence_util               [dom_sentence] ➔ [dom_util] dependencies │*/
/*└──────────────────────────────────────────────────────────────────────────┘*/
/* jshint esversion: 9, laxbreak:true, laxcomma:true, boss:true {{{*/

/* globals console, window, document, Node, Set */

/* exported dom_sentence_util */

const DOM_SENTENCE_UTIL_JS_ID        = "dom_sentence_util";
const DOM_SENTENCE_UTIL_JS_TAG       = DOM_SENTENCE_UTIL_JS_ID  +" (230124:17h:09)";  /* eslint-disable-line no-unused-vars */
/*}}}*/
let dom_sentence_util    = (function() {
"use strict";

/* console {{{*/
/* eslint-disable no-unused-vars */

/* CSS */
const lf1  = "color:#964B00;";
const lf2  = "color:#FF0000;";
const lf3  = "color:#FFA500;";
const lf4  = "color:#FFFF00;";
const lf5  = "color:#9ACD32;";
const lf6  = "color:#6495ED;";
const lf7  = "color:#EE82EE;";
const lf8  = "color:#A0A0A0;";
const lf9  = "color:#FFFFFF;";
const lf0  = "color:#707070; text-shadow:#000 2px 2px 1px;"; /* offset-x offset-y blur-radius */
const lfX  = [ lf0 ,lf1 ,lf2 ,lf3 ,lf4 ,lf5 ,lf6 ,lf7 ,lf8 ,lf9 ];

const lbH  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0 1ex 1ex   0; padding:0 .5em 0 .5em; border-radius:1em 1em 1em 1em; background:linear-gradient(to bottom, #555 0%, #223 80%, #454 100%);";
const lbL  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0   0   0 1ex; padding:0 .5em 0 .5em; border-radius:1em   0   0 1em; background:linear-gradient(to   left, #333 0%           ,#445 100%);";
const lbR  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0 1ex   0   0; padding:0 .5em 0 .5em; border-radius:  0 1em 1em   0; background:linear-gradient(to  right, #333 0%           ,#544 100%);";
const lbC  = "font-weight:900; line-height:1.5em; border:1px solid gray; margin:   0   0   0   0; padding:0 .5em 0 .5em; border-radius:  0   0   0   0;";

let dir               = console.dir;
let log               = console.log;
let logX = (msg,l_x) => console.log("%c"+msg, lbR+lfX[l_x]);
let log0 = (msg)     =>         logX(    msg, 0  );
let log1 = (msg)     =>         logX(    msg, 1  );
let log2 = (msg)     =>         logX(    msg, 2  );
let log3 = (msg)     =>         logX(    msg, 3  );
let log4 = (msg)     =>         logX(    msg, 4  );
let log5 = (msg)     =>         logX(    msg, 5  );
let log6 = (msg)     =>         logX(    msg, 6  );
let log7 = (msg)     =>         logX(    msg, 7  );
let log8 = (msg)     =>         logX(    msg, 8  );
let log9 = (msg)     =>         logX(    msg, 9  );

let logs = { dir
        ,    log
        ,    log0
        ,    log1
        ,    log2
        ,    log3
        ,    log4
        ,    log5
        ,    log6
        ,    log7
        ,    log8
        ,    log9
    };

/* eslint-enable  no-unused-vars */
/*}}}*/

/*➔ t_get_htmlEntities {{{ */
/*{{{
const regexp_HTML_AMP           = new RegExp("&"                                        , "g");
const regexp_HTML_LT            = new RegExp("<"                                        , "g");
const regexp_HTML_GT            = new RegExp(">"                                        , "g");
const regexp_HTML_APOS          = new RegExp("'", "g");
const regexp_HTML_QUOTE         = new RegExp('"', "g");
}}}*/
const regexp_HTML_ENTITIES = new RegExp("[\\u00A0-\\u9999<>\\&']", "gim");

let t_get_htmlEntities = function(str)
{
/*{{{
    return String(str)
        .replace(regexp_HTML_AMP  , "&amp;" )
        .replace(regexp_HTML_LT   , "&lt;"  )
        .replace(regexp_HTML_GT   , "&gt;"  )
        .replace(regexp_HTML_APOS , "&apos;")
        .replace(regexp_HTML_QUOTE, "&quot;")
    ;
}}}*/
    return str.replace(regexp_HTML_ENTITIES, function(c) { return "&#"+c.charCodeAt(0)+";"; });
};
/*}}}*/
/*_ t_copy_to_CLIPBOARD {{{*/
/*{{{*/
let cb_textArea = null;

/*}}}*/
let t_copy_to_CLIPBOARD = function(copy_content)
{
    /* [cb_textArea] {{{*/
    if(!cb_textArea) {
        cb_textArea     = document.createElement("TEXTAREA");
        cb_textArea.id  = "cb_textArea";
        cb_textArea.style.position        = "fixed";
        cb_textArea.style.top             = "1em";
        cb_textArea.style.left            = "1em";
        cb_textArea.style.width           =  "95%";
        cb_textArea.style.height          = "25em";
        cb_textArea.style.backgroundColor = "salmon";
/*{{{
        let shadow_root = get_shadow_root();
        shadow_root.appendChild(cb_textArea);
}}}*/
        document.body.appendChild(cb_textArea);
/*{{{
      document.body.appendChild(cb_textArea);
      cb_textArea.style.display         = "none";
      cb_textArea.onclick               = function(e) { this.display = "none"; };
}}}*/
    }
    /*}}}*/
    /* BUFFER TEXTAREA SHOW AND FILL WITH CONTENT {{{*/
    cb_textArea.style.display = "block";
    cb_textArea.value         = copy_content;

    /*}}}*/
    /* COPY TO CLIPBOARD {{{*/
    cb_textArea.select();

    if( !document.execCommand("copy") )
    {
/*{{{
        console.log("%c*** COPY TO CLIPBOARD REJECTED ***", "background-color:red");
        console.log("%c USER EVENT CALLBACK REQUIRED "    ,            "color:red");
}}}*/
    }
    /*}}}*/
    /* BUFFER TEXTAREA HIDE AND CLEAR {{{*/
    cb_textArea.style.display = "none";
    cb_textArea.value         = "";

    /*}}}*/
};
/*}}}*/

/*➔ [set_el_class] [add_el_class] [del_el_class] [has_el_class] [clear_el_classList] {{{*/
let add_el_class     = function(el, className) { if(!el || !el.classList) return      ; if(   !el.classList.contains( className )) el.classList.add   ( className ); };
let del_el_class     = function(el, className) { if(!el || !el.classList) return      ; if(    el.classList.contains( className )) el.classList.remove( className ); };
let set_el_class     = function(el, className) { if(!el || !el.classList) return      ;                                            el.className       = className  ; };
let has_el_class     = function(el, className) { if(!el || !el.classList) return false; return el.classList.contains( className );                                   };
/*_ clear_el_classList .. cycle_el_classList .. cycle_id_classList {{{*/
let clear_el_classList = function(el_or_id, classList) { cycle_el_classList(el_or_id, classList, true); }; /* eslint-disable-line no-unused-vars */
let cycle_el_classList = function(el_or_id, classList, remove_only)
{
    let el = (typeof               el_or_id == "object")
        ?                          el_or_id
        :  document.getElementById(el_or_id)
    ;
    /* REMOVE ALL OF [classList] */
    let next_picked;
    for(let i=0; i <              classList.length; ++i) {
        if(el.classList.contains( classList[i] ))
        {
            el.classList.remove ( classList[i] );
            next_picked    =      classList[i+1];
        }
    }
    if( remove_only ) return undefined;

    /* WRAP [next_picked] */
    if(!next_picked) next_picked = classList[0];
/*{{{
log("%c next_picked=["+next_picked+"]", lbH+lfX[parseInt(next_picked)])
}}}*/

    /* ADD [next_picked] */
    if( next_picked) el.classList.add( next_picked );

/*{{{
let txt = "";
for(let i=0; i < classList.length; ++i) {
    txt += (next_picked == classList[i])
    ? " ["+classList[i]+"]"
    :  " "+classList[i];
}
logXXX(txt);
}}}*/
    return next_picked;
};

let cycle_id_classList = cycle_el_classList; /* eslint-disable-line no-unused-vars */
/*}}}*/
/*_ flip_el_class .. flip_id_class {{{*/
let flip_el_class = function(el_or_id, className)
{
    let el = (typeof               el_or_id == "object")
        ?                          el_or_id
        :  document.getElementById(el_or_id)
    ;
    if( has_el_class(el, className) ) del_el_class(el, className);
    else                              add_el_class(el, className);
};

let flip_id_class = flip_el_class; /* eslint-disable-line no-unused-vars */
/*}}}*/
/*_ set_el_class_on_off {{{*/
let set_el_class_on_off = function(el, className, on_off) /* eslint-disable-line no-unused-vars */
{
    if(on_off) add_el_class(el, className);
    else       del_el_class(el, className);

};
/*}}}*/
/*_ set_el_class_removing {{{*/
let set_el_class_removing = function(el_or_id, class_to_add, classes_to_remove) /* string or collection */ /* eslint-disable-line no-unused-vars */
{
    if(       typeof      classes_to_remove != "object") classes_to_remove = [ classes_to_remove ];

    let el = (typeof               el_or_id == "object")
        ?                          el_or_id
        :  document.getElementById(el_or_id)
    ;
    if(!el) return false; /* @hapens with dom_sticky.html */
    /* [classes_to_remove] */
    let removed = "";
    for(let i=0; i <               classes_to_remove.length; ++i)
    {
        if( el.classList.contains( classes_to_remove[i] )) {
            el.classList.remove  ( classes_to_remove[i]  );
            removed =              classes_to_remove[i]   ;
        }
    }

    /* [class_to_add] */
    if( class_to_add )
    {
        if(!el.classList.contains( class_to_add ))
            el.classList.add     ( class_to_add );
    }

    return removed;
};
/*}}}*/
/*  is_marked_to_hide {{{*/
const MARKED_TO_HIDE        = "marked_to_hide";
let is_marked_to_hide = function( node ) /* eslint-disable-line no-unused-vars */
{
    return has_el_class(node, MARKED_TO_HIDE);

};
/*}}}*/
/*}}}*/

/*➔ show_CR_LF {{{*/
const regexp_CR              = new RegExp("\\r", "g");
const regexp_LF              = new RegExp("\\n", "g");
const SYMBOL_DOWN_LEFT_ARROW = "\u21B5";
let show_CR_LF = function(text)
{
    return text
        .   replace(regexp_CR,  "")
        .   replace(regexp_LF, SYMBOL_DOWN_LEFT_ARROW)
        .   trim()
    ;
};
/*}}}*/
/*➔ ellipsis {{{*/
const HORIZONTAL_ELLLIPSIS = "\u2026";
const ELLIPSIS_DEFAULT_LEN = 96;
const ELLIPSIS_SHORT_LEN   = 48;

let ellipsis_16 = function(msg) /* eslint-disable-line no-unused-vars */
{
    return mPadEnd( ellipsis(msg, 16) , 16);
};

let ellipsis_short = function(msg)
{
    return ellipsis(msg, ELLIPSIS_SHORT_LEN);
};

let ellipsis = function(_msg, len=ELLIPSIS_DEFAULT_LEN)
{
    let msg = show_CR_LF( String(_msg) );
    return (msg.length    <= len)
        ?   msg
        :   msg.substring(0, len-3)+HORIZONTAL_ELLLIPSIS
    ;
};
/*}}}*/
/*_ mPadStart .. mPadEnd {{{*/
let mPadStart = function(s,l,c=" ") { s = String(s); while(s.length < l) s = c+s; return s; }; /* eslint-disable-line no-unused-vars */

let mPadEnd   = function(s,l,c=" ") { s = String(s); while(s.length < l) s = s+c; return s; };
/*}}}*/

/*➔ get_el_parent_fragment {{{*/
let get_el_parent_fragment = function(el)
{
    while( el ) {
        if(el.shadowRoot                             ) return el;
        if(el.nodeType == Node.DOCUMENT_FRAGMENT_NODE) return el;
        el              = el.parentNode;
    }
    return null;
};
/*}}}*/
/*➔ get_el_parent_with_tag {{{*/
let get_el_parent_with_tag = function(el,tag)
{
    if( el.nodeName == "#text")
        el     = el.parentElement;

    while(el && (el.tagName != tag))
        el     = el.parentElement;

    if(    !el                        ) return null;
    return (         tag == el.tagName) ? el : null;
};
/*}}}*/

/*➔ get_el_parent_with_class {{{*/
let get_el_parent_with_class = function(el, className)
{
    while(   el ) {
        if(  el.classList.contains( className )) return el;
        el = el.parentElement;
    }
    return null;
};
/*}}}*/
/*➔ get_el_child_with_class {{{*/
let get_el_child_with_class = function(parent,className,level=1)
{
    if(!parent) return null;

    for(let c=0; c < parent.children.length; ++c) {
        /* direct child {{{*/
        let child  = parent.children[c];
        if((child != null) && has_el_class(child, className)) {
/*{{{
log("get_el_child_with_class("+get_id_or_tag(parent)+" , "+className+" , "+level+") %c DIRECT CHILD "+get_id_or_tag(child)+"", lbH+lf4);
}}}*/

            return child;
        }
        /*}}}*/
        /* descendant {{{*/
        if(child.children.length)
        {
            if( child = get_el_child_with_class(child, className, level+1)) {
/*{{{
log("get_el_child_with_class("+get_id_or_tag(parent)+" , "+className+") %c LEVEL "+level+" DESCENDANT "+get_id_or_tag(child)+"", lbH+lf3);
}}}*/

                return child;
            }
        }
        /*}}}*/
    }

    return null;
};
/*}}}*/
/*➔ get_el_xy {{{*/
let get_el_xy = function(el)
{
    if(!el) return null;
    let  x = 0;
    let  y = 0;

    let cs = window.getComputedStyle(el);

    if(   (cs.position == "fixed"   )
       || (cs.position == "absolute")
      ) {
/*{{{
log("%c"+(el.id || el.tagName)+" "+cs.position,lbH+lf7);
}}}*/
        x   = el.offsetLeft;
        y   = el.offsetTop ;
    }
    else {
/*{{{
log("%c"+(el.id || el.tagName)+" "+cs.position,lbH+lf8);
}}}*/
        while(el) {
            x  += el.offsetLeft;
            y  += el.offsetTop ;
            el  = el.offsetParent;
        }
/*{{{
        let r = el.getBoundingClientRect();
        y     = r.top  + window.scrollY;
        x     = r.left + window.scrollX;
}}}*/
    }

    return { x , y };
};
/*}}}*/
/*_ get_id_or_tag {{{ */
let get_id_or_tag = function(node)
{
    return !node           ? ("null_node"                        )
        :   node.id        ? ("#"+ node.id                       )
        :   node.className ? (node.tagName+"."+ node.classList[0])
        :                    (node.tagName                       )
    ;
};
/*}}}*/
/*_ is_el_or_child_of_parent_el {{{*/
let is_el_or_child_of_parent_el = function(el, parent_el)
{
    if(!parent_el) return false;

    while(el && (el != parent_el))
        el     = el.parentElement;

    return (el == parent_el);
};
/*}}}*/
/*_ is_el_or_child_of_class {{{*/
let is_el_or_child_of_class = function(el, className)
{
    while(el && !el.classList.contains(className))
        el     = el.parentElement;
    return el;
};
/*}}}*/

/*➔ get_n_lbl {{{ */
let get_n_lbl = function(node)
{
    if(!node                 ) return "null_node";
    if( node == window       ) return "window";
    if( node == document.body) return "body";

/*  if(node.id    ) try { return            node.tagName +"#"+ node.id                                ; } catch(ex) {} */

    if(node.id    ) try { return       "#"+ node.id                                                   ; } catch(ex) {}
    if(node.title ) try { return "title=["+ node.title +"]"                                           ; } catch(ex) {}

    let                          n_lbl  = null;
    try                 {        n_lbl  = node.tagName +(node.className ? ("."+ node.className) : "") ; } catch(ex) {}
    if(   n_lbl )   try {        n_lbl += " .. TEXT=["+ truncate(node.textContent,  24)+"]"           ; } catch(ex) {}
    if(   n_lbl )         return n_lbl;

    try                 { return              "TEXT=["+ truncate(node.textContent,  24)+"]"           ; } catch(ex) {}
    try                 { return                                 node.tagName                         ; } catch(ex) {}
    try                 { return                                 node.nodeType                        ; } catch(ex) {}

    return "";
};
/*}}}*/
/*_ truncate {{{*/
let truncate = function(_msg, length=80)
{
    let msg = strip_CR_LF( String(_msg) );
    return (msg.length <= length)
        ?   msg
        :   msg.substring(0, length-3)+"..."
    ;
};
/*}}}*/
/*_ strip_CR_LF {{{*/
let strip_CR_LF = function(text)
{
    return text
        .   replace(regexp_CR,  "")
        .   replace(regexp_LF, " ")
        .   trim()
    ;
};
/*}}}*/

/*➔ get_node_sibling_at_offset {{{*/
let get_node_sibling_at_offset = function(node,offset)
{
    if(offset > 0)
    {
        for(let next_node  = node.nextElementSibling
            ;   next_node
            ;   next_node  = next_node.nextElementSibling
           ) {
            if( next_node.nodeName == node.nodeName) {
                if( offset ) offset -= 1;
                if(!offset ) return next_node;
            }
        }
    }
    else {
        for(let prev_node  = node.previousElementSibling
            ;   prev_node
            ;   prev_node  = prev_node.previousElementSibling
           ) {
            if( prev_node.nodeName == node.nodeName) {
                if( offset ) offset += 1;
                if(!offset ) return prev_node;
            }
        }
    }
    return null;
 };
/*}}}*/
/*➔ get_parent_tag_id_class_chain {{{*/
const LF    = String.fromCharCode(10);
const PREFIX = "                               \u21B3";
let get_parent_tag_id_class_chain = function(el)
{
    let array = [];

    while( el )
    {
        let e_class = (el.id || el.className) ? "left"   : ""     ;
        let i_class = (         el.className) ? "center" : "right";
        let c_class =                                      "right";

        let el_className = ellipsis_short(el.className);

        let rank         = get_nodeName_rank(el);
        let el_tagName   = el.tagName+( (rank > 1) ? "["+rank+"]":"");

        array.push(   (               "<em class='tag   "+e_class+"'>" + el_tagName   +"</em>"     ) /* TAG     */
                   +  (el.id        ? "<em class='id    "+i_class+"'>#"+ el.id        +"</em>" : "") /* ID      */
                   +  (el_className ? "<em class='class "+c_class+"'>."+ el_className +"</em>" : "") /* CLASS   */
                  );
        el = el.parentElement;
    }

    let parent_id_class_chain = "";

    for(let l=0, i=array.length-1; i>=0; ++l, --i)
        parent_id_class_chain
            += ((l>0) ? (LF+" "+PREFIX.slice(-l))+" " : "")
            +            array[i];

    return parent_id_class_chain;
};
/*}}}*/
/*_ get_nodeName_rank {{{*/
let get_nodeName_rank = function(node)
{
    if(node.nodeType == Node.ATTRIBUTE_NODE) return null;

    let rank = 1;
    for(let prev_node =      node.previousElementSibling
    ;       prev_node
    ;       prev_node = prev_node.previousElementSibling
    ) {
        if(prev_node.nodeName == node.nodeName)
            rank += 1;
    }
    return rank;
 };
/*}}}*/

/* EVENT */
/*  get_event_target {{{*/
let get_event_target = function(e)
{
    let e_target = e.currentTarget || e.target;

    let     e_path = e.composedPath();
    if     (e_path[0] && (e_path[0].tagName != "IMG")) e_target = e_path[0]               ; /* pick first */
    else if(e_path[1]                                ) e_target = e_path[1]               ; /* but skip first IMG */
    else if(e_path[0]                                ) e_target = e_path[0]               ; /* .. if possible */

    else if(e.originalTarget                         ) e_target = e.originalTarget        ;
    else if(e.explicitOriginalTarget                 ) e_target = e.explicitOriginalTarget;

    return e_target;
};
/*}}}*/
/*_ t_get_event_target {{{*/
let t_get_event_target = function(e) /* eslint-disable-line complexity */
{
    let e_target = get_event_target(e);

    let el;
    e_target
        = ((el = e_target.firstElementChild) && (el.tagName == "INPUT")) ?                                         e_target.firstElementChild
        : ((el = e_target                  ) && (el.htmlFor           )) ? (document.getElementById(el.htmlFor) || e_target)
        : ((el = e_target.parentElement    ) && (el.htmlFor           )) ? (document.getElementById(el.htmlFor) || e_target)
        : /*..........................................................*/                                           e_target
    ;

/*{{{
console.log("t_get_event_target: return "+e_target.tagName+" "+e_target.className)
console.log("e_target:",e_target)
}}}*/
    return e_target;
};
/*}}}*/
/*_ get_event_XY {{{*/
let get_event_XY = function(e)
{
    let x, y;
    if(e.changedTouches) {
        x = parseInt(e.changedTouches[0].clientX);
        y = parseInt(e.changedTouches[0].clientY);
    }
    else {
        x = parseInt(                  e.clientX);
        y = parseInt(                  e.clientY);
    }
/*{{{
if(log_this) log("get_event_XY: return { "+x+" , "+y+" }");
}}}*/
    return { x , y };
};
/*}}}*/

/* OBJECT */
/*{{{*/
let get_el_methodNames = function(obj,_filter_str)
{
    let    propertyNames = new Set(); /* .. no duplicates */
    let    current_obj   = obj;
    do {
        Object.getOwnPropertyNames( current_obj ).map((p_name) => propertyNames.add( p_name ) );
    }
    while((current_obj   = Object.getPrototypeOf( current_obj )));

    let    propKeys      = [ ...propertyNames.keys() ];

    let    methodNames   =  propKeys.filter((key) => typeof obj[key] === "function");

    if(_filter_str)
    {
        let filter_str   = _filter_str.toLowerCase();
        methodNames      = methodNames.filter((name) => name.toLowerCase().includes(filter_str));
    }

    return methodNames.sort();
};
/*}}}*/
/*{{{*/
let log_el_methodNames = function(_obj,_filter_str)
{
    console.dir( _obj );

    console.dir(get_el_methodNames(_obj, _filter_str));
};
/*}}}*/

/* EXPORT */
/*{{{*/
return { name : DOM_SENTENCE_UTIL_JS_ID

    /* EVENT */
    ,    t_get_event_target
    ,    get_event_XY

    , t_get_htmlEntities
    , t_copy_to_CLIPBOARD

    , set_el_class
    , add_el_class
    , del_el_class
    , has_el_class
    , clear_el_classList

    , show_CR_LF
    , ellipsis

    , get_el_parent_fragment
    , get_el_parent_with_tag
    , get_el_parent_with_class
    , get_el_child_with_class
    , get_el_xy
    , get_id_or_tag
    , is_el_or_child_of_class
    , is_el_or_child_of_parent_el

    , get_n_lbl
    , get_node_sibling_at_offset
    , get_parent_tag_id_class_chain

    /* OBJECT */
    , get_el_methodNames
    , log_el_methodNames

    , logs
};
/*}}}*/

 }());

/*{{{
"┌─────────────────────────────────────────────────────────────────────────────┐
"│                                                                             │
:e  $BROWSEEXT/SplitterExtension/manifest.json

:e  $BROWSEEXT/SplitterExtension/javascript/background.js
:e  $BROWSEEXT/SplitterExtension/javascript/content.js
:e             $RPROFILES/script/dom_sentence.js
:e             $RPROFILES/script/stub/dom_sentence_event.js
:e             $RPROFILES/script/stub/dom_scroll.js
"...           $RPROFILES/script/stub/dom_sentence_util.js
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
