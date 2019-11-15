SELECT * FROM helo_users h
JOIN helo_hash hh ON h.user_id = hh.user_id
WHERE username = $1;