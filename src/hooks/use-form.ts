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
    let message = API_MESSAGES.COMMON.GENERIC_API_ERROR;

    if (typeof err?.message === "string") {
      message = err.message;
    } else if (typeof err?.message === "object") {
      message = JSON.stringify(err.message);
    }

    setFormError("root", { type: "manual", message });
    setApiError(message);
    onError?.(new Error(message), data);
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
