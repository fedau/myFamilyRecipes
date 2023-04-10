--
-- PostgreSQL database dump
--

-- Dumped from database version 14.5 (Homebrew)
-- Dumped by pg_dump version 14.5 (Homebrew)

-- SET statement_timeout = 0;
-- SET lock_timeout = 0;
-- SET idle_in_transaction_session_timeout = 0;
-- SET client_encoding = 'UTF8';
-- SET standard_conforming_strings = on;
-- SELECT pg_catalog.set_config('search_path', '', false);
-- SET check_function_bodies = false;
-- SET xmloption = content;
-- SET client_min_messages = warning;
-- SET row_security = off;

-- SET default_tablespace = '';

-- SET default_table_access_method = heap;


CREATE DATABASE recipesdb;

\c recipesdb

-- Name: categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.categories (
    category_id bigint NOT NULL,
    type character varying(255)
);


ALTER TABLE public.categories OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.categories_category_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_category_id_seq OWNER TO postgres;

--
-- Name: categories_category_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.categories_category_id_seq OWNED BY public.categories.category_id;


--
-- Name: favorites; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.favorites (
    favorite_id bigint NOT NULL,
    user_id character varying(255),
    recipe_id bigint NOT NULL
);


ALTER TABLE public.favorites OWNER TO postgres;

--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.favorites_favorite_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.favorites_favorite_id_seq OWNER TO postgres;

--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.favorites_favorite_id_seq OWNED BY public.favorites.favorite_id;


--
-- Name: images; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.images (
    image_id bigint NOT NULL,
    image character varying(255)
);


ALTER TABLE public.images OWNER TO postgres;

--
-- Name: images_image_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.images_image_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.images_image_id_seq OWNER TO postgres;

--
-- Name: images_image_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.images_image_id_seq OWNED BY public.images.image_id;


--
-- Name: ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.ingredients (
    ingredient_id bigint NOT NULL,
    ingredient_name character varying(255)
);


ALTER TABLE public.ingredients OWNER TO postgres;

--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.ingredients_ingredient_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.ingredients_ingredient_id_seq OWNER TO postgres;

--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.ingredients_ingredient_id_seq OWNED BY public.ingredients.ingredient_id;


--
-- Name: instructions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.instructions (
    instruction_id bigint NOT NULL,
    step_description character varying(255),
    step_number integer NOT NULL,
    recipe_id bigint NOT NULL
);


ALTER TABLE public.instructions OWNER TO postgres;

--
-- Name: instructions_instruction_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.instructions_instruction_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.instructions_instruction_id_seq OWNER TO postgres;

--
-- Name: instructions_instruction_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.instructions_instruction_id_seq OWNED BY public.instructions.instruction_id;


--
-- Name: recipe_categories; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe_categories (
    recipe_id bigint NOT NULL,
    category_id bigint NOT NULL
);


ALTER TABLE public.recipe_categories OWNER TO postgres;

--
-- Name: recipe_ingredients; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipe_ingredients (
    recipe_ingredient_id bigint NOT NULL,
    quantity double precision NOT NULL,
    unit character varying(255),
    ingredient_id bigint NOT NULL,
    recipe_id bigint NOT NULL
);


ALTER TABLE public.recipe_ingredients OWNER TO postgres;

--
-- Name: recipe_ingredients_recipe_ingredient_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipe_ingredients_recipe_ingredient_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipe_ingredients_recipe_ingredient_id_seq OWNER TO postgres;

--
-- Name: recipe_ingredients_recipe_ingredient_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipe_ingredients_recipe_ingredient_id_seq OWNED BY public.recipe_ingredients.recipe_ingredient_id;


--
-- Name: recipes; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.recipes (
    recipe_id bigint NOT NULL,
    cooking_time integer NOT NULL,
    description character varying(255),
    image character varying(255),
    name character varying(255),
    servings integer NOT NULL
);


ALTER TABLE public.recipes OWNER TO postgres;

--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.recipes_recipe_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.recipes_recipe_id_seq OWNER TO postgres;

--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.recipes_recipe_id_seq OWNED BY public.recipes.recipe_id;


--
-- Name: categories category_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_category_id_seq'::regclass);


--
-- Name: favorites favorite_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites ALTER COLUMN favorite_id SET DEFAULT nextval('public.favorites_favorite_id_seq'::regclass);


--
-- Name: images image_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images ALTER COLUMN image_id SET DEFAULT nextval('public.images_image_id_seq'::regclass);


--
-- Name: ingredients ingredient_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients ALTER COLUMN ingredient_id SET DEFAULT nextval('public.ingredients_ingredient_id_seq'::regclass);


--
-- Name: instructions instruction_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instructions ALTER COLUMN instruction_id SET DEFAULT nextval('public.instructions_instruction_id_seq'::regclass);


--
-- Name: recipe_ingredients recipe_ingredient_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredients ALTER COLUMN recipe_ingredient_id SET DEFAULT nextval('public.recipe_ingredients_recipe_ingredient_id_seq'::regclass);


--
-- Name: recipes recipe_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes ALTER COLUMN recipe_id SET DEFAULT nextval('public.recipes_recipe_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.categories (category_id, type) FROM stdin;
1	dessert
2	family
3	quick
4	breakfast
5	healthy
6	vegetarian
7	Reinert Family
8	Depraetere Family
\.


--
-- Data for Name: favorites; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.favorites (favorite_id, user_id, recipe_id) FROM stdin;
1	auth0|63f0eb50fd0d8a8789eed327	8
2	auth0|63f0eb50fd0d8a8789eed327	1
\.


--
-- Data for Name: images; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.images (image_id, image) FROM stdin;
\.


--
-- Data for Name: ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.ingredients (ingredient_id, ingredient_name) FROM stdin;
1	CocoPuffs
2	Broth
3	Noodles
4	Grapes
5	Flour
6	Self-rising Flour
7	Sugar
8	eggs
9	Milk
10	Butter
11	Vanilla Sugar
12	Cinnamon
13	Custard mix
14	salt
15	oil
16	tomatoes
17	aubergine
18	courgettes
19	peppers
20	basil
21	onion
22	garlic
23	
\.


--
-- Data for Name: instructions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.instructions (instruction_id, step_description, step_number, recipe_id) FROM stdin;
1	Mix eggs, butter, sugar, vanilla sugar, cinnamon and milk. Unill combined well. 	1	1
2	Add the self-rising flour and the custard powder	2	1
3	Depending on the consistency sprea or roll the dough out on the table. Make small rolls if possible rouglhy 90 rolls. For small waffles. If dough is sticky use 2 spoons to transfer to the iron. 	3	1
4	Bake waffles in hot iron until borders get brown. Keep the waffles in an iron box. 	4	1
5	Add the flour and sugar together in a bowl. Make a well and add the eggs and beat them	1	2
6	Whilst whisking slowly add the milk. Then the oil. Melt the butter and add to the mix. 	2	2
7	Heat a pan and wait untill hot. Add some oil and let this get warm. Now add some batter and start frying the pancakes.	3	2
9	make your cereeal	1	4
10	boil the noodles in the broth	1	3
11	eat it	2	3
15		0	8
41		0	24
42		0	25
43		0	26
44		0	27
46	get a freezer pizza and put it in the oven	1	29
\.


--
-- Data for Name: recipe_categories; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe_categories (recipe_id, category_id) FROM stdin;
3	7
3	6
3	3
4	4
1	8
1	1
1	2
2	8
2	1
2	3
2	2
24	5
24	6
24	7
25	6
25	5
25	7
26	3
26	4
26	5
26	7
27	1
27	2
27	7
29	2
29	3
\.


--
-- Data for Name: recipe_ingredients; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipe_ingredients (recipe_ingredient_id, quantity, unit, ingredient_id, recipe_id) FROM stdin;
2	100	grams	3	3
3	200	ml	2	3
4	100	grams	1	4
5	1	kg	6	1
6	600	grams	7	1
7	6	eggs	8	1
8	150	ml	9	1
9	500	grams	10	1
10	16	grams	11	1
11	25	grams	13	1
12	1	tablespoon	12	1
13	250	grams	6	2
14	70	grams	7	2
15	4	eggs	8	2
16	500	ml	9	2
17	20	grams	10	2
18	20	ml	15	2
24	0	gras	16	8
25	0	large	17	8
26	0		19	8
66	0		23	24
67	0		23	25
68	0		23	26
69	0		23	27
71	2	large	16	29
72	0	grams	5	29
\.


--
-- Data for Name: recipes; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.recipes (recipe_id, cooking_time, description, image, name, servings) FROM stdin;
1	60	Little Waffles made to keep for a while. Just like Oma Paula would make	https://images.pexels.com/photos/4109465/pexels-photo-4109465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2	Waffles a la oma	50
4	5	Sweet crunch. You know How it is	https://s3.eu-west-2.amazonaws.com/familyrecipeimages/cereal.jpeg	Cereal	1
2	30	These pancakes are also known as flensjes. Just like Oma Paula would make	https://s3.eu-west-2.amazonaws.com/familyrecipeimages/flensjes.jpeg	Pancakes a la oma	10
3	15	Warm brothy vibes. Perfect for a cold night.	https://s3.eu-west-2.amazonaws.com/familyrecipeimages/332417182_907601110527704_933505034398668572_n.jpg	Ramen	2
24	0	Easy curry made with chickpeas	https://s3.eu-west-2.amazonaws.com/familyrecipeimages/332182093_530164489246319_2494824201051431447_n.jpg	Curry	3
25	0	All vegetables with a chickpea crunch	https://s3.eu-west-2.amazonaws.com/familyrecipeimages/332213761_754383165990060_7547921508399063835_n.jpg	Rainbow Bowl	0
26	0	Spruced up with everything	https://s3.eu-west-2.amazonaws.com/familyrecipeimages/332492128_863389108093160_1645868174509786124_n.jpg	Oatmeal 	0
27	0	Celebration buns from the Faroe Islands	https://s3.eu-west-2.amazonaws.com/familyrecipeimages/332758244_182217704526912_5795265729199483533_n.jpg	Santa Lucia Buns	13
8	60	Just like Remy makes	https://s3.eu-west-2.amazonaws.com/familyrecipeimages/332808017_168039462722568_7747037631480847833_n.jpg	Rattatoiulle	4
29	45	Italian	https://s3.eu-west-2.amazonaws.com/familyrecipeimages/pizza.jpeg	Pizza	2
\.


--
-- Name: categories_category_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.categories_category_id_seq', 8, true);


--
-- Name: favorites_favorite_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.favorites_favorite_id_seq', 2, true);


--
-- Name: images_image_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.images_image_id_seq', 1, false);


--
-- Name: ingredients_ingredient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.ingredients_ingredient_id_seq', 23, true);


--
-- Name: instructions_instruction_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.instructions_instruction_id_seq', 46, true);


--
-- Name: recipe_ingredients_recipe_ingredient_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipe_ingredients_recipe_ingredient_id_seq', 72, true);


--
-- Name: recipes_recipe_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.recipes_recipe_id_seq', 29, true);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);


--
-- Name: favorites favorites_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT favorites_pkey PRIMARY KEY (favorite_id);


--
-- Name: images images_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.images
    ADD CONSTRAINT images_pkey PRIMARY KEY (image_id);


--
-- Name: ingredients ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.ingredients
    ADD CONSTRAINT ingredients_pkey PRIMARY KEY (ingredient_id);


--
-- Name: instructions instructions_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instructions
    ADD CONSTRAINT instructions_pkey PRIMARY KEY (instruction_id);


--
-- Name: recipe_ingredients recipe_ingredients_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT recipe_ingredients_pkey PRIMARY KEY (recipe_ingredient_id);


--
-- Name: recipes recipes_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipes
    ADD CONSTRAINT recipes_pkey PRIMARY KEY (recipe_id);


--
-- Name: recipe_categories fk3w4m6a9qnpwjgknvss7amxhjd; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_categories
    ADD CONSTRAINT fk3w4m6a9qnpwjgknvss7amxhjd FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- Name: instructions fk5nou8vg8kk82e874c4e4q0bjj; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.instructions
    ADD CONSTRAINT fk5nou8vg8kk82e874c4e4q0bjj FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- Name: recipe_ingredients fkcqlw8sor5ut10xsuj3jnttkc; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT fkcqlw8sor5ut10xsuj3jnttkc FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- Name: favorites fkf7myexo8ccfw0faigicluhrrh; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.favorites
    ADD CONSTRAINT fkf7myexo8ccfw0faigicluhrrh FOREIGN KEY (recipe_id) REFERENCES public.recipes(recipe_id);


--
-- Name: recipe_ingredients fkgukrw6na9f61kb8djkkuvyxy8; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_ingredients
    ADD CONSTRAINT fkgukrw6na9f61kb8djkkuvyxy8 FOREIGN KEY (ingredient_id) REFERENCES public.ingredients(ingredient_id);


--
-- Name: recipe_categories fkl4gklbf4tpxuk41fp77pgd28l; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.recipe_categories
    ADD CONSTRAINT fkl4gklbf4tpxuk41fp77pgd28l FOREIGN KEY (category_id) REFERENCES public.categories(category_id);


--
-- PostgreSQL database dump complete
--
