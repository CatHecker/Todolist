import { Button } from "@mui/material";
import React from "react";

type FilterType = "completed" | "all" | "active";

type FilterButtonPropsType = {
  filterType: FilterType;
  setFilter: (filterType: FilterType) => void;
  children: React.ReactNode;
  curFilter: FilterType;
};

export const FilterButton = ({
  filterType,
  setFilter,
  children,
  curFilter,
}: FilterButtonPropsType) => {
  return (
    <Button
      aria-label="change-theme button"
      sx={
        filterType === curFilter
          ? { bgcolor: "var(--taskMenu-color)", color: "white" }
          : { color: "var(--main-font)" }
      }
      onClick={() => setFilter(filterType)}
    >
      {children}
    </Button>
  );
};
