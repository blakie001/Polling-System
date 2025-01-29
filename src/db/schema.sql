CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    bio TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE polls (
    id BIGSERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    created_by BIGINT REFERENCES users(id),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    poll_options TEXT[]
);

CREATE TABLE selections (
    id BIGSERIAL PRIMARY KEY,
    poll_id BIGINT REFERENCES polls(id),
    option_selected TEXT,
    user_id BIGINT REFERENCES users(id),
    UNIQUE(option_selected, user_id)
);

CREATE TRIGGER users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER polls_updated_at
BEFORE UPDATE ON polls
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER selections_updated_at
BEFORE UPDATE ON selections
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();