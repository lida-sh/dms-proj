import type { InferType } from "yup";
import { useFetchApi } from "../api/useFetchApi";
import {
  useProceturesValidation,
  useEditProcetureValidation,
} from "./useProcetures.validation";
import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { serialize } from "object-to-formdata";
import {
  ProcedureDtoPagination,
  ProcedureBaseDto,
  ProcedureDto,
} from "./procedure.dto";

export const useCreateProcetureService = () => {
  const fetchData = useFetchApi();
  const { schema } = useProceturesValidation();

  return (
    {
      title,
      code,
      architecture_id,
      process_id,
      status,
      docType,
      files,
      description,
    }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    return fetchData(
      "/procedures",
      {
        method: "POST",
        body: serialize({
          architecture_id,
          process_id,
          title,
          code,
          status,
          docType,
          description,
          files,
        }),
      },
      {setToken:true, ...customConfig}
    );
  };
};
export const useEditProcetureService = (id: number) => {
  const fetchData = useFetchApi();
  const { schema } = useEditProcetureValidation();

  return (
    {
      title,
      code,
      status,
      docType,
      architecture_id,
      process_id,
      files,
      description,
      fileIdsForDelete,
    }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    const formdata = serialize({
      title,
      code,
      status,
      docType,
      architecture_id,
      process_id,
      description,
      files,
    });
    fileIdsForDelete.forEach((element) => {
      formdata.append("fileIdsForDelete[]", element);
    });
    formdata.append("_method", "PUT");
    return fetchData(
      `/procedures/${id}`,
      {
        method: "POST",
        body: formdata,
      },
      {setToken:true, ...customConfig}
    );
  };
};
export const useGetProceduresService = () => {
  const fetchData = useFetchApi<ProcedureDtoPagination, ProcedureDtoPagination>(
    ProcedureDtoPagination
  );
  return (params, customConfig: FetchCustomConfig = {}) =>
    fetchData("/procedures", { params }, {setToken:true, ...customConfig});
};
// export const useGetBaseProcessesService = () => {
//   const fetchData = useFetchApi<ProcessBaseDto[], ProcessBaseDto>(
//     ProcessBaseDto
//   );
//   return (architectureId: number, customConfig: FetchCustomConfig = {}) =>
//     fetchData(`/architectures/${architectureId}/processes`, {}, customConfig);
// };
export const useGetProcedureByIdService = () => {
  const fetchData = useFetchApi<ProcedureDto, ProcedureDto>(ProcedureDto);
  return (id: string, customConfig: FetchCustomConfig) => fetchData(`/procedures/${id}`,{},{toastError:true, setToken:true, ...customConfig});
};
export const useGetProcedureBySlugService = () => {
  const fetchData = useFetchApi<ProcedureDto, ProcedureDto>(ProcedureDto);
  return (slug: string, customConfig: FetchCustomConfig) => fetchData(`/procedures-details/${slug}`, {}, {setToken:true, ...customConfig});
};
