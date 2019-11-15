INSERT INTO helo_users (username, profile_img)
VALUES (${username}, ${profile_img})
RETURNING user_id;