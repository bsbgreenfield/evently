DROP DATABASE evently;
CREATE DATABASE evently;
\connect evently

\i evently-schema.sql
\i evently-seed.sql

DROP DATABASE evently_test;
CREATE DATABASE evently_test;
\connect evently_test

\i evently-schema.sql