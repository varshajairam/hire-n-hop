package com.rent.service;

import java.util.List;

import com.rent.model.Feedback;

public interface FeedbackService {
	
	List<Feedback> get(Integer userId);
	
	void save(Feedback feedback);
	
}