import { ITransactionUpload } from "@/types/dto";

export interface IGETTransactionUploadResponse {
  totalItems: number,
  contents: ITransactionUpload // 스웨거는 배열 형태
}