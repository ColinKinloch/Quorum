-- Venue Owner Table
CREATE TABLE IF NOT EXISTS venueowner(
	uid INTEGER PRIMARY KEY, -- FOREIGN user.uid
	nameu VARCHAR(35) NOT NULL,
	phone VARCHAR(15) NOT NULL,
	address VARCHAR(250),
	UNIQUE (nameu)
);