docker-compose up -d db
sleep 10 # รอให้ PostgreSQL เริ่มทำงาน

# รันสคริปต์สร้างตาราง
docker-compose exec db psql -U example -d example -f /docker-entrypoint-initdb.d/create_tables.sql

# รันสคริปต์ใส่ข้อมูล
docker-compose exec db psql -U example -d example -f /docker-entrypoint-initdb.d/insert_data.sql

docker-compose up -d app
