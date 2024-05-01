
// wrtc.d.ts

// Reference the DOM types for compatibility with browser usage
/// <reference types="dom" />

// Since wrtc primarily interacts with WebRTC APIs,
// leverage the existing DOM types for most of the core classes:
declare namespace RTCPeerConnection { }
declare namespace RTCSessionDescription { }
declare namespace RTCIceCandidate { }
declare namespace RTCDataChannel { }
declare namespace RTCDataChannelEvent { }
declare namespace RTCDtlsTransport { }
declare namespace RTCIceTransport { }
declare namespace RTCRtpReceiver { }
declare namespace RTCRtpSender { }
declare namespace MediaStream { }
declare namespace MediaStreamTrack { }

// However, some properties might require additional type definitions:
interface RTCIceCandidateInit {
  candidate?: string;
  sdpMLineIndex?: number;
  sdpMid?: string;
  usernameFragment?: string;
}

// ... potentially add type definitions for other properties or functions
// as needed based on your specific wrtc usage and any encountered type errors.

// Example function signature (if not using existing DOM types):
// declare function createRTCPeerConnection(configuration?: RTCConfiguration): RTCPeerConnection;
