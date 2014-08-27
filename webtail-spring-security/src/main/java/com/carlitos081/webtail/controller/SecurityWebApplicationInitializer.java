package com.carlitos081.webtail.controller;

import org.springframework.security.web.context.*;

public class SecurityWebApplicationInitializer
extends AbstractSecurityWebApplicationInitializer {

	public SecurityWebApplicationInitializer() {
		super(SecurityConfig.class);
	}
}