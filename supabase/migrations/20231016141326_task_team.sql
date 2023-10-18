-- Create the TaskStatus enum
CREATE TYPE TaskStatus AS ENUM (
    'ToDo',
    'InProgress',
    'InReview',
    'Testing',
    'Done'
);

-- Create the Teams table
CREATE TABLE Teams (
    id UUID PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL
);


-- Create the Tasks table
CREATE TABLE Tasks (
    id UUID PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP NOT NULL,
    modified_at TIMESTAMP,
    created_by UUID NOT NULL REFERENCES auth.Users(id),
    team UUID NOT NULL REFERENCES Teams(id),
    status TaskStatus,
    deadline TIMESTAMP,
    assigned_to UUID REFERENCES auth.Users(id)
);


-- Create the UserTeams table to represent the many-to-many relationship
CREATE TABLE UserTeams (
    teamId UUID NOT NULL,
    userId UUID NOT NULL,
    PRIMARY KEY (teamId, userId),
    FOREIGN KEY (teamId) REFERENCES Teams(id),
    FOREIGN KEY (userId) REFERENCES auth.Users(id)
);
