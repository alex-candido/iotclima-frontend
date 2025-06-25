// src/components/pages/admin/sensors/new-sensor-header-section.tsx
"use client";

import { ArrowLeft } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/data/routes";
import { APP_TEXT } from "@/data/ui-content";
import { UserGroup } from "@/types/next-auth";

interface NewSensorHeaderSectionProps {
  isLoading: boolean; // Para desabilitar o botão "Voltar" durante a submissão
}

export function NewSensorHeaderSection({
  isLoading,
}: NewSensorHeaderSectionProps) {
  const { data: session } = useSession();
  const userGroups: UserGroup[] =
    (session?.user?.groupNames as UserGroup[]) || [];
  const router = useRouter();

  // Definir os roles necessários para criar um novo sensor
  const requiredRolesForNewSensor = APP_ROUTES.ADMIN.SENSORS.roles || [];

  // Verificar se o usuário autenticado possui algum dos roles necessários
  const canCreateSensor = userGroups.some((group) =>
    requiredRolesForNewSensor.includes(group),
  );

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
          {APP_TEXT.SENSORS_PAGE.NEW_SENSOR_TITLE || "Novo Sensor"}
        </h1>
        <p className="text-muted-foreground">
          {APP_TEXT.SENSORS_PAGE.NEW_SENSOR_DESCRIPTION ||
            "Adicione um novo sensor ao sistema."}
        </p>
      </div>
      {/* O botão "Novo Sensor" geralmente não fica na página de "Novo Sensor" */}
      {/* No entanto, se o design exigir, pode ser mantido condicionalmente. */}
      {/* {canCreateSensor && (
        <Link href={APP_ROUTES.ADMIN.SENSORS.NEW}>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            {APP_TEXT.SENSORS_PAGE.NEW_SENSOR_BUTTON || "Novo Sensor"}
          </Button>
        </Link>
      )} */}
    </div>
  );
}
