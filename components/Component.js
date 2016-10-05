'use strict'
define(
    function(){
        function Constructor() {}
        var prototype = {};

        prototype.init = function init() {
            throw new Error("Not implemented exception.");
        };

        Constructor.prototype = prototype;
        return Constructor;
});