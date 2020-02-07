package com.example.demospring.subscription;

import java.net.URI;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
public class SubscriptionResources {
	
	@Autowired
	private SubscriptionService subscriptionService;

	@PostMapping("/")
	public ResponseEntity<Subscription> createSubscription(@RequestParam(value = "amount") double amount,
			@RequestParam(value = "subType") int subType,
			@RequestParam(value = "specificDay") int specificDay,
			@RequestParam(value = "startDate") Date startDate,
			@RequestParam(value = "endDate") Date endDate) {

		SimpleDateFormat df = new SimpleDateFormat("dd-MM-yyyy");
		
		Subscription subscription = subscriptionService.saveData(amount, subType, specificDay, df.format(startDate), df.format(endDate));
		
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/").buildAndExpand().toUri();
		
		return ResponseEntity.created(uri).body(subscription);
	}
}
