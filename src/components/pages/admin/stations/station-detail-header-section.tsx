// src/components/pages/admin/stations/station-detail-header-section.tsx
"use client";

import { ArrowLeft, Edit, Loader2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { UserGroup } from "@/types/next-auth";
import { Station } from "@/types/station";

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

import { useDeleteStation } from "@/hooks/use-stations";

interface StationDetailHeaderSectionProps {
  isLoading: boolean;
  stationId: number | string;
  station: Station;
}

export function StationDetailHeaderSection({
  isLoading,
  stationId,
  station,
}: StationDetailHeaderSectionProps) {
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];
  const router = useRouter();

  const { mutate: deleteStationMutation, isPending: isDeletingStation } =
    useDeleteStation();

  const canEditStation = userGroups.some((group) =>
    APP_ROUTES.ADMIN.STATIONS.roles?.includes(group as string),
  );
  const canDeleteStation = userGroups.some((group) =>
    APP_ROUTES.ADMIN.STATIONS.roles?.includes(group as string),
  );

  const handleDeleteStation = async () => {
    if (!station || !station.id) {
      toast.error(
        APP_TEXT.COMMON_UI.DELETE_ERROR_MESSAGE ||
          "ID da estação não encontrado para exclusão.",
      );
      return;
    }
    try {
      deleteStationMutation(station.id);
      toast.info(
        APP_TEXT.COMMON_UI.DELETING_LOADING_MESSAGE || "Excluindo estação...",
      );
      router.push(APP_ROUTES.ADMIN.STATIONS.LIST);
    } catch (error: any) {
      console.error("Erro ao tentar deletar estação:", error);
      toast.error(
        error.message ||
          APP_TEXT.COMMON_UI.DELETE_ERROR_MESSAGE ||
          "Erro ao excluir estação.",
      );
    }
  };

  const pageTitle =
    APP_TEXT.STATIONS_PAGE.DETAIL_TITLE ||
    `Detalhes da Estação: ${station.name}`;
  const pageDescription =
    APP_TEXT.STATIONS_PAGE.DETAIL_DESCRIPTION ||
    "Informações detalhadas da estação meteorológica.";

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        disabled={isLoading || isDeletingStation}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {pageTitle}
          <span className="text-muted-foreground ml-2">({station.name})</span>
        </h1>
        <p className="text-muted-foreground">{pageDescription}</p>
      </div>
      <div className="flex gap-2">
        {stationId && station && canEditStation && (
          <Link href={APP_ROUTES.ADMIN.STATIONS.EDIT(stationId)}>
            <Button variant="outline" disabled={isLoading || isDeletingStation}>
              <Edit className="h-4 w-4 mr-2" />
              {APP_TEXT.COMMON_UI.EDIT_BUTTON || "Editar"}
            </Button>
          </Link>
        )}
        {stationId && station && canDeleteStation && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                disabled={isLoading || isDeletingStation}
              >
                {isDeletingStation ? (
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
                    station.name,
                  ) ||
                    `Esta ação excluirá a estação ${station.name}. Você não poderá desfazê-la.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isLoading || isDeletingStation}>
                  {APP_TEXT.COMMON_UI.CANCEL_BUTTON || "Cancelar"}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteStation}
                  className="bg-red-500 hover:bg-red-600"
                  disabled={isLoading || isDeletingStation}
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
