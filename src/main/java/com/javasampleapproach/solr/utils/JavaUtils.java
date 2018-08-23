package com.javasampleapproach.solr.utils;

import java.util.ArrayList;
import org.springframework.beans.factory.annotation.Autowired;
import com.javasampleapproach.solr.model.Customer;
import com.javasampleapproach.solr.repo.CustomerRepository;
//import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

//@Component
@Service
public class JavaUtils{
    @Autowired
	private CustomerRepository customerRepository;
    public boolean validCustomer(Customer newCustomer){

        if(newCustomer.getName()==null || newCustomer.getName()=="" ){
            return false;
        }
        else if(newCustomer.getAge()==null){
            return false;
        }
        else{
            return true;
        }
    }
    public int assignId(){
        //System.out.println("in the assign class");
        ArrayList<Customer> customerList = new ArrayList<>();
        for(Customer product : this.customerRepository.findAll()){
            customerList.add(product);
        }
        int l = customerList.size();
        return l;
    }
}