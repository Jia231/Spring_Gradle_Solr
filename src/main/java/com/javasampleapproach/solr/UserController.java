package com.javasampleapproach.solr;

import java.util.ArrayList;
import java.util.Arrays;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.CrossOrigin;
import com.javasampleapproach.solr.model.Filter;
import com.javasampleapproach.solr.model.FilterActions;
import com.javasampleapproach.solr.model.FilterActionOption;
import com.javasampleapproach.solr.model.Customer;
import com.javasampleapproach.solr.model.Response;
import com.javasampleapproach.solr.utils.JavaUtils;
import com.javasampleapproach.solr.repo.CustomerRepository;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;


@CrossOrigin(origins = "http://localhost:9000")
@RestController
public class UserController {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private JavaUtils javaUtils;
    @RequestMapping("/users")
    public ResponseEntity<Response> users(){
        ArrayList<Customer> customerList = new ArrayList<>();
        for(Customer product : this.customerRepository.findAll()){
            customerList.add(product);
        }
        Response res = new Response();
        res.setData(customerList);

        ResponseEntity<Response> responseEntity = new ResponseEntity<>(res,
                                                                     HttpStatus.OK);
            return responseEntity;
    }

    @PostMapping("/filter")
    public ResponseEntity<Response> FilterBy(@RequestBody Filter f){
        ArrayList<Customer> customerList = new ArrayList<>();
        if(f.getFilter().equals("findByNameEndsWith")){
            for(Customer c : this.customerRepository.findByNameEndsWith(f.getLetter())){
                customerList.add(c);
            }
        }
        else if(f.getFilter().equals("findByNameStartsWith")){
             for(Customer c : this.customerRepository.findByNameStartsWith(f.getLetter())){
                customerList.add(c);
            }
        }
        Response res = new Response();
        res.setData(customerList);

        ResponseEntity<Response> responseEntity = new ResponseEntity<>(res,
                                                                     HttpStatus.OK);
            return responseEntity;
    }

    @RequestMapping("/actions")
    public ResponseEntity<Response>  getFilterActions(){
        ArrayList<FilterActionOption> options = new ArrayList<>();
        FilterActions data = new FilterActions();
       options =  data.getOptions();
        Response res = new Response();
        res.setData(options);
         ResponseEntity<Response> responseEntity = new ResponseEntity<>(res,
                                                                     HttpStatus.OK);
            return responseEntity;
    }

    @RequestMapping("/delete")
    public ResponseEntity<Response> clearDatabase(){
        customerRepository.deleteAll();
        Response res = new Response();
        ArrayList<String> output = new ArrayList<>();
        output.add("Database has been cleared.");
        res.setData(output);

        ResponseEntity<Response> responseEntity = new ResponseEntity<>(res,
                                                                     HttpStatus.OK);
            return responseEntity;
    }
    @RequestMapping("/populate")
    public ResponseEntity<Response> populateDatabase(){
       customerRepository.saveAll(Arrays.asList(new Customer("1", "Jack", 20), 
											new Customer("2", "Adam", 24),
											new Customer("3", "Kim", 27), 
											new Customer("4", "David", 30), 
											new Customer("5", "Peter", 21),
											new Customer("6", "Jim", 21)));
        Response res = new Response();
        ArrayList<String> output = new ArrayList<>();
        output.add("Database has been populated.");
        res.setData(output);

        ResponseEntity<Response> responseEntity = new ResponseEntity<>(res,
                                                                     HttpStatus.OK);
            return responseEntity;
    }
    @PostMapping("/addUser")
        public ResponseEntity<Response> addUser(@RequestBody Customer customer){

                if(javaUtils.validCustomer(customer)){
                    int l = javaUtils.assignId();
                    l = l +1;
                    String id = Integer.toString(l);
                    Customer newCustomer = new Customer(id,customer.getName(),customer.getAge());
                    customerRepository.save(newCustomer);
                    Response res = new Response();
                        ArrayList<String> output = new ArrayList<>();
                        output.add("User saved successfully");
                        res.setData(output);
                        ResponseEntity<Response> responseEntity = new ResponseEntity<>(res,
                                                                                HttpStatus.OK);
                    return responseEntity;
                
                }
                else{

                    Response res = new Response();
                    ArrayList<String> output = new ArrayList<>();
                    output.add("Please check your data");
                    res.setData(output);
                    ResponseEntity<Response> responseEntity = new ResponseEntity<>(res,
                                                                            HttpStatus.BAD_REQUEST);
                    return responseEntity;
                }
            
            
        }
    
}



   /* @RequestMapping("/users")
    public ArrayList<Customer> users(){
        ArrayList<Customer> customerList = new ArrayList<>();
        for(Customer product : this.customerRepository.findAll()){
            customerList.add(product);
        }
        return customerList;
    }
    @PostMapping("/addUser")
    public String addUser(@RequestBody Customer customer){
       if(javaUtils.validCustomer(customer)){
           int l = javaUtils.assignId();
           l = l +1;
           String id = Integer.toString(l);
           Customer newCustomer = new Customer(id,customer.getName(),customer.getAge());
           customerRepository.save(newCustomer);
           ResponseEntity<String> responseEntity = new ResponseEntity<>("my response body",
                                                                     HttpStatus.OK);
       }
          return "there was an error";
    }*/