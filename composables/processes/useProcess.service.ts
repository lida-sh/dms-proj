import type { InferType } from "yup";
import { useFetchApi } from "../api/useFetchApi";
import { useProcessValidation, useEditProcessValidation } from "./useProcess.validation";
import type { FetchCustomConfig } from "../api/FetchCustomConfig";
import { serialize } from "object-to-formdata";
import { ProcessBaseDto, ProcessDto, ProcessDtoPagination } from "./process.dto";

export const useCreateProcessService = () => {
  const fetchData = useFetchApi();
  const { schema } = useProcessValidation();

  return (
    { title, code, architecture_id, status, files, description }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    return fetchData(
      "/processes",
      {
        method: "POST",
        body: serialize({
          architecture_id,
          title,
          code,
          status,
          description,
          files
        }),
      },
      {setToken:true, ...customConfig}
    );
  };
};
export const useEditProcessService = (id:number) => {
  const fetchData = useFetchApi();
  const { schema } = useEditProcessValidation();
  
  return (
    { title, code, architecture_id, files, description, fileIdsForDelete }: InferType<typeof schema>,
    customConfig: FetchCustomConfig = {}
  ) => {
    const formdata = serialize({
      title,
      code,
      architecture_id,
      description,
      files
    });
    fileIdsForDelete.forEach(element => {
      formdata.append('fileIdsForDelete[]', element)
    });
    formdata.append('_method', 'PUT');
    return fetchData(
      `/processes/${id}`,
      {
        method: "POST",
        body: formdata
      },
      {setToken:true, ...customConfig}
    );
  };
};
export const useGetProcessesService = ()=>{
  const fetchData = useFetchApi<ProcessDtoPagination,ProcessDtoPagination>(ProcessDtoPagination);
  return (params,customConfig: FetchCustomConfig = {})=>fetchData("/processes", {params}, {setToken:true, ...customConfig})
}
export const useGetBaseProcessesService = ()=>{
  const fetchData = useFetchApi<ProcessBaseDto[], ProcessBaseDto>(ProcessBaseDto);
  return (architectureId:number, customConfig: FetchCustomConfig = {})=>fetchData(`/architectures/${architectureId}/processes`, {}, {setToken:true, ...customConfig})
}
export const useGetProcessByIdService = ()=>{
  const fetchData = useFetchApi<ProcessDto, ProcessDto>(ProcessDto);
  return (id:string, customConfig: FetchCustomConfig={})=>fetchData(`/processes/${id}`, {}, {setToken:true, ...customConfig})
}
export const useGetProcessBySlugService = ()=>{
  const fetchData = useFetchApi<ProcessDto, ProcessDto>(ProcessDto);
  return (slug:string, customConfig: FetchCustomConfig)=>fetchData(`/processes-details/${slug}`, {}, {setToken:true, ...customConfig}).then((response)=>{
    console.log("response service", response);
    return response
  })
}
