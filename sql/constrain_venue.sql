-- Venue Constraints
ALTER TABLE venue
	ADD CONSTRAINT venueowner_owner_fk
		FOREIGN KEY (owner)
		REFERENCES venueowner (uid);