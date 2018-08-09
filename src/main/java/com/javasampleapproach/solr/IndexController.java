package com.javasampleapproach.solr;
import java.util.Arrays;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
//newly added
import org.springframework.beans.factory.annotation.Autowired;
import com.javasampleapproach.solr.model.Customer;
import com.javasampleapproach.solr.repo.CustomerRepository;

@RestController
public class IndexController {
 @Autowired
	private CustomerRepository customerRepository;
    @RequestMapping("/")
    public String index() {
   String str = "";

	customerRepository.deleteAll();
		// Store customers
		customerRepository.saveAll(Arrays.asList(new Customer("1", "Jack", 20), 
											new Customer("2", "Adam", 24),
											new Customer("3", "Kim", 27), 
											new Customer("4", "David", 30), 
											new Customer("5", "Peter", 21),
											new Customer("6", "Jim", 21)));


        str = "All customers: <br>" ; 
		for (Customer product : this.customerRepository.findAll()) {
			str = str + "<br>" + product.getName();
		}

        str = str + "<br><br>" + "Customers that name end in m" + "<br>";

		for (Customer customer : this.customerRepository.findByNameEndsWith("m")) {
            str = str + "<br>"  + customer.getName();
		}
		str = str + "<br><br>" + "Customers that name starts in d" + "<br>";
		for (Customer customer : this.customerRepository.findByNameStartsWith("d")) {
            str = str + "<br>"  + customer.getName();
		}
        return str;
    }

}