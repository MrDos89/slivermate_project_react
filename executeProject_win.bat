docker pull mrdos89/hbgogumaserver:latest
@REM docker pull mrdos89/hbgoguma-project:latest

cd compose
docker compose down
docker compose --env-file .env up -d
cd ..

call npm install

call npm install && npm run dev