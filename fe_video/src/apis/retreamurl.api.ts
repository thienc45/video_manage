import { Restream, Restreams } from "../types/retream.type";
import httpVideoUrl from "../utils/httpRetreamUrl";

export const getRestreamurl = () => httpVideoUrl.get<Restreams>('')

export const getDetailRetreamUrl = (id: number | string) => httpVideoUrl.delete<Restream>(`/${id}`) 

export const addRestremUrl = (restream: Omit<Restream, 'id'>) => httpVideoUrl.post<Restream>('', restream)

export const deleteRetreamUrl = (id: number | string) => httpVideoUrl.delete<Restream>(`${id}`)
