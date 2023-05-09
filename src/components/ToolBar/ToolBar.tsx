import * as React from 'react';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import AddCircle from '@mui/icons-material/AddCircle';
import RemoveCircle from '@mui/icons-material/RemoveCircle';
import { Card } from '@mui/material';

interface MenuButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: (
    event?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
  ) => void;
  label: string;
}

type EventFunction = (
  event?: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLButtonElement>
) => void;

interface ToolBarProps {
  moreViewOnClick: EventFunction;
  lessViewOnClick: EventFunction;
}

function MenuButton({ children, onClick, label, ...props }: MenuButtonProps) {
  const buttonRef = React.useRef<HTMLButtonElement>(null);

  return (
    <IconButton
      {...props}
      ref={buttonRef}
      variant="plain"
      color="neutral"
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
      <List>
        <ListItem>
          <MenuButton label="AddCircle" onClick={moreViewOnClick}>
            <AddCircle />
          </MenuButton>
        </ListItem>
        <ListItem>
          <MenuButton label="RemoveCircle" onClick={lessViewOnClick}>
            <RemoveCircle />
          </MenuButton>
        </ListItem>
      </List>
    </Card>
  );
}
