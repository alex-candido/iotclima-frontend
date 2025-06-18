import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { FieldValues, UseFormProps, useForm as useReactHookForm } from "react-hook-form";
import { ZodTypeAny } from "zod";

import { API_MESSAGES } from "@/data/messages";

interface AuthFormHookProps<TFormValues extends FieldValues, TApiResult> {
  schema: ZodTypeAny;
  mutationFn: (data: TFormValues) => Promise<TApiResult>;
  onSuccess?: (data: TApiResult, formValues: TFormValues) => void;
  onError?: (error: Error, formValues: TFormValues) => void;
  defaultValues?: UseFormProps<TFormValues>["defaultValues"];
}

export function useForm<TFormValues extends FieldValues, TApiResult>({
  schema,
  mutationFn,
  onSuccess,
  onError,
  defaultValues,
}: AuthFormHookProps<TFormValues, TApiResult>) {
  const form = useReactHookForm<TFormValues>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: "onBlur",
  });

  const {
    handleSubmit,
    register,
    control,
    formState: { isSubmitting, errors },
    setError: setFormError,
  } = form;

  const [apiError, setApiError] = useState<string | null>(null);

  const onSubmit = async (data: TFormValues) => {
    setApiError(null);
    setFormError("root", { type: "manual", message: "" });

    try {
      const result = await mutationFn(data);
      onSuccess?.(result, data);
    } catch (err: any) {
      console.error("API call error:", err);
      const finalError = err instanceof Error ? err : new Error(String(err));

      if (err?.response?.status === 400 && err?.response?.data) {
        Object.entries(err.response.data).forEach(([field, messages]) => {
          if (Array.isArray(messages)) {
            setFormError(field as any, {
              type: "manual",
              message: messages[0],
            });
          }
        });

        const msg =err.response.data.message || API_MESSAGES.COMMON.VALIDATION_ERROR;

        setFormError("root", { type: "manual", message: msg });
        setApiError(msg);
      } else {
        const msg = finalError.message || API_MESSAGES.COMMON.GENERIC_API_ERROR;

        setFormError("root", { type: "manual", message: msg });
        setApiError(msg);
      }

      onError?.(finalError, data);
    }
  };

  return {
    form,
    handleSubmit: handleSubmit(onSubmit),
    register,
    control,
    isSubmitting,
    errors,
    apiError,
  };
}
