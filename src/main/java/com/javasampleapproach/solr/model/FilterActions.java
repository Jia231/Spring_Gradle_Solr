package com.javasampleapproach.solr.model;

import java.util.ArrayList;
import com.javasampleapproach.solr.model.FilterActionOption;

public class FilterActions {
  private ArrayList<FilterActionOption> data;
    
    public FilterActions(){
        this.data = new ArrayList<>();
        FilterActionOption option1 = new FilterActionOption("Find By Name Starts With","findByNameStartsWith");
        FilterActionOption option2 = new FilterActionOption("Find By Name Ends With","findByNameEndsWith");
        this.data.add(option1);
        this.data.add(option2);
    }
    public ArrayList<FilterActionOption> getOptions(){
        return this.data;
        
    }
}