import { object, string, mixed, array, number } from "yup";
const validFileExtensions = [
  "jpg",
  "gif",
  "png",
  "jpeg",
  "pdf",
  "docx",
  "doc",
  "bpm",
  "tiff",
];
const MAX_FILE_SIZE = 102400000;

function isValidFileType(fileName: string): boolean {
  return (
    !!fileName &&
    validFileExtensions.indexOf(fileName.split(".").pop() || "") > -1
  );
}
export const useSubProcessValidation = () => {
  const { $t } = useNuxtApp();

  const schema = object({
    architecture_id: number().required().label($t("architecture_id")),
    process_id: number().required().label($t("process_id")),
    title: string().required().label($t("title")),
    code: string().required().label($t("code")),
    status: string().required().label($t("status")),
    description: string().nullable().label($t("description")),
    files: array()
      .required("حداقل یک فایل الزامی است.")
      .test(
        "fileSize",
        "اندازه هر یک از فایل ها نباید بیشتر از یک مگا بایت باشد.",
        (files) => {
          return files && files.every((file) => file.size <= MAX_FILE_SIZE); // max 5MB
        }
      )
      .test(
        "fileType",
        "فرمت فایل باید jpg، jpeg، png، bpm، tiff، gif، doc، docx و یا pdf باشد.",
        (files) => {
          return (
            files &&
            files.every((file) => isValidFileType(file.name.toLowerCase()))
          );
        }
      )
      .label($t("files")),
  });
  return { schema };
};
export const useEditSubProcessValidation = () => {
  const { $t } = useNuxtApp();

  const schema = object({
    architecture_id: number().required().label($t("architecture_id")),
    process_id: number().required().label($t("process_id")),
    title: string().required().label($t("title")),
    code: string().required().label($t("code")),
    status: string().required().label($t("status")),
    description: string().nullable().label($t("description")),
    files: array()
      .nullable()
      .test(
        "fileSize",
        "اندازه هر یک از فایل ها نباید بیشتر از یک مگا بایت باشد.",
        (files) => {
          if (!files || files.length === 0) return true;
          return files && files.every((file) => file.size <= MAX_FILE_SIZE); // max 5MB
        }
      )
      .test(
        "fileType",
        "فرمت فایل باید jpg، jpeg، png، bpm، tiff، gif، doc، docx و یا pdf باشد.",
        (files) => {
          if (!files || files.length === 0) return true;
          return (
            files &&
            files.every((file) => isValidFileType(file.name.toLowerCase()))
          );
        }
      )
      .label($t("files")),
    fileIdsForDelete: mixed(),
  });
  return { schema };
};
export const useSubProcessFilter = () => {
  const { $t } = useNuxtApp();

  const schema = object({
    search: string().required("${path} وارد نشده است.").label($t("search")),
  });
  return { schema };
};
