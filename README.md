# 🎉 ClubSync – Unified Platform for College Clubs and Events

ClubSync is a centralized web platform designed to connect students with college clubs and events. Built for the AVENSIS 2025 Hackathon, this project enables students to explore clubs, register for events, and receive real-time updates — all in one place.

---

## 🚀 Features

### 👥 User Roles
- **Students**: Browse clubs, register for upcoming events, view past events and receive notifications.
- **Club Admins**: Create and manage events, post updates, and view registrations.

### 🗓️ Events Module
- View **Upcoming** and **Past Events**.
- Event registration with countdown and login protection.
- Dynamic event pages with speaker info, images, and schedules.

### 🏛️ Clubs Directory
- View all clubs and their profile pages.
- Events grouped under each club.

### 🔐 Authentication
- Custom login & register system using **Firestore**.
- Session-based role handling with protected dashboard routes.

---

## 🛠 Tech Stack

| Layer       | Tech Used                         |
|------------|-----------------------------------|
| Frontend   | Next.js 14, TypeScript, Tailwind CSS |
| Backend    | Firebase Firestore (NoSQL DB)     |
| Auth       | Firestore `users` collection-based |
| Hosting    | GitHub + Vercel                   |
| UI Design  | Prebuilt ClubSync Template (Envato) |

---

## 📁 Folder Structure (Simplified)


/app
/dashboard
/clubs
/events
/components
/elements
/layout
/lib
firebase.ts
db.ts
/public
/assets


---


## 🔧 Local Development

1. Clone the repository:


git clone https://github.com/AyushKumarPanigrahi/ClubSync.git
cd ClubSync


2. Install dependencies:


npm install


3. Configure Firebase:

* Add your Firebase config in `/lib/firebase.ts`
* Ensure Firestore has collections: `users`, `clubs`, `events`, `registrations`

4. Run development server:
npm run dev


Visit `http://localhost:3000`

---

## 🙌 Team Members

* **Ayush Kumar Panigrahi**
* **L Sai Anirudh**
* **Harshith Reddy**

---

## 🏁 Hackathon: AVENSIS 2025

> ClubSync was developed during the 24-hour AVENSIS 2025 Hackathon under the Web Development domain. It promotes student engagement by making clubs and events more accessible and organized.

---

## 📜 License

This project is open-source under the MIT License.



---

Let me know if you want a dark-mode preview screenshot or if you'd like to auto-generate this with icons in a rendered format.
```
