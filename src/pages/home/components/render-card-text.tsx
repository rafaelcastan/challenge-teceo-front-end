import { Box, Typography } from "@mui/material";

interface RenderCardTextProps {
  title: string;
  text: string;
}

const RenderCardText = ({ title, text }: RenderCardTextProps) => {
  return (
    <Box>
      <Typography variant="body2" fontWeight="bold" color="text.secondary" gutterBottom>
        {title}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {text}
      </Typography>
    </Box>
  );
};

export default RenderCardText;
