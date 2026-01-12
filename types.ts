export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface ChartData {
  name: string;
  value: number;
  color?: string;
  label?: string;
  fullValue?: number;
}

export interface TimelineItemData {
  id: number;
  title: string;
  side: 'left' | 'right';
}

export interface ImageGalleryItem {
  id: string;
  src: string;
  alt: string;
}