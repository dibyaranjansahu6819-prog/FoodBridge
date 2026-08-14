\# 🍲 FoodBridge



FoodBridge is a full-stack food donation and redistribution platform that connects \*\*food donors\*\* with \*\*NGOs\*\* to help redistribute surplus food efficiently.



The platform provides separate workflows for donors and NGOs, including food donation management, reservation requests, confirmation/rejection, cancellation, re-reservation, and completion of food redistribution.



\---



\## 🚀 Features



\### 👤 User Management

\- User registration and login

\- Role-based access

\- Donor and NGO workflows

\- JWT-based authentication

\- User profile management



\### 🍱 Donation Management

\- Donors can create food donations

\- View available donations

\- Edit donation information

\- Manage donation status

\- NGOs can browse available food donations



\### 📦 Reservation Management

\- NGOs can reserve available donations

\- Donors can confirm or reject reservations

\- NGOs can cancel reservations

\- Confirmed reservations can be completed

\- Cancelled donations become available again

\- Cancelled reservations can be re-used for re-reservation



\### 🔄 Reservation Workflow



```text

NGO

\&#x20;│

\&#x20;│ Reserve food

\&#x20;▼

PENDING

\&#x20;│

\&#x20;├── Donor confirms ──► CONFIRMED

\&#x20;│                         │

\&#x20;│                         └── NGO completes

\&#x20;│                                  │

\&#x20;│                                  ▼

\&#x20;│                              COMPLETED

\&#x20;│

\&#x20;├── Donor rejects ───► CANCELLED

\&#x20;│

\&#x20;└── NGO cancels ─────► CANCELLED

\&#x20;                           │

\&#x20;                           ▼

\&#x20;                    Donation AVAILABLE

\&#x20;                           │

\&#x20;                           ▼

\&#x20;                      Re-reservation


