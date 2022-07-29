-- Creates all the tables for our project.

SET FOREIGN_KEY_CHECKS=0;
SET AUTOCOMMIT = 0;


CREATE OR REPLACE TABLE Passengers (
    passenger_id int AUTO_INCREMENT unique NOT NULL,
    name varchar(50) NOT NULL,
    email varchar(50) NULL,
    phone_num varchar(15) NULL,
    birth_date DATE NULL,
    address varchar(50) NULL,
    PRIMARY KEY (passenger_id)
);

CREATE OR REPLACE TABLE Itineraries (
    booking_id int AUTO_INCREMENT unique NOT NULL,
    passenger_id int NOT NULL,
    plane_id int NOT NULL,
    departure_airport_code varchar(3) NOT NULL,
    arrival_airport_code varchar(3) NOT NULL,
    cost decimal(8,2) NOT NULL,
    purchase_date DATE NOT NULL,
    date_of_trip DATE NOT NULL,
    flight_hour decimal(5,2) NOT NULL,
    layover_hour decimal(5,2) NOT NULL,
    PRIMARY KEY (booking_id),
    FOREIGN KEY (passenger_id)
        REFERENCES Passengers(passenger_id)
        ON DELETE CASCADE,
    FOREIGN KEY (plane_id)
        REFERENCES Planes(plane_id),
    FOREIGN KEY (arrival_airport_code)
        REFERENCES Airports(arrival_airport_code),
    FOREIGN KEY (departure_airport_code)
        REFERENCES Airports(departure_airport_code)
);

CREATE OR REPLACE TABLE Airports (
    departure_airport_code varchar(3) unique NOT NULL,
    arrival_airport_code varchar(3) unique NOT NULL,
    continent int NOT NULL,
    country varchar(25) NOT NULL,
    city varchar(25) NOT NULL,
    PRIMARY KEY (departure_airport_code, arrival_airport_code) -- Hopefully I did this right.
);

CREATE OR REPLACE TABLE Planes (
    plane_id int AUTO_INCREMENT unique NOT NULL,
    passenger_id int NOT NULL,
    departure_airport_code varchar(3) NOT NULL,
    arrival_airport_code varchar(3) NOT NULL,
    type varchar(25) NOT NULL,
    manufactured_year int NOT NULL,
    range_capacity int NOT NULL,
    passenger_capacity int NOT NULL,
    meal_served tinyint NOT NULL,
    PRIMARY KEY (plane_id),
    FOREIGN KEY (passenger_id)
        REFERENCES Passengers(passenger_id),
    FOREIGN KEY (departure_airport_code)
        REFERENCES Airports(departure_airport_code),
    FOREIGN KEY (arrival_airport_code)
        REFERENCES Airports(arrival_airport_code)
);

CREATE OR REPLACE TABLE Crew (
    employee_id int AUTO_INCREMENT unique NOT NULL,
    plane_id int NOT NULL,
    job_type varchar(20) NOT NULL,
    years_experience int NOT NULL,
    hourly_wage decimal(6,2) NOT NULL DEFAULT 12.25,
    full_time tinyint NOT NULL DEFAULT 0,
    english tinyint NOT NULL,
    spanish tinyint NOT NULL,
    french tinyint NOT NULL,
    arabic tinyint NOT NULL,
    chinese tinyint NOT NULL,
    japanese tinyint NOT NULL,
    PRIMARY KEY (employee_id),
    FOREIGN KEY (plane_id)
        REFERENCES Planes(plane_id)
);

CREATE OR REPLACE TABLE Passengers_has_Planes (
    passenger_plane_id int AUTO_INCREMENT unique NOT NULL,
    passenger_id int NOT NULL,
    plane_id int NOT NULL,
    PRIMARY KEY (passenger_plane_id),
    CONSTRAINT fk_Passengers_has_Planes_passenger_id FOREIGN KEY (passenger_id)
        REFERENCES Passengers(passenger_id),
    CONSTRAINT fk_Passengers_has_Planes_plane_id FOREIGN KEY (plane_id)
        REFERENCES Planes(plane_id)
);

CREATE OR REPLACE TABLE Itineraries_has_Planes (
    itinerary_plane_id int AUTO_INCREMENT unique NOT NULL,
    booking_id int NOT NULL,
    plane_id int NOT NULL,
    PRIMARY KEY (itinerary_plane_id),
    CONSTRAINT fk_Itineraries_has_Planes_booking_id FOREIGN KEY (booking_id)
        REFERENCES Itineraries(booking_id),
    CONSTRAINT fk_Itineraries_has_Planes_plane_id FOREIGN KEY (plane_id)
        REFERENCES Planes(plane_id)
);

CREATE OR REPLACE TABLE Airports_has_Planes (
    airport_plane_id int AUTO_INCREMENT unique NOT NULL,
    departure_airport_code varchar(3) NOT NULL,
    arrival_airport_code varchar(3) NOT NULL,
    plane_id int NOT NULL,
    PRIMARY KEY (airport_plane_id),
    CONSTRAINT fk_Airports_has_Planes_departure_airport_code FOREIGN KEY (departure_airport_code)
        REFERENCES Airports(departure_airport_code),
    CONSTRAINT fk_Airports_has_Planes_arrival_airport_code FOREIGN KEY (arrival_airport_code)
        REFERENCES Airports(arrival_airport_code),
    CONSTRAINT fk_Airports_has_Planes_plane_id FOREIGN KEY (plane_id)
        REFERENCES Planes(plane_id)
);

-- Inserting mock data into tables.
-- Dates are in YYYY-MM-DD format


INSERT INTO Passengers 
(
    passenger_id,
    name,
    email,
    phone_num,
    birth_date,
    address)
VALUES
(
    1,
    'Tom Jones',
    'tjones@hotmail.com',
    '415-555-4444',
    '1998-07-12',
    'San Francisco, CA'
),
(
    2,
    'David Gahal',
    'gahal@gmail.com',
    '213-555-1245',
    '1992-05-13',
    'Santa Monica, CA'
),
(
    3,
    'Mary Fitz',
    'maryfitz1@gmail.com',
    '212-555-1111',
    '1994-08-10',
    'New York, NY'
),
(
    4,
    'Stella Artiste',
    'stellabella@aol.com',
    '206-555-3333',
    '2001-01-02',
    'Seattle, WA'
),
(
    5,
    'Miguel Jimenez',
    'mjimenez@oregonstate.edu',
    '541-555-1234',
    '1987-05-04',
    'Corvallis, OR'
);

REPLACE INTO Itineraries
(
    booking_id,
    passenger_id,
    plane_id,
    cost,
    departure_airport_code,
    arrival_airport_code,
    purchase_date,
    date_of_trip,
    flight_hours,
    layover_hours
)
VALUES
(
    1,
    2,
    3,
    898.43,
    'LAX',
    'PVG',
    '2022-07-01',
    '2022-08-03',
    11.5,
    0
),
(
    2,
    2,
    5,
    870.65,
    'SFO',
    'PVG',
    '2022-07-02',
    '2022-08-15',
    11,
    0
),
(
    3,
    3,
    4,
    1142.5,
    'PDX',
    'CDG',
    '2022-07-02',
    '2022-07-31',
    12.5,
    3.5
),
(
    4,
    5,
    1,
    1400,
    'CDG',
    'JFK',
    '2022-07-03',
    '2022-09-03',
    7.5,
    0
),
(
    5,
    1,
    2,
    359.76,
    'LAX',
    'JFK',
    '2022-07-03',
    '2022-09-03',
    5,
    0
);

REPLACE INTO Airports
(
	departure_airport_code,
    arrival_airport_code,
    continent,
    country,
    city
)
VALUES
(
    'LAX',
    'LAX',
    1,
    'United States',
    'Los Angeles'
),
(
	'PDX',
    'PDX',
    1,
    'United States',
    'Portland'
),
(
	'CDG',
	'CDG',
    4,
    'France',
    'Paris'
),
(
	'SFO',
    'SFO',
    1,
    'United States',
    'San Francisco'
),
(
	'PVG',
    'PVG',
    3,
    'China',
    'Shanghai'
),
(
	'JFK',
    'JFK',
    1,
    'United States',
    'New York'
);

REPLACE INTO Planes
(
	plane_id,
    type,
    manufactured_year,
    range_capacity,
    passenger_capacity,
    meal_served,
    passenger_id,
    departure_airport_code,
    arrival_airport_code
)
VALUES
(
    1,
    '777',
    2014,
    8200,
    325,
    1,
    5,
    'CDG',
    'JFK'
),
(
	2,
    '737 MAX',
    2017,
    3500,
    204,
    1,
    1,
    'LAX',
    'JFK'
),
(
	3,
    '737 MAX',
    2018,
    3500,
    204,
    1,
    2,
    'LAX',
    'PVG'
),
(
	4,
    '767',
    1999,
    5625,
    245,
    1,
    3,
    'PDX',
    'CDG'
),
(
	5,
    '767',
    2002,
    3900,
    269,
    1,
    2,
    'SFO',
    'PVG'
);


REPLACE INTO Crew
(
	employee_id,
    plane_id,
    job_type,
    years_experience,
    english,
    spanish,
    french,
    arabic,
    chinese,
    japanese
)
VALUES
(
    1,
    1,
    'pilot',
    24,
    1,
    0,
    0,
    0,
    1,
    0
),
(
	2,
    1,
    'flight attendant',
    9,
    1,
    0,
    0,
    0,
    1,
    1
),
(
	3,
    2,
    'pilot',
    26,
    1,
    1,
    1,
    0,
    0,
    0
),
(
	4,
    2,
    'co-pilot',
    17,
    1,
    0,
    1,
    1,
    0,
    0
),
(
	5,
    2,
    'flight attendant',
    3,
    1,
    1,
    0,
    0,
    0,
    0
);


SET FOREIGN_KEY_CHECKS=1;
COMMIT;