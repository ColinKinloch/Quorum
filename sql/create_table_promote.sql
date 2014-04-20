-- Promote Table
CREATE TABLE IF NOT EXISTS promote(
	promotion INTEGER, -- FOREIGN promotion.pid
	event INTEGER, -- FOREIGN event.eid
	cutoff TIMESTAMP,
	PRIMARY KEY(promotion, event)
);