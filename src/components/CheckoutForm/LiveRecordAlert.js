import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";

export default function LiveRecordAlert({ open, onClose }) {
  return (
    <Dialog
      open={open}
      aria-labelledby="live-record-dialog-title"
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle id="live-record-dialog-title">
        <Typography variant="h6" fontWeight={600} align="center">
          ⚠️ Important: Live Verification Required
        </Typography>
      </DialogTitle>

      <DialogContent>
        <Typography
          variant="body1"
          align="center"
          sx={{ fontWeight: 500, lineHeight: 1.7 }}
        >
          Before completing your payment, please be aware that a{" "}
          <strong>live video verification</strong> is required.
          <br />
          This may involve a <strong>live recording</strong> or a{" "}
          <strong>Zoom meeting</strong> with our team.
          <br />
          <br />
          Once your payment is successful, you will receive an email with the
          next steps.
          <br />
          <strong>This email will be sent only once.</strong> Please check your
          inbox and spam folder carefully.
        </Typography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "center", pb: 3 }}>
        <Button
          onClick={onClose}
          variant="contained"
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            fontWeight: 600,
            px: 4,
            py: 1,
            borderRadius: "8px",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "#115293",
            },
          }}
        >
          Understood
        </Button>
      </DialogActions>
    </Dialog>
  );
}
