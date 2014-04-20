-- Member Constraints
ALTER TABLE member
	ADD CONSTRAINT member_uid_fk
		FOREIGN KEY (uid)
		REFERENCES user (uid);