// src/components/pages/admin/sensors/edit-sensor-header-section.tsx
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
import { Sensor } from "@/types/sensor";

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

import { useDeleteSensor } from "@/hooks/use-sensors";

interface EditSensorHeaderSectionProps {
  isLoading: boolean;
  sensorId: number | string;
  sensor: Sensor;
}

export function EditSensorHeaderSection({
  isLoading,
  sensorId,
  sensor,
}: EditSensorHeaderSectionProps) {
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];
  const router = useRouter();

  const { mutate: deleteSensorMutation, isPending: isDeletingSensor } =
    useDeleteSensor();

  const canEditSensor = userGroups.some((group) =>
    APP_ROUTES.ADMIN.SENSORS.roles?.includes(group as string),
  );
  const canDeleteSensor = userGroups.some((group) =>
    APP_ROUTES.ADMIN.SENSORS.roles?.includes(group as string),
  );

  const handleDeleteSensor = async () => {
    if (!sensor || !sensor.id) {
      toast.error(
        APP_TEXT.COMMON_UI.DELETE_ERROR_MESSAGE ||
          "ID do sensor não encontrado para exclusão.",
      );
      return;
    }
    try {
      deleteSensorMutation(sensor.id);
      toast.info(
        APP_TEXT.COMMON_UI.DELETING_LOADING_MESSAGE || "Excluindo sensor...",
      );
      router.push(APP_ROUTES.ADMIN.SENSORS.LIST);
    } catch (error: any) {
      console.error("Erro ao tentar deletar sensor:", error);
      toast.error(
        error.message ||
          APP_TEXT.COMMON_UI.DELETE_ERROR_MESSAGE ||
          "Erro ao excluir sensor.",
      );
    }
  };

  const pageTitle =
    APP_TEXT.SENSORS_PAGE.EDIT_SENSOR_TITLE || `Editar Sensor: ${sensor.model}`;
  const pageDescription =
    APP_TEXT.SENSORS_PAGE.EDIT_SENSOR_DESCRIPTION ||
    "Atualize as informações do sensor.";

  return (
    <div className="flex items-center gap-4">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => router.back()}
        disabled={isLoading || isDeletingSensor}
      >
        <ArrowLeft className="h-4 w-4" />
      </Button>
      <div className="flex-1">
        <h1 className="text-3xl font-bold tracking-tight">
          {pageTitle}
          <span className="text-muted-foreground ml-2">({sensor.model})</span>
        </h1>
        <p className="text-muted-foreground">{pageDescription}</p>
      </div>
      <div className="flex gap-2">
        {sensorId && sensor && canEditSensor && (
          <Link href={APP_ROUTES.ADMIN.SENSORS.DETAIL(sensorId)}>
            <Button variant="outline" disabled={isLoading || isDeletingSensor}>
              <Edit className="h-4 w-4 mr-2" />
              {APP_TEXT.COMMON_UI.EDIT_BUTTON || "Editar"}
            </Button>
          </Link>
        )}
        {sensorId && sensor && canDeleteSensor && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                variant="destructive"
                disabled={isLoading || isDeletingSensor}
              >
                {isDeletingSensor ? (
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
                    sensor.model,
                  ) ||
                    `Esta ação excluirá o sensor ${sensor.model}. Você não poderá desfazê-la.`}
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel disabled={isLoading || isDeletingSensor}>
                  {APP_TEXT.COMMON_UI.CANCEL_BUTTON || "Cancelar"}
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={handleDeleteSensor}
                  className="bg-red-500 hover:bg-red-600"
                  disabled={isLoading || isDeletingSensor}
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
