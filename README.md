# Project Architecture

## Overview
E-Commerce platform for custom products with photo uploads, user profiles, product reviews, and admin management. Built with React 19, Vite, Tailwind CSS, and MongoDB Atlas.

## Tech Stack
- **Frontend:** React 19, Vite, Tailwind CSS
- **Routing:** React Router v7
- **i18n:** i18next + react-i18next
- **Database:** MongoDB Atlas
- **Image Management:** Cloudinary, Google Drive links
- **Shipping:** Econt API integration
- **Image Cropping:** react-avatar-editor, react-easy-crop

## Project Structure

```
src/
├── components/        # Reusable UI components
│   ├── Profile/      # User profile & avatar upload
│   ├── Cart/         # Shopping cart & crop modal
│   └── ...
├── pages/            # Page components
│   ├── Home          # Product catalog
│   ├── ProductDetail # Product page with reviews
│   ├── Profile       # User dashboard (private)
│   ├── Admin/        # Admin CRUD operations (private)
│   └── Auth/         # Login/Register
├── context/          # React Context state
├── services/         # API integrations
│   ├── mongoAPI.js
│   ├── cloudinaryAPI.js
│   ├── econtAPI.js
│   └── googleDrive.js
├── utils/            # Utilities & helpers
├── locales/          # i18n translation files
├── App.jsx
└── main.jsx
```

## Key Features

### Public
- Browse product catalog
- View product details & reviews
- User authentication (register/login)

### Private (Authenticated Users)
- **Profile:** Avatar upload/edit, personal settings
- **Reviews:** Create, edit, delete product reviews
- **Orders:** View order history, track shipments
- **Cart:** Add products, upload custom photos with aspect ratio cropping
- **Checkout:** Place orders with Econt shipping

### Admin
- **Products:** Create, read, update, delete products & images
- **Orders:** Manage orders, update status, track shipments
- **Users:** View, manage, delete user accounts
- **Reviews:** Moderate user reviews

## Database Collections

### Users
```
{ email, password, firstName, lastName, avatar, role, createdAt }
```

### Products
```
{ name, description, price, images, category, requiredPhotoAspectRatio, cloudinaryPublicId, createdAt }
```

### Orders
```
{ userId, products[], totalPrice, shippingAddress, econtTrackingNumber, status, createdAt }
```

### Reviews
```
{ userId, productId, rating, comment, createdAt }
```

## Image Handling

### Avatar Upload
- **Library:** react-avatar-editor
- **Output:** Blob → Uploaded to backend
- **Location:** Profile page

### Product Photo Upload
- **Library:** react-easy-crop
- **Features:** Multiple aspect ratios, zoom, drag
- **Output:** Data URL → Cloudinary
- **Location:** Cart/Checkout

### Product Images
- **Storage:** Cloudinary (optimized) + Google Drive links (thumbnails)
- **Aspect Ratios:** Configurable per product

## API Endpoints

**Products:** GET all, GET by ID, POST (admin), PUT (admin), DELETE (admin)  
**Orders:** POST create, GET user orders, PUT status (admin), DELETE (admin)  
**Users:** POST register, POST login, GET profile, PUT profile, DELETE (admin)  
**Reviews:** POST create, PUT update, DELETE remove  
**Images:** POST upload, DELETE remove  

## Authentication
- JWT tokens in localStorage
- Protected routes for private/admin features
- Password hashing (bcrypt backend)

## Multi-Language Support
- English (en), Bulgarian (bg)
- Translation files in `src/locales/`
- Language switcher in header
- i18next for dynamic translations

## Development Workflow

```bash
npm run dev      # Start dev server
npm run build    # Build for production
npm run lint     # Check code quality
npm run preview  # Preview production build
```

## Environment Variables
```
VITE_MONGODB_URI
VITE_CLOUDINARY_CLOUD_NAME
VITE_CLOUDINARY_UPLOAD_PRESET
VITE_ECONT_API_KEY
VITE_API_BASE_URL
```

## Deployment
- Build: `npm run build`
- Output: `dist/` folder
- Platforms: Vercel (recommended), Netlify, AWS S3, DigitalOcean
