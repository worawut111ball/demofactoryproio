# Factory Pro

## การตั้งค่าฐานข้อมูล

โปรเจคนี้สามารถใช้ได้ทั้ง MySQL และ PostgreSQL เป็นฐานข้อมูล โดยใช้ Prisma ORM สำหรับการจัดการฐานข้อมูล

### การตั้งค่าด้วย Docker (แนะนำ)

1. **ติดตั้ง Docker และ Docker Compose**

2. **เริ่มต้นฐานข้อมูลด้วย Docker Compose**

\`\`\`bash
docker-compose up -d
\`\`\`

คำสั่งนี้จะเริ่มต้น MySQL และ phpMyAdmin โดยอัตโนมัติ:

- MySQL: `localhost:3306`
  - Database: `factorypro_db`
  - Username: `factorypro`
  - Password: `factorypro`
- phpMyAdmin: `http://localhost:8080`
  - Username: `root`
  - Password: `root`

### ขั้นตอนการตั้งค่า

1. **ติดตั้ง Dependencies**

\`\`\`bash
npm install
\`\`\`

2. **สร้างไฟล์ .env**

ใช้คำสั่งต่อไปนี้เพื่อสร้างไฟล์ .env และกำหนดค่าการเชื่อมต่อฐานข้อมูล:

\`\`\`bash
npx tsc scripts/generate-env.ts --outDir dist/scripts
node dist/scripts/generate-env.js
npm run db:setup
\`\`\`

3. **สร้างฐานข้อมูลและ Schema**

\`\`\`bash
กรณีเพิ่ม db ใหม่
npx prisma migrate dev --name add_blog_images
npx prisma migrate reset //มีความเสียงลบข้อมูล
npx prisma db push

ปกติ
npx prisma db push
\`\`\`

4. **เพิ่มข้อมูลเริ่มต้น (Seed)**

\`\`\`bash
npm run db:seed
\`\`\`

5. **ตรวจสอบการเชื่อมต่อฐานข้อมูล**

\`\`\`bash
npx ts-node scripts/check-db-connection.ts
\`\`\`

6. **ย้ายข้อมูลจาก localStorage (ถ้ามี)**

\`\`\`bash
npx ts-node scripts/migrate-local-storage.ts ./localStorage-data.json
\`\`\`

7. **เปิด Prisma Studio เพื่อจัดการข้อมูล**

\`\`\`bash
npm run db:studio
\`\`\`

### คำสั่งที่มีให้ใช้

- `npm run dev` - เริ่มการพัฒนาแบบ local
- `npm run build` - สร้างเวอร์ชันสำหรับ production
- `npm run start` - เริ่มเซิร์ฟเวอร์สำหรับ production
- `npm run db:setup` - สร้างไฟล์ .env และตั้งค่าฐานข้อมูล
- `npm run db:migrate` - สร้าง migration และอัปเดตฐานข้อมูล
- `npm run db:seed` - เพิ่มข้อมูลเริ่มต้นลงในฐานข้อมูล
- `npm run db:studio` - เปิด Prisma Studio สำหรับจัดการข้อมูล
- `npm run db:reset` - รีเซ็ตฐานข้อมูลและเริ่มต้นใหม่

### Environment Variables

| ตัวแปร              | คำอธิบาย                                             | ค่าเริ่มต้น                          |
| ------------------- | ---------------------------------------------------- | ------------------------------------ |
| DB_PROVIDER         | ประเภทของฐานข้อมูล (mysql/postgresql)                | mysql                                |
| DB_HOST             | โฮสต์ของฐานข้อมูล                                    | localhost                            |
| DB_PORT             | พอร์ตของฐานข้อมูล                                    | 3306 (MySQL) / 5432 (PostgreSQL)     |
| DB_USER             | ชื่อผู้ใช้ฐานข้อมูล                                  | root (MySQL) / username (PostgreSQL) |
| DB_PASSWORD         | รหัสผ่านฐานข้อมูล                                    | -                                    |
| DB_NAME             | ชื่อฐานข้อมูล                                        | factorypro_db                        |
| DB_SCHEMA           | สกีมาของฐานข้อมูล (สำหรับ PostgreSQL)                | public                               |
| DATABASE_URL        | URL สำหรับเชื่อมต่อฐานข้อมูล (สร้างจากตัวแปรข้างต้น) | -                                    |
| DB_POOL_MIN         | จำนวนการเชื่อมต่อขั้นต่ำในพูล                        | 1                                    |
| DB_POOL_MAX         | จำนวนการเชื่อมต่อสูงสุดในพูล                         | 10                                   |
| DB_LOG_LEVEL        | ระดับการบันทึกข้อมูล                                 | info                                 |
| DB_SSL_ENABLED      | เปิดใช้งาน SSL                                       | false                                |
| PRISMA_LOG_QUERIES  | บันทึกคำสั่ง SQL                                     | true                                 |
| PRISMA_ERROR_FORMAT | รูปแบบข้อความผิดพลาด                                 | pretty                               |

#   d e m o f a c t o r y p r o i o 
 
 
