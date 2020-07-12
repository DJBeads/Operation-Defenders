create table coach
(
    picture integer,
    profile integer
);

alter table coach
    owner to postgres;


create table players
(
name integer,
level integer,
skills integer,
picture integer
);

alter table players
    owner to postgres;


create table quiz
(
    video    integer,
    question integer,
    answer1  integer,
    answer2  integer,
    answer3  integer,
    answer4  integer
);

alter table quiz
    owner to postgres;


create table results
(
    cleared              integer,
    failed               integer,
    "correctly-answered" integer
);

alter table results
    owner to postgres;