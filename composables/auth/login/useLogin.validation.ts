import { string, object } from "yup";
export const useLoginValidation = () => {
  const { $t } = useNuxtApp();
  const schema = object({
    username: string().required().label($t("username")),
    password: string().required().label($t("password")),
  });
  return {schema}
};
