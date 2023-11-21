export type SizePrintProps = {
  isDefault?: boolean;
  template?: string;
};

export const SizePrintA4: React.FC<SizePrintProps> = ({ template = '' }) => {
  return (
    <div className="size-a4">
      <div className="size-a4-detail" dangerouslySetInnerHTML={{ __html: template }} />
    </div>
  );
};
export const SizePrintA5: React.FC<SizePrintProps> = ({ template = '' }) => {
  return (
    <div className="size-a5">
      <div className="size-a5-detail" dangerouslySetInnerHTML={{ __html: template }} />
    </div>
  );
};
export const SizePrintK80: React.FC<SizePrintProps> = ({ template = '' }) => {
  return (
    <div className="size-k80">
      <div className="size-k80-detail" dangerouslySetInnerHTML={{ __html: template }} />
    </div>
  );
};
export const SizePrintK58: React.FC<SizePrintProps> = ({ template = '' }) => {
  return (
    <div className="size-k58">
      <div className="size-k58-detail" dangerouslySetInnerHTML={{ __html: template }} />
    </div>
  );
};
