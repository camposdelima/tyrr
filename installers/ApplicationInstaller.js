define(
    [
        'feature!Installer'
        , 'tyrr/installers/ContainerInstaller'
		, 'tyrr/installers/DispatcherInstaller'
	    , 'tyrr/installers/RouterInstaller'
    ]
    ,function(
        BaseType
        ,ContainerInstaller
        ,DispatcherInstaller
        ,RouterInstaller
        ){

        function Constructor(configuration) {
            BaseType.call(this);
        }

        var prototype = new BaseType();

        prototype.init = function init() { 
            var deferred = this.getDeferred();

            this.initialize(ContainerInstaller)
			.then(this.continueWith(DispatcherInstaller))
			.then(this.continueWith(RouterInstaller))
            .then(deferred.resolve);
            
            return deferred.promise();
        };

		prototype.continueWith = function continueWith(ComponentType) {
            var instance = this;
			return function (dependency) {
				return instance.initialize(ComponentType, dependency);
			};
		}

        prototype.initialize = function initialize(ComponentType, dependency) {
			var component = new ComponentType(dependency);
			return component.init();
		}


        // function obsolete() {

        //     var deferred = this.getDeferred();
        //     var instance = this;
            
        //     var installers = this.configuration.installers;

        //     var independents = getIndependentsAddresses(installers);
            
        //     var installedComponentsPromisses = getInstallIndependentsPromisses.call(this, independents);

        //     var dependents = getDependents(installers);
            
        //     getInstallDependentPromisses(dependents, installedComponentsPromisses);
            
        //     // _.each(dependents, function(address) {
        //     //     var dependencies = installers[address];
        //     //     _.each(dependencies, function(dependencyAddress) {

        //     //     });
        //     //     // installedComponentsPromisses[address] = install.call(instance, address);
        //     // });

        //     console.log(dependents);

        

        // function getIndependentsAddresses(installers) {
        //     return _.keys(
        //         _.pick(installers, isDependent)
        //     );
        // }

        // function getDependents(installers) {
        //     return _.omit(installers, isDependent);
        // }

        // function isDependent(dependencies) {
        //     return dependencies == null;
        // }

        // function getInstallIndependentsPromisses(independents) {
        //     var instance = this;
        //     var promisses = {};
        //     _.each(independents, function(address) {
        //         promisses[address] = install.call(instance, address);
        //     });

        //     return promisses;
        // }

        // function getInstallDependentPromisses(dependents, promisses) {
        //     var addresses = _.keys(dependents);

        //     _.each(addresses, function(address) {
        //        var dependencies = dependents[address];
        //        var deferred = this.getDeferred();
               
        //        installDependencies(address, dependencies, promisses, deferred);

        //        deferred.done(function(component) {
        //            promisses[address] = install;
        //        });
        //         // installedComponentsPromisses[address] = install.call(instance, address);
        //     });
        // }

        // function installDependencies(dependencies, promisses, deferred) {
            
        //     if(dependencies.length == 0) {
        //         deferred.resolve();
        //     }

        //     var dependency = _.first(dependencies);
        //     var promisse = promisses[dependency];
        //     promisse.done(function() {
        //         dependencies.shift();
        //         installDependencies(dependencies, promisses, deferred)
        //     });            
        // }

        // function install(installerAddress) {
        //     var deferred = this.getDeferred();

        //     require([installerAddress], function(InstallerType) {                
        //        var component = initialize(InstallerType);
               
        //        deferred.resolve(component);
        //     });

        //     return deferred.promise();
        //     }
        // }

        Constructor.prototype = prototype;
        return Constructor;
    }
);