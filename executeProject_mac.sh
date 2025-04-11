docker pull mrdos89/hbgogumaserver:latest
# docker pull mrdos89/hbgoguma-project:latest

cd compose
docker compose down
docker compose --env-file .env up -d
cd ..

npm install 

npm install && npm run dev