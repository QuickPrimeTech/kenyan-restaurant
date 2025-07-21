// components/reservations/steps/table-selection-step.tsx

"use client";

import Image from "next/image";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  Trees,
  Home,
  Crown,
  Users,
  MapPin,
  Check,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import type { ReservationData } from "@/types/reservations";

interface TableSelectionStepProps {
  data: ReservationData;
  onUpdate: (data: Partial<ReservationData>) => void;
}

const diningAreas = [
  {
    id: "indoor",
    name: "Indoor Dining",
    icon: Home,
    description: "Climate-controlled comfort with elegant ambiance",
    image: "/placeholder.svg?height=360&width=640&text=Indoor+Dining",
    images: [
      "/placeholder.svg?height=360&width=640&text=Indoor+Dining+1",
      "/placeholder.svg?height=360&width=640&text=Indoor+Dining+2",
      "/placeholder.svg?height=360&width=640&text=Indoor+Dining+3",
    ],
  },
  {
    id: "outdoor",
    name: "Outdoor Terrace",
    icon: Trees,
    description: "Al fresco dining with garden views",
    image: "/placeholder.svg?height=360&width=640&text=Outdoor+Terrace",
    images: [
      "/placeholder.svg?height=360&width=640&text=Outdoor+Terrace+1",
      "/placeholder.svg?height=360&width=640&text=Outdoor+Terrace+2",
      "/placeholder.svg?height=360&width=640&text=Outdoor+Terrace+3",
    ],
  },
  {
    id: "private",
    name: "Private Dining",
    icon: Crown,
    description: "Exclusive rooms for intimate gatherings",
    image: "/placeholder.svg?height=360&width=640&text=Private+Dining",
    images: [
      "/placeholder.svg?height=360&width=640&text=Private+Dining+1",
      "/placeholder.svg?height=360&width=640&text=Private+Dining+2",
      "/placeholder.svg?height=360&width=640&text=Private+Dining+3",
    ],
  },
];

const tables = {
  indoor: [
    {
      id: "indoor-1",
      name: "Window Table 1",
      capacity: 2,
      features: ["Window view", "Romantic lighting"],
      image: "/placeholder.svg?height=270&width=480&text=Window+Table+1",
      available: true,
    },
    {
      id: "indoor-2",
      name: "Central Table 5",
      capacity: 4,
      features: ["Central location", "Great for groups"],
      image: "/placeholder.svg?height=270&width=480&text=Central+Table+5",
      available: true,
    },
    {
      id: "indoor-3",
      name: "Corner Booth 3",
      capacity: 6,
      features: ["Privacy", "Comfortable seating"],
      image: "/placeholder.svg?height=270&width=480&text=Corner+Booth+3",
      available: false,
    },
    {
      id: "indoor-4",
      name: "Bar Counter",
      capacity: 2,
      features: ["Chef's view", "Interactive dining"],
      image: "/placeholder.svg?height=270&width=480&text=Bar+Counter",
      available: true,
    },
  ],
  outdoor: [
    {
      id: "outdoor-1",
      name: "Garden View 1",
      capacity: 2,
      features: ["Garden view", "Fresh air"],
      image: "/placeholder.svg?height=270&width=480&text=Garden+View+1",
      available: true,
    },
    {
      id: "outdoor-2",
      name: "Terrace Table 4",
      capacity: 4,
      features: ["City view", "Sunset dining"],
      image: "/placeholder.svg?height=270&width=480&text=Terrace+Table+4",
      available: true,
    },
    {
      id: "outdoor-3",
      name: "Pergola Seating",
      capacity: 8,
      features: ["Covered area", "Group dining"],
      image: "/placeholder.svg?height=270&width=480&text=Pergola+Seating",
      available: true,
    },
  ],
  private: [
    {
      id: "private-1",
      name: "Executive Room",
      capacity: 8,
      features: ["Private room", "Business amenities"],
      image: "/placeholder.svg?height=270&width=480&text=Executive+Room",
      available: true,
    },
    {
      id: "private-2",
      name: "Celebration Suite",
      capacity: 12,
      features: ["Private room", "Party setup"],
      image: "/placeholder.svg?height=270&width=480&text=Celebration+Suite",
      available: true,
    },
  ],
};

export function TableSelectionStep({
  data,
  onUpdate,
}: TableSelectionStepProps) {
  const [selectedArea, setSelectedArea] = useState<
    "indoor" | "outdoor" | "private"
  >(data.diningArea);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedAreaForImages, setSelectedAreaForImages] = useState<
    (typeof diningAreas)[0] | null
  >(null);

  const handleAreaSelect = (area: "indoor" | "outdoor" | "private") => {
    setSelectedArea(area);
    onUpdate({ diningArea: area, tableId: "", tableName: "" });
  };

  const handleTableSelect = (tableId: string, tableName: string) => {
    onUpdate({ tableId, tableName });
  };

  const handleImageClick = (area: (typeof diningAreas)[0]) => {
    setSelectedAreaForImages(area);
    setCurrentImageIndex(0);
    setShowImageDialog(true);
  };

  const nextImage = () => {
    if (selectedAreaForImages) {
      setCurrentImageIndex(
        (prev) => (prev + 1) % selectedAreaForImages.images.length
      );
    }
  };

  const prevImage = () => {
    if (selectedAreaForImages) {
      setCurrentImageIndex(
        (prev) =>
          (prev - 1 + selectedAreaForImages.images.length) %
          selectedAreaForImages.images.length
      );
    }
  };

  const availableTables = tables[selectedArea].filter(
    (table) => table.available && table.capacity >= data.partySize
  );

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
          Choose your perfect spot
        </h2>
        <p className="text-sm sm:text-base text-gray-600">
          Select your preferred dining area and table
        </p>
      </div>

      {/* Dining Area Selection */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          Dining Area
        </h3>

        {/* Desktop Grid */}
        <div className="hidden sm:grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
          {diningAreas.map((area) => {
            const Icon = area.icon;
            return (
              <Card
                key={area.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  selectedArea === area.id
                    ? "ring-2 ring-primary border-primary"
                    : ""
                }`}
              >
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="relative aspect-video overflow-hidden rounded-md">
                    <Image
                      src={area.image || "/placeholder.svg"}
                      alt={area.name}
                      fill
                      className="object-cover cursor-pointer transition-transform hover:scale-105"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleImageClick(area);
                      }}
                    />
                    {selectedArea === area.id && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4">
                  <CardTitle className="flex items-center gap-2 text-sm sm:text-base mb-2">
                    <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    {area.name}
                  </CardTitle>
                  <CardDescription className="text-xs sm:text-sm mb-3">
                    {area.description}
                  </CardDescription>
                  <Button
                    size="sm"
                    variant={selectedArea === area.id ? "default" : "outline"}
                    onClick={() =>
                      handleAreaSelect(
                        area.id as "indoor" | "outdoor" | "private"
                      )
                    }
                    className="w-full"
                  >
                    {selectedArea === area.id ? "Selected" : "Select Area"}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mobile Carousel */}
        <div className="sm:hidden">
          <Carousel className="w-full max-w-sm mx-auto">
            <CarouselContent>
              {diningAreas.map((area) => {
                const Icon = area.icon;
                return (
                  <CarouselItem key={area.id}>
                    <Card
                      className={`transition-all duration-200 hover:shadow-lg ${
                        selectedArea === area.id
                          ? "ring-2 ring-primary border-primary"
                          : ""
                      }`}
                    >
                      <CardHeader className="pb-2">
                        <div className="relative aspect-video overflow-hidden rounded-md">
                          <Image
                            src={area.image || "/placeholder.svg"}
                            alt={area.name}
                            fill
                            className="object-cover cursor-pointer transition-transform hover:scale-105"
                            onClick={() => handleImageClick(area)}
                          />
                          {selectedArea === area.id && (
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                              <Check className="h-4 w-4" />
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-3">
                        <CardTitle className="flex items-center gap-2 text-base mb-2">
                          <Icon className="h-5 w-5" />
                          {area.name}
                        </CardTitle>
                        <CardDescription className="text-sm mb-3">
                          {area.description}
                        </CardDescription>
                        <Button
                          size="sm"
                          variant={
                            selectedArea === area.id ? "default" : "outline"
                          }
                          onClick={() =>
                            handleAreaSelect(
                              area.id as "indoor" | "outdoor" | "private"
                            )
                          }
                          className="w-full"
                        >
                          {selectedArea === area.id
                            ? "Selected"
                            : "Select Area"}
                        </Button>
                      </CardContent>
                    </Card>
                  </CarouselItem>
                );
              })}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>

      {/* Table Selection */}
      <div>
        <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          Available Tables
        </h3>
        {availableTables.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {availableTables.map((table) => (
              <Card
                key={table.id}
                className={`transition-all duration-200 hover:shadow-lg ${
                  data.tableId === table.id
                    ? "ring-2 ring-primary border-primary"
                    : ""
                }`}
              >
                <CardHeader className="pb-2 sm:pb-3">
                  <div className="relative aspect-video overflow-hidden rounded-md">
                    <Image
                      src={table.image || "/placeholder.svg"}
                      alt={table.name}
                      fill
                      className="object-cover"
                    />
                    {data.tableId === table.id && (
                      <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
                        <Check className="h-4 w-4" />
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="p-3 sm:p-4">
                  <div className="flex items-center justify-between mb-1 sm:mb-2">
                    <CardTitle className="text-sm sm:text-base">
                      {table.name}
                    </CardTitle>
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1 text-xs"
                    >
                      <Users className="h-3 w-3" />
                      {table.capacity}
                    </Badge>
                  </div>
                  <div className="space-y-1 mb-3">
                    {table.features.map((feature, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600"
                      >
                        <MapPin className="h-3 w-3" />
                        {feature}
                      </div>
                    ))}
                  </div>
                  <Button
                    size="sm"
                    variant={data.tableId === table.id ? "default" : "outline"}
                    onClick={() => handleTableSelect(table.id, table.name)}
                    className="w-full"
                  >
                    {data.tableId === table.id ? "Selected" : "Select Table"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-6 sm:py-8">
            <CardContent>
              <Users className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-3 sm:mb-4 text-gray-400" />
              <h3 className="font-semibold text-gray-900 mb-2">
                No Available Tables
              </h3>
              <p className="text-gray-600 text-sm sm:text-base">
                No tables are available in this area for a party of{" "}
                {data.partySize}. Please try a different area or adjust your
                party size.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Selected Table Summary */}
      {data.tableId && data.tableName && (
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-4 sm:pt-6 p-3 sm:p-4">
            <div className="text-center">
              <h3 className="font-semibold text-green-900 mb-2">
                Selected Table
              </h3>
              <p className="text-green-800 text-sm sm:text-base">
                <span className="font-medium">{data.tableName}</span>
                {" in "}
                <span className="font-medium">
                  {diningAreas.find((area) => area.id === selectedArea)?.name}
                </span>
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Image Gallery Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="max-w-4xl w-full h-[80vh] p-0">
          <DialogHeader className="p-4 pb-0">
            <DialogTitle className="flex items-center justify-between">
              <span>{selectedAreaForImages?.name}</span>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowImageDialog(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </DialogTitle>
          </DialogHeader>

          {selectedAreaForImages && (
            <div className="relative flex-1 flex items-center justify-center p-4">
              <div className="relative aspect-video w-full max-w-3xl">
                <Image
                  src={
                    selectedAreaForImages.images[currentImageIndex] ||
                    "/placeholder.svg"
                  }
                  alt={`${selectedAreaForImages.name} ${currentImageIndex + 1}`}
                  fill
                  className="object-contain rounded-lg"
                />
              </div>

              {/* Navigation Buttons */}
              <Button
                variant="outline"
                size="icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm"
                onClick={prevImage}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm"
                onClick={nextImage}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>

              {/* Image Counter */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                {currentImageIndex + 1} / {selectedAreaForImages.images.length}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
