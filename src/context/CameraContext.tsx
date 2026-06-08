import { createContext, useContext, useState, ReactNode } from "react";

type Photo = {
  uri: string;
  date: string;
};

type CameraContextType = {
  gallery: Photo[];
  addPhoto: (photo: Photo) => void;
  clearGallery: () => void;
};

const CameraContext = createContext<CameraContextType | null>(null);

export function CameraProvider({ children }: { children: ReactNode }) {
  const [gallery, setGallery] = useState<Photo[]>([]);

  function addPhoto(photo: Photo) {
    setGallery(current => [...current, photo]);
  }

  function clearGallery() {
    setGallery([]);
  }

  return (
    <CameraContext.Provider value={{ gallery, addPhoto, clearGallery }}>
      {children}
    </CameraContext.Provider>
  );
}

export function useCamera() {
  const context = useContext(CameraContext);
  if (!context) throw new Error("useCamera must be used within a CameraProvider");
  return context;
}