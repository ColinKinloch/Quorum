-- Promote Table
CREATE TABLE IF NOT EXISTS promote(
	promoid INTEGER PRIMARY KEY,
	promotion INTEGER, -- FOREIGN promotion.pid
	event INTEGER, -- FOREIGN event.eid
	cutoff TIMESTAMP
);