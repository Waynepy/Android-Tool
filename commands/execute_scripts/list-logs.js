Java.perform(function() {
    var Log = Java.use("android.util.Log");

    // Interceptando o método Log.v (Verbose)
    var originalLogV = Log.v;
    originalLogV.overload('java.lang.String', 'java.lang.String').implementation = function(tag, msg) {
        console.log("[+] Log.v(" + tag + ", " + msg + ")");
        return originalLogV.call(this, tag, msg);
    };

    // Interceptando o método Log.d (Debug)
    var originalLogD = Log.d;
    originalLogD.overload('java.lang.String', 'java.lang.String').implementation = function(tag, msg) {
        console.log("[+] Log.d(" + tag + ", " + msg + ")");
        return originalLogD.call(this, tag, msg);
    };

    // Interceptando o método Log.i (Info)
    var originalLogI = Log.i;
    originalLogI.overload('java.lang.String', 'java.lang.String').implementation = function(tag, msg) {
        console.log("[+] Log.i(" + tag + ", " + msg + ")");
        return originalLogI.call(this, tag, msg);
    };

    // Interceptando o método Log.w (Warning)
    var originalLogW = Log.w;
    originalLogW.overload('java.lang.String', 'java.lang.String').implementation = function(tag, msg) {
        console.log("[+] Log.w(" + tag + ", " + msg + ")");
        return originalLogW.call(this, tag, msg);
    };

    // Interceptando o método Log.e (Error)
    var originalLogE = Log.e;
    originalLogE.overload('java.lang.String', 'java.lang.String').implementation = function(tag, msg) {
        console.log("[+] Log.e(" + tag + ", " + msg + ")");
        return originalLogE.call(this, tag, msg);
    };
});