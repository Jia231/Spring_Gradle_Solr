package com.javasampleapproach.solr;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.ApplicationRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SpringBootSolrApplication implements CommandLineRunner {
	@Override
	public void run(String... args) throws Exception {
    	System.out.println("Let's inspect the beans provided by Spring Boot:");	
	}
	public static void main(String[] args) throws Exception {
		SpringApplication.run(SpringBootSolrApplication.class, args);	
	}
}