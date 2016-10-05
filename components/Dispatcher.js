define(
    function(){

        function Constructor(container) {
            this.container = container;
        }

        var prototype = {};

        prototype.createDispatch = function createDispatch(address) {
            var container = this.container;
            
            return function() {
                dispatch(address, container);
            }
        };

        function dispatch(path, container) {
            require([path], function(Component) {
                var component = new Component(container.getContentElement());
                component.init(); 
            });
        }

        Constructor.prototype = prototype;
        return Constructor;
});