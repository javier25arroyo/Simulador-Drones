# Etapa 1: Build
FROM node:20-alpine AS build

WORKDIR /app

# Copiar archivos de dependencias
COPY package*.json ./

# Configurar npm y instalar dependencias
RUN npm config set strict-ssl false && \
    npm install --no-audit --prefer-offline

# Copiar el resto de los archivos
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa 2: Production
FROM nginx:alpine

# Copiar los archivos build al servidor nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Comando para iniciar nginx
CMD ["nginx", "-g", "daemon off;"]
