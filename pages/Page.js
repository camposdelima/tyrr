define(
    [
        'feature!Component'
        ,'jquery'
    ]
    ,function(BaseType){

        function Constructor(view, selector) {
            BaseType.call(this);
            
            this.view = view;
            this.element = jQuery(selector);         
        }

        var prototype = {};

        prototype.init = function init() {
            this.render();
        };

        prototype.render = function render() {
            if(this.view == null)
                throw new Error("The view has not been set up.");
            
            if(this.element.length == 0)
                throw new Error("The element has not been set up.");

            this.element.html(this.view);         
        };


        Constructor.prototype = prototype;
        return Constructor;
    }
);