import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import Slide from "@mui/material/Slide";
import CloseIcon from "@mui/icons-material/Close";
import { Grid } from "@mui/material";
import "./singleimage.module.css"

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function SingleImage({ image, open, handleClose }) {
  return (
    <>
      {image && (
        <Dialog
          open={open}
          TransitionComponent={Transition}
          keepMounted
          fullScreen
          onClose={handleClose}
          style={{justifyContent:"center"}}
        >
          <Grid container justifyContent="center"  >
            <Grid item sm={12} md={4} lg={4} xl={4}>
              <div style={{ position: "relative" }} >
                <Button
                  onClick={handleClose}
                  style={{ position: "absolute", top: "2%", right: "2%" }}
                >
                  <CloseIcon />
                </Button>
                <img
                  src={image.image}
                  alt={image.name}
                  height="100%"
                  width="100%"
                />
              </div>
            </Grid>
          </Grid>

          
        </Dialog>
      )}
    </>
  );
}
