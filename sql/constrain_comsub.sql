-- Commercial Subscribers Constraints
ALTER TABLE commsub
	ADD CONSTRAINT commsub_uid_fk
		FOREIGN KEY (uid)
		REFERENCES user (uid);