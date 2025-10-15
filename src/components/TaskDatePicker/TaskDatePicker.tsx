import React from "react";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import { Dayjs } from "dayjs";

type TaskDatePickerPropsType = {
  selectedDate: Dayjs | null;
  setSelectedDate: (newDate: Dayjs) => void;
};

export const TaskDatePicker = React.memo(
  ({ selectedDate, setSelectedDate }: TaskDatePickerPropsType) => {
    return (
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Выберите срок выполнения"
          value={selectedDate}
          onChange={(newDate) => {
            if (newDate) setSelectedDate(newDate);
          }}
          enableAccessibleFieldDOMStructure={false}
          slots={{ textField: TextField }}
          slotProps={{
            textField: {
              variant: "filled",
              sx: {
                width: "100%",
                input: { color: "white" },

                "& label": { color: "#deddddff" },
                "& label.Mui-focused": { color: "white" },

                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "lightgray",
                  },
                  "&:hover fieldset": {
                    borderColor: "white",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "white",
                  },
                },

                "& .MuiFilledInput-root": {
                  "&:before": { borderBottomColor: "lightgray" },
                  "&:hover:not(.Mui-disabled):before": {
                    borderBottomColor: "white",
                  },
                  "&.Mui-focused:after": { borderBottomColor: "white" },
                },
              },
            },
          }}
        />
      </LocalizationProvider>
    );
  }
);
