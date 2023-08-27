import { ITrackFieldValues } from "@/types/album.types";
import {
  IAlbumCard,
  IAlbumDashboardCard,
  IAlbumInfo,
  IBarMonthlySettlement,
  IDoughnutTrackRevenue,
  ILineTrackSettlementTrends,
} from "@/types/dto";

export interface IGetAlbumsResponse {
  totalItems: number,
  contents: IAlbumCard[]
}

export interface IGetAlbumDashboardResponse extends IAlbumDashboardCard {
}

export interface IGetAlbumTracksResponse extends IAlbumInfo {
}

export interface IGetAlbumMonthlySettlementResponse {
  contents: IBarMonthlySettlement[]
}

export interface IGetAlbumTrackSettlementTrendsResponse {
  tracks: ILineTrackSettlementTrends[]
}

export interface IGetAlbumRevenueTopTrackResponse {
  contents: IDoughnutTrackRevenue[]
}

export interface IPostAlbumTrackRequest extends ITrackFieldValues {
}

export interface IPostAlbumTrackResponse extends IPostAlbumTrackRequest {
  trackId: number;
  albumId: number;
}
