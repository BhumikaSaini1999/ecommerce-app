package com.fullstackapp.ecommerce.dao;

import com.fullstackapp.ecommerce.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.CrossOrigin;

//JpaRepository<Entity Type, Primary Key Type>
//@CrossOrigin("http://localhost:4200") //Accept calls from web browser scripts for this origin
public interface ProductRepository extends JpaRepository<Product, Long> {

}
