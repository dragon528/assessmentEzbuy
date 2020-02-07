package com.example.demospring.subscription;

import org.springframework.stereotype.Service;

@Service
public class SubscriptionService {
	
	private Subscription subscription = new Subscription();
	
	public Subscription saveData(double amount, int subType, int specificDay, String startDate, String endDate) {
		subscription.setChargeAmount(amount);
		
		String typeOfSubscription = "";
		switch (subType) {
		case 1:
			typeOfSubscription = "DAILY";
			break;
		case 2:
			typeOfSubscription = "WEEKLY";
			break;
		case 3:
			typeOfSubscription = "MONTHLY";
			break;
		default:
			break;
		}
		
		subscription.setSubscriptionType(typeOfSubscription);
		
		if(typeOfSubscription.equals("WEEKLY")) {
			String dayOfWeek = "";
			switch (specificDay) {
			case 1:
				dayOfWeek = "MONDAY";
				break;
			case 2:
				dayOfWeek = "TUESDAY";
				break;
			case 3:
				dayOfWeek = "WEDNESDAY";
				break;
			case 4:
				dayOfWeek = "THURSDAY";
				break;
			case 5:
				dayOfWeek = "FRIDAY";
				break;
			case 6:
				dayOfWeek = "SATURDAY";
				break;
			case 7:
				dayOfWeek = "SUNDAY";
				break;
			default:
				break;
			}
			
			subscription.setDayOfWeek(dayOfWeek);
		} else if(typeOfSubscription.equals("MONTHLY")) {
			subscription.setDateOfMonth(specificDay);
		}
		
		subscription.setStartDate(startDate);
		subscription.setEndDate(endDate);
		return subscription;
	}

	public Subscription retrieveSubscription() {
		return subscription;
	}
}
