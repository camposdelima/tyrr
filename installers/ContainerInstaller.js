define(
    [
        'feature!Installer'
        ,'feature!Container'
        ,'configurations/ContainerConfiguration'
    ]
    ,function(
        BaseType
        ,Container
        ,configuration){

        function Constructor() {
            BaseType.call(this);
        }
        var prototype = new BaseType();

        prototype.init = function init() {
            return setUp.call(this, configuration);
        };
        
        function setUp(containerConfiguration) {
            var deferred = this.getDeferred();
            
            requireView.call(this, containerConfiguration.viewAddress).done(
                function(view) {
                    var container = createContainer(
                        view
                        ,containerConfiguration.selector
                        ,containerConfiguration.contentSelector
                    );

                    container.init();
                    deferred.resolve(container);
                }                
            );

            return deferred.promise();
        }

        function createContainer(view, selector, contentSelector) {
            var container = new Container(
                view,
                selector,
                contentSelector
            );
            
            return container;
        }

        function requireView(viewAddress) {
            var deferred = this.getDeferred();
            
            require(['text!'+viewAddress], function(view) {
                    deferred.resolve(view);
                }, function() {
                    deferred.reject();
                }
            );

            return deferred.promise();
        }

        Constructor.prototype = prototype;
        return Constructor;
    }
);