import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faVolumeHigh,
	faVolumeMute,
	faBell,
} from "@fortawesome/free-solid-svg-icons";

// import ReactAudioPlayer from "react-audio-player";
import "./style.css";
import AudioPlayer from "react-h5-audio-player";
import "react-h5-audio-player/lib/styles.css";

// Import your audio file
import song from "../../music/buddy.mp3";
import useSound from "use-sound";

const MusicPlay = <FontAwesomeIcon icon={faVolumeHigh} />;
const MusicMute = <FontAwesomeIcon icon={faVolumeMute} />;
// const Bell =  />;

// const MusicOnly = () => {
//   const [isPlayingAudio, setIsPlayingAudio] = useState(false);
//   const [audio, setAudio] = useState(new Audio(song));

//   const playPause = () => {
//     if (isPlayingAudio) {
//       // Pause the song if it is playing
//       audio.pause();
//     } else {
//       // Play the song if it is paused
//       audio.play();
//     }

//     // Change the state of song
//     setIsPlayingAudio(!isPlayingAudio);
//   };
//   return (
//     <div className="absolute z-10 bottom-7 right-16">
//       {/* Show state of song on website */}

//       {/* Button to call our main function */}
//       <button onClick={playPause}>
//         <i className="text-white text-lg">
//           {isPlayingAudio ? MusicPlay : MusicMute}
//         </i>
//       </button>
//     </div>
//   );
// };

// export default MusicOnly;

const MusicOnly = () => {
	// const [play] = useSound(song);

	return (
		<div className="absolute z-20 bottom-6 right-16 flex justify-center items-center gap-1 md:bottom-24">

			<AudioPlayer
				autoPlay
				loop
				volume={0.6}
				showFilledVolume={false}
				showSkipControls={false}
				showJumpControls={false}
				// showFilledProgress={false}
				customIcons={MusicMute}
				// showDownloadProgress={false}
				src={song}
			/>
		</div>
	);
};

export default MusicOnly;
