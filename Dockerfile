# Use Nginx to serve the Angular app
FROM nginx:1.23

# Set the working directory inside the Nginx container
WORKDIR /usr/share/nginx/html

# Clean existing files in the Nginx default directory
RUN rm -rf ./*

# Copy the built Angular files from 'dist/fuse' into the Nginx directory
COPY dist/fuse/ ./

# Optional: Copy a custom Nginx configuration file, if needed
# COPY nginx.conf /etc/nginx/nginx.conf

# Expose the port on which Nginx will serve
EXPOSE 80