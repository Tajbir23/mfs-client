# INSTAPAY - Mobile Financial Service Application

**Live URL**: [INSTAPAY](https://mfs-app-4e475.web.app)

**Client-Side Code**: [GitHub Repository](https://github.com/Tajbir23/mfs-client.git)

**Server-Side Code**: [GitHub Repository](https://github.com/Tajbir23/mfs-server.git)

## Overview

INSTAPAY is a basic Mobile Financial Service (MFS) application developed using React.js, Node.js, Express.js, and MongoDB. This project is inspired by services like bKash and Nagad and includes features for user authentication, money transfers, cash-out, and balance inquiries. The application supports three roles: User, Agent, and Admin.

## Features

### For Users
- **Registration**: Sign up with Name, 5-digit PIN, Mobile Number, and Email. Status is initially pending and activated by an admin.
- **Secure Login**: Log in with Mobile Number/Email and PIN. JWT is used for secure login.
- **Send Money**: Transfer money to other users with PIN and JWT verification.
- **Cash-Out**: Withdraw funds through agents with PIN and JWT verification.
- **Cash-In**: Deposit money through agents without a fee.
- **Balance Inquiry**: Check account balance at any time.
- **Transaction History**: View the last 10 transactions with JWT verification.

### For Agents
- **Email** : agent@agent.com
- **Password** : 12345
- **Registration**: Sign up with Name, 5-digit PIN, Mobile Number, and Email. Status is initially pending and activated by an admin.
- **Secure Login**: Log in with Mobile Number/Email and PIN. JWT is used for secure login.
- **Transaction Management**: Approve cash-in and cash-out requests.
- **Balance Inquiry**: Check account balance at any time.
- **Transaction History**: View the last 20 transactions with JWT verification.

### For Admin
- **Email** : admin@gmail.com
- **Password** : 12345
- **Secure Login**: Log in with Mobile Number/Email and PIN. JWT is used for secure login.
- **User Management**: View and manage all users, activate/block accounts.
- **System Monitoring**: View all transactions within the system.


### Technologies Used
- **socket.io for real-time updates**
- **Frontend: React.js, Tailwind CSS**
- **Backend: Node.js, Express.js**
- **Database: MongoDB**
- **Authentication: JWT, bcrypt.js**
- **Deployment: Firebase**