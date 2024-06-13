package com.fullstackapp.ecommerce.dao;

import com.fullstackapp.ecommerce.entity.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.CrossOrigin;

//JpaRepository<Entity Type, Primary Key Type>
@CrossOrigin("http://localhost:4200") //Accept calls from web browser scripts for this origin
public interface ProductRepository extends JpaRepository<Product, Long> {
    //Query Method - Match by category id
    //Behind the scenes - Spring will execute query similar to this - SELECT * from product where category_id=?
    Page<Product> findByCategoryId(@Param("id") Long id, Pageable pageable);
}
