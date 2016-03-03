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
    if(typeof(ASPx) === "undefined" || typeof(ASPx.GetControlCollection) === "undefined")
        return null;
    return ASPx.GetControlCollection().Get(clientId);
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
    var ignoreWaiting = false;
    var startWaiting = function() {
        ignoreWaiting = false;
    };
    var stopWaiting = function() {
        ignoreWaiting = true;
    };
    var isWait = function() {
        if(ignoreWaiting) return false;
        if(typeof(ASPx) === "undefined" || typeof(ASPx.GetControlCollection) === "undefined")
            return false;
        return ASPx.GetControlCollection().requestCountInternal !== 0;
    };
    return { isWaitCallback: isWait, stopWaiting: stopWaiting, startWaiting: startWaiting };
})();

dx.callbackWatcher.subscribe(dx.webCallbackHelper);

dx.callbackWatcher.forceGlobalWaitFor = function(timeout) {
    __waitFor(function (callback) {
        var timer = window.setInterval(function () {
            if(dx.callbackWatcher.isWaitCallback())
                return;
            timer = window.clearInterval(timer);
            callback();
        }, 200);
    }, timeout);
}

dx.callbackWatcher.forceGlobalWaitFor(20000);