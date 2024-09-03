import { Table } from "antd";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import ButtonComponent from "../ButtonComponent/ButtonComponent";
import { useRef, useState, useEffect } from "react";

const TableComponent = (props) => {
  const [isSelectedRowKeys, setIsSelectedRowKeys] = useState([]);
  const {
    selectionType = "checkbox",
    isLoading = false,
    columns = [],
    data: dataSource = [],
    handleDelete,
    pagination,
  } = props;
  const [tableColumns, setTableColumns] = useState(columns);
  const tableRef = useRef(null);

  // Khởi tạo trạng thái cho checkbox với tất cả các cột được checked mặc định
  const [checkedItems, setCheckedItems] = useState(
    columns.reduce((acc, item) => ({ ...acc, [item.dataIndex]: true }), {})
  );

  const handleChangeInput = (e) => {
    const { checked, value } = e.target;

    // Cập nhật trạng thái checkedItems
    setCheckedItems((prevState) => {
      const updatedCheckedItems = {
        ...prevState,
        [value]: checked,
      };

      // Cập nhật cột bảng dựa trên trạng thái checked mới
      const columnsFilter = columns.filter(
        (col) => updatedCheckedItems[col.dataIndex]
      );

      setTableColumns(columnsFilter); // Đảm bảo cập nhật tableColumns

      return updatedCheckedItems;
    });
  };

  // Cập nhật danh sách các cột của bảng khi checkedItems thay đổi
  useEffect(() => {
    const columnsFilter = columns.filter((col) => checkedItems[col.dataIndex]);
    setTableColumns(columnsFilter);
  }, [checkedItems, columns]); // Theo dõi sự thay đổi của checkedItems và columns

  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      setIsSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => ({
      disabled: record.name === "Disabled User",
      name: record.name,
    }),
  };

  const handleDeleteMany = () => {
    handleDelete(isSelectedRowKeys);
  };

  return (
    <LoadingComponent isLoading={isLoading}>
      <div className="filter">
        {columns.map((item) => (
          <label key={item.dataIndex}>
            <input
              type="checkbox"
              style={{ fontSize: "14px" }}
              value={item.dataIndex}
              checked={checkedItems[item.dataIndex]}
              onChange={handleChangeInput}
            />
            {item.title}
          </label>
        ))}
      </div>

      <Table
        ref={tableRef}
        columns={tableColumns} // Sử dụng các cột đã được lọc
        dataSource={dataSource}
        //rowSelection={rowSelection}
        pagination={pagination}
        //  {...props}
      />
    </LoadingComponent>
  );
};

export default TableComponent;
