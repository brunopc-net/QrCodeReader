# Step 1: Use an official Node.js image as the base image
FROM node:18-slim AS build

# Step 2: Set the working directory inside the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (if present)
COPY package*.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application source code
COPY . .

# Step 6: Build the React application for production
RUN npm run build

# Step 7: Use a lightweight web server to serve the build files
FROM nginx:1.27-alpine-slim

# Step 8: Copy the build files from the previous stage into the Nginx server's public directory
COPY --from=build /app/build /usr/share/nginx/html

# Step 9: Expose port 80 for the web server
EXPOSE 80

# Step 10: Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]