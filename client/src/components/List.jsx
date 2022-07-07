import Item from './Item';

import { Grid } from '@mui/material';

const List = ({ data }) => {
  return (
    <Grid container direction='column'>
      {data.map((item, index) => {
        return (
          <Item key={index} videoURL={item.videoURL} user={item.user}></Item>
        );
      })}
    </Grid>
  );
};

export default List;
