import React, { useState } from "react";
import { Modal, Box, Button, MenuItem, Select, FormControl, InputLabel, Typography } from "@mui/material";

const ChangeMembershipModal = ({ open, onClose, memberships = [], onChange }) => {
  const [selectedMembership, setSelectedMembership] = useState("");

  const handleSelectChange = (event) => {
    setSelectedMembership(event.target.value);
  };

  const handleConfirm = () => {
    if (selectedMembership) {
      onChange(selectedMembership);
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6">Змінити абонемент</Typography>
        <FormControl fullWidth margin="normal">
          <InputLabel>Оберіть абонемент</InputLabel>
          <Select
            value={selectedMembership}
            onChange={handleSelectChange}
            label="Оберіть абонемент"
          >
            {memberships.length > 0 ? (
              memberships.map((membership) => (
                <MenuItem key={membership._id} value={membership._id}>
                  {membership.type} - {membership.duration} міс. - {membership.price} грн
                </MenuItem>
              ))
            ) : (
              <MenuItem disabled>Немає доступних абонементів</MenuItem>
            )}
          </Select>
        </FormControl>
        <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, marginTop: 2 }}>
          <Button variant="outlined" onClick={onClose}>
            Відмінити
          </Button>
          <Button
            variant="contained"
            onClick={handleConfirm}
            disabled={!selectedMembership}
          >
            Зберегти
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ChangeMembershipModal;

