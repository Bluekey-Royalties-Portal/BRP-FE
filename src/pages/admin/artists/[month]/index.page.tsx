import { useRef, useState } from "react";

import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";

import ArtistsMainLayout from "@/components/artist/ArtistsMainLayout/ArtistsMainLayout";
import ArtistsStatusTable from "@/components/artist/ArtistsStatusTable/ArtistsStatusTable";
import MonthPickerDropdown from "@/components/common/MonthPicker/MonthPickerDropdown";
import Pagination from "@/components/common/Pagination/Pagination";
import SearchBar from "@/components/common/SearchBar/SearchBar";
import { ITEMS_PER_ARTISTS_TABLE } from "@/constants/pagination";
import { useArtistsStatus } from "@/services/queries/artists/useArtistsStatus";
import convertPageParamToNum from "@/utils/convertPageParamToNum";
import convertYearMonthToQuery from "@/utils/convertYearMonthToQuery";
import updateQueryParam from "@/utils/updateQueryParam";

interface IServerSideQuery {
  month: string,
  page: number,
  keyword: string | null,
}

const ArtistsStatusPage = (
  query: InferGetServerSidePropsType<GetServerSideProps<IServerSideQuery>>,
) => {
  const { month, page, keyword }: IServerSideQuery = query;
  const [searchKeyword, setSearchKeyword] = useState<string>(keyword || "");
  const {
    artistsStatus, isLoading, isError, isFetching,
  } = useArtistsStatus(
    convertYearMonthToQuery(month),
    page,
    keyword,
  );
  const searchKeywordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  if (isLoading || isFetching) return <div>로딩 중...</div>;
  if (isError) return <div>에러 발생</div>;
  if (!artistsStatus) return <div>데이터 없음</div>;

  const handleSearchKeyword = () => {
    if (searchKeywordRef.current) {
      setSearchKeyword(searchKeywordRef.current.value);
      const result = updateQueryParam(router.query, "keyword", searchKeywordRef.current.value, "page", 1);

      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.push(result);
    }
  };

  return (
    <ArtistsMainLayout
      title="아티스트 현황"
      dropdownElement={
        <MonthPickerDropdown />
      }
      searchBarElement={(
        <SearchBar
          placeholder="검색어를 입력해주세요."
          onClick={handleSearchKeyword}
          ref={searchKeywordRef}
          value={searchKeyword}
        />
      )}
    >
      <ArtistsStatusTable
        artistList={artistsStatus.contents}
        paginationElement={(
          <Pagination
            activePage={page}
            totalItems={artistsStatus.totalItems}
            itemsPerPage={ITEMS_PER_ARTISTS_TABLE}
          />
        )}
      />
    </ArtistsMainLayout>
  );
};

// eslint-disable-next-line @typescript-eslint/require-await
const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { month, page, keyword } = query;

  return {
    props: {
      month,
      page: convertPageParamToNum(page as string || null),
      keyword: keyword || null,
    },
  };
};

export { getServerSideProps };
export default ArtistsStatusPage;