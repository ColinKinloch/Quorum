-- Venue Owner Constraints
ALTER TABLE venueowner
	ADD CONSTRAINT venueowner_uid_fk
		FOREIGN KEY (uid)
		REFERENCES user (uid);