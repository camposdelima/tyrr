define(
    [
        'feature!Installer'
        ,'feature!Dispatcher'
    ]
    ,function(
        BaseType
        ,Dispatcher){

        function Constructor(container) {
            BaseType.call(this);
            this.container = container;
        }

        var prototype = new BaseType();

        prototype.init = function init() {
            return setUp.call(this);
        };
        
        function setUp() {
            var deferred = this.getDeferred();
           
            var dispatcher = new Dispatcher(this.container);
            deferred.resolve(dispatcher);

            return deferred.promise();
        }


        Constructor.prototype = prototype;
        return Constructor;
    }
);