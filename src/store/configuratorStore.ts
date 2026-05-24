import { create } from 'zustand';
import { MatConfig, MatType, MatPlacement, MatOrientation, BorderOption } from '@/types';

interface ConfiguratorStore extends MatConfig {
  quantity: number;
  isCompany: boolean;
  approved: boolean;
  aiPreviewUrl: string | null;

  setType: (type: MatType) => void;
  setPlacement: (placement: MatPlacement) => void;
  setOrientation: (orientation: MatOrientation) => void;
  setBorder: (border: BorderOption) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  setMatColor: (color: string) => void;
  setLogoColor: (color: string) => void;
  setLogoFile: (file: File | null, url: string | null) => void;
  setLogoScale: (scale: number) => void;
  setLogoPosition: (x: number, y: number) => void;
  setQuantity: (quantity: number) => void;
  setIsCompany: (isCompany: boolean) => void;
  setApproved: (approved: boolean) => void;
  setAiPreviewUrl: (url: string | null) => void;
  reset: () => void;
}

const defaultConfig: MatConfig = {
  type: 'indoor',
  placement: 'on_floor',
  orientation: 'landscape',
  border: 'without_border',
  width: 80,
  height: 120,
  matColor: '#000000',
  logoColor: '#FFFFFF',
  logoFile: null,
  logoUrl: null,
  logoScale: 1,
  logoX: 50,
  logoY: 50,
};

export const useConfiguratorStore = create<ConfiguratorStore>((set) => ({
  ...defaultConfig,
  quantity: 1,
  isCompany: false,
  approved: false,
  aiPreviewUrl: null,

  setType: (type) => set({ type }),
  setPlacement: (placement) => set({ placement }),
  setOrientation: (orientation) => set({ orientation }),
  setBorder: (border) => set({ border }),
  setWidth: (width) => set({ width }),
  setHeight: (height) => set({ height }),
  setMatColor: (matColor) => set({ matColor }),
  setLogoColor: (logoColor) => set({ logoColor }),
  setLogoFile: (logoFile, logoUrl) => set({ logoFile, logoUrl }),
  setLogoScale: (logoScale) => set({ logoScale }),
  setLogoPosition: (logoX, logoY) => set({ logoX, logoY }),
  setQuantity: (quantity) => set({ quantity }),
  setIsCompany: (isCompany) => set({ isCompany }),
  setApproved: (approved) => set({ approved }),
  setAiPreviewUrl: (aiPreviewUrl) => set({ aiPreviewUrl }),
  reset: () => set({ ...defaultConfig, quantity: 1, isCompany: false, approved: false, aiPreviewUrl: null }),
}));
