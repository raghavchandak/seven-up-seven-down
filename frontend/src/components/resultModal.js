import * as React from "react";
import Modal from "@mui/joy/Modal";
import Sheet from "@mui/joy/Sheet";
import chicken from "../assets/CHICKEN.png";
import loser from "../assets/LOSER.png";

export default function ResultModal(props) {
  const { open, handleClose, result } = props;

  return (
    <React.Fragment>
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <Sheet
          variant="outlined"
          sx={{
            width: "70vw",
            height: "60vh",
            borderRadius: "md",
            boxShadow: "lg",
            backgroundColor: "rgba(39, 85, 57, 0.5)",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={result === "win" ? chicken : loser}
            alt="result"
          />
          <button
            style={{
              borderRadius: 50,
              width: "10rem",
              alignSelf: "center",
              fontFamily: "Impact",
              fontSize: "1rem",
              letterSpacing: "2px",
              background:
                "radial-gradient(#313E4C, #14171F) padding-box, linear-gradient(to right, #eccc9c, #633b0e, #eccc9c) border-box",
              border: "0.25rem solid transparent",
              padding: "0.5rem",
              color: "aliceblue",
            }}
            onClick={handleClose}
          >
            {result === "win" ? "Play Again" : "Retry"}
          </button>
        </Sheet>
      </Modal>
    </React.Fragment>
  );
}
