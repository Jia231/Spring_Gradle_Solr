package com.javasampleapproach.solr.model;

public class FilterActionOption{
    private String name;
    private String value;

    public FilterActionOption(){}

    public FilterActionOption(String name,String value){
        this.name = name;
        this.value = value;
    }

    public String getName(){
        return name;
    }
    public String getValue(){
        return value;
    }
}