setImmediate(function() {
    var FBLigerConfig = ObjC.classes.FBLigerConfig;
    console.log(FBLigerConfig);
    Interceptor.attach(FBLigerConfig['- ligerEnabled'].implementation, {
        onEnter: function(args) {
            console.log(args)
        },
        onLeave: function (retval) {
            retval.replace(0);
        }
      });
});