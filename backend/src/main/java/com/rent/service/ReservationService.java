package com.rent.service;

import java.util.*;

import com.rent.model.Reservation;


public interface ReservationService {

	List<Reservation> getReservations(String email);

	void endReservation(Reservation id);

	void cancelReservation(Reservation id);

	List<Reservation> pastReservations(String email);

	List<Reservation> upcomingReservations(String email);
}