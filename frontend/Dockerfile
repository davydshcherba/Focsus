FROM node:20-alpine AS frontend-builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

# build frontend
RUN npm run build

# створюємо папку для nginx і копіюємо збірку
RUN mkdir -p /frontend_dist
RUN cp -r dist/* /frontend_dist/

# контейнер на старті не потрібен, просто збірка
CMD ["sh", "-c", "echo 'Frontend build complete'"]
