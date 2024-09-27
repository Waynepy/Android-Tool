Java.perform(function() {
    // Obtém a classe que contém o método de interesse
    var ValidaTelefoneCliente = Java.use('br.gov.bnb.crediamigo.cliente.domain.model.ValidaTelefoneCliente');

    // Hook no método getTelefone da classe
    ValidaTelefoneCliente.getTelefone.implementation = function() {
        // Obtém o telefone original
        var telefoneOriginal = this.getTelefone();

        // Imprime o telefone no console do Frida
        console.log('Telefone obtido: ' + telefoneOriginal);

        // Retorna o valor original
        return telefoneOriginal;
    };
});
