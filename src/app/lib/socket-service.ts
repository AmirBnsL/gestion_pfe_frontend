import io, { type Socket } from "socket.io-client";

const SOCKET_URL =
  process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080";

class SocketService {
  private mainSocket: typeof Socket | null = null;

  private getAuthToken(): string | null {
    if (typeof window === "undefined") return null;

    const cookies = document.cookie.split("; ");
    const jwtCookie = cookies.find((row) => row.startsWith("jwt="));
    return jwtCookie ? jwtCookie.split("=")[1] : null;
  }

  public async initialize() {
    const token = this.getAuthToken();
    if (!token) {
      throw new Error("Authentication token not found");
    }

    if (!this.mainSocket) {
      this.mainSocket = io(SOCKET_URL, {
        auth: { token },
        transports: ["websocket"],
        reconnectionAttempts: 5,
        timeout: 10000,
        transportOptions: {
          websocket: {
            extraHeaders: {
              Authorization: `Bearer ${token}`, // Add token to headers for backend JWT middleware
            },
          },
        },
      });
    }

    return { socket: this.mainSocket };
  }

  disconnect() {
    if (this.mainSocket) {
      this.mainSocket.disconnect();
      this.mainSocket = null;
    }
  }

  // Join a room
  joinRoom(roomId: string) {
    if (!this.mainSocket) return false;
    this.mainSocket.emit("joinRoom", { room: roomId });
    return true;
  }

  // Leave a room
  leaveRoom(roomId: string) {
    if (!this.mainSocket) return false;
    this.mainSocket.emit("leaveRoom", { room: roomId });
    return true;
  }

  // Send a message
  sendMessage(message: string, roomId: string) {
    if (!this.mainSocket) return false;
    this.mainSocket.emit("chatMessage", { message, room: roomId });
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
      reader.onerror = () => reject(new Error("Error reading file"));
      reader.readAsDataURL(file);
    });
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
}

// Create a singleton instance
export const socketService = new SocketService();
