import classNames from "classnames/bind";
import Image from "next/image";

import styles from "./AlbumCard.module.scss";
import OptionsButton from "./OptionsButton";

const defaultAlbumCover = "/images/default-album-cover.svg";

interface AlbumCardProps {
  albumId: number
  albumCoverUrl: string | null,
  albumTitle: string
  accessAdmin?: boolean
}

const cx = classNames.bind(styles);

/**
 * @author [hayoung-99](https://github.com/hayoung-99)
 * @param albumId 엘범 id
 * @param albumCoverUrl 앨범 커버 이미지 url
 * @param albumTitle 앨범 제목
 * @param accessAdmin 어드민 접근 가능 여부 - 어드민일 시 kebab 버튼 노출
 * @returns 앨범 리스트에 들어갈 앨범카드 컴포넌트
 */
const AlbumCard = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  albumId,
  albumCoverUrl,
  albumTitle,
  accessAdmin = false,
}: AlbumCardProps) => {
  const handleClickAlbumCard = () => {
    /* 임시 */
    // eslint-disable-next-line no-console
    console.log(`"albums/${albumId}"로 이동`);
  };

  return (
    <div role="presentation" className={cx("albumContainer")} onClick={handleClickAlbumCard}>
      <div className={cx("imageBox")}>
        <div className={cx("imageContent")}>
          <Image
            src={albumCoverUrl ?? defaultAlbumCover}
            fill
            alt="앨범 아트"
            className={cx("albumCover", { default: !albumCoverUrl })}
          />
        </div>
      </div>
      <div className={cx("albumContent")}>
        <h3 className={cx("albumTitle")}>{albumTitle}</h3>
        {accessAdmin
          && (
            <OptionsButton albumId={albumId} albumTitle={albumTitle} />
          )}
      </div>
    </div>
  );
};
export default AlbumCard;
