function killUIWebViewSSL() {
    Interceptor.attach(ObjC.classes.UIWebView["- webView:resource:canAuthenticateAgainstProtectionSpace:forDataSource:"].implementation, {
        onLeave: function(retval) {
            retval.replace(ptr('0x1'));
        }
    });
    Interceptor.attach(ObjC.classes.UIWebView["- webView:resource:didReceiveAuthenticationChallenge:fromDataSource:"].implementation, {
        onEnter: function(args) {
            const chall = new ObjC.Object(args[4]);
            const sender = chall.sender();
            const cred = ObjC.classes.NSURLCredential.credentialForTrust_(chall.protectionSpace().serverTrust());
            sender.useCredential_forAuthenticationChallenge_(cred, chall);
        }
    });
}