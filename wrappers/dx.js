/** Preview release */
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