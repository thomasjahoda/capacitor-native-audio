import type { PluginListenerHandle } from '@capacitor/core';

export interface NativeAudio {
  configure(options: ConfigureOptions): Promise<void>;
  /**
   * WARNING: If an audio asset with that assetId was already preloaded, this will throw an error.
   */
  preload(options: PreloadOptions): Promise<void>;
  /**
   * WARNING: You have to call {@link NativeAudio#preload} before calling this method.
   */
  play(options: { assetId: string; time?: number }): Promise<void>;
  pause(options: { assetId: string }): Promise<void>;
  resume(options: { assetId: string }): Promise<void>;
  loop(options: { assetId: string }): Promise<void>;
  stop(options: { assetId: string }): Promise<void>;
  unload(options: { assetId: string }): Promise<void>;
  setVolume(options: { assetId: string; volume: number }): Promise<void>;
  getCurrentTime(options: { assetId: string }): Promise<{ currentTime: number }>;
  getDuration(options: { assetId: string }): Promise<{ duration: number }>;
  isPlaying(options: { assetId: string }): Promise<{ isPlaying: boolean }>;
  /**
   * Listen for asset completed playing event
   *
   * @since 5.0.1
   */
  addListener(eventName: 'complete', listenerFunc: (event: { assetId: string }) => void): Promise<PluginListenerHandle>;
}

export interface ConfigureOptions {
  /**
   * Indicating whether or not to fade audio.
   * @default false
   */
  fade?: boolean;
  /**
   * Indicating whether or not to disable mixed audio.
   * @default false
   */
  focus?: boolean;
}

export interface PreloadOptions {
  /**
   * The path to the audio asset.
   * Set {@link isUrl} to true if you provide a file:// URL.
   * For Android, this could also be in the format `android.resource://<package_name>/raw/<asset_name>`.
   * Otherwise, assumes this is a relative path according to the platform assets directory by default.
   */
  assetPath: string;
  /**
   * The arbitrary unique identifier for the audio asset to be used for calls like {@link NativeAudio#play}.
   * e.g. `{ assetId: 'sound', assetPath: 'android.resource://com.example.app/raw/sound' }`
   */
  assetId: string;
  /**
   * The volume of the audio asset, from 0.0 to 1.0.
   * @default 1.0
   */
  volume?: number;
  audioChannelNum?: number;
  /**
   * WARNING: Should be called isFileUrl.
   * Use if you provide a file:// URL.
   */
  isUrl?: boolean;
}
