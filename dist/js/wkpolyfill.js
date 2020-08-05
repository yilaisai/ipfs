;(function(window) {
    window.isInWKWebview = function() {
        return !!(window.webkit &&
            window.webkit.messageHandlers &&
            window.webkit.messageHandlers.appMethodHandler);
    }

    function isInAppAndroid() {
        var u = navigator.userAgent
		if(u.indexOf('alpha_app_Android') >= 0) {
			return true
		}else {
			return false
		}
	}
	
	window.isInAPPiOS = function() {
		var u = navigator.userAgent
		if(u.indexOf('alpha_app_iOS') >= 0) {
			return true
		}else {
			return false
		}
	}

    var isInWk = isInWKWebview();
    var isInAndroid = isInWKWebview() || isInAppAndroid();

    window.isInAPP = function() {
        return isInAPPiOS() || isInAppAndroid();
    }
    

    window.app = window.app || {};
    
    window.isInAndroidAPP = false

    var appInfo = {
        currentId: 0
    };

    var callbacks = {};

    function isFunction(functionToCheck) {
        return functionToCheck && {}.toString.call(functionToCheck) === '[object Function]';
    }

    ['shareCapture','exitToBackground', 'closeWebView', 'getVersion', 'getToken', 'openLocalPage','openBrowser', 'getScan', 'routeSignInPage'].forEach(function(key) {
        if (app[key]) {
            window.isInAndroidAPP = true
            return;
        }
        app[key] = function() {
            var argumentsToPass = [];
            for (var i = 0; i < arguments.length - 1; ++i) {
                argumentsToPass.push(arguments[i]);
            }
            var cb = null;
            if (arguments.length && isFunction(arguments[arguments.length - 1])) {
                cb = arguments[arguments.length - 1];
            } else {
                argumentsToPass.push(arguments[arguments.length - 1]);
            }


            var callbackId = 'p' + (appInfo.currentId++);
			callbacks[callbackId] = cb;
            if (isInWk) {
                try {
                    window.webkit.messageHandlers.appMethodHandler.postMessage({
                        callbackId: callbackId,
                        methodName: key,
                        parameters: JSON.stringify(argumentsToPass)
                    });
                } catch (exception) {
                    alert(exception);
                }
            } else {
            }
        };
    });

    window.resolveCallback = function(callbackId, data, error) {
        if (!error && callbacks[callbackId]) {
            callbacks[callbackId](data);
        }
        delete callbacks[callbackId];
    }
})(window);
