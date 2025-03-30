import { PropsWithChildren } from 'react';

type Props = {
  open: boolean;
  onClose: () => void;
};

export function Modal({ open, onClose, children }: PropsWithChildren<Props>) {
  if (!open) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 top-0 z-10 bg-black/50"
      onClick={onClose}
    >
      <div className="absolute left-1/2 top-1/2 z-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-md bg-white px-6 py-5 shadow-lg">
        {children}
      </div>
    </div>
  );
}
