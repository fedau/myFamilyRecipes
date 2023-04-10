docker run --name recipes-database \
 -d postgres \
 -p 5432:5432 \
 -v C:\Users\ilger\projects\fedau\myFamilyRecipes\recipeService\data\database:/var/lib/postgresql/data \
 -v C:\Users\ilger\projects\fedau\myFamilyRecipes\recipeService\data\recipedata.sql:/docker-entrypoint-initdb.d/recipedata.sql \
 -e POSTGRES_PASSWORD=postgres \
 -e POSTGRES_HOST_AUTH_METHOD=trust
