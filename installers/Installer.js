define(
    [
        'feature!Component'
        ,'jQuery'
    ]
    ,function(BaseType){
        function Constructor() {}
        var prototype = new BaseType();

        prototype.init = function init() {
            var deferred = this.getDeferred();
            
            deferred.fail(function() {
                throw new Error("Not implemented installer.");
            })

            deferred.reject();
            
            return deferred.promise();
        }

        prototype.getDeferred = function getDeferred() {
            return $.Deferred();
        }

        Constructor.prototype = prototype;
        return Constructor;
    }
);