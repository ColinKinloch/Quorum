-- Attending Table
CREATE TABLE IF NOT EXISTS attending(
	member INTEGER, -- FOREIGN member.uid
	event INTEGER, -- FOREIGN event.eid
	rsvp BOOLEAN DEFAULT false NOT NULL,
	PRIMARY KEY(member, event)
);