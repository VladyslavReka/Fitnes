import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const ClientInfoCard = ({ client }) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {client.fullName}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Дата народження: {new Date(client.dateOfBirth).toLocaleDateString()}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Адреса: {client.address}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Контакт: {client.contactInfo}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Тип абонемента: {client.membershipType?.type || 'N/A'}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Ціна абонемента: {client.membershipType?.price || 'N/A'} грн
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Дійсний до: {client.membershipEndDate ? new Date(client.membershipEndDate).toLocaleDateString() : 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ClientInfoCard;
