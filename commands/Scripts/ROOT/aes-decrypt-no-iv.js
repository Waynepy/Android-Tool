function byteArrayToString(arrayBuffer) {
    return String.fromCharCode.apply(null, new Uint8Array(arrayBuffer));
}

Java.perform(() => {
    const secretKeySpec = Java.use('javax.crypto.spec.SecretKeySpec');
    secretKeySpec.$init.overload('[B', 'java.lang.String').implementation = function(key, algo) {
        console.log('key:' + byteArrayToString(key));
        console.log('algo:' + algo);
        return this.$init(key, algo);
    };

    const cipher = Java.use('javax.crypto.Cipher')['doFinal'].overload('[B').implementation = function(byteArray) {
        console.log('encode:' + byteArrayToString(byteArray));
        return this.doFinal(byteArray);
    };
});