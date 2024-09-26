import { ThemeProvider } from "styled-components";
import { SpotifyHeart } from "./screens/SpotifyHeart";
import { theme } from "./theme";

const SpotifyHeartTest = () => {
  return (
    <ThemeProvider theme={theme}>
      <SpotifyHeart />
    </ThemeProvider>
  );
};

export default SpotifyHeartTest;
