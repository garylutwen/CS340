
-- Intersection Tables are Passenger_has_Planes, Itineraries_has_Planes, and Airports_has_Planes

SELECT * FROM Passengers;
SELECT * FROM Itineraries;
SELECT * FROM Planes;
SELECT * FROM Crew;
SELECT * FROM Airports;

INSERT INTO Passengers (passenger_id, name, email, phone_num, birth_date, address) VALUES (:passenger_id_input, :name_input, :email_input, :phone_num_input, 
:birth_date_input, :address_input);

INSERT INTO Itineraries (booking_id, passenger_id, plane_id, arrival_airport_code, departure_airport_code, cost, purchase_date, date_of_trip, 
flight_hour, layover_hour) VALUES (:booking_id_input, :passenger_id_input, :plane_id_input, :arrival_airport_code_input, :departure_airport_code_input, 
:cost_input, :purchase_date_input, :date_of_trip_input, flight_hour, layover_hour);

INSERT INTO Crew (employee_id, plane_id, job_type, years_experience, hourly_wage, full_time, english, spanish, french, arabic, chinese, japanese) 
VALUES (:employee_id_input, :plane_id_input, :job_type_input, :years_experience_input, :hourly_wage_input, :full_time_input, :english_input,
 :spanish_input, :french_input, :arabic_input, :chinese_input, :japanese_input);
 
INSERT INTO Planes (plane_id, passenger_id, departure_airport_code, arrival_airport_code, type, manufactured_year, range_capacity, passenger_capacity, meal_served) VALUES (:plane_id_input, :passenger_id_input, :departure_airport_code_input, 
:arrival_airport_code_input, :type_input, :manufactured_year_input, :range_capacity_input, :passenger_capacity_input, :meal_served_input);

INSERT INTO Airports (departure_airport_code, arrival_airport_code, continent, country, city) VALUES(:departure_airport_code_input, 
:arrival_airport_code_input, :continent_input, :country_input, :city_input);

DELETE FROM Passengers WHERE passenger_id = :passenger_id_selected_from_passengers_page;
DELETE FROM Itineraries WHERE booking_id = :booking_id_selected_from_itineraries_page;
DELETE FROM Crew WHERE employee_id = :employee_id_selected_from_crew_page;
DELETE FROM Planes WHERE plane_id = :plane_id_selected_from_planes_page;
DELETE FROM Airports WHERE departure_airport_code = :departure_airport_code_selected_from_airports_page;

UPDATE Passengers SET name=:name_input, email=:email_input, phone_num=:phone_num_input, birth_date=:birth_date_input, address=:address_input 
WHERE passenger_id=:passenger_id_from_the_update_form;

UPDATE Itineraries SET passenger_id=:passenger_id_input, plane_id=:plane_id_input, arrival_airport_code=:arrival_airport_code_input,
departure_airport_code=:departure_airport_code_input, cost=:cost_input, purchase_date=:purchase_date_input, date_of_trip=:date_of_trip_input, 
flight_hour=:flight_hour_input, layover_hour=:layover_hour_input
WHERE booking_id=:booking_id_from_the_update_form;

UPDATE Crew SET plane_id=:plane_id_input, job_type=:job_type_input, years_experience=:years_experience_input, hourly_wage_input=:hourly_wage_input,
full_time=:full_time_input, english=:english_input, spanish=:spanish_input, french=:french_input, arabic=:arabic_input, chinese=:chinese_input,
japanese=:japanese_input
WHERE employee_id=:employee_id_from_the_update_form;

UPDATE Planes SET departure_airport_code=:departure_airport_code_input, arrival_airport_code=:arrival_airport_code_input, type=:type_input, 
manufactured_year=:manufactured_year_input, range_capacity=:range_capacity_input, passenger_capacity=:passenger_capacity_input, 
meal_served=:meal_served_input
WHERE plane_id=:plane_id_from_the_update_form;

UPDATE Airports SET arrival_airport_code=:arrival_airport_code_input, continent=:continent_input, country=:country_input, city=:city_input
WHERE departure_airport_code=:departure_airport_code_from_the_update_form;


SELECT passenger_plane_id, passenger_id, plane_id
    FROM Passengers_has_Planes;
    
SELECT itinerary_plane_id, booking_id, plane_id
    FROM Itineraries_has_Planes;
    
SELECT airport_plane_id, departure_airport_code, arrival_airport_code, plane_id
    FROM Airports_has_Planes;

INSERT INTO Passengers_has_Planes(passenger_id, plane_id) VALUES (:passenger_id, :plane_id);
INSERT INTO Itineraries_has_Planes(booking_id, plane_id) VALUES (:booking_id, :plane_id);    
INSERT INTO Airports_has_Planes(departure_airport_code, arrival_airport_code, plane_id) VALUES (:departure_airport_code, :arrival_airport_code, :plane_id);   
    
UPDATE Passengers_has_Planes SET passenger_id=:passenger_id_from_the_update_form, plane_id=:plane_id_from_the_update_form
WHERE passenger_plane_id=:passenger_plane_id_from_the_update_form;

UPDATE Itineraries_has_Planes SET booking_id=:booking_id_from_the_update_form, plane_id=:plane_id_from_the_update_form
WHERE itinerary_plane_id=:itinerary_plane_id_from_the_update_form;

UPDATE Airports_has_Planes SET departure_airport_code=:departure_airport_code_from_the_update_form, 
arrival_airport_code=:arrival_airport_code_from_the_update_form,plane_id=:plane_id_from_the_update_form
WHERE airport_plane_id=:airport_plane_id_from_the_update_form;
    
DELETE FROM Passengers_has_Planes_ WHERE passenger_plane_id = :passenger_plane_id_selected_from_passengers_has_planes_page;
DELETE FROM Itineraries_has_Planes WHERE itinerary_plane_id = :itinerary_plane_id_selected_from_itineraries_has_planes_page;
DELETE FROM Airports_has_Planes WHERE airport_plane_id = :airport_plane_id_selected_from_airports_has_planes_page;


	