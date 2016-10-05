'use strict'
define(
    [
        'feature!Installer'
        ,'configurations/RoutesConfiguration'
        ,'sammy'
    ]
    ,function(
        BaseType
        , configuration
        , sammy){
        var baseURL = $('base').attr('href');

        function Constructor(dispatcher) {
            BaseType.call(this);
            this.dispatcher = dispatcher;
        }
        
        var prototype = new BaseType();

        prototype.init = function init() {
            setUp.call(this);
        };

        function setUp() {
            this.app = sammy();
			
            var routesMap = toMap(configuration, this.dispatcher);
            
            this.app.mapRoutes(routesMap);

            this.app.run();
        }

        function toMap(config, dispatcher) {
            var routesMap = [];
            extractRoutes(config, dispatcher, routesMap);
            return routesMap;
        }

        function extractRoutes(config, dispatcher, routesMap,router) {
            
            if(router == null)
                router = "";

            if(typeof config !== 'string') {
                for(var configName in config)
                    extractRoutes(config[configName], dispatcher, routesMap, createRoute(router, configName));
                return;
            }
            
            router = router + "/?";
            var address = config;

            routesMap.push([router, dispatcher.createDispatch(address)]);
        };

        function createRoute(parentRoute, configName) {
            return  parentRoute + "/" + configName;
        }

        Constructor.prototype = prototype;
        return Constructor;
    }
);