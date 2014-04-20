-- Commercial Subscribers Table
CREATE TABLE IF NOT EXISTS commsub(
	uid INTEGER PRIMARY KEY, -- FOREIGN user.uid
	nameu VARCHAR(35) NOT NULL,
	company VARCHAR(35),
	UNIQUE (nameu)
);