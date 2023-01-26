import Typography from "@mui/material/Typography";

export const Header = () => {
  return (
    <header
      style={{
        width: "100vw",
        height: "10px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        padding: "32px 0px",
      }}
    >
      <Typography variant="body1" component="span">
        لیست پخش
      </Typography>
    </header>
  );
};
