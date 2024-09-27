Java.perform(function() {
    // Intercepta métodos relacionados à geração de chave
    var keyPairGeneratorClass = Java.use('java.security.KeyPairGenerator');
    var keyFactoryClass = Java.use('java.security.KeyFactory');

    // Intercepta métodos para imprimir informações
    keyPairGeneratorClass.getInstance.overload('java.lang.String').implementation = function(algorithm) {
        console.log('KeyPairGenerator getInstance called with algorithm:', algorithm);
        return this.getInstance(algorithm);
    };

    keyFactoryClass.getInstance.overload('java.lang.String').implementation = function(algorithm) {
        console.log('KeyFactory getInstance called with algorithm:', algorithm);
        return this.getInstance(algorithm);
    };
});