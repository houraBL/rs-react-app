export interface CharacterInfo {
  id: number;
  name: string;
  status?: string;
  species?: string;
  type?: string;
  gender?: string;
  origin?: locationUrl;
  location?: locationUrl;
  image?: string;
  episode?: string[];
  url?: string;
  created?: string;
}

interface locationUrl {
  name: string;
  url: string;
}
