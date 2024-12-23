# Указываем базовый образ с Node.js
FROM node:22-alpine AS builder

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Устанавливаем зависимости sharp
RUN npm install --cpu=x64 --os=linux sharp

# Копируем остальные файлы проекта
COPY . .

# Собираем приложение
RUN npm run build

# Указываем минимальный образ для запуска приложения
FROM node:22-alpine AS runner

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем только необходимые файлы из этапа сборки
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Устанавливаем только production зависимости
RUN npm install

# Указываем порт для приложения
EXPOSE 3000

# Запускаем Next.js приложение
CMD ["npm", "start"]
