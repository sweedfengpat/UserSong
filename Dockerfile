FROM node:14

# ตั้งค่า working directory
WORKDIR /app

# คัดลอก package.json และ package-lock.json
COPY package*.json ./

# ติดตั้ง dependencies
RUN npm install

# คัดลอก source code ทั้งหมดไปยัง working directory
COPY . .

# คอมไพล์ TypeScript เป็น JavaScript
RUN npm run build

# เริ่มต้น application
CMD ["npm", "start"]
