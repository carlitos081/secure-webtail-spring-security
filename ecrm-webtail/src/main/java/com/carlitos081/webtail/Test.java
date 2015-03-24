package com.carlitos081.webtail;


public class Test {

	public static void main(String[] args) {
		String test = "<span>ug 27, 2014 2:32:26 PM org.apache.catalina.core.AprLifecycleListener init<br>INFO: The APR based Apache Tomcat Native library which allows optimal performance in production environments was not found on the java.library.path: /Users/carloschizzo/Library/Java/Extensions:/Library/Java/Extensions:/Network/Library/Java/Extensions:/System/Library/Java/Extensions:/usr/lib/java:.<br>Aug 27, 2014 2:32:27 PM org.apache.coyote.AbstractProtocol init<br>INFO: Initializing ProtocolHandler [\"http-bio-8080\"]<br>Aug 27, 2014 2:32:27 PM org.apache.coyote.AbstractProtocol init<br>INFO: Initializing ProtocolHandler [\"ajp-bio-8009\"]<br>Aug 27, 2014 2:32:27 PM org.apache.catalina.startup.Catalina load<br>INFO: Initialization processed in 1225 ms<br>Aug 27, 2014 2:32:27 PM org.apache.catalina.core.StandardService startInternal<br>INFO: Starting service Catalina<br>Aug 27, 2014 2:32:27 PM org.apache.catalina.core.StandardEngine startInternal<br>INFO: Starting Servlet Engine: Apache Tomcat/7.0.55<br>Aug 27, 2014 2:32:27 PM org.apache.catalina.startup.HostConfig deployWAR<br>INFO: Deploying web application archive /development/servers/tomcat/apache-tomcat-7.0.55/webapps/webtail-1.0-SNAPSHOT.war<br>Aug 27, 2014 2:32:33 PM org.apache.catalina.startup.HostConfig deployWAR<br>INFO: Deployment of web application archive /development/servers/tomcat/apache-tomcat-7.0.55/webapps/webtail-1.0-SNAPSHOT.war has finished in 6,462 ms<br>Aug 27, 2014 2:32:33 PM org.apache.coyote.AbstractProtocol start<br>INFO: Starting ProtocolHandler [\"http-bio-8080\"]<br>Aug 27, 2014 2:32:33 PM org.apache.coyote.AbstractProtocol start<br>INFO: Starting ProtocolHandler [\"ajp-bio-8009\"]<br>Aug 27, 2014 2:32:33 PM org.apache.catalina.startup.Catalina start<br>INFO: Server startup in 6566 ms<br>Aug 27, 2014 2:33:05 PM org.apache.jasper.compiler.TldLocationsCache tldScanJar<br>INFO: At least one JAR was scanned for TLDs yet contained no TLDs. Enable debug logging for this logger for a complete list of JARs that were scanned but no TLDs were found in them. Skipping unneeded JARs during scanning can improve startup time and JSP compilation time.<br>Aug 27, 2014 11:58:37 PM org.apache.catalina.core.StandardServer await<br>INFO: A valid shutdown command was received via the shutdown port. Stopping the Server instance.<br>Aug 27, 2014 11:58:37 PM org.apache.coyote.AbstractProtocol pause<br>INFO: Pausing ProtocolHandler [\"http-bio-8080\"]<br>Aug 27, 2014 11:58:37 PM org.apache.coyote.AbstractProtocol pause<br>INFO: Pausing ProtocolHandler [\"ajp-bio-8009\"]<br>Aug 27, 2014 11:58:37 PM org.apache.catalina.core.StandardService stopInternal<br>INFO: Stopping service Catalina<br>Aug 27, 2014 11:58:38 PM org.apache.coyote.AbstractProtocol stop<br>INFO: Stopping ProtocolHandler [\"http-bio-8080\"]<br>Aug 27, 2014 11:58:38 PM org.apache.coyote.AbstractProtocol stop<br>INFO: Stopping ProtocolHandler [\"ajp-bio-8009\"]<br>Aug 27, 2014 11:58:38 PM org.apache.coyote.AbstractProtocol destroy<br>INFO: Destroying ProtocolHandler [\"http-bio-8080\"]<br>Aug 27, 2014 11:58:38 PM org.apache.coyote.AbstractProtocol destroy<br>INFO: Destroying ProtocolHandler [\"ajp-bio-8009\"]<br>ERROR: sdfigiahvuh oi oidfhgo[qidhgf pojfgoiqjeg<br>dsoijfgaqdskjga'pqdjkgapljdgpoadjsfpgjadpffgjpakdjgpjdfgpjdfgjodfihgodshfigjhdfijghdisjfhgjdksfhgkjsdhgkjshdfgjhsdfkjghksfhgskjdfhgkjshfdgkhsfkjghsdfjhgksdjfhgkjsdfhgkjhsdfgkjhsdfkjghksfhgkjsdfhgkjhsdfgkjhsdkfjghslkdfjhgklsdjfhgksjdfhglkjsdfhglkjsdhfglkjhsdflkgjhsdlfkjghlksdfjhglksdjfhglkjsdfhglkjdfshglkjdfhsgkjhsdfkgjhsdflkjghlskdfjghslkdfjghlskdfjghslkdfjghksdfjshglskdjfhglksjdfhglkjdsfhgkjhsdlfkjghlksdjfghlskdjfghlksjdfhglksjdfhglkjhsdlfkjghlskdjfhglksjdfhglskdjfhglksdjfglksjdhfgkljshdfgjkhskldfjghskdjfghglksdjfghksjdgfh<br>libnea1<br>linea2<br>linea3<br>linea4</span>";

		String[] st = test.split("<br>");
		
		System.out.println("number "+st.length);
		StringBuilder sb = new StringBuilder();
		
		for (int i = 0; i < st.length; i++) {
			if(st[i].contains("ERROR")){
				sb.append("<br><span style=\"color:red>"+st[i]+"<\\span>");
			}else{
				sb.append("<br>"+st[i]);
			}
		}
		
		System.out.println("result: "+sb.toString()); 
	}

}
