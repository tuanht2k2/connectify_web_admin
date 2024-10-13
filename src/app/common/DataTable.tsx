"ise client";

import { Button, IconButton, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";

interface IProps {
  columns: ComponentInterfaces.IColumn[];
  rows: any[];
  onDelete: (data: any[]) => void;
}

function DataTableComponent(props: IProps) {
  const paginationModel = { page: 0, pageSize: 10 };

  const ActionCol = () => {
    return (
      <div className="flex justify-center items-center h-full">
        <IconButton>
          <VisibilityIcon color="warning" fontSize="small" />
        </IconButton>
        <IconButton>
          <EditIcon color="error" fontSize="small" />
        </IconButton>
      </div>
    );
  };

  const [selected, setSelected] = useState<any>([]);

  const onDelete = () => {
    props.onDelete(selected);
  };

  return (
    <Paper sx={{ height: "100%", width: "100%" }}>
      <div className="p-2 gap-10">
        <Button className="gap-3">
          <AddIcon />
          Thêm mới
        </Button>
        {selected.length > 0 && (
          <IconButton onClick={onDelete}>
            <DeleteIcon color="warning" fontSize="small" />
          </IconButton>
        )}
      </div>
      <DataGrid
        rows={props.rows.map((item, index) => ({
          ...item,
          index: index + 1,
        }))}
        columns={[
          ...props.columns,
          {
            field: "actions",
            headerName: "Thao tác",
            filterable: false,
            width: 100,
            renderCell: () => {
              return <ActionCol />;
            },
          },
        ]}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[10, 30, 50, 100]}
        checkboxSelection
        sx={{ border: 0 }}
        disableRowSelectionOnClick
        onRowSelectionModelChange={(rows) => {
          setSelected(rows);
        }}
      />
    </Paper>
  );
}

export default DataTableComponent;
