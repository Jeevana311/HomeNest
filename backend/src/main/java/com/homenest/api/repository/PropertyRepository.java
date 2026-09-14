package com.homenest.api.repository;

import com.homenest.api.model.Property;
import com.homenest.api.model.User;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import java.util.List;

public interface PropertyRepository extends JpaRepository<Property, Long>, JpaSpecificationExecutor<Property> {
    @Override
    @EntityGraph(attributePaths = "details")
    List<Property> findAll();

    List<Property> findByOwner(User owner);
}
