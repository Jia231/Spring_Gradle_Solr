package com.javasampleapproach.solr.model;
import java.util.ArrayList;

public class Response{

    /*private String data;

    public void setData (String data){
        this.data = data;
    }

    public String getData(){
        return data;
    }*/

    private ArrayList<?> data;

    public void setData (ArrayList data){
        this.data = data;
    }

    public ArrayList<?> getData(){
        return data;
    }

}