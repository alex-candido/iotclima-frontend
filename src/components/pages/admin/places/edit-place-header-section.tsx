// src/components/pages/admin/places/edit-place-header-section.tsx
'use client';

import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Edit } from "lucide-react";
import { useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import { APP_TEXT } from "@/data/ui-content";
import { APP_ROUTES } from "@/data/routes";
import { UserGroup } from "@/types/next-auth";
import { Place } from "@/types/place";


interface EditPlaceHeaderSectionProps {
  isLoading: boolean;
  placeId: number | string;
  place: Place;
}

export function EditPlaceHeaderSection({ isLoading, placeId, place }: EditPlaceHeaderSectionProps) {
  const { data: session } = useSession();
  const userGroups: UserGroup[] = (session?.user?.groupNames as UserGroup[]) || [];
  const router = useRouter();

  const canEditPlace = userGroups.some(group => APP_ROUTES.ADMIN.PLACES.roles?.includes(group as string));

  const pageTitle = APP_TEXT.PLACES_PAGE.EDIT_PLACE_TITLE || `Editar Local: ${place.properties.name}`;
  const pageDescription = APP_TEXT.PLACES_PAGE.EDIT_PLACE_DESCRIPTION || "Atualize as informações do local.";

  return (
    <div className="flex items-center gap-4">
      <Button variant="ghost" size="icon" onClick={() => router.back()} disabled={isLoading}>
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight">{pageTitle}
          <span className="text-muted-foreground ml-2">({place.properties.name})</span>
        </h1>
        <p className="text-muted-foreground">{pageDescription}</p>
      </div>
      <div className="flex gap-2">
        {placeId && place && (
          <Link href={APP_ROUTES.ADMIN.PLACES.DETAIL(placeId)}>
            <Button variant="outline" disabled={isLoading}>
              <Edit className="h-4 w-4 mr-2" />
              {APP_TEXT.COMMON_UI.VIEW_DETAILS_BUTTON || "Ver Detalhes"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
