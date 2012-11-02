(function( window, undefined ) {

var kojax = function($, History) {
    var cache = {};
    var counter = 0;
    window.cc = cache;
    // Private
    function modifyHistory($dom, context, options) {
        var state = {
          id: context.id,
          url: context.url,
          title: $dom.find('title').html(),
          counter: ++counter,
        };
        History.pushState(state, state.title, state.url);
    }

    // Private
    function update($dom, context, options) {
        if (options.history) {
            modifyHistory($dom, context, options);
        }
        
        $dom.find('block').each(function() {
            var $block = $(this);
            $($block.attr('selector')).html($block.html());
        });
        $dom.find('jquery').each(function() {
            var $this = $(this);
            var selector = $this.attr('selector');
            var fn = $this.attr('function');
            var args = $this.find('arg').map(function() {
                return $(this).text();
            });
            $(selector)[fn](args[0], args[1], args[2], args[3], args[4]);
        });
    }

    // Private
    function handle(event) {
        var $this = $(this);
    }

    // Private
    function request(context, options, callback) {
        if (cache[context.id]) {
            callback(cache[context.id], context, options);
            return false;
        }
        var o = {
            beforeSend: function(xhr) {
                xhr.setRequestHeader('Accept', 'application/x-kojax');
            },
            success: function(data, status, xhr) {
                var $dom = $(data);
                cache[context.id] = $dom;
                callback($dom, context, options);
            }
        }
        $.extend(o, options);
        $.ajax(context.url, o);
    }

    // Public
    function kojax(url, options, id) {
        if (!id) {
            id = (new Date).getTime();
        }
        var o = {
            event: 'click',
            history: true,
        };
        $.extend(o, options);
        var context = {
            url: url,
            id: id,
        };
        request(context, o, update);
    }

    $.kojax = kojax;
    $.kojaxBind = function(selector, options, bind) {
        if(!bind) {
            bind = 'click';
        }
        $('body').on(bind, selector, function(event) {
            var $this = $(this);
            if (!$this.attr('href').match(/^http/)) {
                event.preventDefault();
                kojax($this.attr('href'), options);
            }
        });
    }
    History.Adapter.bind(window, 'statechange', function(event) {
        var State = History.getState();
        if (State.data.counter !== counter || counter == 0) {
            if (State.data.counter) {
                kojax(State.url, {
                    history: false,
                }, State.data.id);
            } else {
                window.location = State.url;
            }
            counter = State.data.counter;
        }
    });
    History.replaceState({id: -1,}, null, window.location);
}

// Option AMD support.
if (typeof define === 'function' && define.amd) {
    define([ 'jquery'
           , 'history'
           , 'history.adapter.jquery'
           , 'history.html4'
           ], kojax);
} else if (
    typeof jQuery === 'function'
        && jQuery.fn.jquery
        && typeof History == 'function') {
    kojax(jQuery, History);
} else {
    console.log("Error: Dependencies not loaded.");
}

})( window );