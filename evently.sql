DROP DATABASE evently IF EXISTS;
CREATE DATABASE evently;
\connect evently

\i evently-schema.sql
\i evently-seed.sql

