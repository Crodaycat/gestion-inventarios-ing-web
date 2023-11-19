import { DialogContent, DialogTitle, Dialog as MUIDialog } from '@mui/material';

interface DialogProps {
  title: string;
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
}

const Dialog = ({ title, open, onClose, children }: DialogProps) => {
  return (
    <MUIDialog open={open} onClose={onClose}>
      <DialogTitle className='text-center'>
        <span className='font-bold'>{title}</span>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
    </MUIDialog>
  );
};

export { Dialog };
