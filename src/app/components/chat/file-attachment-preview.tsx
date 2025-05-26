"use client";

import type React from "react";

import { useState } from "react";
import { FileIcon, X } from "lucide-react";
import { Button } from "@/app/components/ui/button";

interface FileAttachmentPreviewProps {
  url: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  onRemove?: () => void;
  isPreview?: boolean;
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const FileAttachmentPreview: React.FC<FileAttachmentPreviewProps> = ({
  url,
  fileName,
  fileType,
  fileSize,
  onRemove,
  isPreview = false,
}) => {
  const [expanded, setExpanded] = useState(false);

  const isImage = fileType.startsWith("image/");
  const isPdf = fileType === "application/pdf";
  const isVideo = fileType.startsWith("video/");
  const isAudio = fileType.startsWith("audio/");

  // Get file extension from fileName
  const fileExtension = fileName.split(".").pop()?.toLowerCase() || "";

  // Format file size
  const formattedSize = formatFileSize(fileSize);

  // Handle file download
  const handleDownload = () => {
    window.open(url, "_blank");
  };

  // Determine preview content
  const renderPreview = () => {
    if (isImage) {
      return (
        <div className="relative group">
          <img
            src={url || "/placeholder.svg"}
            alt={fileName}
            className={`rounded-md border border-slate-700 object-cover ${
              expanded ? "max-h-96 w-auto" : "h-32 w-32"
            }`}
            onClick={() => setExpanded(!expanded)}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100">
            <Button
              variant="ghost"
              size="sm"
              className="text-white bg-black/50 hover:bg-black/70"
              onClick={handleDownload}
            >
              View
            </Button>
          </div>
        </div>
      );
    } else if (isPdf) {
      return (
        <div className="flex items-center p-3 bg-slate-800/50 rounded-md border border-slate-700">
          <FileIcon className="h-8 w-8 text-red-400 mr-3" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">
              {fileName}
            </p>
            <p className="text-xs text-slate-400">PDF • {formattedSize}</p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-2"
            onClick={handleDownload}
          >
            View
          </Button>
        </div>
      );
    } else if (isVideo) {
      return (
        <div className="rounded-md border border-slate-700 overflow-hidden">
          <video
            controls
            className="max-h-48 w-full"
            poster="/placeholder.svg?height=120&width=200"
          >
            <source src={url} type={fileType} />
            Your browser does not support the video tag.
          </video>
        </div>
      );
    } else if (isAudio) {
      return (
        <div className="p-3 bg-slate-800/50 rounded-md border border-slate-700">
          <p className="text-sm font-medium text-slate-200 mb-2">{fileName}</p>
          <audio controls className="w-full">
            <source src={url} type={fileType} />
            Your browser does not support the audio element.
          </audio>
        </div>
      );
    } else {
      // Generic file
      return (
        <div className="flex items-center p-3 bg-slate-800/50 rounded-md border border-slate-700">
          <FileIcon className="h-8 w-8 text-blue-400 mr-3" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-slate-200 truncate">
              {fileName}
            </p>
            <p className="text-xs text-slate-400">
              {fileExtension.toUpperCase()} • {formattedSize}
            </p>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="ml-2"
            onClick={handleDownload}
          >
            Download
          </Button>
        </div>
      );
    }
  };

  return (
    <div className="relative">
      {renderPreview()}

      {isPreview && onRemove && (
        <button
          onClick={onRemove}
          className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors"
        >
          <X className="h-3 w-3" />
        </button>
      )}
    </div>
  );
};

export default FileAttachmentPreview;
