type RecorderParams = {
  recordAudio?: boolean;
  frameRate?: number;
  targetVideoElement?: HTMLVideoElement;
  codec:
    "video/webm"
    | "video/webm;codecs=vp8"
    | "video/webm;codecs=daala"
    | "video/webm;codecs=h264"
    | "video/mpeg";
};

//TODO: integrar codec para usar se en " mimeType "


export class ScreenRecorder {
  private mediaRecorder?: MediaRecorder;
  private mediaStream?: MediaStream;
  private mimeTypesToTry: string[] = [
    "video/webm",
    "video/webm;codecs=vp8",
    "video/webm;codecs=daala",
    "video/webm;codecs=h264",
    "video/mpeg",
  ];

  constructor(private params: RecorderParams) {}

  async startRecording() {
    try {
      const videoOptions: MediaTrackConstraints = {
        frameRate: this.params.frameRate || 30,
      };

      const mediaOptions: DisplayMediaStreamOptions = {
        video: videoOptions,
        audio: this.params.recordAudio ?? false,
      };

      this.mediaStream = await navigator.mediaDevices.getDisplayMedia(
        mediaOptions
      );

      if (this.params.recordAudio) {
        const audioStream = await navigator.mediaDevices.getUserMedia({
          audio: true,
        });
        audioStream.getAudioTracks().forEach((audioTrack) => {
          this.mediaStream?.addTrack(audioTrack);
        });
      }

      this.handleSuccess();

      const mimeType =
        this.mimeTypesToTry.find((type) =>
          MediaRecorder.isTypeSupported(type)
        ) || "video/webm";

      this.mediaRecorder = new MediaRecorder(this.mediaStream, {
        mimeType: mimeType,
      });

      this.mediaRecorder.start();

      this.mediaRecorder.addEventListener("dataavailable", (e) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(e.data);
        link.download = `captura.${mimeType.split("/")[1]}`;
        link.click();
      });

      this.mediaStream.getVideoTracks()[0].addEventListener("ended", () => {
        this.stopRecording();
      });
    } catch (error) {
      console.error("Error starting screen recording", error);
      throw error;
    }
  }

  private handleSuccess() {
    if (this.params.targetVideoElement && this.mediaStream) {
      this.params.targetVideoElement.srcObject = this.mediaStream;
    }
  }

  stopRecording() {
    this.mediaRecorder?.stop();
    this.mediaStream?.getTracks().forEach((track) => track.stop());
  }
}
