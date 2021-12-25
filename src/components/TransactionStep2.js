import { FormControl, FormLabel } from "@mui/material";
import { SearchStock } from "../components/SearchStock";

export const TransactionStep2 = ({ selected, setSelected }) => {
  return (
    <FormControl component="fieldset" sx={{ mt: 2, ml: 2 }}>
      <FormLabel component="legend">3. Name</FormLabel>
      <SearchStock selected={selected} setSelected={setSelected} />
    </FormControl>
  );
};
