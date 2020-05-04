package com.rent.service;

import java.util.List;

import com.rent.model.*;

public interface AdminService {

	List<VehicleType> get();
	void save(VehicleType vt);
	void deleteVehicletype(VehicleType vt);
	void updateVehicletype(String vtname, String price, int hours);
	void saveVehicle(Vehicle vehicle);
	void updateVehicle(Vehicle vehicle);
	void deleteVehicle(Vehicle vehicle);
	Location saveLocation(Location location);
	List<Location> getLocations();
	void deleteLocation(Integer id);
	void editLocation(Location location);
}
