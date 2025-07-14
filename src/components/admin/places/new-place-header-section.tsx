// src/components/pages/admin/places/new-place-header-section.tsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { UserGroup } from "@/types/next-auth";

interface NewPlaceHeaderSectionProps {
  isLoading: boolean;
}

export function NewPlaceHeaderSection({
  isLoading,
}: NewPlaceHeaderSectionProps) {
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];
  const router = useRouter();

  const requiredRolesForNewPlace = APP_ROUTES.ADMIN.PLACES.roles || [];

  const canCreatePlace = userGroups.some((group) =>
    requiredRolesForNewPlace.includes(group),
  );

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        disabled={isLoading}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {APP_TEXT.PLACES_PAGE.NEW_PLACE_TITLE || "Novo Local"}
        </h1>
        <p className="text-muted-foreground">
          {APP_TEXT.PLACES_PAGE.NEW_PLACE_DESCRIPTION ||
            "Adicione um novo local ao sistema"}
        </p>
      </div>
    </div>
  );
}
