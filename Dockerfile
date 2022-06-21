FROM node:alpine AS builder

WORKDIR /app
COPY package*.json ./

RUN yarn install


# generated prisma files
COPY prisma ./prisma/

# COPY ENV variable
COPY .env ./

# COPY tsconfig.json file
COPY tsconfig.json ./

COPY . .
EXPOSE 3000
CMD yarn run dev-studio