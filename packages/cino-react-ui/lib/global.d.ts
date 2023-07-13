/// <reference types="vite/client" />

type StoreValue = any; // eslint-disable-line @typescript-eslint/no-explicit-any

// resource
declare module '*.png';
declare module '*.jpg';
declare module '*.svg';
declare module '*.jpeg';
declare module '*.gif';
declare module '*.webp';
declare module '*.ttf';
declare module '*.woff';
declare module '*.woff2';
declare module '*.scss';
declare module '*.less';
declare module '*.css';

type SizeType = {
    width: number;
    height: number;
  };
  