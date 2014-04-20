-- Event Table
CREATE TABLE IF NOT EXISTS event(
	eid INTEGER PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	type VARCHAR(50),
	description VARCHAR(10000),
	starttime TIMESTAMP,
	endtime TIMESTAMP,
	capacity INTEGER,
	venue INTEGER, -- FOREIGN venue.vid
	owner INTEGER, -- FOREIGN user.uid
	CHECK (starttime < endtime)
);