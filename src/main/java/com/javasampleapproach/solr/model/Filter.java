package com.javasampleapproach.solr.model;

public class Filter{
    private String letter;
    private String filterBy;
    public Filter(){

    }

    public Filter(String letter,String filterBy){
        this.letter = letter;
        this.filterBy = filterBy;
    }

    public void setLetter(String letter){
        this.letter = letter;
    }
    public void setFilterBy(String filterBy){
        this.filterBy = filterBy;
    }

    public String getLetter(){
        return this.letter;
    }

    public String getFilter(){
        return this.filterBy;
    }
}