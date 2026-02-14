# Use official Node.js 20 image as the base
FROM node:20

# Set working directory
WORKDIR /app


# Copy package.json and package-lock.json
COPY package*.json ./

# Copy the rest of the application code
COPY . .

# Install dependencies (after all files are copied)
RUN npm install

# Expose port 3000
EXPOSE 3000

# Wait for the database to be ready, run migrations, seed users, then start the app
CMD ["sh", "-c", "npx prisma migrate deploy && node prisma/seed.js && node index.js"]
