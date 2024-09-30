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

Java.perform(function () {
    // Hook na classe Cipher
    var Cipher = Java.use('javax.crypto.Cipher');

    // Intercepta o método init() do Cipher para capturar detalhes da inicialização
    Cipher.init.overload('int', 'java.security.Key').implementation = function (opmode, key) {
        console.log("[*] Cipher init() chamado (Modo: " + getCipherMode(opmode) + ")");

        // Captura a chave (AES ou RSA) e exibe em Base64
        var encodedKey = key.getEncoded();
        console.log("[*] Chave usada (Base64): " + base64Encode(encodedKey));

        // Obtém informações sobre a pilha de chamadas para identificar a origem
        var stackTrace = Java.use('java.lang.Exception').$new().getStackTrace();
        console.log("[*] Stack Trace:");
        for (var i = 0; i < stackTrace.length; i++) {
            console.log("  " + stackTrace[i].toString());
        }

        // Chama o método original
        return this.init(opmode, key);
    };

    // Intercepta o método init() que usa IvParameterSpec
    Cipher.init.overload('int', 'java.security.Key', 'java.security.spec.AlgorithmParameterSpec').implementation = function (opmode, key, params) {
        console.log("[*] Cipher init() chamado com IV (Modo: " + getCipherMode(opmode) + ")");

        // Captura a chave (AES) e exibe em Base64
        var encodedKey = key.getEncoded();
        console.log("[*] Chave AES usada (Base64): " + base64Encode(encodedKey));

        // Captura o IV usado no modo AES/CBC
        var iv = params.getIV();
        console.log("[*] IV usado (Base64): " + base64Encode(iv));

        // Obtém informações sobre a pilha de chamadas para identificar a origem
        var stackTrace = Java.use('java.lang.Exception').$new().getStackTrace();
        console.log("[*] Stack Trace:");
        for (var i = 0; i < stackTrace.length; i++) {
            console.log("  " + stackTrace[i].toString());
        }

        // Chama o método original
        return this.init(opmode, key, params);
    };

    // Intercepta o método doFinal() para capturar os dados criptografados
    Cipher.doFinal.overload('[B').implementation = function (input) {
        console.log("[*] Cipher doFinal() chamado");

        // Exibe os dados de entrada
        console.log("[*] Dados de entrada (Base64): " + base64Encode(input));

        // Chama o método original e captura a saída
        var output = this.doFinal(input);

        // Exibe os dados de saída
        console.log("[*] Dados de saída (Base64): " + base64Encode(output));

        // Obtém informações sobre a pilha de chamadas para identificar a origem
        var stackTrace = Java.use('java.lang.Exception').$new().getStackTrace();
        console.log("[*] Stack Trace:");
        for (var i = 0; i < stackTrace.length; i++) {
            console.log("  " + stackTrace[i].toString());
        }

        // Retorna o valor criptografado/descriptografado
        return output;
    };

    // Função auxiliar para codificar dados em Base64
    function base64Encode(byteArray) {
        var Base64 = Java.use('android.util.Base64');
        return Base64.encodeToString(byteArray, 0);  // Base64.DEFAULT
    }

    // Função auxiliar para identificar o modo de operação do Cipher (encrypt/decrypt)
    function getCipherMode(opmode) {
        switch (opmode) {
            case 1: return "ENCRYPT_MODE";
            case 2: return "DECRYPT_MODE";
            case 3: return "WRAP_MODE";
            case 4: return "UNWRAP_MODE";
            default: return "UNKNOWN_MODE";
        }
    }

    console.log("[*] Hooks instalados com sucesso!");
});
