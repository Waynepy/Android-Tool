setTimeout(function(){
    Java.perform(function (){
    	console.log("");
	    console.log("[.] Cert Pinning Bypass/Re-Pinning");
	    var CertificateFactory = Java.use("java.security.cert.CertificateFactory");
	    var FileInputStream = Java.use("java.io.FileInputStream");
	    var BufferedInputStream = Java.use("java.io.BufferedInputStream");
	    var X509Certificate = Java.use("java.security.cert.X509Certificate");
	    var KeyStore = Java.use("java.security.KeyStore");
	    var TrustManagerFactory = Java.use("javax.net.ssl.TrustManagerFactory");
	    var SSLContext = Java.use("javax.net.ssl.SSLContext");
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
	    var keyStoreType = KeyStore.getDefaultType();
	    var keyStore = KeyStore.getInstance(keyStoreType);
	    keyStore.load(null, null);
	    keyStore.setCertificateEntry("ca", ca);
	    var tmfAlgorithm = TrustManagerFactory.getDefaultAlgorithm();
	    var tmf = TrustManagerFactory.getInstance(tmfAlgorithm);
	    tmf.init(keyStore);
	   	SSLContext.init.overload("[Ljavax.net.ssl.KeyManager;", "[Ljavax.net.ssl.TrustManager;", "java.security.SecureRandom").implementation = function(a,b,c) {
	   		console.log("[o] App invoked javax.net.ssl.SSLContext.init...");
	   		SSLContext.init.overload("[Ljavax.net.ssl.KeyManager;", "[Ljavax.net.ssl.TrustManager;", "java.security.SecureRandom").call(this, a, tmf.getTrustManagers(), c);
	   	}
    });
},0);