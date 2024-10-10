# App Setup Guide

This guide walks through the process of setting up and running your Turbo app using `pnpm`.

## Prerequisites

- Make sure `pnpm` is installed globally on your system.
  ```bash
  npm install -g pnpm
  ```

## Step 1: Install Dependencies

- Navigate to the root directory of your project and install the required dependencies.
  ```
  pnpm install
  ```

## Step 2: Create a .env file

- Before running the app, you need to create a .env file inside apps/api with the necessary environment variables. Follow the steps below:
  
  1. Navigate to the apps/api directory.
    ```
    cd apps/api
    ```
  2. Create a .env file and add your environment variables. Here’s an example of what it might look like:
    ```
     MONGO_URL=
     PORT=8888
     JWT_ACCESS_SECRET=2321
     JWT_REFRESH_SECRET=1234
    ```

## Step 3: Run the Development Server

 - Once the .env file is created, you can return to the root of your project and run the development server.

 ```
 pnpm dev
 ```

This will start your Turbo app in development mode.