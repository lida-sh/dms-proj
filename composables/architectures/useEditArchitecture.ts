import { useEditArchitectureService } from "~/composables/architectures/useArchitecture.service";

import { ToastEnum } from "~/types";
import { type FormActions } from "vee-validate";

export const useEditArchitecture = (id:number,fileIdsForDelete:number[]) => {
  const loading = ref<boolean>(false);
  const editArchitecture = useEditArchitectureService(id);
  const { showToast } = useToast();
  const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    // console.log("values are",values);
    loading.value = true;
    editArchitecture({...values, fileIdsForDelete}, { setErrors })
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
