# Rate My Bite

https://project-9-client.vercel.app/

## 🍔 Overview

Rate My Bite is a Next.js web application where users can discover, post, and review street food spots. The platform features premium content for subscribed users, an admin dashboard for content moderation, and a comprehensive street food discovery experience.

## ✨ Features

- **User Authentication**
  - Register and login with email and password
  - JWT-based secure authentication
  - User profile management

- **Food Discovery**
  - Browse street food spots
  - Search by name, category, or location
  - Filter by price range, rating, and popularity
  - View detailed information about each food spot

- **Content Creation**
  - Post new street food discoveries
  - Upload images
  - Categorize and tag posts
  - Set price ranges and location information

- **Interaction**
  - Upvote/downvote food spots
  - Rate spots from 1-5 stars
  - Comment on posts

- **Premium Features**
  - Subscribe to access exclusive premium content
  - Integrated payment gateway (ShurjoPay/SSLCommerz)
  - Manage subscription

- **Admin Dashboard**
  - Review and approve posts
  - Mark content as premium
  - Moderate comments and reviews
  - Manage users and categories

- **Responsive Design**
  - Fully responsive UI for all devices
  - Mobile-first approach

## 🛠️ Tech Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS
- **Form Handling**: React Hook Form
- **Validation**: Zod
- **Authentication**: JWT
- **Payment**: ShurjoPay

## 📋 Prerequisites

- Node.js (v16+)
- npm or yarn
- Backend API running (see [Rate My Bite](https://github.com/Al-amin07/project-9-server))

## Getting Started

Follow these steps to set up and run the project locally.

## 1. Clone the Repository

```bash
git clone https://github.com/Al-amin07/project-9-client
```

## 2. Install Dependencies

Navigate to the project directory and install the necessary dependencies:

   ```bash
   cd project-9-client
   npm install
   ```

## 3. Set Up Environment Variables
Create a .env file in the root of the project to store environment variables, such as MongoDB URI or any secret keys. Here’s an example:
```bash
NEXT_PUBLIC_API=https://assignment9-flax.vercel.app/api
JWT_ACCESS_SECRET=sdgsdgsdgjsdd

```

## 4. Run the Project
- **Development Mode**
To start the project in development mode with hot reloading:
```bash
npm run dev
```
- **Production Mode**
If you prefer to run the project in production mode:
```bash
npm run build
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.



## 📱 Pages & Features

### Public Pages
- **Home**: Featured food spots and search
- **Posts**: Browse all food spots with filters
- **Blogs**: View all blogs
- **Login/Register**: User authentication
- **About**: Information about the platform
- **Contact**: Contact form

### Authenticated User Pages
- **Post Food Spot**: Form to submit new food spots
- **My Posts**: User's submitted food spots
- **Profile**: User profile management
- **Subscription**: Premium subscription management

### Premium User Pages
- **Premium Food Spots**: Exclusive premium content

### Admin Pages
- **Dashboard**: Overview of platform statistics
- **Users**: View and manage user
- **Posts**: Edit or delete existing posts
- **Category**: View and manage category

