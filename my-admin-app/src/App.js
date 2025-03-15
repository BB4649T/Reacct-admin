import { Admin, Resource, ListGuesser, Datagrid, TextField, ReferenceField, Button } from 'react-admin';
import jsonServerProvider from 'ra-data-json-server';
import { useDelete } from 'react-admin';

const dataProvider = jsonServerProvider('https://jsonplaceholder.typicode.com');

// Composant pour gérer l'annulation
const CancelReservationButton = ({ record }) => {
  const [deleteOne, { isLoading }] = useDelete('reservations', { id: record.id });

  const handleClick = () => {
    deleteOne();
  };

  return (
    <Button onClick={handleClick} disabled={isLoading} color="secondary">
      Annuler
    </Button>
  );
};

const ReservationList = () => (
  <Datagrid rowClick="show">
    <TextField source="id" />
    <ReferenceField source="userId" reference="users" />
    <TextField source="event" />
    <CancelReservationButton />
  </Datagrid>
);

const App = () => (
  <Admin dataProvider={dataProvider}>
    <Resource name="reservations" list={ReservationList} />
  </Admin>
);

export default App;
