Java.perform(function() {
    // Captura todas as classes do aplicativo
    var classes = Java.enumerateLoadedClassesSync();

    classes.forEach(function(className) {
        try {
            // Tenta usar a classe
            var clazz = Java.use(className);

            // Captura todos os métodos da classe
            var methods = clazz.getDeclaredMethods();
            methods.forEach(function(method) {
                var methodName = method.getName();

                // Implementa o hook para cada método
                clazz[methodName].implementation = function() {
                    console.log('Método chamado: ' + className + '.' + methodName);
                    console.log('Argumentos: ', arguments);

                    // Chame o método original e armazene o resultado
                    var result = this[methodName].apply(this, arguments);

                    console.log('Resultado: ' + result);
                    return result; // Retorna o resultado original
                };
            });
        } catch (e) {
            console.log('Erro ao processar a classe: ' + className + ' - ' + e);
        }
    });
});
