-- Member Table
CREATE TABLE IF NOT EXISTS member(
	uid INTEGER PRIMARY KEY, -- FOREIGN user.uid
	nameu VARCHAR(35) NOT NULL,
	gold BOOLEAN DEFAULT false NOT NULL,
	UNIQUE (nameu)
);