# CucinAI - Your AI-powered kitchen companion for smarter, tastier recipes.

## Author: Riccardo Moncada (rmondev)

#### A recipe organizer with AI-powered enhancements to keep meals exciting. This project helps me explore AI integration, authentication, and full-stack development while building a useful and interactive app.

---

## 🚀 Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/your-username/cucinai.git
cd cucinai
```

### **2️⃣  Install Dependencies**
#### Ensure you have Node.js (v18+) installed, then run:

```sh
npm install
```
### **3️⃣ Configure Environment Variables**
#### 1. Copy the example .env file:
```sh
cp .env.example .env.local
```

#### 2. Open .env.local and add your Firebase credentials:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id_here
```
#### 🚨Make sure .env.local is never shared or committed. It is ignored in .gitignore.

### 4️⃣ Run the Development Server
```sh
npm run dev
```

#### Project will run at http://localhost:3000