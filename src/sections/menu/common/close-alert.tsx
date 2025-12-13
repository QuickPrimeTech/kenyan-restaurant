import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

type CloseAlert = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  handleConfirmClose: () => void;
};

export function CloseAlert({
  open,
  onOpenChange,
  handleConfirmClose,
}: CloseAlert) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Unsaved customization Changes</AlertDialogTitle>
          <AlertDialogDescription>
            You have unsaved customizations. Are you sure you want to close?
            Your selections will be lost.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => onOpenChange(false)}>
            Continue Editing
          </AlertDialogCancel>
          <AlertDialogAction onClick={() => handleConfirmClose()}>
            Discard Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
