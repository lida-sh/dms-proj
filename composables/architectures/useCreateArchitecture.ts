import { useCreateArchitectureService } from "~/composables/architectures/useArchitecture.service";

import { ToastEnum } from "~/types";
import { type FormActions } from "vee-validate";

export const useCreateArchitecture = () => {
  const loading = ref<boolean>(false);
  const createArchitecture = useCreateArchitectureService();
  const { showToast } = useToast();
  const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    console.log("values are",values);
    loading.value = true;
    createArchitecture(values, { setErrors })
      .then((res) => {
        if (res !== undefined) {
          showToast({
            message: "معماری جدید ایجاد شد.",
            type: ToastEnum.success,
          });
          resetForm();
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  return { submit, loading };
};
