-- Attending Table
CREATE TABLE IF NOT EXISTS attending(
	attendid INTEGER PRIMARY KEY,
	member INTEGER, -- FOREIGN member.uid
	event INTEGER, -- FOREIGN event.eid
	rsvp BOOLEAN DEFAULT false NOT NULL
);