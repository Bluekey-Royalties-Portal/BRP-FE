import {
  IAlbumCard,
  IArtist,
  IArtistDashboardCard,
  IArtistList,
  IBarMonthlySettlement,
  IDoughnutTrackRevenue,
  ITrackTransaction,
} from "@/types/dto";

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
