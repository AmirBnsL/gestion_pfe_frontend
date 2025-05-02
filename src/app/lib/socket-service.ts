import io, { type Socket } from "socket.io-client";

// Get the socket URL from environment variables
const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080";

class SocketService {
  private mainSocket: typeof Socket | null = null;
  private announcementsSocket: typeof Socket | null = null;

  // Get the JWT token from localStorage or sessionStorage
  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;

    // Try to get token from localStorage first
    const token =
      localStorage.getItem("token") || sessionStorage.getItem("token");

    // Format as Bearer token if it exists
    return token ? `Bearer ${token}` : null;
  }

  // Initialize both sockets with authentication
  public initialize() {
    const token = this.getAuthToken();

    if (!this.mainSocket) {
      // Initialize main socket with auth token
      this.mainSocket = io(SOCKET_URL, {
        auth: { token },
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
        timeout: 10000,
      });

      console.log("Main socket initialized");
    }

    if (!this.announcementsSocket) {
      // Initialize announcements socket with auth token
      this.announcementsSocket = io(`${SOCKET_URL}/announcements`, {
        auth: { token },
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
        timeout: 10000,
      });

      console.log("Announcements socket initialized");
    }

    return {
      mainSocket: this.mainSocket,
      announcementsSocket: this.announcementsSocket,
    };
  }

  disconnect() {
    if (this.mainSocket) {
      this.mainSocket.disconnect();
      this.mainSocket = null;
    }

    if (this.announcementsSocket) {
      this.announcementsSocket.disconnect();
      this.announcementsSocket = null;
    }
  }

  // Join a room
  joinRoom(userId: string, roomId: string) {
    if (!this.mainSocket) return false;

    this.mainSocket.emit("joinRoom", { room: roomId });
    return true;
  }

  // Leave a room
  leaveRoom(userId: string, roomId: string) {
    if (!this.mainSocket) return false;

    this.mainSocket.emit("leaveRoom", { room: roomId });
    return true;
  }

  // Send a message
  sendMessage(sender: string, message: string, roomId: string) {
    if (!this.mainSocket) return false;

    this.mainSocket.emit("chatMessage", {
      sender,
      message,
      room: roomId,
    });
    return true;
  }

  // Send typing indicator
  sendTypingIndicator(roomId: string) {
    if (!this.mainSocket) return false;

    this.mainSocket.emit("typing", { room: roomId });
    return true;
  }

  // Mark messages as read
  markMessagesAsRead(messageIds: string[], roomId: string) {
    if (!this.mainSocket) return false;

    this.mainSocket.emit("markAsRead", { messageIds, room: roomId });
    return true;
  }

  // Upload file
  uploadFile(file: File, roomId: string) {
    if (!this.mainSocket)
      return Promise.reject(new Error("Socket not connected"));

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64data = reader.result?.toString().split(",")[1];

        if (base64data) {
          this.mainSocket!.emit("fileUpload", {
            room: roomId,
            file: base64data,
            fileName: file.name,
            fileType: file.type,
          });
          resolve(true);
        } else {
          reject(new Error("Failed to read file"));
        }
      };
      reader.onerror = () => {
        reject(new Error("Error reading file"));
      };
      reader.readAsDataURL(file);
    });
  }

  // Publish an announcement
  publishAnnouncement(message: string, isAdmin = false) {
    if (!this.announcementsSocket) return false;

    this.announcementsSocket.emit("publishAnnouncement", {
      message,
      isAdmin,
    });
    return true;
  }

  // Event listeners
  onChatMessage(
    callback: (data: {
      id?: string;
      sender: string;
      senderId?: string;
      message: string;
      timestamp: string;
      attachments?: Array<{
        url: string;
        fileName: string;
        fileType: string;
        fileSize: number;
      }>;
    }) => void
  ) {
    if (!this.mainSocket) return () => {};

    this.mainSocket.on("chatMessage", callback);
    return () => this.mainSocket?.off("chatMessage", callback);
  }

  onSystemMessage(callback: (message: string) => void) {
    if (!this.mainSocket) return () => {};

    this.mainSocket.on("message", callback);
    return () => this.mainSocket?.off("message", callback);
  }

  onRoomHistory(
    callback: (
      messages: Array<{
        id: string;
        sender: string;
        senderName: string;
        message: string;
        timestamp: string;
        room: string;
        read: string[];
        attachments: Array<{
          id: string;
          url: string;
          fileName: string;
          fileType: string;
          fileSize: number;
        }>;
      }>
    ) => void
  ) {
    if (!this.mainSocket) return () => {};

    this.mainSocket.on("roomHistory", callback);
    return () => this.mainSocket?.off("roomHistory", callback);
  }

  onAnnouncement(
    callback: (data: {
      message: string;
      sender?: string;
      timestamp: Date | string;
    }) => void
  ) {
    if (!this.announcementsSocket) return () => {};

    this.announcementsSocket.on("announcement", callback);
    return () => this.announcementsSocket?.off("announcement", callback);
  }

  onUserTyping(
    callback: (data: {
      userId: string;
      userName: string;
      isTyping: boolean;
    }) => void
  ) {
    if (!this.mainSocket) return () => {};

    this.mainSocket.on("userTyping", callback);
    return () => this.mainSocket?.off("userTyping", callback);
  }

  onMessagesRead(
    callback: (data: {
      userId: string;
      userName: string;
      messageIds: string[];
    }) => void
  ) {
    if (!this.mainSocket) return () => {};

    this.mainSocket.on("messagesRead", callback);
    return () => this.mainSocket?.off("messagesRead", callback);
  }

  onRoomUsers(callback: (users: { id: string; isTyping: boolean }[]) => void) {
    if (!this.mainSocket) return () => {};

    this.mainSocket.on("roomUsers", callback);
    return () => this.mainSocket?.off("roomUsers", callback);
  }

  onError(callback: (error: { message: string }) => void) {
    if (!this.mainSocket) return () => {};

    this.mainSocket.on("error", callback);
    const cleanup1 = () => this.mainSocket?.off("error", callback);

    if (!this.announcementsSocket) return cleanup1;

    this.announcementsSocket.on("error", callback);
    return () => {
      cleanup1();
      this.announcementsSocket?.off("error", callback);
    };
  }
}

// Create a singleton instance
export const socketService = new SocketService();
