"use client";
import { useState } from "react";
import { Box } from "@mui/material";
import { CommentItem } from "./CommentItem";
import { ReplyForm } from "./ReplyForm";

interface CommentsListProps {
  comments: any[];
  videoId: number;
  onReplay: () => void;
}

export function CommentsList({
  comments,
  videoId,
  onReplay,
}: CommentsListProps) {
  const [replyingTo, setReplyingTo] = useState<number | null>(null);

  const handleReplyClick = (commentId: number) => {
    setReplyingTo(replyingTo === commentId ? null : commentId);
  };

  const handleReplyAdded = () => {
    onReplay();
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
      {comments?.map((comment) => (
        <Box key={comment.id}>
          <CommentItem
            comment={comment}
            onReplyClick={() => handleReplyClick(comment.id)}
            isReplyFormOpen={replyingTo === comment.id}
          />

          {replyingTo === comment.id && (
            <Box sx={{ mr: 6, mt: 2 }}>
              <ReplyForm
                commentId={comment.id}
                videoId={videoId}
                onReplyAdded={handleReplyAdded}
                onCancel={() => setReplyingTo(null)}
              />
            </Box>
          )}
        </Box>
      ))}
    </Box>
  );
}
