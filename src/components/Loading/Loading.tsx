import CircularProgress, { CircularProgressProps } from '@mui/material/CircularProgress';

const Loading = (props: CircularProgressProps): JSX.Element => {
  const { sx, ...rest } = props;
  return (
    <CircularProgress
      data-testid={'circle-loading'}
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: '-12px',
        marginLeft: '-12px',
        ...sx,
      }}
      {...rest}
    />
  );
};

export default Loading;
