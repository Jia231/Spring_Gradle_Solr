package com.javasampleapproach.solr;
import java.util.ArrayList;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.beans.factory.annotation.Autowired;
import com.javasampleapproach.solr.model.Customer;
import com.javasampleapproach.solr.repo.CustomerRepository;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.javasampleapproach.solr.model.Response;
import com.javasampleapproach.solr.utils.JavaUtils;

@RestController
public class UserController {
    @Autowired
    private CustomerRepository customerRepository;
    @Autowired
    private JavaUtils javaUtils;

   /* @RequestMapping("/users")
    public ArrayList<Customer> users(){
        ArrayList<Customer> customerList = new ArrayList<>();
        for(Customer product : this.customerRepository.findAll()){
            customerList.add(product);
        }
        return customerList;
    }*/

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
   /* @PostMapping("/addUser")
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
    @PostMapping("/addUser")
        public ResponseEntity<Response> addUser(RequestEntity<Customer> customer){
            //System.out.println(customer.getBody().getName() + " " + customer.getBody().getAge());
            Response res = new Response();
            ArrayList<String> output = new ArrayList<>();
            output.add("User saved successfully");
            res.setData(output);
            ResponseEntity<Response> responseEntity = new ResponseEntity<>(res,
                                                                     HttpStatus.OK);
            return responseEntity;
        }
    
}

