import io from "socket.io-client";

type SocketType = ReturnType<typeof io>;

class SocketService {
  private mainSocket: SocketType | null = null;
  private announcementsSocket: SocketType | null = null;
  private socketUrl = "";

  constructor() {
    this.socketUrl =
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080";
  }

  initialize() {
    if (!this.mainSocket) {
      // Initialize main socket
      this.mainSocket = io(this.socketUrl, {
        transports: ["websocket", "polling"],
        reconnectionAttempts: 5,
        timeout: 10000,
      });

      console.log("Main socket initialized");
    }

    if (!this.announcementsSocket) {
      // Initialize announcements socket
      this.announcementsSocket = io(`${this.socketUrl}/announcements`, {
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

  // Chat methods
  joinRoom(userId: string, roomId: string) {
    if (!this.mainSocket) return false;

    this.mainSocket.emit("joinRoom", { id: userId, room: roomId });
    return true;
  }

  leaveRoom(userId: string, roomId: string) {
    if (!this.mainSocket) return false;

    this.mainSocket.emit("leaveRoom", { id: userId, room: roomId });
    return true;
  }

  sendMessage(sender: string, message: string, roomId: string) {
    if (!this.mainSocket) return false;

    this.mainSocket.emit("chatMessage", {
      sender,
      message,
      room: roomId,
    });
    return true;
  }

  // Announcements methods
  publishAnnouncement(message: string, isAdmin: boolean) {
    if (!this.announcementsSocket) return false;

    this.announcementsSocket.emit("publishAnnouncement", {
      message,
      isAdmin,
    });
    return true;
  }

  // Add event listeners
  onChatMessage(
    callback: (data: { sender: string; message: string; room: string }) => void
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

  onAnnouncement(
    callback: (data: { title: string; content: string; date: string }) => void
  ) {
    if (!this.announcementsSocket) return () => {};

    this.announcementsSocket.on("announcement", callback);
    return () => this.announcementsSocket?.off("announcement", callback);
  }
}

// Create a singleton instance
export const socketService = new SocketService();
