var dx = {};

dx.helpers = {};

dx.getMainElement = function (controlId, frame) {
    var idRegExp = new RegExp('(^|_)' + controlId + '$');

    var $control = $('*', frame).filter(function () {
        return idRegExp.test(this.id);
    });

    if (!$control.length) {
        idRegExp = new RegExp('(^|_)' + controlId + '(_\\d+)?$');
        
        $control = $('*', frame).filter(function () {
            return idRegExp.test(this.id);
        });
    }

    if (!$control.length) {
        throw 'DX control not found: id = ' + controlId;
    }

    if ($control.length > 1)
        throw 'DX control ambiguous match: id = ' + controlId;

    return $control;
};

dx.getClientInstance = function (clientId) {
    return aspxGetControlCollection().Get(clientId);
};

dx.callbackWatcher = (function() {
    var helpers = [ ];
    var subscribe = function(helper) { helpers.push(helper); };
    var isWait = function() {
        for(var i = 0; i < helpers.length; i++) {
            var helper = helpers[i];
            if(helper && helper.isWaitCallback())
                return true;
        }
        return false;
    };
    return { isWaitCallback: isWait, subscribe: subscribe };
})();

dx.webCallbackHelper = (function() {
    var isWait = function() {
        if(typeof(aspxGetControlCollection) === "undefined")
            return false;
        return aspxGetControlCollection().requestCountInternal !== 0;
    };
    return { isWaitCallback: isWait };
})();

dx.callbackWatcher.subscribe(dx.webCallbackHelper);

__waitFor(function (callback) {
    var timer = window.setInterval(function() { 
        if(dx.callbackWatcher.isWaitCallback())
            return;
        timer = window.clearInterval(timer);
        callback();
    }, 200);
}, 20000);