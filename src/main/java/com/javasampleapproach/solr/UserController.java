package com.javasampleapproach.solr;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import com.javasampleapproach.solr.model.Customer;
import com.javasampleapproach.solr.repo.CustomerRepository;
import org.springframework.web.bind.annotation.PostMapping;

@RestController
public class UserController {
    @Autowired
    private CustomerRepository customerRepository;
    @RequestMapping("/users")
    public ArrayList<Customer> users(){
        ArrayList<Customer> customerList = new ArrayList<>();
        for(Customer product : this.customerRepository.findAll()){
            customerList.add(product);
        }
        return customerList;
    }
    @PostMapping("/addUser")
    public Customer addUser(Customer customer){
        System.out.println(customer);
        customerRepository.save(customer);
        return customer;
    }
}

