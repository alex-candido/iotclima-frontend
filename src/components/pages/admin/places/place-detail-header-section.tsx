// src/components/pages/admin/places/place-detail-header-section.tsx
"use client";

import { ArrowLeft, Edit, Loader2, Plus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { UserGroup } from "@/types/next-auth";
import { Place } from "@/types/place";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface PlaceDetailHeaderSectionProps {
  isLoading: boolean;
  placeId: number | string;
  place: Place;
}

export function PlaceDetailHeaderSection({
  isLoading,
  placeId,
  place,
}: PlaceDetailHeaderSectionProps) {
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];
  const router = useRouter();

  const requiredRolesForNewPlace = APP_ROUTES.ADMIN.PLACES.roles || [];
  const canCreatePlace = userGroups.some((group) =>
    requiredRolesForNewPlace.includes(group),
  );

  const canEditPlace = userGroups.some((group) =>
    APP_ROUTES.ADMIN.PLACES.roles?.includes(group as string),
  );
  const canDeletePlace = userGroups.some((group) =>
    APP_ROUTES.ADMIN.PLACES.roles?.includes(group as string),
  );

  const isDeletingPlace = false;

  const handleDeletePlace = async () => {
    if (!place || !place.id) {
      toast.error(
        APP_TEXT.COMMON_UI.DELETE_ERROR_MESSAGE ||
          "ID do local não encontrado para exclusão.",
      );
      return;
    }
    try {
      toast.info(
        APP_TEXT.COMMON_UI.DELETING_LOADING_MESSAGE || "Excluindo local...",
      );
      router.push(APP_ROUTES.ADMIN.PLACES.LIST);
    } catch (error: any) {
      console.error("Erro ao tentar deletar local:", error);
      toast.error(
        error.message ||
          APP_TEXT.COMMON_UI.DELETE_ERROR_MESSAGE ||
          "Erro ao excluir local.",
      );
    }
  };

  const pageTitle = place
    ? APP_TEXT.PLACES_PAGE.DETAIL_TITLE ||
      `Detalhes do Local: ${place.properties.name}`
    : APP_TEXT.ADMIN_LAYOUT.PLACES_LINK || "Locais";
  const pageDescription = place
    ? APP_TEXT.PLACES_PAGE.DETAIL_DESCRIPTION ||
      "Informações detalhadas do local."
    : APP_TEXT.ADMIN_LAYOUT.PLACES_DESCRIPTION ||
      "Gerencie os locais de instalação das estações.";

  if (!placeId && !place) {
    return (
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {APP_TEXT.ADMIN_LAYOUT.PLACES_LINK || "Locais"}
          </h1>
          <p className="text-muted-foreground">
            {APP_TEXT.ADMIN_LAYOUT.PLACES_DESCRIPTION ||
              "Gerencie os locais de instalação das estações."}
          </p>
        </div>
        {canCreatePlace && (
          <Link href={APP_ROUTES.ADMIN.PLACES.NEW}>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              {APP_TEXT.ADMIN_LAYOUT.NEW_PLACE_BUTTON || "Novo Local"}
            </Button>
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        disabled={isLoading || isDeletingPlace}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight">{pageTitle}</h1>
        <p className="text-muted-foreground">{pageDescription}</p>
      </div>
      <div className="flex gap-2">
        {placeId && place && canEditPlace && (
          <Link href={APP_ROUTES.ADMIN.PLACES.EDIT(placeId)}>
            <Button variant="outline" disabled={isLoading || isDeletingPlace}>
              <Edit className="h-4 w-4 mr-2" />
              {APP_TEXT.COMMON_UI.EDIT_BUTTON || "Editar"}
            </Button>
          </Link>
        )}
        {placeId && place && canDeletePlace && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                disabled={isLoading || isDeletingPlace}
              >
                {isDeletingPlace ? (
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                ) : (
                  <Trash2 className="h-4 w-4 mr-2" />
                )}
                {APP_TEXT.COMMON_UI.DELETE_BUTTON || "Excluir"}
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  {APP_TEXT.COMMON_UI.DELETE_CONFIRM_TITLE || "Tem certeza?"}
                </AlertDialogTitle>
                <AlertDialogDescription>
                  {APP_TEXT.COMMON_UI.DELETE_CONFIRM_DESCRIPTION(
                    place.properties.name,
                  ) ||
                    `Esta ação excluirá o local ${place.properties.name}. Você não poderá desfazê-la.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isLoading || isDeletingPlace}>
                  {APP_TEXT.COMMON_UI.CANCEL_BUTTON || "Cancelar"}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeletePlace}
                  className="bg-red-500 hover:bg-red-600"
                  disabled={isLoading || isDeletingPlace}
                >
                  {APP_TEXT.COMMON_UI.DELETE_BUTTON || "Deletar"}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}
