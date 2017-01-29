My project is an app that allows people to post their abandoned/unfinished
project ideas for someone else to find and complete. If someone has an idea
that they know they'll never complete, they can log in and post the idea. Then
if someone else is looking for a project they can log in and search other
people's ideas. If a project has been started and there are any materials to be
transferred, there will be contact info for the poster. Projects will be
searchable by topic or you can ask for a random idea.

// ┌──────────────────────────────────────────────────────────────────────────────────────────┐
// │                                         users                                            │
// ├─────────────┬─────────────────────────┬──────────────────────────────────────────────────┤
// │id           │serial                   │primary key                                       │
// │username     │varchar(255)             │not null default '' unique()                      │
// │email        │varchar(255)             │not null default '' unique()                      │
// │digest       │char(60)                 │not null default ''                               │
// │created_at   │timestamp with time zone │not null default now()                            │
// │updated_at   │timestamp with time zone │not null default now()                            │
// └─────────────┴─────────────────────────┴──────────────────────────────────────────────────┘


// ┌──────────────────────────────────────────────────────────────────────────────────────────┐
// │                                         posts                                            │
// ├─────────────┬─────────────────────────┬──────────────────────────────────────────────────┤
// │id           │serial                   │primary key                                       │
// │user_id      │integer                  │not null default '' foreign key references users  │
// │idea_text    │text                     │not null default ''                               │
// │topic        │string                   │not null default ''                               │
// │created_at   │timestamp with time zone │not null default now()                            │
// │updated_at   │timestamp with time zone │not null default now()                            │
// └─────────────┴─────────────────────────┴──────────────────────────────────────────────────┘

// ┌──────────────────────────────────────────────────────────────────────────────────────────┐
// │                                         postsusers                                       │
// ├─────────────┬─────────────────────────┬──────────────────────────────────────────────────┤
// │id           │serial                   │primary key                                       │
// │user_id      │integer                  │not null default '' foreign key references users  │
// │post id      │integer                  │not null default '' foreign key references posts  |
// └─────────────┴─────────────────────────┴──────────────────────────────────────────────────┘
