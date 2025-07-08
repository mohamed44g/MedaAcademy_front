// "use client";
// import { MediaPlayer, MediaProvider } from "@vidstack/react";
// import "@vidstack/react/player/styles/base.css";
// import "@vidstack/react/player/styles/plyr/theme.css";
// import { Box, Typography } from "@mui/material";

// interface VideoPlayerProps {
//   videoData: {
//     id: number;
//     title: string;
//     signedUrl: string;
//     keyUrl: string;
//     duration: string;
//     isCompleted: boolean;
//     chapter: {
//       id: number;
//       title: string;
//       videos: Array<{
//         id: number;
//         title: string;
//         duration: string;
//         isCompleted: boolean;
//       }>;
//     };
//     course: {
//       id: number;
//       title: string;
//       instructor: string;
//       specialty: string;
//     };
//   };
// }

// export const VideoPlayer: React.FC<VideoPlayerProps> = ({ videoData }) => {
//   return (
//     <Box sx={{ maxWidth: 960, mx: "auto", mt: 4, mb: 4 }}>
//       <Typography variant="h5" gutterBottom>
//         {videoData.title}
//       </Typography>
//       <MediaPlayer
//         title={videoData.title}
//         src={videoData.signedUrl}
//         controls
//         load="visible"
//       >
//         <MediaProvider />
//       </MediaPlayer>
//     </Box>
//   );
// };

"use client";
import "@vidstack/react/player/styles/base.css";
import "@vidstack/react/player/styles/plyr/theme.css";
import { Box } from "@mui/material";

import {
  MediaPlayer,
  MediaProvider,
  isHLSProvider,
  type MediaProviderAdapter,
  type MediaProviderChangeEvent,
} from "@vidstack/react";
import {
  PlyrLayout,
  plyrLayoutIcons,
} from "@vidstack/react/player/layouts/plyr";

import jsCookies from "js-cookie";

function onProviderChange(
  provider: MediaProviderAdapter | null,
  nativeEvent: MediaProviderChangeEvent
) {
  if (isHLSProvider(provider)) {
    provider.config = {
      xhrSetup(xhr, url) {
        if (
          url.includes("/videos/segment") ||
          url.includes("/videos/key-request")
        ) {
          const token = jsCookies.get("auth_token");
          if (token) {
            xhr.setRequestHeader("Authorization", `Bearer ${token}`);
          }
        }
      },
    };
  }
}

export const VideoPlayer = ({ videoData }: any) => {
  return (
    <Box
      sx={{
        width: "100vw",
        height: "auto",
        maxWidth: { xss: "95vw", md: "70vw" },
        mx: "auto",
        mt: 4,
        mb: 4,
      }}
    >
      <MediaPlayer
        title={videoData?.title}
        src={videoData?.signedUrl}
        style={{ width: "100%", height: "auto" }}
        onError={(e) => console.log(e)}
        aspectRatio="16/9"
        onProviderChange={onProviderChange}
      >
        <PlyrLayout icons={plyrLayoutIcons} />
        <MediaProvider />
      </MediaPlayer>
    </Box>
  );
};
