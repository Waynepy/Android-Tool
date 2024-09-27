Java.perform(function() {
    // Intercepta métodos relacionados à criptografia
    var cipherClass = Java.use('javax.crypto.Cipher');
    var keyGeneratorClass = Java.use('javax.crypto.KeyGenerator');
    var signatureClass = Java.use('java.security.Signature');

    // Intercepta métodos para imprimir informações
    cipherClass.getInstance.overload('java.lang.String').implementation = function(algorithm) {
        var callingClass = this.$className;
        console.log('Cipher getInstance called from class:', callingClass, 'with algorithm:', algorithm);
        return this.getInstance(algorithm);
    };

    keyGeneratorClass.getInstance.overload('java.lang.String').implementation = function(algorithm) {
        var callingClass = this.$className;
        console.log('KeyGenerator getInstance called from class:', callingClass, 'with algorithm:', algorithm);
        return this.getInstance(algorithm);
    };

    signatureClass.getInstance.overload('java.lang.String').implementation = function(algorithm) {
        var callingClass = this.$className;
        console.log('Signature getInstance called from class:', callingClass, 'with algorithm:', algorithm);
        return this.getInstance(algorithm);
    };
});