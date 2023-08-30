import classNames from "classnames/bind";

import ModalTooltipRoot from "@/components/common/Tooltip/ModalTooltip";
import useToast from "@/hooks/useToast";
import { ITransactionUploadAlert } from "@/types/dto";

import TableBodyUI from "../../common/Table/Composition/TableBodyUI";
import TableCellUI from "../../common/Table/Composition/TableCellUI";
import TableContainerUI from "../../common/Table/Composition/TableContainerUI";
import TableHeaderUI from "../../common/Table/Composition/TableHeaderUI";
import TableRowUI from "../../common/Table/Composition/TableRowUI";

import styles from "./AlertDataTable.module.scss";

const cx = classNames.bind(styles);

const AlertDataTable = ({ data }: { data?: ITransactionUploadAlert[] }) => {
  const { showToast } = useToast();

  const handleCopyData = () => {
    showToast("복사되었습니다.");
  };

  return (
    <div className={cx("tableContainer")}>
      <button className={cx("copyButton")} type="button" onClick={handleCopyData}>전체 복사</button>
      <TableContainerUI
        stickyHeader
        tableHeight={282}
      >
        <TableHeaderUI>
          <TableCellUI isHeader colWidth={80}>행</TableCellUI>
          <TableCellUI isHeader colWidth={120}>분류</TableCellUI>
          <TableCellUI isHeader>값</TableCellUI>
        </TableHeaderUI>
        <TableBodyUI>
          {data?.map((item) => {
            return (
              <TableRowUI key={`${item.columnIndex}${item.rowIndex}`}>
                <TableCellUI>{item.rowIndex}</TableCellUI>
                <TableCellUI>{item.columnName}</TableCellUI>
                <TableCellUI>
                  <ModalTooltipRoot message={item.cellValue}>
                    <p className={cx("ellipsis")}>
                      {item.cellValue}
                    </p>
                  </ModalTooltipRoot>
                </TableCellUI>
              </TableRowUI>
            );
          })}
        </TableBodyUI>
      </TableContainerUI>
    </div>
  );
};

export default AlertDataTable;