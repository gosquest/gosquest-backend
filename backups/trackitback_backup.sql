--
-- PostgreSQL database dump
--

-- Dumped from database version 16.4 (Postgres.app)
-- Dumped by pg_dump version 16.4 (Postgres.app)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: drizzle; Type: SCHEMA; Schema: -; Owner: peaceishimwem
--

CREATE SCHEMA drizzle;


ALTER SCHEMA drizzle OWNER TO peaceishimwem;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: peaceishimwem
--

-- *not* creating schema, since initdb creates it


ALTER SCHEMA public OWNER TO peaceishimwem;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: peaceishimwem
--

COMMENT ON SCHEMA public IS '';


--
-- Name: RoleName; Type: TYPE; Schema: public; Owner: peaceishimwem
--

CREATE TYPE public."RoleName" AS ENUM (
    'User',
    'Admin',
    'SuperAdmin'
);


ALTER TYPE public."RoleName" OWNER TO peaceishimwem;

--
-- Name: Status; Type: TYPE; Schema: public; Owner: peaceishimwem
--

CREATE TYPE public."Status" AS ENUM (
    'Enabled',
    'Disabled'
);


ALTER TYPE public."Status" OWNER TO peaceishimwem;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: __drizzle_migrations; Type: TABLE; Schema: drizzle; Owner: peaceishimwem
--

CREATE TABLE drizzle.__drizzle_migrations (
    id integer NOT NULL,
    hash text NOT NULL,
    created_at bigint
);


ALTER TABLE drizzle.__drizzle_migrations OWNER TO peaceishimwem;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE; Schema: drizzle; Owner: peaceishimwem
--

CREATE SEQUENCE drizzle.__drizzle_migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNER TO peaceishimwem;

--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: drizzle; Owner: peaceishimwem
--

ALTER SEQUENCE drizzle.__drizzle_migrations_id_seq OWNED BY drizzle.__drizzle_migrations.id;


--
-- Name: Role; Type: TABLE; Schema: public; Owner: peaceishimwem
--

CREATE TABLE public."Role" (
    id uuid NOT NULL,
    name public."RoleName" NOT NULL,
    description text NOT NULL,
    status public."Status" DEFAULT 'Enabled'::public."Status" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Role" OWNER TO peaceishimwem;

--
-- Name: User; Type: TABLE; Schema: public; Owner: peaceishimwem
--

CREATE TABLE public."User" (
    id uuid NOT NULL,
    "fullName" text NOT NULL,
    password text NOT NULL,
    username text NOT NULL,
    "phoneNumber" text NOT NULL,
    email text NOT NULL,
    country character varying(100),
    province character varying(100),
    district character varying(100),
    sector character varying(100),
    "birthDate" date,
    "whatsappNumber" character varying(256),
    "profilePicture" text DEFAULT 'https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg'::text NOT NULL,
    "googleId" text,
    "facebookId" text,
    "roleId" uuid NOT NULL,
    verified boolean DEFAULT false NOT NULL,
    status public."Status" DEFAULT 'Enabled'::public."Status" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."User" OWNER TO peaceishimwem;

--
-- Name: UserAndRole; Type: TABLE; Schema: public; Owner: peaceishimwem
--

CREATE TABLE public."UserAndRole" (
    id uuid NOT NULL,
    "userId" uuid NOT NULL,
    "roleId" uuid NOT NULL,
    status public."Status" DEFAULT 'Enabled'::public."Status" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."UserAndRole" OWNER TO peaceishimwem;

--
-- Name: UserVerificationCodes; Type: TABLE; Schema: public; Owner: peaceishimwem
--

CREATE TABLE public."UserVerificationCodes" (
    id text NOT NULL,
    email text NOT NULL,
    otp text NOT NULL,
    created_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    expires_at timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL
);


ALTER TABLE public."UserVerificationCodes" OWNER TO peaceishimwem;

--
-- Name: _prisma_migrations; Type: TABLE; Schema: public; Owner: peaceishimwem
--

CREATE TABLE public._prisma_migrations (
    id character varying(36) NOT NULL,
    checksum character varying(64) NOT NULL,
    finished_at timestamp with time zone,
    migration_name character varying(255) NOT NULL,
    logs text,
    rolled_back_at timestamp with time zone,
    started_at timestamp with time zone DEFAULT now() NOT NULL,
    applied_steps_count integer DEFAULT 0 NOT NULL
);


ALTER TABLE public._prisma_migrations OWNER TO peaceishimwem;

--
-- Name: __drizzle_migrations id; Type: DEFAULT; Schema: drizzle; Owner: peaceishimwem
--

ALTER TABLE ONLY drizzle.__drizzle_migrations ALTER COLUMN id SET DEFAULT nextval('drizzle.__drizzle_migrations_id_seq'::regclass);


--
-- Data for Name: __drizzle_migrations; Type: TABLE DATA; Schema: drizzle; Owner: peaceishimwem
--

COPY drizzle.__drizzle_migrations (id, hash, created_at) FROM stdin;
1	b345c19254ad29d36477cbca7c94ab986154c2dee76065b495811d90fdc108f4	1727242031895
2	6888a0faebe4984df0c27d5d00f0e35527419633ffcfd0cbbdf3d812e6944121	1727249884735
3	90f3f9002850cef81fc0587f06ce49ac92c2dadc023981384774322c0d6cba66	1727255518785
4	8110b696ac6d9450984de5ae75c3af76c24f06d44a9cbb609624f33eb699f7f3	1727255544277
5	c36be1edc6172418c007e01a98e42803df1a193f990d15f263f47021acb21d91	1727255586836
6	c21a0897c9486910690f7928d6b4ba9398de6f420c905db83c87cee7b8982cae	1727256277336
7	0594ac145eb0e4da38d2dbb9b78eba694ea9ff50fb4c2fa3d17d02b2a5278079	1727333972786
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: peaceishimwem
--

COPY public."Role" (id, name, description, status, "createdAt", "updatedAt") FROM stdin;
e627ec96-8114-4d98-9979-ff0c32e2c8fd	User	Normal user of the system	Enabled	2024-09-28 20:19:12.507	2024-09-28 20:18:49.551
162b22fc-836f-484c-8e04-41bccb46bfe8	SuperAdmin	System owner	Enabled	2024-09-28 20:19:44.069	2024-09-28 20:19:27.158
a8c292b7-0dff-4a2e-bcb6-0558bdf07d56	Admin	System manager	Enabled	2024-09-28 20:19:24.882	2024-09-28 20:19:55.87
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: peaceishimwem
--

COPY public."User" (id, "fullName", password, username, "phoneNumber", email, country, province, district, sector, "birthDate", "whatsappNumber", "profilePicture", "googleId", "facebookId", "roleId", verified, status, "createdAt", "updatedAt") FROM stdin;
872d5984-0150-4bb3-93ef-9c76462a0cca	Munyaneza Ishimwe Peace	$2a$10$G97ECqc7B98CGzYQcKz.pulmxgCxtpAEIJCcepABgOwZe.ydOUwA.	peaceishimwem	0793092863	peaceishimwem@gmail.com	\N	\N	\N	\N	\N	\N	https://www.svgrepo.com/show/384674/account-avatar-profile-user-11.svg	\N	\N	e627ec96-8114-4d98-9979-ff0c32e2c8fd	t	Enabled	2024-09-28 20:20:15.933	2024-09-28 20:30:05.597
\.


--
-- Data for Name: UserAndRole; Type: TABLE DATA; Schema: public; Owner: peaceishimwem
--

COPY public."UserAndRole" (id, "userId", "roleId", status, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: UserVerificationCodes; Type: TABLE DATA; Schema: public; Owner: peaceishimwem
--

COPY public."UserVerificationCodes" (id, email, otp, created_at, expires_at) FROM stdin;
34734640-093f-402d-a913-0900419938e5	peaceishimwem@gmail.com	676971	2024-09-28 20:26:53.94	2024-09-28 20:26:53.94
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: peaceishimwem
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
65ae685c-3873-4a90-8d6b-afcff629cfed	0ec4ee91ee5fa8d6cd0715f84634026f954755d7181697b630d114c44ac26462	2024-09-28 22:15:17.334221+02	20240928201517_user_role_user_and_role	\N	\N	2024-09-28 22:15:17.318293+02	1
\.


--
-- Name: __drizzle_migrations_id_seq; Type: SEQUENCE SET; Schema: drizzle; Owner: peaceishimwem
--

SELECT pg_catalog.setval('drizzle.__drizzle_migrations_id_seq', 7, true);


--
-- Name: __drizzle_migrations __drizzle_migrations_pkey; Type: CONSTRAINT; Schema: drizzle; Owner: peaceishimwem
--

ALTER TABLE ONLY drizzle.__drizzle_migrations
    ADD CONSTRAINT __drizzle_migrations_pkey PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


--
-- Name: UserAndRole UserAndRole_pkey; Type: CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public."UserAndRole"
    ADD CONSTRAINT "UserAndRole_pkey" PRIMARY KEY (id);


--
-- Name: UserVerificationCodes UserVerificationCodes_pkey; Type: CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public."UserVerificationCodes"
    ADD CONSTRAINT "UserVerificationCodes_pkey" PRIMARY KEY (id);


--
-- Name: User User_pkey; Type: CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_pkey" PRIMARY KEY (id);


--
-- Name: _prisma_migrations _prisma_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public._prisma_migrations
    ADD CONSTRAINT _prisma_migrations_pkey PRIMARY KEY (id);


--
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: peaceishimwem
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- Name: UserVerificationCodes_expires_at_idx; Type: INDEX; Schema: public; Owner: peaceishimwem
--

CREATE INDEX "UserVerificationCodes_expires_at_idx" ON public."UserVerificationCodes" USING btree (expires_at);


--
-- Name: User_email_key; Type: INDEX; Schema: public; Owner: peaceishimwem
--

CREATE UNIQUE INDEX "User_email_key" ON public."User" USING btree (email);


--
-- Name: User_phoneNumber_key; Type: INDEX; Schema: public; Owner: peaceishimwem
--

CREATE UNIQUE INDEX "User_phoneNumber_key" ON public."User" USING btree ("phoneNumber");


--
-- Name: User_username_key; Type: INDEX; Schema: public; Owner: peaceishimwem
--

CREATE UNIQUE INDEX "User_username_key" ON public."User" USING btree (username);


--
-- Name: UserAndRole UserAndRole_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public."UserAndRole"
    ADD CONSTRAINT "UserAndRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: UserAndRole UserAndRole_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public."UserAndRole"
    ADD CONSTRAINT "UserAndRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: peaceishimwem
--

REVOKE USAGE ON SCHEMA public FROM PUBLIC;


--
-- PostgreSQL database dump complete
--

