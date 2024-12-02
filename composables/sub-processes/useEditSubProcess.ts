import { useEditProcessService } from "~/composables/processes/useProcess.service";

import { ToastEnum } from "~/types";
import { type FormActions } from "vee-validate";
import { useEditSubProcessService } from "./useSubProcess.service";

export const useEditSubProcess = (id:number,fileIdsForDelete:number[]) => {
  const loading = ref<boolean>(false);
  const editSubProcess = useEditSubProcessService(id);
  const { showToast } = useToast();
  const submit = (values, { setErrors, resetForm }: FormActions<any>) => {
    // console.log("values are",values);
    loading.value = true;
    editSubProcess({...values, fileIdsForDelete}, { setErrors })
      .then((res) => {
        if (res !== undefined) {
          showToast({
            message: "فرایند موردنظر ویرایش شد.",
            type: ToastEnum.success,
          });
          resetForm();
          return navigateTo("/admin/sub-processes")
        }
      })
      .finally(() => {
        loading.value = false;
      });
  };
  return { submit, loading };
};
