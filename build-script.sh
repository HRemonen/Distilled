#!/bin/bash

# Change directory to src/client
cd src/client

# Run npm run build to build the frontend
npm run build

# Copy the frontend assets to src/server
cp -R dist/* ../server/dist/