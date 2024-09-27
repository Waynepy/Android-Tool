Java.perform(function () {
    var Cipher = Java.use("javax.crypto.Cipher");
    Cipher.getInstance.overload('java.lang.String').implementation = function (algorithm) {
        var stackTrace = Java.use("android.util.Log").getStackTraceString(Java.use("java.lang.Exception").$new());
        console.log("[Cipher.getInstance()] Classe: " + this.$className + ", Contexto: " + stackTrace);
        console.log("[Cipher.getInstance()] Algoritmo: " + algorithm);
        return this.getInstance(algorithm);
    };
});