package com.javasampleapproach.solr;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
public class IndexController {
    @RequestMapping("/")
    public String index() {
       String str = "Hello from Spring";
       return str;
    }

}