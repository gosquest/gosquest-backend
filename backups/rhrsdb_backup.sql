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
    feedback character varying(500),
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
5e05fa88-85de-495a-8073-144d17b9b649	Agrinexa	Ineza Munyaneza Celia	AgriNexa enhances agriculture by using IoT sensors and AI to provide real-time data on soil and environmental conditions, optimizing fertilizer use and enabling remote irrigation management. Additionally, it features a security alarm system that alerts farmers of intruders via mobile notifications, ensuring efficient and secure farming operations.	/projects/logo/Agrinexa_logo_e98cd02fa81fa3ef3dbdc76ceef153a0.svg	/projects/cover/Agrinexa_cover_image_22b49a3c6a509ad0fdbf7a2264f8be68.png	https://github.com/Agrinexa-project	Enabled	2024-10-07 08:39:53.458	2024-10-07 09:36:04.858	{Agriculture}
e0fb30f0-6694-4844-8bea-c6bebf6236bd	BinexoPay	Rukundo Prince	BinexoPay is transforming transaction systems by making payments faster and more secure through biometric authentication. Using advanced fingerprint and facial recognition technology, we aim to streamline payments while ensuring top-level security and efficiency. Our goal is to set a new standard for secure, seamless transactions.	/projects/logo/Binexopay_logo_48a97947e01fb3c15d063fcaabe25bd0.svg	/projects/cover/Binexopay_cover_image_19fcc2ca1a4bbfbc3c63eb8e83d42fcc.png	https://www.rca.ac.rw/	Enabled	2024-10-07 08:44:57.758	2024-10-07 09:36:44.544	{"Financial Technology"}
504bc9dd-f083-4cad-9d99-efcb8dd942d4	ECOWATCH	ISHIMWE Lorie	Ecowatch is an innovative initiative committed to eradicating pollution in aquatic environments while revolutionizing the fishing industry and enhancing access to water resources for all citizens.\nOur state-of-the-art underwater drone is designed to empower water management companies and drive impactful change beneath the surface.\n	/projects/logo/Ecowatch_logo_c3c4da5060d44058cba415154c2b5c7e.svg	/projects/cover/Ecowatch_cover_image_a0cc8bd15059e78ccb24d4bfdb2394de.png	https://www.rca.ac.rw/	Enabled	2024-10-07 09:00:01.691	2024-10-07 09:37:50.671	{"Water environment management"}
5884cde0-91ea-452f-9432-c31326ab91ba	LabSync	NIYONSENGA Valens	LabSync is an innovative AI-driven company dedicated to solving education challenges.By enabling all the schools to do experiments virtually and reduce the expenses made while purchasing using VR.	/projects/logo/Labsync_logo_704200344d2f9d2b056ab1d4b3912bf9.svg	/projects/cover/Labsync_cover_image_b175c06d0d15fe22725eebbfb56c1c24.png	https://www.labsync.rw/	Enabled	2024-10-07 09:11:06.361	2024-10-07 09:38:08.467	{Education}
3036158f-a2f7-4cdf-8938-8b60e43ec6f6	Fosec	Umutoni Kaze Joana Michelle	FOSEC is an innovative platform designed to revolutionize agriculture\nwith real-time weather forecasts, personalized farming tips powered\nby machine learning, and secure cryptographic seals for supply chains,\nFOSEC empowers farmers, improves market access, and enhances\nfood security. We're shaping the future of farming through technology!	/projects/logo/Fosec_logo_35fb165fd355927459b269cfc3b3f0cf.svg	/projects/cover/Fosec_cover_image_f5e9058f54e207e981b46db77ba8f242.png	https://fosec.vercel.app/	Enabled	2024-10-07 09:14:05.136	2024-10-07 09:38:34.891	{Agriculture}
2afe18ca-5793-403a-b99e-cbff5865d2f0	Navigo	NDAYAMBAJE Patrick	NaviGo is an innovative AI-driven company dedicated to solving transportation challenges. We specialize in traffic management and efficient transport services, collaborating with industry leaders to enhance mobility. Harnessing AI's power, we're transforming the future of transportation.	/projects/logo/Navigo_logo_c44a2c3ef61a2483fa648de94c7a28aa.svg	/projects/cover/Navigo_cover_image_81f012961359cef0215a068a2cb4206c.png	https://navigo.rw/	Enabled	2024-10-07 08:52:10.588	2024-10-07 09:40:47.768	{Transport}
c5dd4c59-b3b2-495e-b0fe-1fdfde4f8b14	Novars	Uwase Vanessa	Novars transforms agriculture with Farm Security, Monitoring, and Automation. Powered by Embedded Systems, IoT, and AI, it delivers real-time monitoring, theft prevention, and automation, reducing labor and resource waste. Novars enhances productivity, driving higher yields and sustainable farming practices.	/projects/logo/Novars_logo_16c0c324c08adb49e0039b212de54cf9.svg	/projects/cover/Novars_cover_image_02e71eb358eaed3f25ee41b5b42b8ddd.png	http://194.164.167.131:3030/	Enabled	2024-10-07 09:18:10.82	2024-10-07 09:41:36.948	{Agriculture}
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
78abd53c-e352-444b-84d2-4dff048ec9a8	Peace Ishimwe	4cdb58d1-5388-4b68-ae30-c6971ec49488	Enabled	2024-09-29 13:03:17.929	2024-09-30 09:50:36.402	1775
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
7ba37028-4ec1-473d-a8e4-63566c1240e9	617998719d3cadde785d6ac99da9b4292044c147e23b859ff20e1ae4c73d7aa6	2024-10-03 16:19:00.031042+02	20241003141900_feedback_not_required	\N	\N	2024-10-03 16:19:00.028495+02	1
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

