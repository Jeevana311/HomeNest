package com.homenest.api.repository;

import com.homenest.api.model.ScheduledVisit;
import com.homenest.api.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ScheduledVisitRepository extends JpaRepository<ScheduledVisit, Long> {
    List<ScheduledVisit> findByCustomerOrderByVisitDateAsc(User customer);
}
