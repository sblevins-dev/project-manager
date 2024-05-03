import { Add } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useContext } from "react";
import { useState } from "react";
import { AppContext } from "../../context/Context";
import ProjCommentModal from "./ProjCommentModal";

const ProjCommentList = ({ state }) => {
  const { mode } = useContext(AppContext);
  const [commentModal, setCommentModal] = useState(false);

  const handleAddCommentClose = () => setCommentModal(false);
  const handleAddCommentOpen = () => setCommentModal(true);

  useEffect(() => {}, [state]);

  return (
    <>
      <Typography
        mb={2}
        variant="h6"
        sx={{ borderBottom: "0.5px solid gray", width: "max-content" }}
      >
        Comments
      </Typography>

      <IconButton
        edge="end"
        aria-label="add"
        title="Add Comment"
        onClick={handleAddCommentOpen}
        sx={{
          position: "absolute",
          top: "0",
          right: "30px",
          color: "white",
          bgcolor: "accent.primary",
          "&:hover": { bgcolor: "accent.hover" },
        }}
      >
        <Add />
      </IconButton>

      <List
        sx={{
          width: "100%",
          height: "85%",
          borderRadius: "5px",
          maxHeight: "450px",
          overflowY: "scroll",
        }}
      >
        {state && state.comments && state.comments.map((comment, i) => (
          <div key={i + 1}>
            <ListItem alignItems="flex-start">
              <ListItemAvatar>
                <Avatar alt={comment.name} src={comment.img} />
              </ListItemAvatar>
              <ListItemText
                primary={comment.subject}
                secondary={
                  <>
                    <Typography
                      sx={{ display: "inline" }}
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {comment.name}
                    </Typography>
                    {" - "}
                    {comment.description}
                  </>
                }
              />
            </ListItem>
            <Divider variant="inset" component="li" />
          </div>
        ))}
      </List>
      {commentModal && (
        <ProjCommentModal
          mode={mode}
          isCommentModalOpen={commentModal}
          commentModalClose={handleAddCommentClose}
          state={state}
        />
      )}
    </>
    
  );
};

export default ProjCommentList;
