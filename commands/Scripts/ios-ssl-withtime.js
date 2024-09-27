var CALLBACK_OFFSET = 0x2b8;
function key_logger(ssl, line) {
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
    var dateTime = date + ' ' + time;

    console.log(dateTime + new NativePointer(line).readCString());
}

var key_log_callback = new NativeCallback(key_logger, 'void', ['pointer', 'pointer']);
var SSL_CTX_set_info_callback = Module.findExportByName("libboringssl.dylib", "SSL_CTX_set_info_callback");

Interceptor.attach(SSL_CTX_set_info_callback, {
    onEnter: function(args) {
        var ssl = new NativePointer(args[0]);
        var callback = new NativePointer(ssl).add(CALLBACK_OFFSET);

        callback.writePointer(key_log_callback);
    }
});