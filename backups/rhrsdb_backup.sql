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
-- Name: Project; Type: TABLE; Schema: public; Owner: peaceishimwem
--

CREATE TABLE public."Project" (
    id uuid NOT NULL,
    name text NOT NULL,
    team_leader text NOT NULL,
    description text NOT NULL,
    logo text NOT NULL,
    cover_image text NOT NULL,
    link text NOT NULL,
    status public."Status" DEFAULT 'Enabled'::public."Status" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    fields text[]
);


ALTER TABLE public."Project" OWNER TO peaceishimwem;

--
-- Name: Rating; Type: TABLE; Schema: public; Owner: peaceishimwem
--

CREATE TABLE public."Rating" (
    id uuid NOT NULL,
    "userId" uuid NOT NULL,
    "projectId" uuid NOT NULL,
    relevance integer NOT NULL,
    impact_to_society integer NOT NULL,
    performance integer NOT NULL,
    progress integer NOT NULL,
    feedback character varying(500) NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL
);


ALTER TABLE public."Rating" OWNER TO peaceishimwem;

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
    "roleId" uuid NOT NULL,
    status public."Status" DEFAULT 'Enabled'::public."Status" NOT NULL,
    "createdAt" timestamp(3) without time zone DEFAULT CURRENT_TIMESTAMP NOT NULL,
    "updatedAt" timestamp(3) without time zone NOT NULL,
    code text NOT NULL
);


ALTER TABLE public."User" OWNER TO peaceishimwem;

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
-- Data for Name: Project; Type: TABLE DATA; Schema: public; Owner: peaceishimwem
--

COPY public."Project" (id, name, team_leader, description, logo, cover_image, link, status, "createdAt", "updatedAt", fields) FROM stdin;
2f9d9151-6c7c-4aa7-af80-40c67d37c4ea	Agrinexa	Ineza Munyaneza Celia	This project aims to revolutionize agricultural practices in Rwanda by leveraging technology to optimize irrigation and pest control. By integrating advanced sensors, data analytics, and automation, we seek to enhance crop yields, reduce water consumption, and minimize the use of harmful pesticides.	/projects/logo/2metJ3UKPFYRRmhbMlY5fn6cX3P_a3cfa3de35a50f94406108e437485fba.svg	/projects/cover/Diagrams_IDSICOV_3d69d07c0f41241780292ba213b0bc1a.svg	https://agrinexa.com	Enabled	2024-10-03 07:47:02.26	2024-10-03 07:47:02.26	{Agriculture,Tech}
7d114790-ed02-416a-9aad-e41d6229a0d4	Navigo	Ndayambaje Patrick	NaviGo is an innovative AI-driven company dedicated to solving transportation challenges. We specialize in traffic management and efficient transport services, collaborating with industry leaders to enhance mobility. Harnessing AI's power, we're transforming the future of transportation.	/projects/logo/logoextended_3b10dd06d275aeb3bd71d7c634cf9df6.svg	/projects/cover/cover_image_navigo_59d0e7a23605f6d330b1254947d12b6a.png	https://navigo.rw	Enabled	2024-10-03 07:54:26.185	2024-10-03 07:54:26.185	{Transportation}
\.


--
-- Data for Name: Rating; Type: TABLE DATA; Schema: public; Owner: peaceishimwem
--

COPY public."Rating" (id, "userId", "projectId", relevance, impact_to_society, performance, progress, feedback, "createdAt", "updatedAt") FROM stdin;
\.


--
-- Data for Name: Role; Type: TABLE DATA; Schema: public; Owner: peaceishimwem
--

COPY public."Role" (id, name, description, status, "createdAt", "updatedAt") FROM stdin;
4e2766c5-da37-444e-a94a-92fab739ff53	User	System users	Enabled	2024-09-29 13:01:53.033	2024-09-29 13:01:53.033
4cdb58d1-5388-4b68-ae30-c6971ec49488	Admin	System manager	Enabled	2024-09-29 13:02:14.905	2024-09-29 13:02:14.905
c4f28d56-a4ba-4220-b7a2-a36cd46bb447	SuperAdmin	System owner	Enabled	2024-09-29 13:03:05.792	2024-09-30 09:31:42.958
\.


--
-- Data for Name: User; Type: TABLE DATA; Schema: public; Owner: peaceishimwem
--

COPY public."User" (id, "fullName", "roleId", status, "createdAt", "updatedAt", code) FROM stdin;
1eeec2f0-5774-49c2-9bf1-068713844d89	Ineza Hope	4e2766c5-da37-444e-a94a-92fab739ff53	Enabled	2024-09-29 19:18:43.668	2024-09-29 19:18:43.668	8942
78abd53c-e352-444b-84d2-4dff048ec9a8	Peace Ishimwe	4cdb58d1-5388-4b68-ae30-c6971ec49488	Enabled	2024-09-29 13:03:17.929	2024-09-30 09:50:36.402	1775
9a04e720-7b48-4616-bd61-7fd77fc6108d	Yves Maurice	4e2766c5-da37-444e-a94a-92fab739ff53	Enabled	2024-09-30 09:18:52.525	2024-10-02 05:29:20.427	9786
f84e04ed-7ed9-4ceb-a459-07365d7b6395	Mugisha Darius	4e2766c5-da37-444e-a94a-92fab739ff53	Enabled	2024-09-29 13:32:38.844	2024-10-02 05:29:30.436	4825
\.


--
-- Data for Name: _prisma_migrations; Type: TABLE DATA; Schema: public; Owner: peaceishimwem
--

COPY public._prisma_migrations (id, checksum, finished_at, migration_name, logs, rolled_back_at, started_at, applied_steps_count) FROM stdin;
df452244-7ead-47bd-8eba-32c2da3399ec	0ec4ee91ee5fa8d6cd0715f84634026f954755d7181697b630d114c44ac26462	2024-09-29 14:43:59.510571+02	20240928201517_user_role_user_and_role	\N	\N	2024-09-29 14:43:59.499383+02	1
2cf93336-6727-4d92-8432-f43cb63ac55f	c0957595d349feea9e8e19c003ba4fe9c0a7ed1c11563bb16a99390dd61b9304	2024-09-29 14:44:16.365822+02	20240929124416_rhrs_1	\N	\N	2024-09-29 14:44:16.361729+02	1
b142522f-d3ac-4821-8b9d-9d716ae5e4f9	dab704fd39928144a06516852c6804b7c860c9b78f90c4608f4c0d37b61469ae	2024-09-29 15:19:52.069167+02	20240929131952_rhrs_2	\N	\N	2024-09-29 15:19:52.063832+02	1
35072b3d-3694-4343-88bf-b12feadc3c41	7e316465e8e2fd6dfc774fc882cd9b2a1f241cf375b16b8ed7f172a3837fbed6	2024-09-29 22:24:49.322142+02	20240929202449_projects	\N	\N	2024-09-29 22:24:49.317394+02	1
2ea84d00-05e9-4bf7-9690-714fdf1c4a88	71ee6b11a47cfa508a73e2374c176f9545e6f59146de9a4b585505064a891e27	2024-09-30 07:25:40.885391+02	20240930052540_admin_user	\N	\N	2024-09-30 07:25:40.87544+02	1
f5efe1dd-9df3-49e8-9c59-23184438e182	66aac3cad010b0ff802454ee6480f84810ca7685af3e100cfda6cbc1c96b83a8	2024-09-30 07:59:28.577385+02	20240930055928_removed_user_admin	\N	\N	2024-09-30 07:59:28.572819+02	1
17bdc2e9-f207-41c1-bf20-2b39338d4908	f2815c08e1624a254623f1e6ded44baea2e093eeaa63dac03702ab6e9f4731f3	2024-09-30 08:51:47.726515+02	20240930065147_added_status_on_projects	\N	\N	2024-09-30 08:51:47.723053+02	1
3e16dbbc-a3df-48f2-b105-503a3483ef0e	174d420aa614458abc8c404d41d0e9137c73b1cf3e24d72a4a08492e9eab8621	2024-09-30 09:42:30.061751+02	20240930074230_rating	\N	\N	2024-09-30 09:42:30.050006+02	1
5f19be8d-7e2e-4119-905f-16a1d701a16a	8b4e55572c055652ddd944c37ca3b26fe1f0460f1b5c412e866e752d6d8a8183	2024-10-03 09:08:20.190881+02	20241003070820_changed_field_to_array	\N	\N	2024-10-03 09:08:20.186909+02	1
9b45e21e-ba31-41cc-b166-b0f819963b96	fbb3d602ebfcb92f073cfab1eceb1b4afe961d344645f28a69ea7427fce90d78	2024-10-03 09:14:57.293634+02	20241003071457_changed_field_to_fields	\N	\N	2024-10-03 09:14:57.2918+02	1
\.


--
-- Name: Project Project_pkey; Type: CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public."Project"
    ADD CONSTRAINT "Project_pkey" PRIMARY KEY (id);


--
-- Name: Rating Rating_pkey; Type: CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_pkey" PRIMARY KEY (id);


--
-- Name: Role Role_pkey; Type: CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public."Role"
    ADD CONSTRAINT "Role_pkey" PRIMARY KEY (id);


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
-- Name: Project_name_key; Type: INDEX; Schema: public; Owner: peaceishimwem
--

CREATE UNIQUE INDEX "Project_name_key" ON public."Project" USING btree (name);


--
-- Name: Role_name_key; Type: INDEX; Schema: public; Owner: peaceishimwem
--

CREATE UNIQUE INDEX "Role_name_key" ON public."Role" USING btree (name);


--
-- Name: User_fullName_key; Type: INDEX; Schema: public; Owner: peaceishimwem
--

CREATE UNIQUE INDEX "User_fullName_key" ON public."User" USING btree ("fullName");


--
-- Name: Rating Rating_projectId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES public."Project"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: Rating Rating_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public."Rating"
    ADD CONSTRAINT "Rating_userId_fkey" FOREIGN KEY ("userId") REFERENCES public."User"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- Name: User User_roleId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: peaceishimwem
--

ALTER TABLE ONLY public."User"
    ADD CONSTRAINT "User_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES public."Role"(id) ON UPDATE CASCADE ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

