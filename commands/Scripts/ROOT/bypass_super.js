// $ frida -l antiroot.js -U -f com.example.app --no-pause
// CHANGELOG by Pichaya Morimoto (p.morimoto@sth.sh): 
//  - I added extra whitelisted items to deal with the latest versions 
// 						of RootBeer/Cordova iRoot as of August 6, 2019
//  - The original one just fucked up (kill itself) if Magisk is installed lol
// Credit & Originally written by: https://codeshare.frida.re/@dzonerzy/fridantiroot/
// If this isn't working in the future, check console logs, rootbeer src, or libtool-checker.so

// Altera o valor do atributo android:exported para true em tempo de execução

Java.perform(function() {
    var Activity = Java.use("android.app.Activity");
    var PrivacityActivity = Java.use("layout.superdigital.com.superdigitallayout.ui.activitys.PrivacityActivity");

    // Substitua o método onCreate() da atividade para modificar o atributo android:exported
    PrivacityActivity.onCreate.overload('android.os.Bundle').implementation = function(savedInstanceState) {
        this.onCreate(savedInstanceState);

        // Modifique o valor do atributo android:exported para true
        var activityInfo = this.getComponentInfo();
        activityInfo.exported.value = true;
        console.log("Atributo 'exported' alterado para true.");
    };
});



Java.perform(function() {

    console.log("[*] Hooking Methods in com.scottyab.rootbeer.RootBeer Class")

    var RootBeer = Java.use("com.scottyab.rootbeer.RootBeer");

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.isRooted() Method");
    RootBeer["isRooted"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.isRooted() Method');
        let ret = this.isRooted();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.isRooted() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.isRooted() Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.isRootedWithoutBusyBoxCheck() Method");
    RootBeer["isRootedWithoutBusyBoxCheck"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.isRootedWithoutBusyBoxCheck() Method');
        let ret = this.isRootedWithoutBusyBoxCheck();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.isRootedWithoutBusyBoxCheck() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.isRootedWithoutBusyBoxCheck() Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.isRootedWithBusyBoxCheck() Method");
    RootBeer["isRootedWithBusyBoxCheck"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.isRootedWithBusyBoxCheck() Method');
        let ret = this.isRootedWithBusyBoxCheck();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.isRootedWithBusyBoxCheck() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.isRootedWithBusyBoxCheck() Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.detectTestKeys() Method");
    RootBeer["detectTestKeys"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.detectTestKeys() Method');
        let ret = this.detectTestKeys();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.detectTestKeys() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.detectTestKeys() Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.detectRootManagementApps(String[] strArr) Method");
    RootBeer["detectRootManagementApps"].overload("[Ljava.lang.String;").implementation = function(arg) {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.detectRootManagementApps(String[] strArr) Method - Argument: ' + arg);
        let ret = this.detectRootManagementApps(arg);
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.detectRootManagementApps(String[] strArr) Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.detectRootManagementApps(String[] strArr) Method = ' + newret);
        return newret;
    };


    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.detectPotentiallyDangerousApps(String[] strArr) Method");
    RootBeer["detectPotentiallyDangerousApps"].overload("[Ljava.lang.String;").implementation = function(args) {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.detectPotentiallyDangerousApps(String[] strArr) Method - Arguments: ' + args);
        let ret = this.detectPotentiallyDangerousApps(args);
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.detectPotentiallyDangerousApps(String[] strArr) Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.detectPotentiallyDangerousApps(String[] strArr) Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.detectRootCloakingApps(String[] strArr) Method");
    RootBeer["detectRootCloakingApps"].overload("[Ljava.lang.String;").implementation = function(args) {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.detectRootCloakingApps(String[] strArr) Method - Arguments: ' + args);
        let ret = this.detectRootCloakingApps(args);
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.detectRootCloakingApps(String[] strArr) Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.detectRootCloakingApps(String[] strArr) Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.checkForSuBinary() Method");
    RootBeer["checkForSuBinary"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.checkForSuBinary() Method');
        let ret = this.checkForSuBinary();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.checkForSuBinary() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.checkForSuBinary() Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.checkForMagiskBinary() Method");
    RootBeer["checkForMagiskBinary"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.checkForMagiskBinary() Method');
        let ret = this.checkForMagiskBinary();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.checkForMagiskBinary() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.checkForMagiskBinary() Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.checkForBusyBoxBinary() Method");
    RootBeer["checkForBusyBoxBinary"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.checkForBusyBoxBinary() Method');
        let ret = this.checkForBusyBoxBinary();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.checkForBusyBoxBinary() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.checkForBusyBoxBinary() Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.checkForBinary(String str) Method");
    RootBeer["checkForBinary"].implementation = function(arg) {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.checkForBinary() Method - Argument : ' + arg);
        let ret = this.checkForBinary(arg);
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.checkForBinary() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.checkForBinary() Method = ' + newret);
        return newret;
    };


    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.propsReader() Method");
    RootBeer["propsReader"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.propsReader() Method');
        let ret = this.propsReader();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.propsReader() Method = ' + ret);
        var newret = null;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.propsReader() Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.mountReader() Method");
    RootBeer["mountReader"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.mountReader() Method');
        let ret = this.mountReader();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.mountReader() Method = ' + ret);
        var newret = null;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.mountReader() Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.checkForDangerousProps() Method");
    RootBeer["checkForDangerousProps"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.checkForDangerousProps() Method');
        let ret = this.checkForDangerousProps();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.checkForDangerousProps() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.checkForDangerousProps() Method = ' + newret);
        return newret;
    };


    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.checkForRWPaths() Method");
    RootBeer["checkForRWPaths"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.checkForRWPaths() Method');
        let ret = this.checkForRWPaths();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.checkForRWPaths() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.checkForRWPaths() Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.checkSuExists() Method");
    RootBeer["checkSuExists"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.checkSuExists() Method');
        let ret = this.checkSuExists();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.checkSuExists() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.checkSuExists() Method = ' + newret);
        return newret;
    };


    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.checkForNativeLibraryReadAccess() Method");
    RootBeer["checkForNativeLibraryReadAccess"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.checkForNativeLibraryReadAccess() Method');
        let ret = this.checkForNativeLibraryReadAccess();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.checkForNativeLibraryReadAccess() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.checkForNativeLibraryReadAccess() Method = ' + newret);
        return newret;
    };


    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.canLoadNativeLibrary() Method");
    RootBeer["canLoadNativeLibrary"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.canLoadNativeLibrary() Method');
        let ret = this.canLoadNativeLibrary();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.canLoadNativeLibrary() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.canLoadNativeLibrary() Method = ' + newret);
        return newret;
    };

    console.log("[*] Hooking com.scottyab.rootbeer.RootBeer.checkForRootNative() Method");
    RootBeer["checkForRootNative"].implementation = function() {
        console.log('[+] Inside com.scottyab.rootbeer.RootBeer.checkForRootNative() Method');
        let ret = this.checkForRootNative();
        console.log('[*] Original return value of com.scottyab.rootbeer.RootBeer.checkForRootNative() Method = ' + ret);
        var newret = false;
        console.log('[*] New return value of com.scottyab.rootbeer.RootBeer.checkForRootNative() Method = ' + newret);
        return newret;
    };

});

Java.perform(function() {

    
    // var aClass = Java.use('t4.a');
    // aClass.a.overload().implementation = function () {
    //     return [];
    // };

    // var bClass = Java.use('t0.b');
    // var aClass = Java.use('t0.b$a');
    // aClass.run.implementation = function () {
    //     console.log('[Frida] Bypassing pinning check');
    // };
    // bClass.a.overload('android.content.Context').implementation = function (context) {
    //     console.log('[Frida] Bypassing pinning check start');
    // };

    var RootPackages = ["com.noshufou.android.su", "com.noshufou.android.su.elite", "eu.chainfire.supersu",
        "com.koushikdutta.superuser", "com.thirdparty.superuser", "com.yellowes.su", "com.koushikdutta.rommanager",
        "com.koushikdutta.rommanager.license", "com.dimonvideo.luckypatcher", "com.chelpus.lackypatch",
        "com.ramdroid.appquarantine", "com.ramdroid.appquarantinepro", "com.devadvance.rootcloak", "com.devadvance.rootcloakplus",
        "de.robv.android.xposed.installer", "com.saurik.substrate", "com.zachspong.temprootremovejb", "com.amphoras.hidemyroot",
        "com.amphoras.hidemyrootadfree", "com.formyhm.hiderootPremium", "com.formyhm.hideroot", "me.phh.superuser",
        "com.joeykrim.rootcheck","Root Checker Basic",
        "eu.chainfire.supersu.pro", "com.kingouser.com", "com.android.vending.billing.InAppBillingService.COIN","com.topjohnwu.magisk"
    ];

    var RootBinaries = ["su", "busybox", "supersu", "Superuser.apk", "KingoUser.apk", "SuperSu.apk","magisk"];

    var RootProperties = {
        "ro.build.selinux": "1",
        "ro.debuggable": "0",
        "service.adb.root": "0",
        "ro.secure": "1"
    };

    var RootPropertiesKeys = [];

    for (var k in RootProperties) RootPropertiesKeys.push(k);

    var PackageManager = Java.use("android.app.ApplicationPackageManager");

    var Runtime = Java.use('java.lang.Runtime');

    var NativeFile = Java.use('java.io.File');

    var String = Java.use('java.lang.String');

    var SystemProperties = Java.use('android.os.SystemProperties');

    var BufferedReader = Java.use('java.io.BufferedReader');

    var ProcessBuilder = Java.use('java.lang.ProcessBuilder');

    var StringBuffer = Java.use('java.lang.StringBuffer');

    var loaded_classes = Java.enumerateLoadedClassesSync();

    send("Loaded " + loaded_classes.length + " classes!");

    var useKeyInfo = false;

    var useProcessManager = false;

    send("loaded: " + loaded_classes.indexOf('java.lang.ProcessManager'));

    if (loaded_classes.indexOf('java.lang.ProcessManager') != -1) {
        try {
            //useProcessManager = true;
            //var ProcessManager = Java.use('java.lang.ProcessManager');
        } catch (err) {
            send("ProcessManager Hook failed: " + err);
        }
    } else {
        send("ProcessManager hook not loaded");
    }

    var KeyInfo = null;

    if (loaded_classes.indexOf('android.security.keystore.KeyInfo') != -1) {
        try {
            //useKeyInfo = true;
            //var KeyInfo = Java.use('android.security.keystore.KeyInfo');
        } catch (err) {
            send("KeyInfo Hook failed: " + err);
        }
    } else {
        send("KeyInfo hook not loaded");
    }

    PackageManager.getPackageInfo.overload('java.lang.String', 'int').implementation = function(pname, flags) {
        var shouldFakePackage = (RootPackages.indexOf(pname) > -1);
        if (shouldFakePackage) {
            send("Bypass root check for package: " + pname);
            pname = "set.package.name.to.a.fake.one.so.we.can.bypass.it";
        }
        return this.getPackageInfo.call(this, pname, flags);
    };

    NativeFile.exists.implementation = function() {
        var name = NativeFile.getName.call(this);
        var shouldFakeReturn = (RootBinaries.indexOf(name) > -1);
        if (shouldFakeReturn) {
            send("Bypass return value for binary: " + name);
            return false;
        } else {
            return this.exists.call(this);
        }
    };

    var exec = Runtime.exec.overload('[Ljava.lang.String;');
    var exec1 = Runtime.exec.overload('java.lang.String');
    var exec2 = Runtime.exec.overload('java.lang.String', '[Ljava.lang.String;');
    var exec3 = Runtime.exec.overload('[Ljava.lang.String;', '[Ljava.lang.String;');
    var exec4 = Runtime.exec.overload('[Ljava.lang.String;', '[Ljava.lang.String;', 'java.io.File');
    var exec5 = Runtime.exec.overload('java.lang.String', '[Ljava.lang.String;', 'java.io.File');

    exec5.implementation = function(cmd, env, dir) {
        if (cmd.indexOf("getprop") != -1 || cmd == "mount" || cmd.indexOf("build.prop") != -1 || cmd == "id" || cmd == "sh") {
            var fakeCmd = "grep";
            send("Bypass " + cmd + " command");
            return exec1.call(this, fakeCmd);
        }
        if (cmd == "su") {
            var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
            send("Bypass " + cmd + " command");
            return exec1.call(this, fakeCmd);
        }
        if (cmd == "which") {
            var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
            send("Bypass which command");
            return exec1.call(this, fakeCmd);
        }
        return exec5.call(this, cmd, env, dir);
    };

    exec4.implementation = function(cmdarr, env, file) {
        for (var i = 0; i < cmdarr.length; i = i + 1) {
            var tmp_cmd = cmdarr[i];
            if (tmp_cmd.indexOf("getprop") != -1 || tmp_cmd == "mount" || tmp_cmd.indexOf("build.prop") != -1 || tmp_cmd == "id" || tmp_cmd == "sh") {
                var fakeCmd = "grep";
                send("Bypass " + cmdarr + " command");
                return exec1.call(this, fakeCmd);
            }

            if (tmp_cmd == "su") {
                var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
                send("Bypass " + cmdarr + " command");
                return exec1.call(this, fakeCmd);
            }
        }
        return exec4.call(this, cmdarr, env, file);
    };

    exec3.implementation = function(cmdarr, envp) {
        for (var i = 0; i < cmdarr.length; i = i + 1) {
            var tmp_cmd = cmdarr[i];
            if (tmp_cmd.indexOf("getprop") != -1 || tmp_cmd == "mount" || tmp_cmd.indexOf("build.prop") != -1 || tmp_cmd == "id" || tmp_cmd == "sh") {
                var fakeCmd = "grep";
                send("Bypass " + cmdarr + " command");
                return exec1.call(this, fakeCmd);
            }

            if (tmp_cmd == "su") {
                var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
                send("Bypass " + cmdarr + " command");
                return exec1.call(this, fakeCmd);
            }
        }
        return exec3.call(this, cmdarr, envp);
    };

    exec2.implementation = function(cmd, env) {
        if (cmd.indexOf("getprop") != -1 || cmd == "mount" || cmd.indexOf("build.prop") != -1 || cmd == "id" || cmd == "sh") {
            var fakeCmd = "grep";
            send("Bypass " + cmd + " command");
            return exec1.call(this, fakeCmd);
        }
        if (cmd == "su") {
            var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
            send("Bypass " + cmd + " command");
            return exec1.call(this, fakeCmd);
        }
        return exec2.call(this, cmd, env);
    };

    exec.implementation = function(cmd) {
        for (var i = 0; i < cmd.length; i = i + 1) {
            var tmp_cmd = cmd[i];
            if (tmp_cmd.indexOf("getprop") != -1 || tmp_cmd == "mount" || tmp_cmd.indexOf("build.prop") != -1 || tmp_cmd == "id" || tmp_cmd == "sh") {
                var fakeCmd = "grep";
                send("Bypass " + cmd + " command");
                return exec1.call(this, fakeCmd);
            }

            if (tmp_cmd == "su") {
                var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
                send("Bypass " + cmd + " command");
                return exec1.call(this, fakeCmd);
            }
        }

        return exec.call(this, cmd);
    };

    exec1.implementation = function(cmd) {
        if (cmd.indexOf("getprop") != -1 || cmd == "mount" || cmd.indexOf("build.prop") != -1 || cmd == "id" || cmd == "sh") {
            var fakeCmd = "grep";
            send("Bypass " + cmd + " command");
            return exec1.call(this, fakeCmd);
        }
        if (cmd == "su") {
            var fakeCmd = "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled";
            send("Bypass " + cmd + " command");
            return exec1.call(this, fakeCmd);
        }
        return exec1.call(this, cmd);
    };

    String.contains.implementation = function(name) {
        if (name == "test-keys") {
            send("Bypass test-keys check");
            return false;
        }
        return this.contains.call(this, name);
    };

    var get = SystemProperties.get.overload('java.lang.String');

    get.implementation = function(name) {
        if (RootPropertiesKeys.indexOf(name) != -1) {
            send("Bypass " + name);
            return RootProperties[name];
        }
        return this.get.call(this, name);
    };

    Interceptor.attach(Module.findExportByName("libc.so", "fopen"), {
        onEnter: function(args) {
            var path1 = Memory.readCString(args[0]);
            var path = path1.split("/");
            var executable = path[path.length - 1];
            var shouldFakeReturn = (RootBinaries.indexOf(executable) > -1)
            if (shouldFakeReturn) {
                Memory.writeUtf8String(args[0], "/ggezxxx");
                send("Bypass native fopen >> "+path1);
            }
        },
        onLeave: function(retval) {

        }
    });

    Interceptor.attach(Module.findExportByName("libc.so", "fopen"), {
        onEnter: function(args) {
            var path1 = Memory.readCString(args[0]);
            var path = path1.split("/");
            var executable = path[path.length - 1];
            var shouldFakeReturn = (RootBinaries.indexOf(executable) > -1)
            if (shouldFakeReturn) {
                Memory.writeUtf8String(args[0], "/ggezxxx");
                send("Bypass native fopen >> "+path1);
            }
        },
        onLeave: function(retval) {

        }
    });

    Interceptor.attach(Module.findExportByName("libc.so", "system"), {
        onEnter: function(args) {
            var cmd = Memory.readCString(args[0]);
            send("SYSTEM CMD: " + cmd);
            if (cmd.indexOf("getprop") != -1 || cmd == "mount" || cmd.indexOf("build.prop") != -1 || cmd == "id") {
                send("Bypass native system: " + cmd);
                Memory.writeUtf8String(args[0], "grep");
            }
            if (cmd == "su") {
                send("Bypass native system: " + cmd);
                Memory.writeUtf8String(args[0], "justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled");
            }
        },
        onLeave: function(retval) {

        }
    });

    /*

    TO IMPLEMENT:

    Exec Family

    int execl(const char *path, const char *arg0, ..., const char *argn, (char *)0);
    int execle(const char *path, const char *arg0, ..., const char *argn, (char *)0, char *const envp[]);
    int execlp(const char *file, const char *arg0, ..., const char *argn, (char *)0);
    int execlpe(const char *file, const char *arg0, ..., const char *argn, (char *)0, char *const envp[]);
    int execv(const char *path, char *const argv[]);
    int execve(const char *path, char *const argv[], char *const envp[]);
    int execvp(const char *file, char *const argv[]);
    int execvpe(const char *file, char *const argv[], char *const envp[]);

    */


    BufferedReader.readLine.overload().implementation = function() {
        var text = this.readLine.call(this);
        if (text === null) {
            // just pass , i know it's ugly as hell but test != null won't work :(
        } else {
            var shouldFakeRead = (text.indexOf("ro.build.tags=test-keys") > -1);
            if (shouldFakeRead) {
                send("Bypass build.prop file read");
                text = text.replace("ro.build.tags=test-keys", "ro.build.tags=release-keys");
            }
        }
        return text;
    };

    var executeCommand = ProcessBuilder.command.overload('java.util.List');

    ProcessBuilder.start.implementation = function() {
        var cmd = this.command.call(this);
        var shouldModifyCommand = false;
        for (var i = 0; i < cmd.size(); i = i + 1) {
            var tmp_cmd = cmd.get(i).toString();
            if (tmp_cmd.indexOf("getprop") != -1 || tmp_cmd.indexOf("mount") != -1 || tmp_cmd.indexOf("build.prop") != -1 || tmp_cmd.indexOf("id") != -1) {
                shouldModifyCommand = true;
            }
        }
        if (shouldModifyCommand) {
            send("Bypass ProcessBuilder " + cmd);
            this.command.call(this, ["grep"]);
            return this.start.call(this);
        }
        if (cmd.indexOf("su") != -1) {
            send("Bypass ProcessBuilder " + cmd);
            this.command.call(this, ["justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled"]);
            return this.start.call(this);
        }

        return this.start.call(this);
    };

    if (useProcessManager) {
        var ProcManExec = ProcessManager.exec.overload('[Ljava.lang.String;', '[Ljava.lang.String;', 'java.io.File', 'boolean');
        var ProcManExecVariant = ProcessManager.exec.overload('[Ljava.lang.String;', '[Ljava.lang.String;', 'java.lang.String', 'java.io.FileDescriptor', 'java.io.FileDescriptor', 'java.io.FileDescriptor', 'boolean');

        ProcManExec.implementation = function(cmd, env, workdir, redirectstderr) {
            var fake_cmd = cmd;
            for (var i = 0; i < cmd.length; i = i + 1) {
                var tmp_cmd = cmd[i];
                if (tmp_cmd.indexOf("getprop") != -1 || tmp_cmd == "mount" || tmp_cmd.indexOf("build.prop") != -1 || tmp_cmd == "id") {
                    var fake_cmd = ["grep"];
                    send("Bypass " + cmdarr + " command");
                }

                if (tmp_cmd == "su") {
                    var fake_cmd = ["justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled"];
                    send("Bypass " + cmdarr + " command");
                }
            }
            return ProcManExec.call(this, fake_cmd, env, workdir, redirectstderr);
        };

        ProcManExecVariant.implementation = function(cmd, env, directory, stdin, stdout, stderr, redirect) {
            var fake_cmd = cmd;
            for (var i = 0; i < cmd.length; i = i + 1) {
                var tmp_cmd = cmd[i];
                if (tmp_cmd.indexOf("getprop") != -1 || tmp_cmd == "mount" || tmp_cmd.indexOf("build.prop") != -1 || tmp_cmd == "id") {
                    var fake_cmd = ["grep"];
                    send("Bypass " + cmdarr + " command");
                }

                if (tmp_cmd == "su") {
                    var fake_cmd = ["justafakecommandthatcannotexistsusingthisshouldthowanexceptionwheneversuiscalled"];
                    send("Bypass " + cmdarr + " command");
                }
            }
            return ProcManExecVariant.call(this, fake_cmd, env, directory, stdin, stdout, stderr, redirect);
        };
    }

    if (useKeyInfo) {
        KeyInfo.isInsideSecureHardware.implementation = function() {
            send("Bypass isInsideSecureHardware");
            return true;
        }
    }

});


/*************************************************************************************
 * Name: Intercepts Crypto Operations
 * OS: Android
 * Author: @fadeevab
 * Source: https://codeshare.frida.re/@fadeevab/intercept-android-apk-crypto-operations/
 **************************************************************************************/


function bin2ascii(array) {
    var result = [];

    for (var i = 0; i < array.length; ++i) {
        result.push(String.fromCharCode( // hex2ascii part
            parseInt(
                ('0' + (array[i] & 0xFF).toString(16)).slice(-2), // binary2hex part
                16
            )
        ));
    }
    return result.join('');
}

function bin2hex(array, length) {
    var result = "";

    length = length || array.length;

    for (var i = 0; i < length; ++i) {
        result += ('0' + (array[i] & 0xFF).toString(16)).slice(-2);
    }
    return result;
}

Java.perform(function() {
    Java.use('javax.crypto.spec.SecretKeySpec').$init.overload('[B', 'java.lang.String').implementation = function(key, spec) {
        send("KEY: " + bin2hex(key) + " | " + bin2ascii(key));
        return this.$init(key, spec);
    };

    Java.use('javax.crypto.Cipher')['getInstance'].overload('java.lang.String').implementation = function(spec) {
        send("CIPHER: " + spec);
        return this.getInstance(spec);
    };

    Java.use('javax.crypto.Cipher')['doFinal'].overload('[B').implementation = function(data) {
        send("doFinal!");
        send(bin2ascii(data));
        return this.doFinal(data);
    };
});

function hook_okhttp3() {
    Java.perform(function() {
        var ByteString = Java.use("com.android.okhttp.okio.ByteString");
        var Buffer = Java.use("com.android.okhttp.okio.Buffer");
        var Interceptor = Java.use("okhttp3.Interceptor");
        var MyInterceptor = Java.registerClass({
            name: "okhttp3.MyInterceptor",
            implements: [Interceptor],
            methods: {
                intercept: function(chain) {
                    var request = chain.request();
                    try {
                        console.log("MyInterceptor.intercept onEnter:", request, "\nrequest headers:\n", request.headers());
                        var requestBody = request.body();
                        var contentLength = requestBody ? requestBody.contentLength() : 0;
                        if (contentLength > 0) {
                            var BufferObj = Buffer.$new();
                            requestBody.writeTo(BufferObj);
                            try {
                                console.log("\nrequest body String:\n", BufferObj.readString(), "\n");
                            } catch (error) {
                                try {
                                    console.log("\nrequest body ByteString:\n", ByteString.of(BufferObj.readByteArray()).hex(), "\n");
                                } catch (error) {
                                    console.log("error 1:", error);
                                }
                            }
                        }
                    } catch (error) {
                        console.log("error 2:", error);
                    }
                    var response = chain.proceed(request);
                    try {
                        console.log("MyInterceptor.intercept onLeave:", response, "\nresponse headers:\n", response.headers());
                        var responseBody = response.body();
                        var contentLength = responseBody ? responseBody.contentLength() : 0;
                        if (contentLength > 0) {
                            console.log("\nresponsecontentLength:", contentLength, "responseBody:", responseBody, "\n");

                            var ContentType = response.headers().get("Content-Type");
                            console.log("ContentType:", ContentType);
                            if (ContentType.indexOf("video") == -1) {
                                if (ContentType.indexOf("application") == 0) {
                                    var source = responseBody.source();
                                    if (ContentType.indexOf("application/zip") != 0) {
                                        try {
                                            console.log("\nresponse.body StringClass\n", source.readUtf8(), "\n");
                                        } catch (error) {
                                            try {
                                                console.log("\nresponse.body ByteString\n", source.readByteString().hex(), "\n");
                                            } catch (error) {
                                                console.log("error 4:", error);
                                            }
                                        }
                                    }
                                }

                            }

                        }

                    } catch (error) {
                        console.log("error 3:", error);
                    }
                    return response;
                }
            }
        });
        var ArrayList = Java.use("java.util.ArrayList");
        var OkHttpClient = Java.use("okhttp3.OkHttpClient");
        console.log(OkHttpClient);
        OkHttpClient.$init.overload('okhttp3.OkHttpClient$Builder').implementation = function(Builder) {
            console.log("OkHttpClient.$init:", this, Java.cast(Builder.interceptors(), ArrayList));
            this.$init(Builder);
        };

        var MyInterceptorObj = MyInterceptor.$new();
        var Builder = Java.use("okhttp3.OkHttpClient$Builder");
        console.log(Builder);
        Builder.build.implementation = function() {
            this.interceptors().clear();
            //var MyInterceptorObj = MyInterceptor.$new();
            this.interceptors().add(MyInterceptorObj);
            var result = this.build();
            return result;
        };

        Builder.addInterceptor.implementation = function(interceptor) {
            this.interceptors().clear();
            //var MyInterceptorObj = MyInterceptor.$new();
            this.interceptors().add(MyInterceptorObj);
            return this;
            //return this.addInterceptor(interceptor);
        };

        console.log("hook_okhttp3...");
    });
}






/* 
   Android SSL Re-pinning frida script v0.2 030417-pier 

   $ adb push burpca-cert-der.crt /data/local/tmp/cert-der.crt
   $ frida -U -f it.app.mobile -l frida-android-repinning.js --no-pause

   https://techblog.mediaservice.net/2017/07/universal-android-ssl-pinning-bypass-with-frida/
   
   UPDATE 20191605: Fixed undeclared var. Thanks to @oleavr and @ehsanpc9999 !
*/

setTimeout(function(){
    Java.perform(function (){
        try {
            console.log("");
            console.log("[.] Cert Pinning Bypass/Re-Pinning");

            var CertificateFactory = Java.use("java.security.cert.CertificateFactory");
            var FileInputStream = Java.use("java.io.FileInputStream");
            var BufferedInputStream = Java.use("java.io.BufferedInputStream");
            var X509Certificate = Java.use("java.security.cert.X509Certificate");
            var KeyStore = Java.use("java.security.KeyStore");
            var TrustManagerFactory = Java.use("javax.net.ssl.TrustManagerFactory");
            var SSLContext = Java.use("javax.net.ssl.SSLContext");

            // Load CAs from an InputStream
            console.log("[+] Loading our CA...")
            var cf = CertificateFactory.getInstance("X.509");
            
            try {
                var fileInputStream = FileInputStream.$new("/data/local/tmp/cert-der.crt");
            }
            catch(err) {
                console.log("[o] " + err);
            }
            
            var bufferedInputStream = BufferedInputStream.$new(fileInputStream);
            var ca = cf.generateCertificate(bufferedInputStream);
            bufferedInputStream.close();

            var certInfo = Java.cast(ca, X509Certificate);
            console.log("[o] Our CA Info: " + certInfo.getSubjectDN());

            // Create a KeyStore containing our trusted CAs
            console.log("[+] Creating a KeyStore for our CA...");
            var keyStoreType = KeyStore.getDefaultType();
            var keyStore = KeyStore.getInstance(keyStoreType);
            keyStore.load(null, null);
            keyStore.setCertificateEntry("ca", ca);
            
            // Create a TrustManager that trusts the CAs in our KeyStore
            console.log("[+] Creating a TrustManager that trusts the CA in our KeyStore...");
            var tmfAlgorithm = TrustManagerFactory.getDefaultAlgorithm();
            var tmf = TrustManagerFactory.getInstance(tmfAlgorithm);
            tmf.init(keyStore);
            console.log("[+] Our TrustManager is ready...");

            console.log("[+] Hijacking SSLContext methods now...")
            console.log("[-] Waiting for the app to invoke SSLContext.init()...")

            SSLContext.init.overload("[Ljavax.net.ssl.KeyManager;", "[Ljavax.net.ssl.TrustManager;", "java.security.SecureRandom").implementation = function(a,b,c) {
                console.log("[o] App invoked javax.net.ssl.SSLContext.init...");
                SSLContext.init.overload("[Ljavax.net.ssl.KeyManager;", "[Ljavax.net.ssl.TrustManager;", "java.security.SecureRandom").call(this, a, tmf.getTrustManagers(), c);
                console.log("[+] SSLContext initialized with our custom TrustManager!");
            }
        }
        catch (e) {
            console.log(e);
        }
//Universal Android SSL Pinning Bypass 2
        try {
            var array_list = Java.use("java.util.ArrayList");
            var ApiClient = Java.use('com.android.org.conscrypt.TrustManagerImpl');

            ApiClient.checkTrustedRecursive.implementation = function(a1, a2, a3, a4, a5, a6) {
                console.log('Bypassing SSL Pinning');
                var k = array_list.$new();
                return k;
            }
        }
        catch (e) {
            console.log(e);
        }
// Android Certificate Pinning Bypass
        try {
            // Invalidate the certificate pinner set up
            var OkHttpClient = Java.use("com.squareup.okhttp.OkHttpClient");
            OkHttpClient.setCertificatePinner.implementation = function(certificatePinner){
                // do nothing
                console.log("Called!");
                return this;
            };

            // Invalidate the certificate pinnet checks (if "setCertificatePinner" was called before the previous invalidation)
            var CertificatePinner = Java.use("com.squareup.okhttp.CertificatePinner");
            CertificatePinner.check.overload('java.lang.String', '[Ljava.security.cert.Certificate;').implementation = function(p0, p1){
                // do nothing
                console.log("Called! [Certificate]");
                return;
            };
            CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function(p0, p1){
                // do nothing
                console.log("Called! [List]");
                return;
            };
        }
        catch (e) {
            console.log(e);
        }
//okhttp3-certificate-pinner-bypass
        try {
            
            let OkHttpClient = Java.use("okhttp3.OkHttpClient");
            OkHttpClient["certificatePinner"].implementation = function () {
                console.log(`OkHttpClient.certificatePinner is called`);
                let result = this["certificatePinner"]();
                console.log(`OkHttpClient.certificatePinner result=${result}`);
                return result;
};

            var TrustManagerImpl = Java.use('com.android.org.conscrypt.TrustManagerImpl');
            var ArrayList = Java.use("java.util.ArrayList");
            TrustManagerImpl.verifyChain.implementation = function(untrustedChain, trustAnchorChain,
                host, clientAuth, ocspData, tlsSctData) {
                console.log("[+] Bypassing TrustManagerImpl->verifyChain()");
                return untrustedChain;
            }
            TrustManagerImpl.checkTrustedRecursive.implementation = function(certs, host, clientAuth, untrustedChain,
                trustAnchorChain, used) {
                console.log("[+] Bypassing TrustManagerImpl->checkTrustedRecursive()");
                return ArrayList.$new();
            };
            var CertificatePinner = Java.use('okhttp3.CertificatePinner');
            console.log("[+] Bypassing CertificatePinner->check()");
            CertificatePinner.check.overload('java.lang.String', 'java.util.List').implementation = function(hostname, peerCertificates) {
                return;
            }
        }
        catch (e) {
            console.log(e);
        }
//okhttp3-pinning-bypass
        try {
            var okhttp3_CertificatePinner_class = null;
            try {
                okhttp3_CertificatePinner_class = Java.use('okhttp3.CertificatePinner');    
            } catch (err) {
                console.log('[-] OkHTTPv3 CertificatePinner class not found. Skipping.');
                okhttp3_CertificatePinner_class = null;
            }

            if(okhttp3_CertificatePinner_class != null) {

                try{
                    okhttp3_CertificatePinner_class.check.overload('java.lang.String', 'java.util.List').implementation = function (str,list) {
                        console.log('[+] Bypassing OkHTTPv3 1: ' + str);
                        return true;
                    };
                    console.log('[+] Loaded OkHTTPv3 hook 1');
                } catch(err) {
                    console.log('[-] Skipping OkHTTPv3 hook 1');
                }

                try{
                    okhttp3_CertificatePinner_class.check.overload('java.lang.String', 'java.security.cert.Certificate').implementation = function (str,cert) {
                        console.log('[+] Bypassing OkHTTPv3 2: ' + str);
                        return true;
                    };
                    console.log('[+] Loaded OkHTTPv3 hook 2');
                } catch(err) {
                    console.log('[-] Skipping OkHTTPv3 hook 2');
                }

                try {
                    okhttp3_CertificatePinner_class.check.overload('java.lang.String', '[Ljava.security.cert.Certificate;').implementation = function (str,cert_array) {
                        console.log('[+] Bypassing OkHTTPv3 3: ' + str);
                        return true;
                    };
                    console.log('[+] Loaded OkHTTPv3 hook 3');
                } catch(err) {
                    console.log('[-] Skipping OkHTTPv3 hook 3');
                }

                try {
                    okhttp3_CertificatePinner_class['check$okhttp'].implementation = function (str,obj) {
                        console.log('[+] Bypassing OkHTTPv3 4 (4.2+): ' + str);
                    };
                    console.log('[+] Loaded OkHTTPv3 hook 4 (4.2+)');
                } catch(err) {
                    console.log('[-] Skipping OkHTTPv3 hook 4 (4.2+)');
                }

            }
        }
        catch (e) {
            console.log(e);
        }

    });
},0);

