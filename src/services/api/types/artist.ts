import {
  IAlbumCard,
  IArtist,
  IArtistAccount,
  IArtistDashboardCard,
  IArtistList,
  IBarMonthlySettlement,
  IDoughnutTrackRevenue,
  ITrackTransaction,
} from "@/types/dto";

import { AtLeastOne } from "./global";

export interface IGetArtistsResponse {
  totalItems: number,
  contents: IArtistList[]
}

export interface IGetArtistDashboardResponse extends IArtistDashboardCard {
}

export interface IGetArtistTrackTransactionResponse {
  totalItems: number,
  contents: Omit<ITrackTransaction, "netIncome">[]
}

export interface IGetArtistEarningsTopTrackResponse {
  contents: IDoughnutTrackRevenue[]
}

export interface IGetArtistMonthlySettlementResponse {
  contents: IBarMonthlySettlement[]
}

export interface IGetArtistAlbumsResponse {
  totalItems: number,
  contents: IAlbumCard[]
}

export interface IGetArtistsSimpleResponse {
  artists: IArtist[]
}

export interface IGetArtistProfileResponse {
  memberId: number,
  name: string,
  enName: string,
  loginId: string,
  email: string,
  profileImage: string
}

export interface IPostArtistResponse extends IGetArtistProfileResponse {
  commissionRate: number | null
}

export interface IPatchArtistProfileForAdminResponse extends IArtistAccount {
}

export type IPatchArtistProfileForAdminRequest = AtLeastOne<{
  name: string,
  enName: string,
  commissionRate: number | null,
}>;
