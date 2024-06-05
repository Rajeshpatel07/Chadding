
declare module 'wrtc' {
  // Types

  // PeerConnection configuration options
  interface RTCConfiguration {
    iceServers?: RTCIceServer[];
    iceTransportPolicy?: RTCIceTransportPolicy;
    bundlePolicy?: RTCBundlePolicy;
    rtcpMuxPolicy?: RTCRtcpMuxPolicy;
    peerIdentity?: string;
    certificates?: RTCCertificate[];
  }

  // ICE server configuration
  interface RTCIceServer {
    urls: string | string[];
    username?: string;
    credential?: string;
    credentialType?: RTCIceCredentialType;
  }

  // ICE transport policy options
  type RTCIceTransportPolicy = 'relay' | 'all' | 'public' | 'private';

  // Bundle policy options
  type RTCBundlePolicy = 'balanced' | 'max-compat' | 'max-bundle';

  // RTCP mux policy options
  type RTCRtcpMuxPolicy = 'negotiate' | 'require';

  // ICE credential type options
  type RTCIceCredentialType = 'password' | 'oauth';

  // Certificate for secure connections
  interface RTCCertificate {
    expires: number;
    fingerprints: RTCertificateFingerprint[];
  }

  // Fingerprint of a certificate
  interface RTCertificateFingerprint {
    algorithm: string;
    value: string;
  }

  // Functions

  // Create a new PeerConnection
  export function RTCPeerConnection(configuration?: RTCConfiguration): RTCPeerConnection;

  // Constructor for RTCSessionDescription
  export class RTCSessionDescription {
    constructor(descriptionInit: RTCSessionDescriptionInit);
  }

  // Constructor for RTCIceCandidate
  export class RTCIceCandidate {
    constructor(candidateInit: RTCIceCandidateInit);
  }

  // Events

  // Event handler for signaling state change
  export interface RTCPeerConnectionSignalingStateChangeEvent extends Event {
    readonly target: RTCPeerConnection;
    readonly oldValue: RTCSignalingState;
    readonly newValue: RTCSignalingState;
  }

  // Event handler for ice connection state change
  export interface RTCPeerConnectionIceEvent extends Event {
    readonly target: RTCPeerConnection;
    readonly candidate?: RTCIceCandidate | null;
    readonly url?: string;
    readonly errorCode?: number;
    readonly errorText?: string;
  }

  // Enums

  // Signaling states
  enum RTCSignalingState {
    "stable",
    "have-local-offer",
    "have-remote-offer",
    "have-local-pranswer",
    "have-remote-pranswer",
    "closed"
  }

  // ICE connection states
  enum RTCIceConnectionState {
    "new",
    "checking",
    "connected",
    "completed",
    "failed",
    "disconnected",
    "closed"
  }

  // ICE gathering states
  enum RTCIceGatheringState {
    "new",
    "gathering",
    "complete"
  }

  // Peer connection states
  enum RTCPeerConnectionState {
    "new",
    "connecting",
    "connected",
    "disconnected",
    "failed",
    "closed"
  }

  // ICE transport states
  enum RTCIceTransportState {
    "new",
    "checking",
    "connected",
    "completed",
    "disconnected",
    "failed",
    "closed"
  }

  // Events

  // Event handler for connection state change
  export interface RTCPeerConnectionConnectionStateChangeEvent extends Event {
    readonly target: RTCPeerConnection;
    readonly oldValue: RTCPeerConnectionState;
    readonly newValue: RTCPeerConnectionState;
  }

  // Event handler for ice connection state change
  export interface RTCPeerConnectionIceEvent extends Event {
    readonly target: RTCPeerConnection;
    readonly candidate?: RTCIceCandidate | null;
    readonly url?: string;
    readonly errorCode?: number;
    readonly errorText?: string;
  }

  // Event handler for ice gathering state change
  export interface RTCPeerConnectionIceGatheringStateChangeEvent extends Event {
    readonly target: RTCPeerConnection;
    readonly oldValue: RTCIceGatheringState;
    readonly newValue: RTCIceGatheringState;
  }

  // Event handler for ice connection state change
  export interface RTCPeerConnectionIceConnectionStateChangeEvent extends Event {
    readonly target: RTCPeerConnection;
    readonly oldValue: RTCIceConnectionState;
    readonly newValue: RTCIceConnectionState;
  }
}

