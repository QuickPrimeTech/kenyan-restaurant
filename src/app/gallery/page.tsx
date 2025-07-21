import GalleryHeader from "@/sections/gallery/GalleryHeader";
import GalleryFilters from "@/sections/gallery/GalleryFilters";
import CTA from "@/components/cta";

export default function GalleryPage() {
  return (
    <>
      <GalleryHeader />
      <GalleryFilters />
      <CTA className="mb-12" />
    </>
  );
}
