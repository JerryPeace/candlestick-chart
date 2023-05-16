import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { Card, Stack } from '@mui/material';

interface MenuButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: (
    event?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
}

type EventFunction = (
  event?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
) => void;

interface ToolBarProps {
  moreViewOnClick: EventFunction;
  lessViewOnClick: EventFunction;
}

function MenuButton({ children, onClick, ...props }: MenuButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <IconButton
      {...props}
      ref={buttonRef}
      color="info"
      aria-haspopup="menu"
      onClick={onClick}
      sx={{
        '&.Joy-focusVisible': {
          bgcolor: 'neutral.plainHoverBg',
        },
      }}
    >
      {children}
    </IconButton>
  );
}

export default function ToolBar({ moreViewOnClick, lessViewOnClick }: ToolBarProps) {
  return (
    <Card variant="outlined" sx={{ boxShadow: '0 0 4px 1px lightgray' }}>
      <Stack>
        <MenuButton onClick={moreViewOnClick}>
          <AddCircle />
        </MenuButton>
        <MenuButton onClick={lessViewOnClick}>
          <RemoveCircle />
        </MenuButton>
      </Stack>
    </Card>
  );
}
