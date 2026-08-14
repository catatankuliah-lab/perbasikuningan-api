# 1. Pakai base image Node.js yang ringan (Alpine version)
FROM node:18-alpine

# 2. Tentukan working directory di dalam container
WORKDIR /usr/src/app

# 3. Copy package.json & package-lock.json dulu (biar caching npm install optimal)
COPY package*.json ./

# 4. Install dependency
RUN npm install --production

# 5. Copy seluruh sisa file project ke dalam container
COPY . .

# 6. Expose port internal Express (3000)
EXPOSE 3000

# 7. Perintah untuk menjalankan backend
CMD ["node", "server.js"]