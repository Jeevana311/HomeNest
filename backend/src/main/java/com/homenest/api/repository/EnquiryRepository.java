package com.homenest.api.repository;

import com.homenest.api.model.Enquiry;
import com.homenest.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface EnquiryRepository extends JpaRepository<Enquiry, Long> {
    List<Enquiry> findByCustomerOrderByCreatedAtDesc(User customer);
}
