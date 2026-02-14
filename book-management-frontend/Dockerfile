# Use official Node.js 20 image as the base
FROM node:20

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose frontend port
EXPOSE 5713

# Start frontend on port 5173 and allow external access
CMD ["npm", "run", "dev", "--", "--port", "5173", "--host"]
