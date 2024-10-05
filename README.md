# Simple Chat Realtime

This is a simple real-time chat application built with Node.js, Express, and Socket.IO. The application allows multiple users to join a chat room and send messages that are instantly broadcasted to all other users in real-time.

This project is based on a tutorial by [midudev](https://github.com/midudev).

## Features

- **Real-time messaging:** Messages sent by users are instantly displayed to all connected users.
- **Multiple users:** Multiple users can join the chat room simultaneously and interact.
- **Socket.IO integration:** Utilizes WebSockets through Socket.IO for real-time bi-directional communication.
- **Express framework:** Simple server setup using Express.js.

## Technologies Used

- **Node.js**
- **Express.js**
- **Socket.IO**
- **HTML/CSS**
- **MySQLite**

## How It Works

The app uses Socket.IO to manage real-time communication between the server and clients. When a user sends a message, it's broadcasted to all other connected users in the chat room. The interface is simple and lightweight, using HTML and CSS for the frontend.
