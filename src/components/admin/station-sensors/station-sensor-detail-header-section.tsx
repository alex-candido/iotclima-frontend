// src/components/pages/admin/station-sensors/station-sensor-detail-header-section.tsx
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
import { StationSensor } from "@/types/station-sensor";

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

import { useDeleteStationSensor } from "@/hooks/use-station-sensor";

interface StationSensorDetailHeaderSectionProps {
  isLoading: boolean;
  stationSensorId: number | string;
  stationSensor: StationSensor;
}

export function StationSensorDetailHeaderSection({
  isLoading,
  stationSensorId,
  stationSensor,
}: StationSensorDetailHeaderSectionProps) {
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];
  const router = useRouter();

  const {
    mutate: deleteStationSensorMutation,
    isPending: isDeletingStationSensor,
  } = useDeleteStationSensor();

  const canEditStationSensor = userGroups.some((group) =>
    APP_ROUTES.ADMIN.STATION_SENSORS.roles?.includes(group as string),
  );
  const canDeleteStationSensor = userGroups.some((group) =>
    APP_ROUTES.ADMIN.STATION_SENSORS.roles?.includes(group as string),
  );

  const handleDeleteStationSensor = async () => {
    if (!stationSensor || !stationSensor.id) {
      toast.error(
        APP_TEXT.COMMON_UI.DELETE_ERROR_MESSAGE ||
          "ID do vínculo não encontrado para exclusão.",
      );
      return;
    }
    try {
      deleteStationSensorMutation(stationSensor.id);
      toast.info(
        APP_TEXT.COMMON_UI.DELETING_LOADING_MESSAGE || "Excluindo vínculo...",
      );
      router.push(APP_ROUTES.ADMIN.STATION_SENSORS.LIST);
    } catch (error: any) {
      console.error("Erro ao tentar deletar vínculo:", error);
      toast.error(
        error.message ||
          APP_TEXT.COMMON_UI.DELETE_ERROR_MESSAGE ||
          "Erro ao excluir vínculo.",
      );
    }
  };

  const pageTitle =
    APP_TEXT.STATION_SENSORS_PAGE.DETAIL_TITLE ||
    `Detalhes do Vínculo: ${stationSensor.station_name} - ${stationSensor.sensor_model}`;
  const pageDescription =
    APP_TEXT.STATION_SENSORS_PAGE.DETAIL_DESCRIPTION ||
    "Informações detalhadas do vínculo estação-sensor.";

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        disabled={isLoading || isDeletingStationSensor}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {pageTitle}
          <span className="text-muted-foreground ml-2">
            ({stationSensor.sensor_model})
          </span>
        </h1>
        <p className="text-muted-foreground">{pageDescription}</p>
      </div>
      <div className="flex gap-2">
        {stationSensorId && stationSensor && canEditStationSensor && (
          <Link href={APP_ROUTES.ADMIN.STATION_SENSORS.EDIT(stationSensorId)}>
            <Button
              variant="outline"
              disabled={isLoading || isDeletingStationSensor}
            >
              <Edit className="h-4 w-4 mr-2" />
              {APP_TEXT.COMMON_UI.EDIT_BUTTON || "Editar"}
            </Button>
          </Link>
        )}
        {stationSensorId && stationSensor && canDeleteStationSensor && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                disabled={isLoading || isDeletingStationSensor}
              >
                {isDeletingStationSensor ? (
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
                    `${stationSensor.station_name} - ${stationSensor.sensor_model}`,
                  ) ||
                    `Esta ação excluirá o vínculo ${stationSensor.id}. Você não poderá desfazê-la.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel
                  disabled={isLoading || isDeletingStationSensor}
                >
                  {APP_TEXT.COMMON_UI.CANCEL_BUTTON || "Cancelar"}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteStationSensor}
                  className="bg-red-500 hover:bg-red-600"
                  disabled={isLoading || isDeletingStationSensor}
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
