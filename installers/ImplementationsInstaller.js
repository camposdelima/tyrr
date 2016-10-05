define(
    [
        'module'
    ]
    ,function(module){

        function Constructor() {}

        var prototype = new function() {};

        prototype.init = function init() {
            RegisterDefaultImplementations();
        };

        function GetImplementationsFile() {
            var currentModuleFile = module.uri;
            var slash = "/";
            var lastSlashPosition = currentModuleFile.lastIndexOf(slash);
            var currentModuleFolder = currentModuleFile.substring(0,lastSlashPosition);
            var firstSlashPosition = currentModuleFile.indexOf(slash);
            var relativeCurrentFolder = currentModuleFolder.substring(firstSlashPosition + 1, currentModuleFolder.length);
            var implementationsFile = relativeCurrentFolder + slash +"../configurations/ImplementationsConfiguration";
            return implementationsFile;
        }


        function RegisterDefaultImplementations() {
            var hasImplementations = require.s.contexts._.config.paths.implementations != null;        
            
            if(hasImplementations) return;

            require.config(
            {
                paths: {
                    'implementations': GetImplementationsFile()
                }
            });
        }

        Constructor.prototype = prototype;
        return Constructor;
    }
);