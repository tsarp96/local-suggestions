import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
  Divider,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useAuth } from '../../hooks/useAuth';

interface District {
  _id: string;
  name: string;
}

interface City {
  _id: string;
  name: string;
  districts: District[];
}

interface CityManagerProps {
  onError: (message: string) => void;
  onSuccess: (message: string) => void;
}

const CityManager: React.FC<CityManagerProps> = ({ onError, onSuccess }) => {
  const [cities, setCities] = useState<City[]>([]);
  const [newCityName, setNewCityName] = useState('');
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [editName, setEditName] = useState('');
  const [expandedCity, setExpandedCity] = useState<string | null>(null);
  const [newDistrictName, setNewDistrictName] = useState('');
  const { token } = useAuth();

  const fetchCities = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/locations/cities`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }
      setCities(data);
    } catch (err: any) {
      onError(err.message || 'Failed to fetch cities');
    }
  };

  useEffect(() => {
    fetchCities();
  }, []);

  const handleAddCity = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/locations/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name: newCityName }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      onSuccess('City added successfully');
      setNewCityName('');
      fetchCities();
    } catch (err: any) {
      onError(err.message || 'Failed to add city');
    }
  };

  const handleUpdateCity = async () => {
    if (!editingCity) return;

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/locations/cities/${editingCity._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: editName }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      onSuccess('City updated successfully');
      setEditingCity(null);
      setEditName('');
      fetchCities();
    } catch (err: any) {
      onError(err.message || 'Failed to update city');
    }
  };

  const handleDeleteCity = async (cityId: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/locations/cities/${cityId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      onSuccess('City deleted successfully');
      fetchCities();
    } catch (err: any) {
      onError(err.message || 'Failed to delete city');
    }
  };

  const handleAddDistrict = async (cityId: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/locations/cities/${cityId}/districts`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ name: newDistrictName }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message);
      }

      onSuccess('District added successfully');
      setNewDistrictName('');
      fetchCities();
    } catch (err: any) {
      onError(err.message || 'Failed to add district');
    }
  };

  const handleDeleteDistrict = async (cityId: string, districtId: string) => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/locations/cities/${cityId}/districts/${districtId}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message);
      }

      onSuccess('District deleted successfully');
      fetchCities();
    } catch (err: any) {
      onError(err.message || 'Failed to delete district');
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h6" gutterBottom>
          Add New City
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField
            fullWidth
            label="City Name"
            value={newCityName}
            onChange={(e) => setNewCityName(e.target.value)}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleAddCity}
            disabled={!newCityName}
          >
            Add City
          </Button>
        </Box>
      </Box>

      <Typography variant="h6" gutterBottom>
        Cities and Districts
      </Typography>
      <List>
        {cities.map((city) => (
          <React.Fragment key={city._id}>
            <ListItem>
              <ListItemText primary={city.name} />
              <ListItemSecondaryAction>
                <IconButton
                  edge="end"
                  aria-label="edit"
                  onClick={() => {
                    setEditingCity(city);
                    setEditName(city.name);
                  }}
                  sx={{ mr: 1 }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteCity(city._id)}
                  sx={{ mr: 1 }}
                >
                  <DeleteIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  onClick={() => setExpandedCity(expandedCity === city._id ? null : city._id)}
                >
                  {expandedCity === city._id ? <ExpandLess /> : <ExpandMore />}
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
            <Collapse in={expandedCity === city._id} timeout="auto" unmountOnExit>
              <Box sx={{ pl: 4, pr: 2, py: 1 }}>
                <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
                  <TextField
                    fullWidth
                    size="small"
                    label="District Name"
                    value={newDistrictName}
                    onChange={(e) => setNewDistrictName(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    size="small"
                    startIcon={<AddIcon />}
                    onClick={() => handleAddDistrict(city._id)}
                    disabled={!newDistrictName}
                  >
                    Add District
                  </Button>
                </Box>
                <List>
                  {city.districts.map((district) => (
                    <ListItem key={district._id}>
                      <ListItemText primary={district.name} />
                      <ListItemSecondaryAction>
                        <IconButton
                          edge="end"
                          aria-label="delete"
                          onClick={() => handleDeleteDistrict(city._id, district._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Collapse>
            <Divider />
          </React.Fragment>
        ))}
      </List>

      <Dialog open={!!editingCity} onClose={() => setEditingCity(null)}>
        <DialogTitle>Edit City</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="City Name"
            fullWidth
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditingCity(null)}>Cancel</Button>
          <Button onClick={handleUpdateCity} variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CityManager; 
