#!/bin/bash

# Function to prompt user for input
function prompt {
  read -p "$1: " value
  while [[ -z "$value" ]]; do
    read -p "Value cannot be empty. Please enter again: " value
  done
  echo "$value"
}

# Function to create .env file with default values
function createEnvFile {
  echo "$1" > "$2"
  echo "Created $2"
}

# Function to format styled text
function styledText {
  echo "*****************************************"
  echo ""
  echo -e "\033[1m$1\033[0m"
  echo ""
}

# Go to src/client and run npm install
styledText "Setting up client environment..."
echo "Installing client dependencies..."
cd src/client
npm install
cd ../..

# Go to src/server and run poetry install
styledText "Setting up server environment..."
echo "Installing server dependencies..."
cd src/server
poetry install
cd ../..

# Run npm install in the root folder
styledText "Installing root dependencies..."
npm install

styledText "Welcome to the Distilled Setup Script"
echo "This script will guide you through the setup process for your project."
echo "Please provide the following values:"

# Prompt user for VITE_MAPBOX_KEY
mapboxKey=$(prompt "Enter VITE_MAPBOX_KEY (Mapbox Access Token)")

# Create client .env file with VITE_MAPBOX_KEY
clientEnvContent="VITE_MAPBOX_KEY=$mapboxKey"
createEnvFile "$clientEnvContent" "./src/client/.env"

styledText "Client environment file created successfully."

# Create server .env file with default values
styledText "Configuring server environment..."

dbEnvContent="FLASK_APP=app.py
FLASK_ENV=development

DB_NAME=distillery-db
DB_HOST=postgres
DB_USER=postgres
DB_PASSWORD=postgres"

# Prompt user for JWT_SECRET_KEY
jwtSecretKey=$(prompt "Enter JWT_SECRET_KEY (JSON Web Token Secret Key)")

if [[ -n "$jwtSecretKey" ]]; then
  dbEnvContent+="

JWT_SECRET_KEY=$jwtSecretKey"
fi

createEnvFile "$dbEnvContent" "./src/server/.env"

styledText "Server environment file created successfully."
styledText "Environment setup process completed."
