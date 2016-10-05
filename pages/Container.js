define(
    [
        'feature!Page'
    ]
    ,function(BaseType){
        function Constructor(view, selector, contentSelector) {
            BaseType.call(this, view, selector);

            this.contentSelector = contentSelector;
        }

        var prototype = new BaseType();

        prototype.getContentElement = function getContentElement() {
            return this.element.find(this.contentSelector);
        }

        Constructor.prototype = prototype;
        return Constructor;
    }
);