package com.javasampleapproach.solr.repo;

import java.util.List;

import org.springframework.data.solr.repository.SolrCrudRepository;

import com.javasampleapproach.solr.model.Customer;

public interface CustomerRepository extends SolrCrudRepository<Customer, String> {
	List<Customer> findByNameEndsWith(String name);
	List<Customer> findByNameStartsWith(String name);
}

//https://docs.spring.io/spring-data/solr/docs/current/api/org/springframework/data/solr/repository/SolrCrudRepository.html
//https://www.petrikainulainen.net/programming/solr/spring-data-solr-tutorial-query-methods/