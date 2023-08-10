import classnames from "classnames/bind";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { PAGES_PER_PAGINATION } from "@/constants/pagination";
import utilUpdateQueryParam from "@/utils/utilUpdateQueryParam";

import PaginationArrowUI from "./PaginationArrowUI";
import styles from "./PaginationUI.module.scss";

const cx = classnames.bind(styles);

interface PaginationUIProps {
  page: number
  shownPages: number[]
  endPage: number
  hasNext: boolean
  hasPrev: boolean
  queryParamName: string
}

const PaginationUI = ({
  page,
  shownPages,
  endPage,
  hasNext,
  hasPrev,
  queryParamName,
}: PaginationUIProps) => {
  const router = useRouter();
  const { query } = router;

  return (
    <div className={cx("wrapper")}>
      <Link className={cx("button", { disabled: !hasPrev })} href={utilUpdateQueryParam(query, queryParamName, shownPages[0] - PAGES_PER_PAGINATION)}>
        <PaginationArrowUI able={hasPrev} />
      </Link>
      {hasPrev && (
        <>
          <Link className={cx("button")} href={utilUpdateQueryParam(query, queryParamName, 1)}>
            <span className={cx("number")}>
              1
            </span>
          </Link>
          <Image
            src="/images/page-ellipsis.svg"
            alt="Page Ellipsis 이미지"
            width={32}
            height={4}
          />
        </>
      )}
      {shownPages.map((num) => {
        return (
          <Link className={cx("button", { disabled: page === num })} href={utilUpdateQueryParam(query, queryParamName, num)} key={num}>
            <span className={cx("number", { active: page === num })}>
              {num}
            </span>
          </Link>
        );
      })}
      {hasNext && (
        <>
          <Image
            src="/images/page-ellipsis.svg"
            alt="Page Ellipsis 이미지"
            width={32}
            height={4}
          />
          <Link className={cx("button")} href={utilUpdateQueryParam(query, queryParamName, endPage)}>
            <span className={cx("number")}>
              {endPage}
            </span>
          </Link>
        </>
      )}
      <Link className={cx("button", { disabled: !hasNext })} href={utilUpdateQueryParam(query, queryParamName, shownPages[shownPages.length - 1] + 1)}>
        <PaginationArrowUI direction="next" able={hasNext} />
      </Link>
    </div>
  );
};

export default PaginationUI;
