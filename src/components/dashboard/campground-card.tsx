import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import type { Campground } from "@/types/database";

interface CampgroundCardProps {
  campground: Campground;
}

export function CampgroundCard({ campground }: CampgroundCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-semibold flex items-center gap-2">
              🏕️ {campground.name}
            </h2>
            <p className="text-gray-600 mt-1">
              {campground.street_address}, {campground.city},{" "}
              {campground.state} {campground.zip_code}
            </p>
            {campground.phone && (
              <p className="text-gray-500 text-sm mt-1">{campground.phone}</p>
            )}
            {campground.website && (
              <a
                href={campground.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 text-sm hover:underline"
              >
                {campground.website}
              </a>
            )}
          </div>
          <Link href="/dashboard/campground">
            <Button variant="outline">Edit Info</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
